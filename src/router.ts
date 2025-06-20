//Se define las rutas de la aplicacion
import {Router}from 'express'// Importando Router de express
import { createAccount, authUser } from './handlers'//Importando la funcion de crear cuenta
import {body} from 'express-validator'//Importando body de express-validator para validar los datos del formulario
const router=Router()//Instanciando Router


//Rutas 
/**Ruta de autenticacion y registro 
 * Get se visita una URl
 * Post cuando se envia un formulario
*/

router.post('/auth/register', 
    body('handle')
        .notEmpty()//Validando que el campo handle no este vacio
        .withMessage('El handle no puede ir vacio'),//Mensaje de error si el campo handle esta vacio
     body('name')
        .notEmpty()//Validando que el campo name no este vacio
        .withMessage('El nombre no puede ir vacio'),//Mensaje de error si el campo name esta vacio
    body('email')
        .isEmail()//Validando que el campo email sea un email valido
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .isLength({min:8})//Validando que el campo password no este vacio y que tenga una longitud minima de 8 caracteres
        .withMessage('La contraseña no puede ir vacia y debe tener al menos 8 caracteres'),//Mensaje de error si el campo password esta vacio o no tiene la longitud minima

    createAccount)
//endpoint para crear autenticacion de usuario
router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body ('password')
        .notEmpty()
        .isLength({min:8})
        .withMessage('La contraseña no puede ir vacia y debe tener al menos 8 caracteres'),//Mensaje de error si el campo password esta vacio o no tiene la longitud minima

        authUser)

export default router//Exportando el router para usarlo en otros archivos