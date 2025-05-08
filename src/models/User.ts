import mongoose from "mongoose";    
export interface IUser {//Definiendo la interfaz de usuario
    handle: string; //Nombre de usuario
    name: string; //Nombre del usuario
    email: string; //Email del usuario
    password: string; //Contraseña del usuario
}
const userSchema = new mongoose.Schema({
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

})
const User =mongoose.model<IUser>('User', userSchema) //Creando el modelo de usuario
export default User//Exportando el modelo de usuario
