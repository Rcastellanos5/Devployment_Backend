
import express from 'express'// Importando express
import 'dotenv/config'// Importando dotenv para leer variables de entorno
import cors from 'cors'
import router from './router'// Importando el router
import { connectToDatabase } from './config/db'// Importando la funcion de conexion a la base de datos
import { corsConfig } from './config/cors'

const app=express()// Instanciando express
connectToDatabase()// Conectando a la base de datos
//Cors para permitir la conexion con el backend y el frontend

//Lee el cuerpo de la peticion 
app.use(express.json())//Middleware para leer el cuerpo de la peticion en formato JSON
//Configuraciones de cors
app.use(cors(corsConfig))

app.use('/',router)//cada vez que se haga una peticion a la ruta entra a cada una de las rutas definidas en el router


export default app; // Exportando la instancia de express para usarla en otros archivos