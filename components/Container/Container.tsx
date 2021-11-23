/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 12:06
 * About:
 *
 */
import {FC, useState} from "react"
import {IContainer} from './interface'
import classes from './Container.module.scss'
import CodeSvg from '../../assets/svg/code.svg'
import MapMarkerSvg from '../../assets/svg/map-marker.svg'

import Button from "../Button"
import Router from "next/router"
import Link from 'next/link'



const Container: FC<IContainer> = ({
                                       children,
                                       header,
                                       footer,
                                       showNewNoteButton,

}) => {

    const handleClickNewNote = () => Router.push('/')
    const [menuBottom,setMenuBottom] = useState<any[]>([
        {
        lable:'privacy',
        url:'/p/privacy'
        },
        {
            lable:'contact us',
            url:'/contact'
        }
    ])



    const renderMenuBottom = Array.isArray(menuBottom) ? menuBottom.map((itm,idx) =>{

        const {lable,url} = itm || false

        return <li key={`renderMenuBottom-${idx}`}>
                <Link href={url}>
                    <a className={'link'}>&nbsp;{lable}</a>
                </Link>
               </li>

    }) : undefined



    return <div className={classes.Container}>
        <header  className={classes.header}>
            <div
            className={classes.headerWrap}
            >
                <div
                    className={classes.block}
                >
                    {header}
                </div>
            </div>
        </header>

        <main className={classes.main}>
            {children}
        </main>
                 <footer className={classes.footer}>
                <div
                    className={classes.footerWrap}
                >
                    <div
                        className={classes.block}
                    >
                        <div
                            className={classes.blockWrap}
                        >
                            {
                                showNewNoteButton &&  <Button
                                                            variant={'outlined'}
                                                            callback={handleClickNewNote}
                                                        >
                                                            <MapMarkerSvg className={`logo ${classes.logo}`} />
                                                            <span className={classes.btnNewNoteTxt}>WhatsMyInfo</span>
                                                        </Button>
                            }
                            <div
                                className={classes.footerContent}
                            >
                                {
                                    renderMenuBottom && <ul className={classes.menuBottom}>{renderMenuBottom}</ul>
                                }
                            </div>
                            <div className={classes.footerAuth}>by mrZLab630 &copy; {new Date().getFullYear()}</div>
                        </div>
                    </div>
                </div>
            </footer>

    </div>
}

export default Container