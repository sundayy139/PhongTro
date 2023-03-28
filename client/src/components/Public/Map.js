import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import icons from '../../utils/icons'
import { memo } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const { MdLocationOn } = icons

const AnyReactComponent = ({ icon }) => (
    <div>{icon}</div>
)

const Map = ({ address }) => {
    const [coords, setCoords] = useState(null)
    const [addressFinal, setAddressFinal] = useState(null)

    useEffect(() => {
        setAddressFinal(address)
    }, [address])

    const getCoords = async (addressPost) => {
        const results = await geocodeByAddress(addressPost)
        const latlng = await getLatLng(results[0])
        setCoords({ lat: latlng.lat, lng: latlng.lng })
    }

    useEffect(() => {
        if (addressFinal) {
            getCoords(addressFinal)
        } else {
            navigator.geolocation.getCurrentPosition((e) => {
                setCoords({ lat: e.coords.latitude, lng: e.coords.longitude })
            })
        }
    }, [addressFinal, address])

    return (
        <div className='w-full h-full relative'>
            {
                address && (
                    <div className='absolute p-4 max-w-[200px] bg-white left-[10px] top-[10px] z-30 text-sm shadow-md'>
                        {address}
                    </div>
                )
            }
            {
                coords && Object.keys(coords).length > 0 && (
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_API_MAP_KEY }}
                        defaultCenter={coords}
                        defaultZoom={15}
                        center={coords}
                    >
                        <AnyReactComponent
                            lat={coords?.lat}
                            lng={coords?.lng}
                            icon={<MdLocationOn size={30} color='red' />}
                            text={address}
                        />
                    </GoogleMapReact>
                )
            }
        </div>
    )
}

export default memo(Map)