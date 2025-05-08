//Se define las rutas de la aplicacion
import {Router}from 'express'// Importando Router de express
import { createAccount } from './handlers'//Importando la funcion de crear cuenta
import User from './models/User'//Importando el modelo de usuario
const router=Router()//Instanciando Router


//Rutas 
/**Ruta de autenticacion y registro 
 * Get se visita una URl
 * Post cuando se envia un formulario
*/
router.post('/auth/register', createAccount)

export default router//Exportando el router para usarlo en otros archivos