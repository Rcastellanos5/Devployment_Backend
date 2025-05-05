import mongoose, { connection } from "mongoose";

export const connectToDatabase = async () => {
    try {
        const url ='mongodb+srv://Rolando:1002525933@cluster0.vjq1la5.mongodb.net/bd_codetienda'//URL de la base de datos
        const {connection} = await mongoose.connect(url)//Conectando a la base de datos
        const url2=`${connection.host}:${connection.port}}`//URL de la base de datos
       
        console.log(`conexion exitosa en ${url2}`)//Imprimiendo puerto y host de la base de datos
    }
    catch (error) {
        console.log(error.message)//Imprimiendo el error
        process.exit(1)//Si hay un error, se cierra el proceso
    }
}

