import PaidCharges from '../../Assets/Home/paid-charges.svg';
import './styles.css';

export default function CardTotalizerPaidCharges({ amout }) {
  return (
    <div className="container-card-totalizer" style={{ backgroundColor: '#EEF7F7' }}>
      <img className="paid-charges" src={PaidCharges} alt="Paid Charges" style={{ width: '#31px', height: '37px' }} />
      <div className="card-totalizer-info">
        <h1 className="card-totalizer-info-h1">Cobranças Pagas</h1>
        <span className="card-totalizer-info-span">
          R$
          {' '}
          {amout ? (amout / 100).toFixed(2).replace('.', ',') : ''}
        </span>
      </div>
    </div>
  );
}
