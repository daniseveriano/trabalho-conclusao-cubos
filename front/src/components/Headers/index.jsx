import '../Modals/ModAddClient/styles.css';
import { NavLink } from 'react-router-dom';
import LineImage from '../../Assets/Clients/line-divisor-header.svg';
import './styles.css';

export function HeaderClients() {
  return (
    <header className="header">
      <h3 className="title_clients">Clientes</h3>
      <img src={LineImage} alt="divisor line" />
    </header>
  );
}

export function HeaderClientDetails() {
  return (
    <header className="header">
      <div className="title_clients clients-detail">
        <NavLink
          style={{ textDecoration: 'none', color: '#0e8750' }}
          to="/clients"
        >
          Clientes
        </NavLink>
        <div>{'>'}</div>
        <div style={{
          color: '#747488',
        }}
        >
          Detalhes do cliente
        </div>
      </div>
      <img src={LineImage} alt="divisor line" />
    </header>
  );
}

export function HeaderHome() {
  return (
    <header className="header">
      <h3 className="title_home">Resumo das cobranças</h3>
      <img src={LineImage} alt="divisor line" />
    </header>
  );
}

export function HeaderCharges() {
  return (
    <header className="header">
      <h3 className="title_charges">Cobranças</h3>
      <img src={LineImage} alt="divisor line" />
    </header>
  );
}
