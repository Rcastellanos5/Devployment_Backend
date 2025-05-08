import mongoose, { connection } from "mongoose";
import colors from "colors";
import User, {IUser} from '../models/User';//Importando el modelo de usuario
export const connectToDatabase = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URI)//Conectando a la base de datos
        const url=`${connection.host}:${connection.port}}`//URL de la base de datos
       
        console.log(colors.italic.blue(`conexion exitosa en ${url}`))//Imprimiendo puerto y host de la base de datos
    }
    catch (error) {
        console.log(error.message)//Imprimiendo el error
        process.exit(1)//Si hay un error, se cierra el proceso
    }
}

