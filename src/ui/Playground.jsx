import { useState, useEffect } from 'react'
import './Playground.css'

const fakeData = {
    'id': 6,
    'name': 'Bartelme Park',
    'address': '115 S. Sangamon St Chicago, IL 60602',
    'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
    'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']
}

export default function Playground({ result }) {
	console.log("result", result)
	const [data, setData] = useState({})

	useEffect(() => {
		if(!result.id) {
			setData(fakeData)
		} else {
			setData(result)
		}
	}, [])

	return (
		<div className="playground-page">
			<img className="img" src={data.img_url} />
			<div className="playground-text">
				<h1 className="">{data.name}</h1>	
				<p className="">{data.address}</p>
				<p className>Favorite </p>
				<p className>Just visited</p>
			</div>

		</div>
	)
}