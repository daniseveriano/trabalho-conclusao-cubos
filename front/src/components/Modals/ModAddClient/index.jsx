/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/order */
/* eslint-disable quotes */
import './styles.css';
import { useState } from 'react';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import ClientsIcon from '../../../Assets/AddClient/edit-client-icon.svg';
import { registerClients } from '../../../services/api';
import { getLocalStorage } from '../../../utils/storage';
import InputMask from 'react-input-mask';

export default function ModalAddClient({
  setRefreshPage, handleShowModalAddClient, setAviso, aviso,
}) {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', cep: '', complemento: '', cidade: '', cpf: '', bairro: '', logradouro: '', estado: '',
  });

  function onChange(evt) {
    const { value } = evt.target;
    const key = evt.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.nome || !form.cpf || !form.telefone) {
      setAviso({
        mensagem: 'Este campo deve ser preenchido',
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 2000);
      return;
    }

    const token = getLocalStorage('token');

    const response = await registerClients(token, form);

    if (!response.error) {
      handleShowModalAddClient();
      setRefreshPage(true);
      setAviso({
        mensagem: 'Cadastro concluído com sucesso',
        exibir: true,
      });
      setTimeout(() => setRefreshPage(false));
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 2000);
    } else {
      setAviso({
        mensagem: response.mensagem,
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
    }
    setForm({
      nome: '', email: '', telefone: '', cep: '', complemento: '', cidade: '', cpf: '', bairro: '', logradouro: '', estado: '',
    });
  }

  return (
    <div className="background-modal">
      <div className="container_modal">
        <img
          className="close-modal"
          onClick={handleShowModalAddClient}
          src={CloseIcon}
          alt="close modal icon"
        />

        <div className="header_modal">
          <img src={ClientsIcon} alt="clients icon" />
          <h1 className="title_modal">Cadastro do Cliente</h1>
        </div>

        <form onSubmit={handleSubmit} className="form_modal form--client">
          <label>Nome *</label>
          <input
            className={(aviso.exibir && aviso.mensagem === "Este campo deve ser preenchido")
              ? "input_modal input_modal--error"
              : "input_modal"}
            type="text"
            name="nome"
            value={form.nome}
            onChange={onChange}
            placeholder="Digite o nome"
          />
          <div className="aviso_mensagem">
            {(aviso.exibir && aviso.mensagem === "Este campo deve ser preenchido")
          && <p>{aviso.mensagem}</p>}

          </div>

          <label>E-mail *</label>
          <input
            className={(aviso.exibir && aviso.mensagem !== "CPF já cadastrado")
              ? "input_modal input_modal--error" : "input_modal"}
            type="text"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Digite o e-mail"
          />
          <div className="aviso_mensagem">
            {(aviso.exibir && aviso.mensagem !== "CPF já cadastrado")
          && <p>{aviso.mensagem}</p>}

          </div>
          <div className="data-clients_modal">
            <div>
              <label>CPF *</label>
              <InputMask
                mask="999.999.999-99"
                maskPlaceholder={null}
                className={(aviso.exibir && aviso.mensagem !== "E-mail já cadastrado"
                && aviso.mensagem !== "E-mail já cadastrado"
                && aviso.mensagem !== "email deve ser um email válido")
                  ? "input_modal input_modal--error" : "input_modal"}
                name="cpf"
                value={form.cpf}
                onChange={onChange}
                placeholder="Digite o CPF"
              />
              <div className="aviso_mensagem">
                {(aviso.exibir
                && aviso.mensagem !== "E-mail já cadastrado"
                && aviso.mensagem !== "email deve ser um email válido")
              && <p>{aviso.mensagem}</p>}

              </div>
            </div>
            <div>
              <label>Telefone *</label>
              <InputMask
                mask="(99) 9 9999-9999"
                maskPlaceholder={null}
                className={(aviso.exibir && aviso.mensagem === "Este campo deve ser preenchido")
                  ? "input_modal input_modal--error"
                  : "input_modal"}
                type="text"
                name="telefone"
                value={form.telefone}
                onChange={onChange}
                placeholder="Digite o telefone"
              />
              <div className="aviso_mensagem">
                {(aviso.exibir && aviso.mensagem === "Este campo deve ser preenchido")
              && <p>{aviso.mensagem}</p>}
              </div>
            </div>
          </div>

          <label>Endereço</label>
          <input
            className="input_modal input--without-error"
            type="text"
            name="logradouro"
            value={form.logradouro}
            onChange={onChange}
            placeholder="Digite o endereço"
          />

          <label>Complemento</label>
          <input
            className="input_modal input--without-error"
            type="text"
            name="complemento"
            value={form.complemento}
            onChange={onChange}
            placeholder="Digite o complemento"
          />

          <div className="data-clients_modal">
            <div>
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                maskPlaceholder={null}
                className="input_modal input--without-error"
                type="text"
                name="cep"
                value={form.cep}
                onChange={onChange}
                placeholder="Digite o CEP"
              />
            </div>
            <div>
              <label>Bairro</label>
              <input
                className="input_modal input--without-error"
                type="text"
                name="bairro"
                value={form.bairro}
                onChange={onChange}
                placeholder="Digite o bairro"
              />
            </div>
          </div>

          <div className="data-clients_modal">
            <div>
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={onChange}
                className="input_modal input--data-city"
                placeholder="Digite o cidade"
              />
            </div>
            <div>
              <label>UF</label>
              <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={onChange}
                className="input_modal input--data-uf"
                placeholder="Digite o UF"
              />
            </div>
          </div>

          <div className="buttons_container">
            <button onClick={handleShowModalAddClient} type="text" className="btn_modal btn--cancel">Cancelar</button>
            <button type="submit" className="btn_modal btn--send">Aplicar</button>
          </div>
        </form>
      </div>

    </div>
  );
}
