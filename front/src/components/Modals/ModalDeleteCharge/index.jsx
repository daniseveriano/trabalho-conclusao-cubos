/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';

import CloseIcon from '../../../Assets/EditUser/close.svg';
import WarningIcon from '../../../Assets/Charges/warning-icon.svg';
import { DeleteCharges } from '../../../services/api';

export default function ModalDeleteCharge({ onCloseModal, charge }) {
  function close() {
    onCloseModal({ error: false, show: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await DeleteCharges(charge.id);

    onCloseModal({ show: true, error: response.error, message: response.mensagem });
  }

  return (
    <div className="background-modal-charge">

      <div className="container_modal--delete">

        <button className="close-modal--charge" type="button" onClick={close}>
          <img
            src={CloseIcon}
            alt="close icon"
          />
        </button>
        <img
          src={WarningIcon}
          alt="Warning icon"
        />
        <span className="warning-title">Tem certeza que deseja excluir esta cobrança?</span>

        <div className="buttons_container--delete">
          <form onSubmit={handleSubmit}>
            <button
              onClick={close}
              type="button"
              className="btn_modal--delete btn_cancel--del"
            >
              Não

            </button>

            <button type="submit" className="btn_modal--delete btn_send--del">Sim</button>

          </form>

        </div>

      </div>
    </div>
  );
}
