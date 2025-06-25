import { CorsOptions } from "cors";

//Cors que permite que se realice la conexion con back y el front
export const corsConfig: CorsOptions={

    origin: function(origin, callback){
        const whiteList=[process.env.FRONTEND_URL]
        //Solo si se accede desde el origin del dominio podra hacer la conexion 
        if(process.argv[1]){
            whiteList.push(undefined)
        }
        if (whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Error de cors"))
            
        }

    }
}