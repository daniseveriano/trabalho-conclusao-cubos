/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import CloseIcon from '../../../Assets/EditUser/close.svg';
import { updateUser } from '../../../services/api';
import { getLocalStorage } from '../../../utils/storage';
import SuccessImage from '../../../Assets/EditUser/success-edit-user.svg';
import PasswordOnIcon from '../../../Assets/EditUser/eye-on.svg';
import PasswordOffIcon from '../../../Assets/EditUser/eye-off.svg';

export default function ModalEditUser({
  handleShowModalEditUser,
  setRefreshPage,
  form, setForm,
  warning, setWarning,
}) {
  const [showSucessEditUser, setShowSucessEditUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    if (!form.nome || !form.email) {
      setWarning({
        message: 'Este campo deve ser preenchido',
        show: true,
      });
      setTimeout(() => setWarning({ message: '', show: false }), 2000);
      return;
    }
    if (form.senha) {
      if (form.senha.length < 8) {
        setWarning({
          message: 'Digite uma senha maior que 8 dígitos!',
          show: true,
        });
        setTimeout(() => setWarning({ message: '', show: false }), 2000);
        return;
      }

      if (form.senha.includes(' ')) {
        setWarning({
          message: 'A senha não pode conter espaços!',
          show: true,
        });
        setTimeout(() => setWarning({ message: '', show: false }), 2000);
        return;
      }

      if (form.senha !== form.confirmacaoSenha) {
        setWarning({
          message: 'As senhas não conferem',
          show: true,
        });
        setTimeout(() => setWarning({ message: '', show: false }), 2000);
        return;
      }
    }

    const token = getLocalStorage('token');
    const response = await updateUser(token, form);
    if (!response.error) {
      setShowSucessEditUser(true);
      setRefreshPage(true);
      setTimeout(() => setRefreshPage(false));
      setTimeout(() => setShowSucessEditUser(false), 2000);
      setTimeout(() => handleShowModalEditUser(), 2000);
    } else {
      setWarning({
        message: response.message,
        show: true,
      });
      setTimeout(() => setWarning({ message: '', show: false }), 5000);
    }
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleShowPasswordConfirm() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <div className="background-modal-user">
      {!showSucessEditUser && (
        <div className="container_modal--user">
          <button className="close-modal" type="button" onClick={handleShowModalEditUser}>
            <img
              src={CloseIcon}
              alt="close icon"
            />
          </button>

          <h1 className="title_modal">Edite seu cadastro</h1>

          <form onSubmit={handleSubmit}>
            <label id="name">Nome *</label>
            <input
              className={(warning.show && warning.message === 'Este campo deve ser preenchido')
                ? 'input_modal--user input_modal--error'
                : 'input_modal--user'}
              type="text"
              name="nome"
              value={form.nome}
              onChange={onChange}
              placeholder="Digite seu nome"
            />
            <div className="warning_message">
              {(warning.show && warning.message === 'Este campo deve ser preenchido')
                && <p>{warning.message}</p>}
            </div>

            <label>E-mail *</label>
            <input
              className={(warning.show && (warning.message.includes('campo') || warning.message.includes('mail')))
                ? 'input_modal--user input_modal--error'
                : 'input_modal--user'}
              type="text"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Digite seu e-mail"
            />
            <div className="warning_message">
              {(warning.show && (warning.message.includes('campo') || warning.message.includes('mail')))
                && <p>{warning.message}</p>}
            </div>

            <div className="section_modal">
              <div>
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  maskPlaceholder={null}
                  type="text"
                  name="cpf"
                  value={form.cpf}
                  onChange={onChange}
                  className="input_modal--user section_modal-input"
                  placeholder="Digite seu CPF"
                />
              </div>
              <div>
                <label>Telefone</label>
                <InputMask
                  mask="(99) 9 9999-9999"
                  maskPlaceholder={null}
                  type="text"
                  name="telefone"
                  value={form.telefone}
                  onChange={onChange}
                  className="input_modal--user section_modal-input"
                  placeholder="Digite seu telefone"
                />
              </div>
            </div>

            <label>Nova senha</label>
            <div className="password_input--user">
              <input
                className={(warning.show && warning.message.includes('senha'))
                  ? 'input_modal--user input_modal--error'
                  : 'input_modal--user'}
                type={!showPassword ? 'password' : 'text'}
                name="senha"
                value={form.senha}
                onChange={onChange}
                placeholder="Digite sua senha"
              />
              <button type="button" onClick={handleShowPassword}>
                <img src={showPassword ? PasswordOnIcon : PasswordOffIcon} alt="password on/off icon" />
              </button>
            </div>
            <div className="warning_message">
              {(warning.show && warning.message.includes('senha'))
                && <p>{warning.message}</p>}
            </div>

            <label>Confirmar Senha</label>
            <div className="password_input--user">
              <input
                className={(warning.show && warning.message.includes('senha'))
                  ? 'input_modal--user input_modal--error'
                  : 'input_modal--user'}
                type={!showPasswordConfirm ? 'password' : 'text'}
                name="confirmacaoSenha"
                value={form.confirmacaoSenha}
                onChange={onChange}
                placeholder="Confirme sua senha"
              />
              <button type="button" onClick={handleShowPasswordConfirm}>
                <img src={showPasswordConfirm ? PasswordOnIcon : PasswordOffIcon} alt="password on/off icon" />
              </button>
            </div>
            <div className="warning_message">
              {(warning.show && warning.message.includes('senha'))
                && <p>{warning.message}</p>}
            </div>

            <div className="container_button--user">
              <button type="submit" className="btn_modal btn--send">Aplicar</button>
            </div>
          </form>
        </div>
      )}
      {showSucessEditUser && (
        <img className="success-edit--user" src={SuccessImage} alt="sucess edit user" />
      )}
    </div>
  );
}
