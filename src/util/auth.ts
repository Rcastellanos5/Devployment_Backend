import bcrypt from 'bcrypt';//se importa bcrypt para encriptar la contraseña

//Funcion para comparar la contraseña encriptada con la contraseña que se recibe por el body de la peticion
export const hashPassword =async (password:string) => {
    const salt = await bcrypt.genSalt(10)//Generando un salt para encriptar la contraseña
    return await bcrypt.hash(password, salt)    //Se encripta la contraseña con el salt generado
}
