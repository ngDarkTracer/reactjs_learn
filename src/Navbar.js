import './Navbar.css'
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <ul>
                <li><Link to="/Done">Done</Link></li>
                <li><Link to="/NotDone">Not done</Link></li>
            </ul>
        </div>
    )
}

export default Navbar