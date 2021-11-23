/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-17
 * Time: 12:45
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {IuserDisplay, IWhatsMyInfo,Iuserbrowser,IrenderBlock} from './interface'
import classes from './WhatsMyInfo.module.scss'
import UAParser from 'ua-parser-js'
import {copyToClipboard} from '../../utils'


import MapMarkerSvg from '../../assets/svg/map-marker.svg'
import GlobeSvg from '../../assets/svg/globe.svg'

import AppleSvg from '../../assets/svg/apple.svg'
import WindowsSvg from '../../assets/svg/windows.svg'
import LinuxSvg from '../../assets/svg/linux.svg'
import UbuntuSvg from '../../assets/svg/ubuntu.svg'
import SuseSvg from '../../assets/svg/suse.svg'
import RedhatSvg from '../../assets/svg/redhat.svg'
import FedoraSvg from '../../assets/svg/fedora.svg'
import CentosSvg from '../../assets/svg/centos.svg'
import AndroidSvg from '../../assets/svg/android.svg'

import ChromeSvg from '../../assets/svg/chrome.svg'
import EdgeSvg from '../../assets/svg/edge.svg'
import FirefoxSvg from '../../assets/svg/firefox.svg'
import IESvg from '../../assets/svg/internet-explorer.svg'
import OperaSvg from '../../assets/svg/opera.svg'
import BrowserSvg from '../../assets/svg/browser.svg'

import PaletteSvg from '../../assets/svg/palette.svg'
import ArrowsSvg from '../../assets/svg/arrows.svg'
import Tooltip from "../../components/Tooltip"
import Button from "../../components/Button";




const WhatsMyInfo: FC<IWhatsMyInfo> = ({
                                           ip,
                                           userAgent,
                                           language,
                                           callback
                                       }) => {

    const [userDisplay,setUserDisplay] = useState<IuserDisplay|undefined>(undefined)
    const [userbrowser, setUserBrowser] = useState<Iuserbrowser|undefined>(undefined)
    const [userOs, setUserOs] = useState<Iuserbrowser|undefined>(undefined)


    useEffect(() =>{
        if(!userAgent){
            return
        }

        const parser = new UAParser()
        parser.setUA(userAgent)

        const {os,browser} = parser.getResult() || undefined

        const {name:browserName,version:browserVer} = browser || undefined

            setUserBrowser({
                name:browserName,
                version:browserVer,
            })


        const {name:osName,version:osVer} = os || undefined


        setUserOs({
            name:osName,
            version:osVer,
        })


    },[userAgent])

    useEffect(() =>{

        if(typeof window === 'undefined'){
            return
        }


        const {screen} = window
        const {width,height,pixelDepth,orientation} = screen

        setUserDisplay({
            width,
            height,
            pixelDepth,
            orientation:orientation?.type
        })


    },[])


    const handleClickCopyIp = () => {
        copyToClipboard(ip || '')

       if(typeof callback !== "function"){
           return
       }
        callback({
            alert:'copied!'
        })
    }

    const renderOsIcon = () =>{
        switch (userOs?.name ? userOs.name.toLowerCase() : 'default') {

            case 'windows':
            case 'windows phone':
                return WindowsSvg

            case 'ios':
            case 'mac os':
                return AppleSvg

            case 'android':
                return AndroidSvg

            case 'ubuntu':
                return UbuntuSvg

            case 'suse':
                return SuseSvg

            case 'redhat':
                return RedhatSvg
            case 'fedora':
                return FedoraSvg

            case 'centos':
                return CentosSvg


            default:
                return LinuxSvg
        }
    }

    const renderBrowserIcon = () =>{
        switch (userbrowser?.name ? userbrowser.name.toLowerCase() : 'default') {

            case 'chrome':
                return ChromeSvg

            case 'ie':
                return IESvg

            case 'fire':
                return FirefoxSvg

            case 'edge':
                return EdgeSvg

            case 'opera':
                return OperaSvg

            default:
                return BrowserSvg

        }
    }

    const renderBlock:IrenderBlock = arr => arr.map((itm,idx) => {

        const {Icon,title,tooltip} = itm

     return <div id={`renderInfo-${idx}-${Date.now()}`} className={classes.item}>
            <Icon className={classes.icon}/>
            <Tooltip
                title={tooltip}
            >
                <span>{title}</span>
            </Tooltip>
        </div>
    })


    const renderBlockOne = renderBlock([
        {
            tooltip:'browser',
            title:<><span>{userbrowser?.name}</span> <span>{userbrowser?.version}</span></>,
            Icon:renderBrowserIcon()
        },
        {
            tooltip:'resolution',
            title:<span>{userDisplay?.width || 0} / {userDisplay?.height || 0} pixels</span>,
            Icon:ArrowsSvg
        },
    ])

    const renderBlockTwo = renderBlock([
        {
            tooltip:'operating system',
            title:<><span>{userOs?.name}</span> <span>{userOs?.version}</span></>,
            Icon:renderOsIcon()
        },
        {
            tooltip:'color',
            title:<span>{language}</span>,
            Icon:GlobeSvg
        },
        {
            tooltip:'color',
            title:<span>{userDisplay?.pixelDepth} bit</span>,
            Icon:PaletteSvg
        },
    ])




    return <div className={classes.WhatsMyInfo}>

        <div  className={classes.row}>
            <div className={classes.col}>

                <div className={classes.item}>
                    <MapMarkerSvg className={classes.icon}/>

                    <Button
                        callback={handleClickCopyIp}
                        variant={'text'}
                        size={'large'}
                    >
                        <Tooltip
                            title={'IP Address'}
                        >
                        <span><span className={classes.ip}>{ip}</span></span>
                        </Tooltip>
                    </Button>


                </div>
                {
                    renderBlockOne
                }
            </div>
            <div className={classes.col}>
                {
                    renderBlockTwo
                }
            </div>

        </div>

    </div>


}

export default WhatsMyInfo