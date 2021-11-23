/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-19
 * Time: 16:24
 * About:
 *
 */

export interface IgetFetchJsonresult{
    result?:any,
    error?:string
}

export interface IgetFetchJsonParams{
    url:string,
    method:'POST'|'GET',
    headers?:any,
    body?:string
}

export interface IgetFetchJson{
    (v:IgetFetchJsonParams):Promise<IgetFetchJsonresult>
}

const getFetchJson:IgetFetchJson = async function ({url, method, headers, body})
{
    try {

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        const result = await response.json()

        return {result}

    }catch (e) {
        return {error:(e as Error).message}
    }
}

export default getFetchJson