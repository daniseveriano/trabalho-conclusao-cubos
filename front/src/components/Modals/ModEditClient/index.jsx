/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/order */
/* eslint-disable quotes */
import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import ClientsIcon from '../../../Assets/AddClient/edit-client-icon.svg';
import { getClient, editClient } from '../../../services/api';
import { getLocalStorage } from '../../../utils/storage';
import InputMask from 'react-input-mask';

export default function ModalEditClient({
  setRefreshPage,
  handleShowModalAddClient,
  setAviso,
  aviso,
}) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    complemento: '',
    cidade: '',
    cpf: '',
    bairro: '',
    logradouro: '',
    estado: '',
  });

  const navigate = useNavigate();

  function onChange(evt) {
    const { value } = evt.target;
    const key = evt.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  }

  async function loadClient() {
    const token = getLocalStorage('token');
    const clientId = getLocalStorage('clientId');
    const response = await getClient(token, clientId);

    if (!response.error) {
      setForm({
        nome: response.nome,
        email: response.email,
        telefone: response.telefone,
        cep: response.cep,
        complemento: response.complemento,
        cidade: response.cidade,
        cpf: response.cpf,
        bairro: response.bairro,
        logradouro: response.logradouro,
        estado: response.estado,
      });
    } else {
      setAviso({
        mensagem: response.mensagem,
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.nome || !form.cpf || !form.telefone) {
      setAviso({
        mensagem: 'Este campo deve ser preenchido',
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
      return;
    }

    const token = getLocalStorage('token');
    const clientId = getLocalStorage('clientId');
    const response = await editClient(token, form, clientId);

    if (!response.error) {
      handleShowModalAddClient();
      setRefreshPage(true);
      setAviso({
        mensagem: 'Cadastro concluído com sucesso',
        exibir: true,
      });
      navigate('/clients');
      setTimeout(() => setRefreshPage(false));
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 2000);
    } else {
      setAviso({
        mensagem: response.mensagem,
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
    }
  }

  useEffect(() => {
    loadClient();
  }, []);

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
          <h1 className="title_modal">Editar Cliente</h1>
        </div>

        <form onSubmit={handleSubmit} className="form_modal form--client">
          <label>Nome *</label>
          <input
            className={
              aviso.exibir
              && aviso.mensagem === 'Este campo deve ser preenchido'
                ? 'input_modal input_modal--error'
                : 'input_modal'
            }
            type="text"
            name="nome"
            defaultValue={form.nome}
            onChange={onChange}
            placeholder="Digite o nome"
          />
          <div className="aviso_mensagem">
            {aviso.exibir
              && aviso.mensagem === 'Este campo deve ser preenchido' && (
                <p>{aviso.mensagem}</p>
            )}
          </div>

          <label>E-mail *</label>
          <input
            className={
              aviso.exibir && aviso.mensagem !== 'CPF já cadastrado'
                ? 'input_modal input_modal--error'
                : 'input_modal'
            }
            type="text"
            name="email"
            defaultValue={form.email}
            onChange={onChange}
            placeholder="Digite o e-mail"
          />
          <div className="aviso_mensagem">
            {aviso.exibir && aviso.mensagem !== 'CPF já cadastrado' && (
              <p>{aviso.mensagem}</p>
            )}
          </div>

          <div className="data-clients_modal">
            <div>
              <label>CPF *</label>
              <InputMask
                mask="999.999.999-99"
                type="text"
                className={
                  aviso.exibir
                  && aviso.mensagem !== 'E-mail já cadastrado'
                  && aviso.mensagem !== 'E-mail já cadastrado'
                  && aviso.mensagem !== 'email deve ser um email válido'
                    ? 'input_modal input_modal--error'
                    : 'input_modal'
                }
                name="cpf"
                value={form.cpf}
                onChange={onChange}
                placeholder="Digite o CPF"
              />
              <div className="aviso_mensagem">
                {aviso.exibir
                  && aviso.mensagem !== 'E-mail já cadastrado'
                  && aviso.mensagem !== 'email deve ser um email válido' && (
                    <p>{aviso.mensagem}</p>
                )}
              </div>
            </div>
            <div>
              <label>Telefone *</label>
              <InputMask
                mask="(99) 9 9999-9999"
                type="text"
                className={
                  aviso.exibir
                  && aviso.mensagem === 'Este campo deve ser preenchido'
                    ? 'input_modal input_modal--error'
                    : 'input_modal'
                }
                name="telefone"
                value={form.telefone}
                onChange={onChange}
                placeholder="Digite o telefone"
              />
              <div className="aviso_mensagem">
                {aviso.exibir
                  && aviso.mensagem === 'Este campo deve ser preenchido' && (
                    <p>{aviso.mensagem}</p>
                )}
              </div>
            </div>
          </div>

          <label>Endereço</label>
          <input
            className="input_modal input--without-error"
            type="text"
            name="logradouro"
            defaultValue={form.logradouro}
            onChange={onChange}
            placeholder="Digite o endereço"
          />

          <label>Complemento</label>
          <input
            className="input_modal input--without-error"
            type="text"
            name="complemento"
            defaultValue={form.complemento}
            onChange={onChange}
            placeholder="Digite o complemento"
          />

          <div className="data-clients_modal">
            <div>
              <label>CEP</label>
              <InputMask
                mask="99999-999"
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
                defaultValue={form.bairro}
                onChange={onChange}
                placeholder="Digite o bairro"
              />
            </div>
          </div>

          <div className="data-clients_modal">
            <div>
              <label>Cidade</label>
              <input
                className="input_modal input--data-city"
                type="text"
                name="cidade"
                defaultValue={form.cidade}
                onChange={onChange}
                placeholder="Digite o cidade"
              />
            </div>
            <div>
              <label>UF</label>
              <input
                className="input_modal input--data-uf"
                type="text"
                name="estado"
                defaultValue={form.estado}
                onChange={onChange}
                placeholder="Digite o UF"
              />
            </div>
          </div>
          <div className="buttons_container">
            <button
              onClick={handleShowModalAddClient}
              type="text"
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
    </div>
  );
}
