/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:33
 * About:
 *
 */
import type { NextPage } from 'next'
import {IHomePage} from '../interfaceAndType/IHomePage'
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import HomePage from "../layouts/HomePage"
import SEOHead from "../components/SEOHead"
import {InfoInConsole} from "../utils"
import {useEffect} from "react"
import {GetServerSideProps} from "next"




const Home: NextPage<IHomePage> = (props) => {


    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'root').pop()

    useEffect(() => InfoInConsole(),[])



    return <>
        <SEOHead
            {...seo}
            type={'website'}
            twitter={{
                ...header,
                card:'summary_large_image',
                image:seo?.image
            }}
        />
        <HomePage
            title={`whats my info`}
            info={`<div class='subText'>
                    The Easiest Way To Find Your IP Address, Browser Information, etc.
                    <div  class='text'>
                   </div>
                   </div>`}
            {...props}
        />
    </>
}



export default Home


export const getServerSideProps:GetServerSideProps = async (context) => {

    const {req} = context || false

    const usrIp = () =>{
        //@ts-ignore
        const ipFnd = req ? String(req.headers["x-forwarded-for"] || '' ).split(",").pop() || req.connection.remoteAddress || req.socket.remoteAddress ||  req.connection.socket.remoteAddress : null
        return ipFnd ? ipFnd.split(':').pop() : undefined
    }


    const language = req.headers["accept-language"] ? req.headers["accept-language"].split(',')[0] : undefined
    const ip = usrIp()
    const userAgent = String(req.headers['user-agent'])
    const host = req.headers.host


    const props:IHomePage = {
        ip,
        userAgent,
        language,
        host
    }

    return {props}
}