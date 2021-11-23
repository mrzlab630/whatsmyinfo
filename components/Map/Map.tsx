/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-22
 * Time: 16:30
 * About:
 *
 */
import {FC} from "react"
import L from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {IMap} from './interface'
import classes from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import ProgressBar from "../ProgressBar/ProgressBar"

const Map: FC<IMap> = ({
                           latitude,
                           longitude,
                           height
}) => {

    const iconPerson = new L.Icon({
        iconUrl: '/static/svg/map-marker.svg',
        iconRetinaUrl: '/static/svg/map-marker.svg',
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
        iconSize: [40, 40],
        className: 'leafletIcon',
    })

    return <div className={classes.Map}>

        <MapContainer
            placeholder={<ProgressBar/>}
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={false}
            className={classes.MapContainer}
            style={{
                height: height ? `${height}px` : '350px'
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                icon={iconPerson}
                position={[latitude, longitude]}
            />
        </MapContainer>

    </div>
}

export default Map