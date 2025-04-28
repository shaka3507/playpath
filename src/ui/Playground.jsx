import './Playground.css'

export default function Playground({ data, onClick }) {
	return (
		<div className="playground">
			<img className="img" src={data.img_url} />
			<div className="text">
				<div className="playground-header">{data.name} &#x2192;</div>	
				<a className="address">{data.address}</a>
			</div>

		</div>
	)
}