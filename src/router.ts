//Se define las rutas de la aplicacion
import {Router}from 'express'// Importando Router de express

const router=Router()//Instanciando Router


//Rutas 
/**Ruta de autenticacion y registro 
 * Get se visita una URl
 * Post cuando se envia un formulario
*/
router.post('/auth/register', (req, res) => {
    console.log(req.body)//Imprimiendo el cuerpo de la peticion
})

export default router//Exportando el router para usarlo en otros archivos