/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-17
 * Time: 12:45
 * About:
 *
 */
import {ReactNode} from "react";


export interface Iuserbrowser{
    name?:string,
    version?:string,
}

export interface IuserDisplay {
    width?:number,
    height?:number,
    pixelDepth?:number,
    orientation?:string
}

export interface IWhatsMyInfoCallbackParams{
    alert?:string
}

export interface IWhatsMyInfo{
    ip?:string,
    userAgent?:string,
    language?:string,
    callback?:(v:IWhatsMyInfoCallbackParams)=>void
}


export interface IrenderBlockParams{
    tooltip:string,
    title:ReactNode,
    Icon:Function

}


export interface IrenderBlock{
    (arr:IrenderBlockParams[]):any
}