/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-22
 * Time: 15:54
 * About:
 *
 */
import getFetchJson from "./getFetchJson";

export interface IipGeoLocation{
    (ip:string): Promise<any>
}


const ipGeoLocation:IipGeoLocation = async function (ip){

    try {
        const apiKey = process.env.IPGEOLOCATION_KEY

        if(!apiKey){
            throw new Error('api key is empty')
        }

        const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`

        const {error, result} = await getFetchJson({
            url,
            method:'GET'
        })

        if(error){
            throw new Error(error)
        }

        return {result}

    }catch (e) {
        return {error:(e as Error).message}
    }
}

export default ipGeoLocation