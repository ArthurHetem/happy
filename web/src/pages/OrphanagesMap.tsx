import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css'

import mapMarkerimg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
        });
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerimg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span> e Região</span>
                </footer>
            </aside>

            <Map 
                center={[-23.5291447, -46.6089752]} 
                zoom={12} 
                style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;