/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-bind */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Backdrop, Button, CircularProgress, IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/api';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import './style.css';

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [aviso, setAviso] = useState({ mensagem: '', exibir: false });
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    const token = getLocalStorage('token');
    if (token) {
      navigate('/home');
    }
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
    if (!form.email || !form.senha) {
      setAviso({
        mensagem: 'Todos os campos devem ser preenchidos',
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
      return;
    }

    setOpen(!open);
    const response = await signIn(form);

    if (!response.error) {
      setLocalStorage('token', response.token);
      setLocalStorage('userId', response.userId);
      navigate('/home');
      setOpen(false);
    } else {
      setOpen(false);
      setAviso({
        mensagem: response.mensagem,
        exibir: true,
      });
      setTimeout(() => setAviso({ mensagem: '', exibir: false }), 5000);
    }
    setForm({ email: '', senha: '' });
  }

  return (
    <div className="container__signin">
      <aside className="lateral__signin">
        <div className="lateral__filter">
          <p className="signin__phrase space">
            Gerencie todos os pagamentos da sua empresa em um só
          </p>
          <p className="signin__phrase">lugar.</p>
        </div>
      </aside>
      <main className="signin">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Faça seu login!</h1>
          <div className="email">
            <label className="email__label">E-mail*</label>
            <input
              className="email__input"
              type="text"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="password">
            <label className="password__label">Senha*</label>
            <Link
              className="forgot"
              to="#"
              style={{ textDecoration: 'underline' }}
            >
              Esqueceu a senha?
            </Link>
            <div style={{ position: 'relative' }}>
              <input
                className="password__input"
                type={values.showPassword ? 'text' : 'password'}
                name="senha"
                value={form.senha}
                onChange={onChange}
                placeholder="Digite sua senha"
              />
              <IconButton
                style={{ position: 'absolute', right: '5px', top: '2px' }}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
            <div className="error__login">
              {aviso.exibir && <p>{aviso.mensagem}</p>}
            </div>
          </div>
          <div className="button_signin">
            <Button
              type="submit"
              variant="contained"
              style={{
                boxShadow: '0 0 0 0',
                backgroundColor: '#DA0175',
                borderRadius: '0.625rem',
                height: '2.063rem',
                width: '10rem',
                textTransform: 'none',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: '1.563rem',
                marginBottom: '1.188rem',
              }}
            >
              Entrar
            </Button>
          </div>
          <div>
            <span className="signin__span">
              Ainda não possui uma conta?
              <Link
                className="signin__link"
                to="/cadastrar"
                style={{ textDecoration: 'underline' }}
              >
                Cadastre-se!
              </Link>
            </span>
          </div>
        </form>
      </main>
      <Backdrop open={open} style={{ color: '#DA0175' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SignIn;
