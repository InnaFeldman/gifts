import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '../../assets/react.svg'

export default function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="nav-elements">
                        <ul>
                            <li> <Link to='/'> Home</Link></li>
                            <li><Link to='/gift-cards'> Gift Cards</Link></li>
                            <li><Link to='/reports'> Reports</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}