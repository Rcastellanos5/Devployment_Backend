import User from "../models/User"   
import slug from "slug"//Importando slug para crear un slug a partir del nombre de usuario
import { validationResult } from "express-validator"//Importando validationResult para validar los datos del formulario
import type {Request, Response} from 'express'//Importando Request y Response de express
import { hashPassword,checkPassword } from "../util/auth"
import e from "cors"
import { generateJWT } from "../util/jwt"
//handlers de la aplicacion para manejar las peticiones y respuestas de la aplicacion
export const createAccount =async (req:Request, res:Response) => {

    //Manejo de errores 
    let errors=validationResult(req)//Validando los datos del formulario
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})//Si hay errores, se envia un mensaje de error
    }//Si no hay errores
    const {email, password}=req.body//Desestructurando el email del cuerpo de la peticion
    const userExist=await User.findOne({email})
    //Condicional para verificar si el usuario ya existe
    if (userExist){
        const error =new Error('El usuario ya existe')//Creando un nuevo error
        return res.status(409).json({error:error.message})///Estableciendo el estado de la respuesta a 400 (Bad Request)
    }

    const handle = slug(req.body.handle,'')//slug es una libreria que convierte un string en un slug, en este caso el nombre de usuario
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
export const authUser=async(req:Request, res:Response)=>{
    console.log("mensaje resivido", req.body)
    const{email,password}=req.body
    const user=await User.findOne({email})
    let errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //Condicional para verificar si el usuario ya existe
    if (!user){
        const error=new Error('El usuario no existe')
        return res.status(404).json({error:error.message})
    }
    //Comprobar si la contraseña es correcta
    const isPasswordCorrect=await checkPassword(password, user.password)
    if(!isPasswordCorrect){
            
        return res.status(401).json({error:'Contraseña incorrecta'})
    }
    
    const token=generateJWT({id:user._id})
    res.send(token)

}
export const getUser=async(req:Request, res:Response)=>{
    const bearer = req.headers.authorization
    if(!bearer){
        const error=new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }
}
