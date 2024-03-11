/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import NonDefaulterClients from '../../Assets/Home/non-defaulter-clients.svg';
import { setLocalStorage } from '../../utils/storage';

export default function TableNonDefaultingClients({ clients, count }) {
  return (
    <div className="card-defaulting-clients">
      <div className="card-title-table-clients">
        <div className="card-icon-clients">
          <img src={NonDefaulterClients} alt="Defaulter Clients" style={{ marginRight: '15px' }} />
          <h1>Clientes Adimplentes</h1>
        </div>
        <div className="card-number" style={{ backgroundColor: '#EEF6F6', color: ' #1FA7AF' }}>{count <= 9 ? `0${count}` : count}</div>
      </div>
      <div className="card-title-head-clients">

        <strong className="table-column">Cliente</strong>
        <strong className="table-column">ID de clie.</strong>
        <strong className="table-column">CPF</strong>

      </div>

      <div className="table-boby-clients">

        {clients.map((client) => (
          <div key={client.id} className="table-row">
            <span className="table-column">{client.nome}</span>
            <span className="table-column">{client.id}</span>
            <span className="table-column">{client.cpf}</span>

          </div>
        ))}

      </div>

      <Link onClick={() => setLocalStorage('clients', 'nonDefaulters')} to="/clients" style={{ textDecorationLine: 'none', marginTop: '20px' }}>
        <span style={{ color: '#DA0175', textDecorationLine: 'underline' }}> Ver todos </span>
      </Link>

    </div>
  );
}
