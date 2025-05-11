import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import PlannerDay from './PlannerDay.jsx'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'

import "./Planner.css";


export default function Planner() {
    const [favorites, setFavorites] = useState([])
    const [itinerary, setItinerary] = useState([])

    const updateItinerary = (itineraryAction, itineraryLabel) => {
        if(itineraryAction === 'add') {
            setItinerary([...itinerary, itineraryLabel])
        } else if (itineraryAction === 'remove') {
            setItinerary(itinerary.filter(day => day != itineraryLabel))
        }
    }

    useEffect(() => {
        const favoriteData = getLocalStorageItem('favorites')
        setFavorites(favoriteData)
    }, [])

    const SEVEN_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return (
        <div className="main container">
            <Nav active="planner" />
            <h1>Seven Day Planner</h1>
            <h2>Plan a week based on your saved favorites</h2>
            <div className="calendar">
                {favorites?.length && SEVEN_DAYS.map(day => <PlannerDay key={day} day={day} favorites={favorites} updateItinerary={updateItinerary} />)}
                {!favorites && <div> add to your favorites first before adding to your weekly itinerary - <Link to="/">go back to search</Link></div>}
            </div>
            {!!itinerary.length && <div className="share-container"><a href={`mailto:&?subject=Look%20What%20I%20Planned%20&body=${itinerary.join('%0D%0A').replace(' ', '%20').toUpperCase()}`} className="share-btn">Share itinerary</a></div>}
        </div>
    )
}