import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    const [openMenu, setOpenMenu] = useState(false)
    const open = (
        <span>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/play">Play</Link></p>
            <p><Link to="/about">About</Link></p>
            <p>&#94;</p>
        </span>
    )
    const closed = <span>Menu</span>
    return (
        <nav className="nav" onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(!openMenu)}
        }>
            {openMenu ? open: closed}
        </nav>
    )
}