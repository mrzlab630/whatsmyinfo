/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-16
 * Time: 10:57
 * About:
 *
 */
import {GetServerSideProps, NextPage} from "next"
import { useRouter } from 'next/router'
import {IGetPage} from '../../interfaceAndType/IGetPage'
import {useAppSelector} from "../../redux/hooks"
import {RootState} from "../../redux/store"
import SEOHead from "../../components/SEOHead"
import PageWrap from "../../layouts/PageWrap"
import {decryptBase64} from "../../utils"
import {useEffect} from "react";




const GetPage: NextPage<IGetPage> = ({
                                   content,
                                   title,
                                   description,
                                   redirect
}) => {

    const router = useRouter()

    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'root').pop()


    useEffect(() =>{
        if(redirect){
            router.push('/404')
        }
    },[redirect])



    return <>
        <SEOHead
            {...{...seo,title,description}}
            type={'website'}
            twitter={{
                ...header,
                card:'summary_large_image',
                image:seo?.image
            }}
        />
        <PageWrap>
            <div
                className={'content'}
                dangerouslySetInnerHTML={{__html: content || ''}}
            />
        </PageWrap>

    </>
}

export default GetPage


export const getServerSideProps:GetServerSideProps = async (context) => {

    const {query,res} = context || false
    const {slug} = query || false

    const props:IGetPage = {
        content:'',
        title:'',
        description:'',
        redirect:false
    }

    switch (String(slug)) {
        case 'privacy':
            props.redirect = false
            props.title = 'Privacy Policy'
            props.description = 'Whats My Info: The Easiest Way To Find Your IP Address, Browser Information, etc.',
            props.content = 'PGRpdiBjbGFzcz0iY29udGVudCI+PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyI+PHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTogMXJlbTsgZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Qcml2YWN5IFBvbGljeTwvc3Bhbj48L2Rpdj48YnI+PGRpdj5UaGlzIFByaXZhY3kgUG9saWN5IGdvdmVybnMgdGhlIG1hbm5lciBpbiB3aGljaCA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij53aGF0c215aW5mby5jb208L3NwYW4+IGNvbGxlY3RzLCB1c2VzLCBtYWludGFpbnMsIGFuZCBkaXNjbG9zZXMgaW5mb3JtYXRpb24gY29sbGVjdGVkIGZyb20gdXNlcnMgKGVhY2gsIGEgIjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlVzZXI8L3NwYW4+Iikgb2YgdGhlIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPmh0dHBzOi8vd2hhdHNteWluZm8uY29tPC9zcGFuPiB3ZWJzaXRlICgiPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+U2l0ZTwvc3Bhbj4iKS4gVGhpcyBwcml2YWN5IHBvbGljeSBhcHBsaWVzIHRvIHRoZSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPiBhbmQgYWxsIHByb2R1Y3RzIGFuZCBzZXJ2aWNlcyBvZmZlcmVkIGJ5IDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPndoYXRzbXlpbmZvLmNvbTwvc3Bhbj4uPC9kaXY+PGRpdj48YnI+PC9kaXY+PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyAiPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlBlcnNvbmFsIGlkZW50aWZpY2F0aW9uIGluZm9ybWF0aW9uPC9zcGFuPjwvZGl2PjxkaXY+PGJyPjwvZGl2PjxkaXY+V2UgbWF5IGNvbGxlY3QgcGVyc29uYWwgaWRlbnRpZmljYXRpb24gaW5mb3JtYXRpb24gZnJvbSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2Vyczwvc3Bhbj4gaW4gYSB2YXJpZXR5IG9mIHdheXMsIGluY2x1ZGluZywgYnV0IG5vdCBsaW1pdGVkIHRvLCB3aGVuIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlVzZXJzPC9zcGFuPiB2aXNpdCBvdXIgc2l0ZSwgZmlsbCBvdXQgYSBmb3JtLCBhbmQgaW4gY29ubmVjdGlvbiB3aXRoIG90aGVyIGFjdGl2aXRpZXMsIHNlcnZpY2VzLCBmZWF0dXJlcywgb3IgcmVzb3VyY2VzIHdlIG1ha2UgYXZhaWxhYmxlIG9uIG91ciA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPi4gPGJyPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlVzZXJzPC9zcGFuPiBtYXkgdmlzaXQgb3VyIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+IGFub255bW91c2x5LiBXZSB3aWxsIGNvbGxlY3QgcGVyc29uYWwgaWRlbnRpZmljYXRpb24gaW5mb3JtYXRpb24gZnJvbSBVc2VycyA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5PTkxZPC9zcGFuPiBpZiB0aGV5IHZvbHVudGFyaWx5IHN1Ym1pdCBzdWNoIGluZm9ybWF0aW9uIHRvIHVzLiA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2Vyczwvc3Bhbj4gY2FuIGFsd2F5cyByZWZ1c2UgdG8gc3VwcGx5IHBlcnNvbmFsbHkgaWRlbnRpZmljYXRpb24gaW5mb3JtYXRpb24sIGV4Y2VwdCB0aGF0IGl0IG1heSBwcmV2ZW50IHRoZW0gZnJvbSBlbmdhZ2luZyBpbiBjZXJ0YWluIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+IHJlbGF0ZWQgYWN0aXZpdGllcy48L2Rpdj48ZGl2Pjxicj48L2Rpdj48ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7ICI+PHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+Tm9uLXBlcnNvbmFsIGlkZW50aWZpY2F0aW9uIGluZm9ybWF0aW9uPC9zcGFuPjwvZGl2PjxkaXY+PGJyPjwvZGl2PjxkaXY+V2UgbWF5IGNvbGxlY3Qgbm9uLXBlcnNvbmFsIGlkZW50aWZpY2F0aW9uIGluZm9ybWF0aW9uIGFib3V0IDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlVzZXJzPC9zcGFuPiB3aGVuZXZlciB0aGV5IGludGVyYWN0IHdpdGggb3VyIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+LiBOb24tcGVyc29uYWwgaWRlbnRpZmljYXRpb24gaW5mb3JtYXRpb24gbWF5IGluY2x1ZGUgdGhlIGJyb3dzZXIgbmFtZSwgdGhlIHR5cGUgb2YgY29tcHV0ZXIsIGFuZCB0ZWNobmljYWwgaW5mb3JtYXRpb24gYWJvdXQgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+VXNlcnM8L3NwYW4+IG1lYW5zIG9mIGNvbm5lY3Rpb24gdG8gb3VyIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+LCBzdWNoIGFzIHRoZSBvcGVyYXRpbmcgc3lzdGVtIGFuZCB0aGUgSW50ZXJuZXQgc2VydmljZSBwcm92aWRlcnMgdXRpbGl6ZWQgYW5kIG90aGVyIHNpbWlsYXIgaW5mb3JtYXRpb24uPC9kaXY+PGRpdj48YnI+PC9kaXY+PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyAiPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPldlYiBicm93c2VyIGNvb2tpZXM8L3NwYW4+PC9kaXY+PGRpdj48YnI+PC9kaXY+PGRpdj5PdXIgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+U2l0ZTwvc3Bhbj4gbWF5IHVzZSAiY29va2llcyIgdG8gZW5oYW5jZSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2VyPC9zcGFuPiBleHBlcmllbmNlLiA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2VyJ3M8L3NwYW4+IHdlYiBicm93c2VyIHBsYWNlcyBjb29raWVzIG9uIHRoZWlyIGhhcmQgZHJpdmUgZm9yIHJlY29yZC1rZWVwaW5nIHB1cnBvc2VzIGFuZCBzb21ldGltZXMgdG8gdHJhY2sgaW5mb3JtYXRpb24gYWJvdXQgdGhlbS4gPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+VXNlcjwvc3Bhbj4gbWF5IGNob29zZSB0byBzZXQgdGhlaXIgd2ViIGJyb3dzZXIgdG8gcmVmdXNlIGNvb2tpZXMsIG9yIHRvIGFsZXJ0IHlvdSB3aGVuIGNvb2tpZXMgYXJlIGJlaW5nIHNlbnQuIElmIHRoZXkgZG8gc28sIG5vdGUgdGhhdCBzb21lIHBhcnRzIG9mIHRoZSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPiBtYXkgbm90IGZ1bmN0aW9uIHByb3Blcmx5LjwvZGl2PjxkaXY+PGJyPjwvZGl2PjxkaXYgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsgIj48c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Ib3cgd2UgdXNlIGNvbGxlY3RlZCBpbmZvcm1hdGlvbjwvc3Bhbj48L2Rpdj48ZGl2Pjxicj48L2Rpdj48ZGl2PjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPndoYXRzbXlpbmZvLmNvbTwvc3Bhbj4gbWF5IGNvbGxlY3QgYW5kIHVzZSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2Vyczwvc3Bhbj4gcGVyc29uYWwgaW5mb3JtYXRpb24gZm9yIHRoZSBmb2xsb3dpbmcgcHVycG9zZXM6PC9kaXY+PGRpdj4tIFRvIGltcHJvdmUgY3VzdG9tZXIgc2VydmljZTwvZGl2PjxkaXY+VGhlIGluZm9ybWF0aW9uIHlvdSBwcm92aWRlIGhlbHBzIHVzIHJlc3BvbmQgdG8geW91ciBjdXN0b21lciBzZXJ2aWNlIHJlcXVlc3RzIGFuZCBzdXBwb3J0IG5lZWRzIG1vcmUgZWZmaWNpZW50bHkuPC9kaXY+PGRpdj4tIFRvIHBlcnNvbmFsaXplIHVzZXIgZXhwZXJpZW5jZTwvZGl2PjxkaXY+V2UgbWF5IHVzZSBpbmZvcm1hdGlvbiBpbiB0aGUgYWdncmVnYXRlIHRvIHVuZGVyc3RhbmQgaG93IG91ciA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2Vyczwvc3Bhbj4gYXMgYSBncm91cCB1c2UgdGhlIHNlcnZpY2VzIGFuZCByZXNvdXJjZXMgcHJvdmlkZWQgb24gb3VyIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+LjwvZGl2PjxkaXY+LSBUbyBpbXByb3ZlIG91ciA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPjwvZGl2PjxkaXY+V2UgbWF5IHVzZSB0aGUgZmVlZGJhY2sgeW91IHByb3ZpZGUgdG8gaW1wcm92ZSBvdXIgcHJvZHVjdHMgYW5kIHNlcnZpY2VzLjwvZGl2PjxkaXY+PGJyPjwvZGl2PjxkaXYgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsgIj48c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Ib3cgd2UgcHJvdGVjdCB5b3VyIGluZm9ybWF0aW9uPC9zcGFuPjwvZGl2PjxkaXYgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsgIj48YnI+PC9kaXY+PGRpdj5XZSBhZG9wdCBhcHByb3ByaWF0ZSBkYXRhIGNvbGxlY3Rpb24sIHN0b3JhZ2UsIGFuZCBwcm9jZXNzaW5nIHByYWN0aWNlcyBhbmQgc2VjdXJpdHkgbWVhc3VyZXMgdG8gcHJvdGVjdCBhZ2FpbnN0IHVuYXV0aG9yaXplZCBhY2Nlc3MsIGFsdGVyYXRpb24sIGRpc2Nsb3N1cmUsIG9yIGRlc3RydWN0aW9uIG9mIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24sIHVzZXJuYW1lLCBwYXNzd29yZCwgdHJhbnNhY3Rpb24gaW5mb3JtYXRpb24sIGFuZCBkYXRhIHN0b3JlZCBvbiBvdXIgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+U2l0ZTwvc3Bhbj4uPC9kaXY+PGRpdj48YnI+PC9kaXY+PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyAiPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNoYXJpbmcgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbjwvc3Bhbj48L2Rpdj48ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7ICI+PGJyPjwvZGl2PjxkaXY+V2UgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+RE8gTk9UIDwvc3Bhbj5zZWxsLCB0cmFkZSwgb3IgcmVudCA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Vc2Vyczwvc3Bhbj4gcGVyc29uYWwgaWRlbnRpZmljYXRpb24gaW5mb3JtYXRpb24gdG8gb3RoZXJzLiBXZSBtYXkgc2hhcmUgZ2VuZXJpYyBhZ2dyZWdhdGVkIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIG5vdCBsaW5rZWQgdG8gYW55IHBlcnNvbmFsIGlkZW50aWZpY2F0aW9uIGluZm9ybWF0aW9uIHJlZ2FyZGluZyB2aXNpdG9ycyBhbmQgdXNlcnMgd2l0aCBvdXIgYnVzaW5lc3MgcGFydG5lcnMsIHRydXN0ZWQgYWZmaWxpYXRlcywgYW5kIGFkdmVydGlzZXJzIGZvciB0aGUgcHVycG9zZXMgb3V0bGluZWQgYWJvdmUuPC9kaXY+PGRpdj48YnI+PC9kaXY+PGRpdiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyAiPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPkNoYW5nZXMgdG8gdGhpcyBwcml2YWN5IHBvbGljeTwvc3Bhbj48L2Rpdj48ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7ICI+PGJyPjwvZGl2PjxkaXY+PHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+d2hhdHNteWluZm8uY29tPC9zcGFuPiBoYXMgdGhlIGRpc2NyZXRpb24gdG8gdXBkYXRlIHRoaXMgcHJpdmFjeSBwb2xpY3kgYXQgYW55IHRpbWUuIFdoZW4gd2UgZG8sIHdlIHdpbGwgcG9zdCBhIG5vdGlmaWNhdGlvbiBvbiB0aGUgbWFpbiBwYWdlIG9mIG91ciA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPi4gV2UgZW5jb3VyYWdlIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlVzZXJzPC9zcGFuPiB0byBmcmVxdWVudGx5IGNoZWNrIHRoaXMgcGFnZSBmb3IgYW55IGNoYW5nZXMgdG8gc3RheSBpbmZvcm1lZCBhYm91dCBob3cgd2UgYXJlIGhlbHBpbmcgdG8gcHJvdGVjdCB0aGUgcGVyc29uYWwgaW5mb3JtYXRpb24gd2UgY29sbGVjdC4gWW91IGFja25vd2xlZGdlIGFuZCBhZ3JlZSB0aGF0IGl0IGlzIHlvdXIgcmVzcG9uc2liaWxpdHkgdG8gcmV2aWV3IHRoaXMgcHJpdmFjeSBwb2xpY3kgcGVyaW9kaWNhbGx5IGFuZCBiZWNvbWUgYXdhcmUgb2YgbW9kaWZpY2F0aW9ucy48L2Rpdj48ZGl2Pjxicj48L2Rpdj48ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7ICI+PHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OiBib2xkOyI+WW91ciBhY2NlcHRhbmNlIG9mIHRoZXNlIHRlcm1zPC9zcGFuPjwvZGl2PjxkaXYgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsgIj48YnI+PC9kaXY+PGRpdj5CeSB1c2luZyB0aGlzIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPlNpdGU8L3NwYW4+LCB5b3Ugc2lnbmlmeSB5b3VyIGFjY2VwdGFuY2Ugb2YgdGhpcyBwb2xpY3kuIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gdGhpcyBwb2xpY3ksIHBsZWFzZSBkbyBub3QgdXNlIG91ciA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPi4gWW91ciBjb250aW51ZWQgdXNlIG9mIHRoZSA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5TaXRlPC9zcGFuPiBmb2xsb3dpbmcgdGhlIHBvc3Rpbmcgb2YgY2hhbmdlcyB0byB0aGlzIHBvbGljeSB3aWxsIGJlIGRlZW1lZCB5b3VyIGFjY2VwdGFuY2Ugb2YgdGhvc2UgY2hhbmdlcy48L2Rpdj48L2Rpdj4='
            break

        default:
            res.statusCode = 404
            props.redirect = true
    }

    props.content = props.content ? decryptBase64(props.content) : ''


    return {props}
}