/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 16:02
 * About:
 *
 */
import {IInputCallbackParams, InputType} from "../Input/interface";
import {ButtonSize, ButtonVariant} from "../Button/interface";


export interface INoteSettingsList{
    type:InputType,
    value?:string|number|boolean
    label:string,
    width?:string
}



export interface INoteSettingsButtons{
    name:string,
    variant?:ButtonVariant,
    size?:ButtonSize,
    disabled?:boolean,
}

export interface INoteSettings{
    list:INoteSettingsList[],
    buttons?:INoteSettingsButtons[],
    onSubmit?:(action:string)=>void
    onChange?:(v:IInputCallbackParams)=>void

}