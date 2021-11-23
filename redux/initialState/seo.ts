/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-03
 * Time: 18:46
 * About:
 *
 */
import {pageType} from "../../interfaceAndType/global"



export interface IinitialStateSEOParamsTwitter{
    title?:string,
    description?:string,
    image?:string,
    card?:'summary_large_image'|'app'|'summary'|'player',
    creator?:string,
}
export interface IinitialStateSEOParams{
    url?:string,
    page: pageType,
    title:string,
    description:string,
    image?:string,
    twitter?:IinitialStateSEOParamsTwitter,

}
export interface IinitialStateSEO {
    header:IinitialStateSEOParams[]
}

export interface IgetSeoPage{
    page:pageType,
    slug?:string,
    invites?:number
}

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV


const baseParams = {
    url:baseUrl,
    image: `${baseUrl}/static/imgs/logo.jpg`,

}


export const initialStateSEO:IinitialStateSEO = {
    header:[
        {
            ...baseParams,
            page: 'root',
            title: `WhatsMyInfo`,
            description: `WhatsMyInfo.com is the easiest way to find your IP address, browser information, remote port, and more.`,
        },
        {
            ...baseParams,
            page: 'contact',
            title: `contact us`,
            description: `WhatsMyInfo.com is the easiest way to find your IP address, browser information, remote port, and more.`,
        },
        {
            ...baseParams,
            page: 'error',
            title: `Error`,
            description: `WhatsMyInfo.com is the easiest way to find your IP address, browser information, remote port, and more.`,
        },
    ]
}