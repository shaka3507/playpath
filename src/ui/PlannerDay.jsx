import { useState } from 'react'

export default function PlannerDay({ day, favorites, updateItinerary }) {
    const [dayPlayground, setPlaygroundDay] = useState('')

    const selectPlayground = (playground) => {
        setPlaygroundDay(playground)
        updateItinerary('add', `${day.substring(0,6)} - ${playground.label} park: - ${playground.location}`)
    }

    const removePlayground = (playground) => {
        setPlaygroundDay('')
        updateItinerary('remove', `${day.substring(0,6)} - ${playground.label} park: - ${playground.location}`)
    }

    return (
        <div className="calendar-day">
            <h3>{day}</h3>
            {!dayPlayground  ? 
                (favorites?.map((fave, idx) => <p onClick={() => selectPlayground(fave)}key={idx} className="play-pill">+{fave.label}</p>)) 
                : <span className="play-pill selected"onClick={() => removePlayground(dayPlayground)}>-{dayPlayground.label}</span>
            }
        </div>
    )
}