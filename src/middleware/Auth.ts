import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import type {Request, Response, NextFuntion} from 'express'
declare global{
    namespace Express{
        interface Request{
            user?:IUser
        }
    }
}
export const autenticacion = async (req: Request, res:Response, next: NextFuntion)=>{
     const bearer = req.headers.authorization
    if(!bearer){
        const error=new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }
    const [, token]=bearer.split(' ')
    //Estrae el token JWT del esquema Bearer 
    if (!token){
        const error=new Error('No autorizado')
        return res.status(401).json({error: error.message})

    }
    //Verifica la autenticidad del token 
    try{
       const result =jwt.verify(token,process.env.JWT_SECRET ) 
       //Obtiene los datos del usuario sin la contraseña 
       if(typeof result ==='object'&&result.id){
            const user=await User.findById(result.id).select('-password');

            //Devuelve los errores si los hay 
            if(!user){
                const error=new Error('El usuario no existe')
                return res.status(404).json({error:error.message})
            }
            req.user=user
            next()
        }
    }catch(error){
        res.status(500).json({error:"Token no valido"})

    }
}