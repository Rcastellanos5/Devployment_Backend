import mongoose ,{Schema, Document}from "mongoose";    
import { extend } from "slug";
//hereda todo el modelon de Mongos
export interface IUser extends Document {//Definiendo la interfaz de usuario
    handle: string; //Nombre de usuario
    name: string; //Nombre del usuario
    email: string; //Email del usuario
    password: string; //Contraseña del usuario
    descripcion: string;
    imagen:string;
    links:string
}
const userSchema = new Schema({
    handle:{
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true, 

    }, //Nombre de usuario
    name: {
        type: String, //Tipio de dato
        required: true, //Campo requerido
        trim: true, //Eliminar espacios en blanco al inicio y al final

    },
    email : {
        type: String, //Tipo de dato    
        required: true, //Campo requerido
        trim: true, //Eliminar espacios en blanco al inicio y al final
        unique: true, //Campo unico
        towelowercase: true, //Convertir a minusculas
    },
    password: {
        type: String, //Tipo de dato
        required: true, //Campo requerido
        trim: true, //Eliminar espacios en blanco al inicio y al final
    },
    descripcion:{
        type:String,
        default:''
    }, 
    imagen:{
        type:String,
        default:""
    },
    links:{
        type:String,
        default:'[]'
    }


})
const User =mongoose.model<IUser>('User', userSchema) //Creando el modelo de usuario
export default User//Exportando el modelo de usuario
