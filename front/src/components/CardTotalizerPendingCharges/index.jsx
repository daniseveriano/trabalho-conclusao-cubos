import PendingCharges from '../../Assets/Home/pending-charges.svg';
import './styles.css';

export default function CardTotalizerPendingCharges({ amout }) {
  return (
    <div className="container-card-totalizer" style={{ backgroundColor: '#FCF6DC' }}>
      <img className="pending-charges" src={PendingCharges} alt="Pending Charges" />
      <div className="card-totalizer-info">
        <h1 className="card-totalizer-info-h1">Cobranças Previstas</h1>
        <span className="card-totalizer-info-span">
          R$
          {' '}
          {amout ? (amout / 100).toFixed(2).replace('.', ',') : ''}

        </span>

      </div>
    </div>
  );
}
