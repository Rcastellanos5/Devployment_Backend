import User from "../models/User"   
import slug from "slug"//Importando slug para crear un slug a partir del nombre de usuario
import type {Request, Response} from 'express'//Importando Request y Response de express
import { hashPassword } from "../util/auth"
//handlers de la aplicacion para manejar las peticiones y respuestas de la aplicacion
export const createAccount =async (req:Request, res:Response) => {

    const {email, password}=req.body//Desestructurando el email del cuerpo de la peticion
    const userExist=await User.findOne({email})
    if (userExist){
        const error =new Error('El usuario ya existe')//Creando un nuevo error
        return res.status(409).json({error:error.message})///Estableciendo el estado de la respuesta a 400 (Bad Request)
    }

    const handle = slug(req.body.handle,'')
    const handleExist=await User.findOne({handle})//Buscando si el nombre de usuario ya existe
    if (handleExist){
        const error =new Error('El nombre de usuario ya existe')//Creando un nuevo error
        return res.status(409).json({error:error.message})
    }


    const user =new User(req.body)//Creando un nuevo usuario
    user.password=await hashPassword(password)//Hasheando la contraseña
    user.handle=handle  
    

    await user.save()//Guardando el usuario en la base de datos

    res.status(201).send('Usuario creado')//Enviando mensaje de exito
}
