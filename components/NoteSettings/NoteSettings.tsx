/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 16:01
 * About:
 *
 */
import React, {FC} from "react"
import {INoteSettings} from './interface'
import classes from './NoteSettings.module.scss'
import Input from "../Input"
import {IInputCallbackParams} from "../Input/interface"
import Button from "../Button";


const NoteSettings: FC<INoteSettings> = ({
                                             list,
                                             buttons,
                                             onChange,
                                             onSubmit
}) => {

    const handlgetSettings = (v:IInputCallbackParams) =>{
        if(typeof onChange !== "function"){
            return
        }
        onChange(v)
    }


    const hableClickBtn = (name:string) => () => {
      if(typeof onSubmit !== "function"){
          return
      }
        onSubmit(name)
    }


    const renderList = list.map((itm,idx) =>{

        const {label} = itm

        let nameArr = label?.split('{%input%}')
        let renderInput

        switch (Array.isArray(nameArr) && nameArr.length === 2) {

            case true:
                renderInput =  <>
                    <span>{nameArr[0]}</span>
                        <Input
                            {...itm}
                            label={''}
                            classWrap={classes.inputWrap}
                            className={classes.input}
                            callback={handlgetSettings}
                            autoFocus
                        />
                    <span>{nameArr[1]}</span>
                </>
                break

            default:
                renderInput = <Input
                    {...itm}
                    callback={handlgetSettings}
                />
        }



        return <div
            key={`renderList-${idx}`}
            className={classes.block}
        >
            {
                renderInput
            }
        </div>
    })

    const renderButtons = Array.isArray(buttons) ? buttons.map((itm,idx) =>{

        const {name} = itm || false

        return <div
            key={`renderList-${idx}`}
            className={classes.block}
        >
            <Button
                {...itm}
                callback={hableClickBtn(name)}
            />
        </div>

    }) : false


    return <div className={classes.NoteSettings}>
        <div
            className={classes.wrap}
        >
            {renderList}
        </div>
        {
            renderButtons && <div
                className={classes.wrap}
            >
                {
                    renderButtons
                }
            </div>
        }

    </div>
}

export default NoteSettings