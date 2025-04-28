import { useState } from 'react'

import Playground from './Playground.jsx'
import './PlaygroundList.css'

export default function PlaygroundList({ results }) {
	const [playground, setPlayground] = useState({})
	return (<div className="list">
	{results.map((result, index) => <Playground key={index} data={result} onClick={() => setPlayground(result)} />)}
	</div>)
}