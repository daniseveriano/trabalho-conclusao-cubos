/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { setLocalStorage } from '../../utils/storage';

export default function TableOverdueCharge({ charges, count }) {
  return (
    <div className="card-charge-container">
      <div className="card-title-table">

        <h1>Cobranças Vencidas</h1>
        <div className="card-number">{count <= 9 ? `0${count}` : count}</div>
      </div>
      <div className="card-title-head">

        <strong className="table-column">Cliente</strong>
        <strong className="table-column">ID da cob.</strong>
        <strong className="table-column">Valor</strong>

      </div>

      <div className="table-boby">

        {charges.map((charge) => (
          <div key={charge.id} className="table-row">
            <span className="table-column">{charge.nome}</span>
            <span className="table-column">{charge.id}</span>
            <span className="table-column">
              R$
              {' '}
              {(charge.valor / 100).toFixed(2).replace('.', ',')}
            </span>

          </div>
        ))}

      </div>

      <Link
        onClick={() => setLocalStorage('charges', 'overdue')}
        to="/charges"
        style={{ textDecorationLine: 'none', marginTop: '20px' }}
      >
        <span style={{ color: '#DA0175', textDecorationLine: 'underline' }}> Ver todos </span>
      </Link>

    </div>
  );
}
