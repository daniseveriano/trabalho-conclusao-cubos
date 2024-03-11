/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Backdrop, CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import NewCharge from '../../Assets/ClientDetails/add.svg';
import IconEditClient from '../../Assets/ClientDetails/icon-edit-client.svg';
import ClientTitle from '../../Assets/Clients/client-title.svg';
import SuccessImage from '../../Assets/success/success.svg';
import { HeaderClientDetails } from '../../components/Headers';
import ModAddCharge from '../../components/Modals/ModAddCharge';
import ModalEditClient from '../../components/Modals/ModEditClient';
import PopUpCharge from '../../components/PopUps/PopUpCharge';
import { SidebarClients } from '../../components/Sidebar';
import { TableClientCharges } from '../../components/TableClientCharges';
import User from '../../components/User';
import { api } from '../../services/api';
import { getLocalStorage } from '../../utils/storage';
import './styles.css';

function ClientDetails() {
  const [clients, setClients] = useState([]);
  const [showModalAddClient, setShowModalAddClient] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', exibir: false });
  const [refreshPage, setRefreshPage] = useState(false);
  const token = getLocalStorage('token');
  const clientId = getLocalStorage('clientId');
  const [showModalAddCharge, setShowModalAddCharge] = useState(false);
  const [clienteAtual, setClienteAtual] = useState();
  const [open, setOpen] = useState(false);
  const [showChargeResult, setShowChargeResult] = useState(false);

  async function handleClientDetails() {
    setOpen(true);
    try {
      const response = await api.get(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients([response.data]);
      setOpen(false);
    } catch (error) {
      setClients([error]);
    }
  }

  function handleShowModalAddClient() {
    setShowModalAddClient(!showModalAddClient);
    setRefreshPage(true);
  }

  function handleShowModalAddCharge(client) {
    setShowModalAddCharge(!showModalAddCharge);
    if (client) {
      setClienteAtual(client[0]);
    }
  }

  function onChargeSaved() {
    setRefreshPage(!refreshPage);
    setShowModalAddCharge(false);
    setShowChargeResult(true);
  }

  useEffect(() => {
    handleClientDetails();
    setRefreshPage(true);
  }, [refreshPage]);

  return (
    <div className="container_clients">
      <SidebarClients />

      <main className="main_clients">
        <User />
        <HeaderClientDetails />
        <div className="clients__charges">
          <section>
            <div>
              {clients
                && clients.map((client) => (
                  <div className="clientdetails" key={client.id}>
                    <div className="clientdetails__title">
                      <img
                        className="title__icon"
                        src={ClientTitle}
                        alt="Icon Title"
                      />
                      <h1>{client.nome}</h1>
                    </div>
                    <div className="clientdetails__data">
                      <div className="data__title">
                        <div>
                          <h3>Dados do cliente</h3>
                        </div>
                        <div
                          className="data__button"
                          onClick={handleShowModalAddClient}
                        >
                          <img src={IconEditClient} alt="Editar Cliente" />
                          <p>Editar Cliente</p>
                        </div>
                      </div>
                      <div className="data__firstline">
                        <div className="data__email">
                          <h5>E-mail</h5>
                          <p>{client.email}</p>
                        </div>
                        <div className="data__phone">
                          <h5>Telefone</h5>
                          <p>{client.telefone}</p>
                        </div>
                        <div className="data__cpf">
                          <h5>CPF</h5>
                          <p>{client.cpf}</p>
                        </div>
                      </div>
                      <div className="data__secondline">
                        <div className="data__adress">
                          <h5>Endereço</h5>
                          <p>{client.logradouro}</p>
                        </div>
                        <div className="data__district">
                          <h5>Bairro</h5>
                          <p>{client.bairro}</p>
                        </div>
                        <div className="data__complement">
                          <h5>Complemento</h5>
                          <p>{client.complemento}</p>
                        </div>
                        <div className="data__zipcode">
                          <h5>CEP</h5>
                          <p>{client.cep}</p>
                        </div>
                        <div className="data__city">
                          <h5>Cidade</h5>
                          <p>{client.cidade}</p>
                        </div>
                        <div className="data__state">
                          <h5>UF</h5>
                          <p>{client.estado}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
          <section className="section__table--detail-cliets">
            <div className="clientcharges">
              <div className="clientcharges__title">
                <h1>Cobranças do Cliente</h1>
                <div
                  className="charge__button"
                  onClick={() => handleShowModalAddCharge(clients)}
                >
                  <img src={NewCharge} alt="Nova cobrança" />
                  <p>Nova cobrança</p>
                </div>
              </div>
              <div className="charge__table">
                <TableClientCharges
                  refreshCharges={refreshPage}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      {showModalAddClient && (
        <ModalEditClient
          setRefreshPage={setRefreshPage}
          aviso={aviso}
          setAviso={setAviso}
          handleShowModalAddClient={handleShowModalAddClient}
        />
      )}

      {aviso.mensagem === 'Cadastro concluído com sucesso' && (
        <div className="success_register">
          <img src={SuccessImage} alt="sucess" />
        </div>
      )}
      {showModalAddCharge && (
        <ModAddCharge
          cliente={clienteAtual}
          onSuccess={onChargeSaved}
          onCloseClick={() => setShowModalAddCharge(false)}
        />
      )}

      <PopUpCharge open={showChargeResult} onCloseClick={() => setShowChargeResult(false)} />

      <Backdrop open={open} style={{ color: '#DA0175' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ClientDetails;
