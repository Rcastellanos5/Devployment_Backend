import { CorsOptions } from "cors";

//Cors que permite que se realice la conexion con back y el front
export const corsConfig: CorsOptions={
    origin: function(origin, callback){
        console.log(origin)
        //Solo si se accede desde el origin del dominio podra hacer la conexion 
        if (origin==process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error("Error de cors"))
            
        }

    }
}