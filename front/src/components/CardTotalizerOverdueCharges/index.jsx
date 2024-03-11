import OverdueCharges from '../../Assets/Home/overdue-charges.svg';
import './styles.css';

export default function CardTotalizerOverdueCharges({ amout }) {
  return (
    <div className="container-card-totalizer " style={{ backgroundColor: '#FFEFEF' }}>
      <img className="overdue-charges" src={OverdueCharges} alt="Overdue Charges" />
      <div className="card-totalizer-info">
        <h1 className="card-totalizer-info-h1">Cobranças Vencidas</h1>
        <span className="card-totalizer-info-span">
          R$
          {' '}
          {amout ? (amout / 100).toFixed(2).replace('.', ',') : '00,00'}
        </span>
      </div>
    </div>
  );
}
