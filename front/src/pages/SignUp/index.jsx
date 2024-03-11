/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Checked from '../../Assets/SignUp/checked.svg';
import Confirmed from '../../Assets/SignUp/confirmed-step.svg';
import Current from '../../Assets/SignUp/current-step.svg';
import TabCurrent from '../../Assets/SignUp/current.svg';
import Line from '../../Assets/SignUp/line.svg';
import Next from '../../Assets/SignUp/next-step.svg';
import TabPrevious from '../../Assets/SignUp/previous.svg';
import { api } from '../../services/api';
import './style.css';

function SignUp() {
  let [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [advise, setAdvise] = useState({ message: '', show: false });
  const [conection, setConection] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleSetInputs = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!user.name || !user.email) {
        setAdvise({
          message: 'Todos os campos são obrigatórios!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        return;
      }

      if (
        !user.email.includes('@')
        || !user.email.includes('.')
        || user.email.length < 10
      ) {
        setAdvise({
          message: 'Digite um e-mail válido!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        return;
      }

      setCount(count + 1);

      if (!user.password || !user.confirmation) {
        setAdvise({
          message: 'Todos os campos são obrigatórios!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        setCount((count = 1));
        return;
      }

      if (user.password !== user.confirmation) {
        setAdvise({
          message: 'A senha e a confirmação da senha devem ser iguais!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        setCount((count = 1));
        return;
      }

      if (user.password.length < 8) {
        setAdvise({
          message: 'Digite uma senha maior que 8 dígitos!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        setCount((count = 1));
        return;
      }

      if (user.password.includes(' ')) {
        setAdvise({
          message: 'A senha não pode conter espaços!',
          show: true,
        });
        setTimeout(() => setAdvise({ message: '', show: false }), 3000);
        setCount((count = 1));
        return;
      }

      setCount(count + 1);
      setOpen(!open);

      const response = await api.post('/signup', {
        nome: user.name,
        email: user.email,
        senha: user.password,
      });

      if (response.data === 'Usuário cadastrado com sucesso!') {
        setOpen(false);
        setConection(true);
        setCount(count + 1);
      }
    } catch (error) {
      setOpen(false);
      setCount((count = 0));
      setAdvise({
        message: error.response.data,
        show: true,
      });
      setTimeout(() => {
        setAdvise({ message: '', show: false });
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="container__steps">
        <aside className="stepper">
          <ul>
            <div className="step">
              <div>
                <div className="step__icon">
                  {count === 0 ? <img src={Current} alt="Step" /> : null}
                  {count === 1 ? <img src={Confirmed} alt="Step" /> : null}
                  {count === 2 ? <img src={Confirmed} alt="Step" /> : null}
                </div>
                <img className="step__line" src={Line} alt="linha" />
              </div>
              <div className="step__title">
                <li>Cadastre-se</li>
                <span className="step__description">
                  Por favor, escreva seu nome e email
                </span>
              </div>
            </div>
            <div className="step">
              <div>
                <div className="step__icon">
                  {count === 0 ? (
                    <img className="step" src={Next} alt="Step" />
                  ) : null}
                  {count === 1 ? (
                    <img className="step" src={Current} alt="Step" />
                  ) : null}
                  {count === 2 ? (
                    <img className="step" src={Confirmed} alt="Step" />
                  ) : null}
                </div>
                <img className="step__line" src={Line} alt="linha" />
              </div>
              <div className="step__title">
                <li>Escolha uma senha</li>
                <span className="step__description">
                  Escolha uma senha segura
                </span>
              </div>
            </div>
            <div className="step">
              <div className="step__icon">
                {count === 0 ? (
                  <img className="step" src={Next} alt="Step" />
                ) : null}
                {count === 1 ? (
                  <img className="step" src={Next} alt="Step" />
                ) : null}
                {count === 2 ? (
                  <img className="step" src={Confirmed} alt="Step" />
                ) : null}
              </div>
              <div className="step__title">
                <li>Cadastro realizado com sucesso</li>
                <span className="step__description">
                  E-mail e senha cadastrados com sucesso
                </span>
              </div>
            </div>
          </ul>
        </aside>
      </div>
      <div className="container__main">
        {count === 0 || !user.name || !user.email ? (
          <div className="main__form">
            <main className="form__display">
              <form className="form">
                <h1 className="title">Adicione seus dados</h1>
                <div>
                  <div>
                    <label className="label">Nome*</label>
                  </div>
                  <div>
                    <input
                      className="input"
                      placeholder="Digite seu nome"
                      name="name"
                      defaultValue={user.name}
                      onChange={handleSetInputs}
                      type="text"
                      style={{ marginBottom: '20px' }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="label">E-mail*</label>
                  </div>
                  <div>
                    <input
                      className="input"
                      placeholder="Digite seu e-mail"
                      name="email"
                      defaultValue={user.email}
                      onChange={handleSetInputs}
                      type="text"
                    />
                  </div>
                </div>
              </form>
            </main>
            <button className="button" onClick={handleSubmit}>
              Continuar
            </button>
            <span className="go__login">
              Já possui uma conta? Faça seu
              {' '}
              <Link
                className="link"
                to="/"
                style={{ textDecoration: 'underline' }}
              >
                Login
              </Link>
            </span>
          </div>
        ) : null}
        {count > 0 && count < 2 && user.name && user.email ? (
          <div className="main__form">
            <main className="form__display">
              <form className="form">
                <h1 className="title">Escolha uma senha</h1>
                <div>
                  <div>
                    <label className="label">Senha*</label>
                  </div>
                  <div
                    className="password__containers"
                    onChange={handlePasswordChange('password')}
                  >
                    <input
                      className="input"
                      placeholder="••••••••"
                      name="password"
                      defaultValue={user.password}
                      onChange={handleSetInputs}
                      type={values.showPassword ? 'text' : 'password'}
                      style={{ marginBottom: '20px' }}
                    />
                    <IconButton
                      style={{ position: 'absolute', right: '5px', top: '2px' }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="label" style={{ marginTop: '20px' }}>
                      Repita a senha*
                    </label>
                  </div>
                  <div
                    className="password__containers"
                    onChange={handlePasswordChange('password')}
                  >
                    <input
                      className="input"
                      placeholder="••••••••"
                      name="confirmation"
                      defaultValue={user.confirmation}
                      onChange={handleSetInputs}
                      type={values.showPassword ? 'text' : 'password'}
                    />
                    <IconButton
                      style={{ position: 'absolute', right: '5px', top: '2px' }}
                      className="icon__button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                </div>
              </form>
            </main>
            <button className="button" onClick={handleSubmit}>
              Finalizar cadastro
            </button>
            <span className="go__login">
              Já possui uma conta? Faça seu
              {' '}
              <Link className="link" to="/">
                Login
              </Link>
            </span>
          </div>
        ) : null}
        {count >= 2 && conection ? (
          <div className="main__form">
            <main className="display__success">
              <img src={Checked} alt="Checked succes" />
              <p className="display__message">
                Cadastro realizado com sucesso!
              </p>
            </main>
            <Link className="button" to="/">
              Login
            </Link>
          </div>
        ) : null}

        <span className="error__signup">{advise.show && advise.message}</span>
        <div className="main__steps">
          <div className="tab">
            {count === 0 ? (
              <img src={TabCurrent} alt="Tab" />
            ) : (
              <img src={TabPrevious} alt="Tab" />
            )}
          </div>
          <div className="tab">
            {count === 1 ? (
              <img src={TabCurrent} alt="Tab" />
            ) : (
              <img src={TabPrevious} alt="Tab" />
            )}
          </div>
          <div className="tab">
            {count === 2 ? (
              <img src={TabCurrent} alt="Tab" />
            ) : (
              <img src={TabPrevious} alt="Tab" />
            )}
          </div>
        </div>
      </div>
      <Backdrop open={open} style={{ color: '#DA0175' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SignUp;
