/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-inner-declarations */
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '../../Assets/Clients/add.svg';
import ClientsIcon from '../../Assets/Clients/client-title.svg';
import FilterIcon from '../../Assets/Clients/filter.svg';
import SearchIcon from '../../Assets/Clients/search.svg';
import SuccessImage from '../../Assets/success/success.svg';
import { HeaderClients } from '../../components/Headers';
import ModalAddClient from '../../components/Modals/ModAddClient';
import { SidebarClients } from '../../components/Sidebar';
import { TableClient } from '../../components/TableClientCharges';
import User from '../../components/User';
import { showAllClients } from '../../services/api';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';
import './styles.css';

export default function Clients() {
  const [showModalAddClient, setShowModalAddClient] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', exibir: false });
  const [refreshPage, setRefreshPage] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [sorted, setSorted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!search) {
      async function showClients() {
        setOpen(true);
        const token = getLocalStorage('token');
        const clientsFiltered = getLocalStorage('clients');
        const response = await showAllClients(token, clientsFiltered);

        if (!response.error) {
          setFiltered([...response]);
          removeLocalStorage('clients');
        }
        setOpen(false);
      }

      showClients();
      removeLocalStorage('clientId');
    }
    if (search) {
      async function showClients() {
        const token = getLocalStorage('token');
        const response = await showAllClients(token);

        if (!response.error) {
          setClients([...response]);
          setFiltered(
            clients.filter(
              (element) => element.nome.toLowerCase().includes(search.toLowerCase())
                || element.email.toLowerCase().includes(search.toLowerCase())
                || element.cpf.includes(search),
            ),
          );
        }
      }
      showClients();
      removeLocalStorage('clientId');
    }
  }, [refreshPage, search]);

  function handleShowModalAddClient() {
    setShowModalAddClient(!showModalAddClient);
  }

  function handleSort() {
    if (!sorted) {
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
      setSorted(true);
    }
    if (sorted) {
      filtered.sort((a, b) => b.nome.localeCompare(a.nome));
      setSorted(false);
    }
  }

  return (
    <div className="container_clients">
      <SidebarClients />

      <main className="main_clients">
        <User />
        <HeaderClients />

        <section className="section_clients">
          <div className="title_section">
            <img src={ClientsIcon} alt="icon clients" />
            <h1>Clientes</h1>
          </div>

          <div className="actions_section">
            <button type="button" onClick={handleShowModalAddClient}>
              <div>
                <img src={AddIcon} alt="button add client" />
                <span>Adicionar cliente</span>
              </div>
            </button>

            <img src={FilterIcon} alt="button filter client" />

            <div className="input-search_action">
              <input
                placeholder="Pesquisa"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <img src={SearchIcon} alt="search icon" />
            </div>
          </div>
        </section>

        <TableClient clients={filtered} onClick={handleSort} />
      </main>

      {showModalAddClient && (
        <ModalAddClient
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

      <Backdrop open={open} style={{ color: '#DA0175' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
