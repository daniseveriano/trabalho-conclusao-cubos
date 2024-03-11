/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import ChargesIconTitle from '../../../Assets/Charges/charges-icon-title.svg';
import { registerCharges } from '../../../services/api';

export default function ModAddCharge({
  cliente,
  onSuccess,
  onCloseClick,
}) {
  const [form, setForm] = useState({
    status: true,
    descricao: '',
    data_vencimento: '',
    valor: '',
    id_cliente: cliente.id,
  });

  const [erro, setErro] = useState('');

  function onChange(evt) {
    const { value } = evt.target;
    const key = evt.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));

    setErro('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!form.descricao || !form.data_vencimento || !form.valor) {
      setErro('Este campo deve ser preenchido');
      return;
    }

    const response = await registerCharges(form, cliente.id);

    if (!response.error) {
      onSuccess();
    } else {
      setErro(response.mensagem);
    }
  }

  return (
    <div className="background-modal-charge">
      <div className="container_modal--charge">
        <div>
          <div className="header_modal--charge">
            <img src={ChargesIconTitle} alt="Charges icon" />
            <h1 className="title_modal">Cadastro de cobrança</h1>
          </div>
          <button className="close-modal--charge" type="button" onClick={onCloseClick}>
            <img src={CloseIcon} alt="close icon" />
          </button>

          <form onSubmit={handleSubmit} className="form_charge">
            <label id="name">Nome *</label>
            <input
              type="text"
              name="nome"
              onChange={onChange}
              value={cliente.nome}
              placeholder="Digite seu nome"
            />
            <label>Descrição *</label>
            <textarea
              style={{ resize: 'none' }}
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={onChange}
              placeholder="Digite a descrição"
            />

            <div className="aviso_mensagem">{(erro && !form.descricao) && <p>{erro}</p>}</div>

            <div className="section_modal--charge">
              <div className="charge_input">
                <label>Vencimento:*</label>
                <input
                  type="date"
                  name="data_vencimento"
                  value={form.data_vencimento}
                  onChange={onChange}
                  className="section_modal-input-charge"
                  placeholder="Data de Vencimento"
                />
                <div className="aviso_mensagem">{(erro && !form.data_vencimento) && <p>{erro}</p>}</div>
              </div>
              <div className="charge_input">
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
                  className="section_modal-input-charge"
                  placeholder="Digite o valor"
                />
                <div className="aviso_mensagem">{(erro && !form.valor) && <p>{erro}</p>}</div>
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
              <button onClick={onCloseClick} type="button" className="btn_modal--charge btn--cancel">Cancelar</button>
              <button type="submit" className="btn_modal--charge btn--send">Aplicar</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}
