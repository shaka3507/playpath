import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Playground from './Playground.jsx'
import './PlaygroundList.css'

const fakeData = [
     {
     'id': 1,
       'name': 'Other Parks',
       'address': '2701 E. 74th St. Chicago, IL 60649',
       'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']
 
     },
     {
     	'id': 2,
       'name': 'Bartelme Park',
       'address': '115 S. Sangamon St Chicago, IL 60602',
       'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

     },
     {
     	'id': 3,
       'name': 'Other Park',
       'address': '2701 E. 74th St. Chicago, IL 60649',
       'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']

     },
     {
     	'id': 4,
       'name': 'Bartelme Park',
       'address': '115 S. Sangamon St Chicago, IL 60602',
       'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

     },
     {
     	'id': 5,
       'name': 'Arthur Ashe Park',
       'address': '2701 E. 74th St. Chicago, IL 60649',
       'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']

     },
     {
     	'id': 6,
       'name': 'Bartelme Park',
       'address': '115 S. Sangamon St Chicago, IL 60602',
       'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
       'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

     }
]

export default function PlaygroundList() {
	const [playground, setPlayground] = useState({})
	const [playgrounds, setPlaygrounds] = useState(fakeData)
	const [filterPlaygrounds, setFilterPlaygrounds] = useState([])
	const [filterResponse, setFilterResponse] = useState(false)

	useEffect(() => {
			const searchParams = window.location.search
			const filterZipcode = searchParams.substring(3)

			for(let i = 0; i < playgrounds.length; i++) {
				if(playgrounds[i].address.includes(filterZipcode)) {
					setFilterPlaygrounds([...filterPlaygrounds, playgrounds[i]])
				}
			}
	}, [])


	return (
		<div className="list">
		{filterPlaygrounds.map((result, index) => {
				return (

				<Link to={`/play/${result.id}`} key={index}>
					<Playground result={result} />
				</Link>
				)
		})}

		</div>
	)

}