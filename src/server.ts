
import express from 'express'// Importando express
import router from './router'// Importando el router

const app=express()// Instanciando express
//Leer formulario
app.use(express.json())//Middleware para leer el cuerpo de la peticion en formato JSON
app.use('/',router)//cada vez que se haga una peticion a la ruta entra a cada una de las rutas definidas en el router

export default app; // Exportando la instancia de express para usarla en otros archivos