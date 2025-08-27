import User from "../models/User"   
import slug from "slug"//Importando slug para crear un slug a partir del nombre de usuario
import formidable from "formidable"
import cloudinary  from "../config/cloudinary"
import jwt from "jsonwebtoken"
import {v4 as uuid}from 'uuid'
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
   //Le quita los espacios al campo handle y consulta si este ya existen 
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
//handler para autenticar un usuario 
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
//Verificacion con el JWT
export const getUser=async(req:Request, res:Response)=>{
    res.json(req.user)

}

export const updateUser=async(req:Request, res:Response)=>{
    try{
       const{descripcion,links}=req.body 
       const handle = slug(req.body.handle,'')//slug es una libreria que convierte un string en un slug, en este caso el nombre de usuario
        const handleExist=await User.findOne({handle})//Buscando si el nombre de usuario ya existe
        if (handleExist&&handleExist.email !==req.user.email){
            const error =new Error('El nombre de usuario ya existe')//Creando un nuevo error
            return res.status(409).json({error:error.message})
        }
        //Actualizar usuario
        req.user.descripcion=descripcion
        req.user.handle=handle
        req.user.links=links
        await req.user.save()
        res.send('Perfil Actualizado')
    }catch(e){
        const error= new Error ("Hubo un erro")
        return res.status(500).json({error:error.message})
    }
}
//Handler para subir una imagen 
export const UploadImage =async (req:Request, res:Response)=>{
    //Se configura 
    const form= formidable({multiples:false})
    //Se lee los datos que el usuario envio 
    
    try{
        
       form.parse(req,(error, fields, files)=>{
        
        cloudinary.uploader.upload(files.file[0].filepath,{public_id:uuid()}, async function(error,result){
            if(error){
                const error=new Error("Hubo un error al subir la imagen")
                return res.status(500).json({error: error.message})
            }
            if(result){
                //Atualiza el campo imagen del usuario autemticado
                req.user.imagen=result.secure_url
                //Guarda los cambios en la base de datos 
                await req.user.save()
                //Devuelve una respuesta tipo JSON 
                res.json({imagen: result.secure_url})
            }
            
        })
    }) 

    }catch(e){
        const error=new Error("Hubo un erro")
        return res.status(500).json({error: error.message})
    }
}
//Odtien el usuario mediante el handle 
export const getUserByHandle =async(req:Request, res:Response)=>{
    try{
        //trae el valor de handle 
        const{handle}=req.params

        //Hace la consulta a la base de datos 
        const user=await User.findOne({handle}).select('-_id -__v -email -password')
        //Si no existe manda un mensaje de erro 400
        if (!user){
            const error =new Error("No se encontro el usuario")
            return res.status(404).json({error:error.message})
        }
        //Devuelve el usuario encontrado como JSON
        res.json(user)
        console.log(user)
    }catch(e){
        const error=new Error("Hubo un error")
        return res.status(500).json({error:error.message})
    }
}
export const SearchByHandle =async (req:Request, res:Response)=>{
    try{
        const {handle} =req.body
        const userExist= await User.findOne({handle})
        if (userExist){
            const error =new Error (`${handle} ya esta registrado`)
            return res.status(404).json({error:error.message})
        }
        res.send(`${handle} esta disponible`)
    }catch(e){
        const error=new Error("Hubo un error ")
        return res.status(500).json({error:error.message})
    }
}