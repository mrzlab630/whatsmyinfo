/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:55
 * About:
 *
 */
import {useEffect, useState, useMemo} from "react"
import dynamic from "next/dynamic"
import { IHomePage} from './interface'
import Container from "../../components/Container"
import classes from './HomePage.module.scss'
import PageMotionWrap from "../../components/PageMotionWrap"
import {Notification} from "../../components/Notification"
import {TINotificationType} from "../../components/Notification/interface"
import {NextPage} from "next"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import WhatsMyInfo from '../WhatsMyInfo'
import {IWhatsMyInfoCallbackParams} from "../WhatsMyInfo/interface"
import {ipGeoLocation} from "../../utils"
import {IMap} from "../../components/Map/interface"



const HomePage: NextPage<IHomePage> = ({
                                           title,
                                           info,
                                           ip,
                                           userAgent,
                                           language
}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isVisible,setIsVisible] = useState<boolean>(false)

    const [showAlert,setShowAlert] = useState<boolean>(false)
    const [alertType,setAlertType] = useState<TINotificationType>('success')
    const [alertMessage,setAlertMessage] = useState<string|undefined>(undefined)
    const [geo, setGeo] = useState<IMap|undefined>(undefined)
    const [isp, setIsp] = useState<string|undefined>(undefined)
    const [unixTimeNow, setUnixTimeNow] = useState<number|undefined>(undefined)



    const DynamicMapNoSSR: any = dynamic(() => import('../../components/Map') as any, {
        ssr: false,
        loading: () => <ProgressBar />,
    })

    const MemoMap = useMemo(() => <>
                {
                    geo?.longitude && geo?.latitude ? <DynamicMapNoSSR {...geo}/> : <>no map</>
                }
                </>, [geo])


    useEffect(() => {
        (async () => {
            if(!ip){
                return
            }

            setIsLoading(true)
            const {error,result} = await ipGeoLocation(process.env.NODE_ENV === 'development' ? '95.79.30.69' : ip)


            setAlertMessage(error)
            setAlertType(error ? 'error' : 'success')

            if(error){
                setShowAlert(true)
                return
            }

            const {latitude, longitude,time_zone} = result
            const {current_time_unix} = time_zone

            setIsp(result?.isp)
            setGeo({latitude, longitude})
            setUnixTimeNow(current_time_unix)

            setIsLoading(false)

           // console.log({result})
        })()
    }, [ip])

    useEffect(() =>{

        if(!showAlert){
            return
        }

        setTimeout(() => setShowAlert(prev => !prev), 3000 )

    },[showAlert])






    const handleInfo = (v:IWhatsMyInfoCallbackParams):void => {

        const {alert} = v || false

        if(!alert){
            return
        }

        setShowAlert(true)
        setAlertMessage('copied!')
        setAlertType('success')

    }







    return <>
        <Notification
            position={'top-right'}
            type={alertType}
            open={showAlert}
            message={alertMessage}
        />

            <Container
                showNewNoteButton
            >
                <div className={classes.HomePage}>
                    <div className={classes.info}>
                        <div className={classes.infoWrap}>
                        <PageMotionWrap
                                        animation={{
                                            visible: { opacity: 1, x: 0, y: 0 },
                                            hidden: { opacity: 0, x: 0, y: -50 }
                                        }}
                                        duration={.8}
                                    >
                                    <h3 className={`title`}>{title}</h3>
                        </PageMotionWrap>
                        <PageMotionWrap
                                    animation={{
                                        visible: { opacity: 1, x: 0, y: -10  },
                                        hidden: { opacity: 0, x: 0, y:10 }
                                    }}
                                    duration={1.5}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{__html: info || ''}}
                                    />

                                </PageMotionWrap>
                        </div>
                    </div>
                    <div className={classes.notepad}>

                                             <PageMotionWrap
                                                    toggle={isVisible}
                                                    duration={.8}
                                                    animation={{
                                                        visible:(height = 1000) => ({
                                                            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

                                                        }),
                                                        hidden: {
                                                            clipPath: "circle(0px at 0% 0%)",
                                                        }
                                                    }}
                                             > <div className={classes.notepadWrap}>

                                                           <WhatsMyInfo
                                                               {...{
                                                                   ip,
                                                                   userAgent,
                                                                   language
                                                               }}
                                                               callback={handleInfo}
                                                           />
                                                         <div className={classes.mapWrap}>
                                                             {
                                                                 isLoading
                                                                     ? <ProgressBar/>
                                                                     : <>{ MemoMap }</>
                                                             }
                                                         </div>
                                                         </div>
                                             </PageMotionWrap>

                    </div>
                </div>
            </Container>
        </>
}


export default HomePage