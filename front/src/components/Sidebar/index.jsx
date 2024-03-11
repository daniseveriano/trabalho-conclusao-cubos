/* eslint-disable react/self-closing-comp */
import './styles.css';
import { Link } from 'react-router-dom';
import HomeIcon from '../../Assets/Sidebar/home-icon.svg';
import ClientsIconSelected from '../../Assets/Sidebar/clients-icon-selected.svg';
import HomeIconSelected from '../../Assets/Sidebar/home-icon-selected.svg';
import ChargesIconSelected from '../../Assets/Sidebar/charges-icon-selected.svg';
import ClientsIcon from '../../Assets/Sidebar/clients-icon.svg';
import ChargesIcon from '../../Assets/Sidebar/charges-icon.svg';

export function SidebarHome() {
  return (
    <aside className="sidebar--home">
      <Link to="/home">
        <img src={HomeIconSelected} alt="home" />
        <div className="icon-selected"></div>
      </Link>
      <Link to="/clients">
        <img src={ClientsIcon} alt="clients" />
      </Link>
      <Link to="/charges">
        <img src={ChargesIcon} alt="charges" />
      </Link>
    </aside>
  );
}

export function SidebarClients() {
  return (
    <aside className="sidebar">
      <Link to="/home">
        <img src={HomeIcon} alt="home" />
      </Link>
      <Link to="/clients">
        <img src={ClientsIconSelected} alt="clients" />
        <div className="icon-selected"></div>
      </Link>
      <Link to="/charges">
        <img src={ChargesIcon} alt="charges" />
      </Link>
    </aside>
  );
}
export function SidebarCharges() {
  return (
    <aside className="sidebar">
      <Link to="/home">
        <img src={HomeIcon} alt="home" />
      </Link>
      <Link to="/clients">
        <img src={ClientsIcon} alt="clients" />
      </Link>
      <Link to="/charges">
        <img src={ChargesIconSelected} alt="charges" />
        <div className="icon-selected"></div>
      </Link>
    </aside>
  );
}
