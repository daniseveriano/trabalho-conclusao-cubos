/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import InputMask from 'react-input-mask';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import SuccessImage from '../../../Assets/EditUser/success-edit-user.svg';
import ChargesIconTitle from '../../../Assets/Charges/charges-icon-title.svg';
import { updateCharge } from '../../../services/api';
import { dateISOtoDDMMYYYY } from '../../../utils/date';

export default function ModEditCharge({
  handleShowModalEditCharge,
  charge,
  setRefreshPage,
  setAviso,
  aviso,
  setShowSucessAddCharge,
}) {
  const [form, setForm] = useState({
    status: charge.status,
    descricao: charge.descricao,
    data_vencimento: dateISOtoDDMMYYYY(charge.data_vencimento),
    valor: (charge.valor / 100).toFixed(2).replace('.', ','),
  });

  const [showSucessAddCharge] = useState(false);

  function onChange(evt) {
    const { value } = evt.target;
    const key = evt.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));
    setAviso('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAviso('');

    if (!form.descricao || !form.data_vencimento || !form.valor) {
      setAviso({
        mensagem: 'Este campo deve ser preenchido',
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 2000);
      return;
    }

    const response = await updateCharge(form, charge.id);

    if (!response.error) {
      handleShowModalEditCharge();
      setRefreshPage(true);
      setTimeout(() => {
        setShowSucessAddCharge(true);
      }, 1000);
      setTimeout(() => setRefreshPage(false));
    } else {
      setAviso({
        mensagem: response.mensagem,
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
    }
  }

  return (
    <div className="background-modal-charge">
      {!showSucessAddCharge && (
        <div className="container_modal--charge">
          <div className="header_modal--charge" style={{ marginBottom: '20px' }}>
            <img src={ChargesIconTitle} alt="Charges icon" />
            <h1 className="title_modal">Edição de cobrança</h1>
          </div>
          <button className="close-modal" type="button" onClick={handleShowModalEditCharge}>
            <img src={CloseIcon} alt="close icon" />
          </button>

          <form onSubmit={handleSubmit}>
            <label id="name">Nome*</label>
            <input
              type="text"
              name="nome"
              value={charge.nome}
              onChange={onChange}
              placeholder="Digite seu nome"
            />
            <label>Descrição*</label>
            <textarea
              style={{ resize: 'none' }}
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={onChange}
              placeholder="Digite a descrição"
              className={
                !form.descricao
                  && aviso.exibir
                  && aviso.mensagem === 'Este campo deve ser preenchido'
                  ? 'empty_textarea'
                  : null
              }
            />

            <div className="aviso_mensagem">
              {!form.descricao ? aviso.exibir && aviso.mensagem : null}
            </div>

            <div className="section_values">
              <div style={{ position: 'relative', width: '100%' }}>
                <label>Vencimento:*</label>
                <InputMask
                  mask="99/99/9999"
                  maskPlaceholder={null}
                  name="data_vencimento"
                  value={form.data_vencimento}
                  onChange={onChange}
                  placeholder="Data de Vencimento"
                  className={
                    !form.data_vencimento
                      && aviso.exibir
                      && aviso.mensagem === 'Este campo deve ser preenchido'
                      ? 'empty_input'
                      : 'value-charge'
                  }
                  style={{ width: '100%', height: '44px' }}
                />
                <div className="aviso_input">
                  {!form.data_vencimento
                    ? aviso.exibir && aviso.mensagem
                    : null}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <label>Valor:*</label>
                <NumericFormat
                  allowedDecimalSeparators={[',']}
                  decimalSeparator=","
                  prefix="R$"
                  name="valor"
                  value={form.valor}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    setForm((prev) => ({ ...prev, valor: floatValue }));
                  }}
                  placeholder="Digite o valor"
                  className={
                    (!form.valor
                      && aviso.exibir
                      && aviso.mensagem === 'Este campo deve ser preenchido')
                      || (!form.valor
                        && aviso.exibir
                        && aviso.mensagem === 'valor é um campo obrigatório')
                      ? 'empty_input'
                      : 'value-charge'
                  }
                  style={{ height: '44px' }}
                />
                <div className="aviso_input">
                  {!form.valor ? aviso.exibir && aviso.mensagem : null}
                </div>
              </div>
            </div>

            <div className="option">
              <label>Status*</label>
              <div className="option-radio">
                <input
                  id="paga"
                  type="radio"
                  value
                  checked
                  name="status"
                  onChange={onChange}
                />
                <label htmlFor="paga">Cobrança Paga</label>
              </div>

              <div className="option-radio">
                <input
                  id="pendente"
                  type="radio"
                  value={false}
                  name="status"
                  onChange={onChange}
                />

                <label htmlFor="pendente">Cobrança Pendente</label>
              </div>
            </div>

            <div className="buttons_container--charge">
              <button
                onClick={handleShowModalEditCharge}
                type="button"
                className="btn_modal btn--cancel"
              >
                Cancelar
              </button>
              <button type="submit" className="btn_modal btn--send">
                Aplicar
              </button>
            </div>
          </form>
        </div>
      )}
      {showSucessAddCharge && (
        <img
          className="success-edit--user"
          src={SuccessImage}
          alt="sucess edit user"
        />
      )}
    </div>
  );
}
