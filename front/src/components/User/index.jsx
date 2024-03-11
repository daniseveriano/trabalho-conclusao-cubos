/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDownImage from '../../Assets/UserInfos/arrow-down.svg';
import ModalEditUser from '../Modals/ModalEditUser';
import PopUpUser from '../PopUps/PopUpUser';
import { detailUser } from '../../services/api';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';

export default function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ nome: '', nomeAbrev: '' });
  const [warning, setWarning] = useState({ message: '', show: false });
  const [showPopUp, setShowPopUp] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [showLogoutUser, setShowLogoutUser] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
    cpf: '',
    telefone: '',
  });

  function handleShowPopup() {
    setShowPopUp(!showPopUp);
  }

  function handleShowModalEditUser() {
    setShowPopUp(false);
    setShowModalEditUser(!showModalEditUser);
  }

  function handleShowLogoutUser() {
    setShowPopUp(false);
    setShowLogoutUser(!showLogoutUser);
    removeLocalStorage('token');
    removeLocalStorage('id');
    navigate('/');
  }

  async function handleShowUserInfo() {
    const token = getLocalStorage('token');
    const response = await detailUser(token);

    if (!response.error) {
      let nomeAbrev = '';
      const { nome } = response;
      const spaceIndex = nome.indexOf(' ');
      if (spaceIndex > 0) {
        nomeAbrev = (nome[0] + nome[spaceIndex + 1]).toUpperCase();
      } else {
        nomeAbrev = (nome[0] + nome[1]).toUpperCase();
      }
      setUserData({
        nome,
        nomeAbrev,
      });
      setForm({
        ...form,
        nome: response.nome,
        email: response.email,
        cpf: response.cpf,
        telefone: response.telefone,
        senha: '',
        confirmacaoSenha: '',
      });
    } else {
      setWarning({
        message: response.message,
        show: true,
      });
      setTimeout(() => setWarning({ message: '', show: false }), 5000);
      if (response.message === 'jwt expired') {
        removeLocalStorage('token');
        removeLocalStorage('id');
        navigate('/');
      }
    }
  }

  useEffect(() => {
    handleShowUserInfo();
  }, [refreshPage]);

  return (
    <div className="card_user">
      <div className="perfil_user">
        <span>{userData.nomeAbrev}</span>
      </div>
      <span className="name_user">{userData.nome}</span>
      <button type="button" onClick={handleShowPopup} style={{ all: 'unset' }}>
        <img
          src={ArrowDownImage}
          alt="arrow down icon"
        />
      </button>
      {showPopUp
          && (
          <PopUpUser
            handleShowModalEditUser={handleShowModalEditUser}
            handleShowLogoutUser={handleShowLogoutUser}
          />
          )}
      {showModalEditUser && (
        <ModalEditUser
          refreshPage={refreshPage}
          handleShowModalEditUser={handleShowModalEditUser}
          setRefreshPage={setRefreshPage}
          form={form}
          setForm={setForm}
          warning={warning}
          setWarning={setWarning}
        />
      )}
    </div>
  );
}
