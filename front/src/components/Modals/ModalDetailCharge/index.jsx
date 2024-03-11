/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import ChargesIconTitle from '../../../Assets/Charges/charges-icon-title.svg';
import { GetStatus } from '../../TableCharges';
import { dateISOtoDDMMYYYY } from '../../../utils/date';

export default function ModalDetailCharge({ charge, showModal }) {
  return (
    <div className="background-modal-charge">

      <div className="container_modal--detail">

        <div className="header_modal--charge">
          <img src={ChargesIconTitle} alt="Charges icon" />
          <h1 className="title_modal_detail">Detalhe de cobrança</h1>
        </div>

        <button type="button" onClick={() => showModal(false)}>
          <img
            className="close-modal--charge"
            src={CloseIcon}
            alt="close icon"
          />
        </button>

        <section className="section_detail--top">

          <h4>Nome</h4>
          <span>{charge.nome}</span>

          <h4>Descrição</h4>
          <div className="detail_description">
            <span>{charge.descricao}</span>

          </div>

        </section>
        <section className="section_detail--bottom">
          <div className="detail_bottom--left">
            <h4>Vencimento</h4>
            <span>{dateISOtoDDMMYYYY(charge.data_vencimento)}</span>

            <h4>ID cobranças</h4>
            <span>{charge.id}</span>
          </div>

          <div>
            <h4>Valor</h4>
            <span>{`R$ ${(charge.valor / 100).toFixed(2).replace('.', ',')}`}</span>

            <h4>Status</h4>
            <GetStatus charge={charge} />
          </div>
        </section>

      </div>
    </div>
  );
}
