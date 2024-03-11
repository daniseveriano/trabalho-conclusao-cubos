/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import './styles.css';
import { Link } from 'react-router-dom';
import { setLocalStorage } from '../../utils/storage';

export default function TablePaidCharge({ charges, count }) {
  return (
    <div className="card-charge-container">
      <div className="card-title-table">

        <h1>Cobranças Pagas</h1>
        <div
          className="card-number"
          style={{ backgroundColor: '#EEF6F6', color: ' #1FA7AF' }}
        >
          {count <= 9 ? `0${count}` : count}
        </div>
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
        onClick={() => setLocalStorage('charges', 'paid')}
        to="/charges"
        style={{ textDecorationLine: 'none', marginTop: '20px' }}
      >
        <span style={{ color: '#DA0175', textDecorationLine: 'underline' }}> Ver todos </span>
      </Link>

    </div>
  );
}
