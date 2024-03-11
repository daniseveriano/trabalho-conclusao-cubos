/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteClientCharge from '../../Assets/ClientDetails/delete-client-charge.svg';
import { isVencida } from '../../utils/date';
import EditClientCharge from '../../Assets/ClientDetails/edit-client-charge.svg';
import AddChargeIcon from '../../Assets/Clients/charges.svg';
import EmptySearch from '../../Assets/Clients/empty-search.svg';
import OrderIcon from '../../Assets/Clients/order.svg';
import { api } from '../../services/api';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/storage';
import ModAddCharge from '../Modals/ModAddCharge';
import ModEditCharge from '../Modals/ModEditCharge';
import './styles.css';
import PopUpCharge from '../PopUps/PopUpCharge';
import ModalDeleteCharge from '../Modals/ModalDeleteCharge';
import PopupResult from '../PopUps/PopupResult';
import ModalDetailCharge from '../Modals/ModalDetailCharge';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '5px',
    letterSpacing: '0.005em',
    color: '#747488',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function GetStatus({ charge }) {
  let className = '';
  let content = '';

  if (charge.status === true) {
    className = 'status_table status--true';
    content = 'Paga';
  } else if (isVencida(charge.data_vencimento)) {
    className = 'status_table status--false';
    content = 'Vencida';
  } else {
    className = 'status_table status--pending';
    content = 'Pendente';
  }

  return <div className={className}>{content}</div>;
}

export function TableClient({ clients, onClick }) {
  const [showModalAddCharge, setShowModalAddCharge] = useState(false);
  const [clienteAtual, setClienteAtual] = useState('');
  const [resultAddCharge, setResultAddCharge] = useState({ show: false });

  function handleGetClientId(name, id) {
    removeLocalStorage(name);
    setLocalStorage(name, id);
  }

  function handleShowModalAddCharge(client) {
    setShowModalAddCharge(true);
    setClienteAtual(client);
  }

  return (
    <>
      <TableContainer className="table" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell className="header-title_table" align="left">
                <div className="title-centralized">
                  <img src={OrderIcon} alt="order icon" onClick={onClick} />
                  <span>Cliente</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className="header-title_table" align="left">
                CPF
              </StyledTableCell>
              <StyledTableCell className="header-title_table" align="left">
                E-mail
              </StyledTableCell>
              <StyledTableCell className="header-title_table" align="left">
                Telefone
              </StyledTableCell>
              <StyledTableCell className="header-title_table" align="left">
                Status
              </StyledTableCell>
              <StyledTableCell className="header-title_table" align="left">
                Criar Cobrança
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              && clients.map((client) => (
                <StyledTableRow key={client.id} className="row_table">
                  <StyledTableCell align="left">
                    <Link
                      to={`/clients/${client.id}`}
                      className="row_name"
                      onClick={() => handleGetClientId('clientId', client.id)}
                    >
                      {client.nome}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">{client.cpf}</StyledTableCell>
                  <StyledTableCell align="left">{client.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {client.telefone}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div
                      className={
                        client.status
                          ? 'status_table status--true'
                          : 'status_table status--false'
                      }
                    >
                      {client.status ? 'Em dia' : 'Inadimplente'}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <button
                      type="button"
                      onClick={() => handleShowModalAddCharge(client)}
                      style={{ all: 'unset', cursor: 'pointer' }}
                    >
                      <img src={AddChargeIcon} alt="add charge" />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {clients.length === 0 ? (
          <div className="empty__search">
            <img src={EmptySearch} alt="Resultado Vazio" />
            <p className="search__title">Nenhum resultado foi encontrado!</p>
            <p className="search__description">
              Verifique se escrita está correta
            </p>
          </div>
        ) : null}
        {showModalAddCharge && (
          <ModAddCharge
            cliente={clienteAtual}
            onSuccess={() => {
              setShowModalAddCharge(false);
              setResultAddCharge({ show: true, error: false });
            }}
            onCloseClick={() => setShowModalAddCharge(false)}
          />
        )}
      </TableContainer>

      <PopupResult
        onClose={() => setResultAddCharge({ ...resultAddCharge, show: false })}
        result={resultAddCharge}
        successMessage="Cobrança cadastrada com sucesso!"
      />
    </>
  );
}

export function TableClientCharges({ refreshCharges }) {
  const [charges, setCharges] = useState([]);
  const [showModalEditCharge, setShowModalEditCharge] = useState(false);
  const [showSucessAddCharge, setShowSucessAddCharge] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [charge, setCharge] = useState('');
  const [aviso, setAviso] = useState({ mensagem: '', exibir: false });
  const [sortedDate, setSortedDate] = useState(false);
  const [sortedId, setSortedId] = useState(false);
  const [resultDeleteCharge, setResultDeleteCharge] = useState({ show: false, error: false });
  const [showDetails, setShowDetails] = useState(false);

  async function handleClientCharges() {
    const token = getLocalStorage('token');
    const clientId = getLocalStorage('clientId');
    const data = [];

    try {
      const response = await api.get(`/clients/${clientId}/charges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.pop();
      data.push(response.data);
      setCharges(data[0]);
    } catch (error) {
      setCharges([error]);
    }
  }

  function handleSortDate() {
    if (!sortedDate) {
      charges.sort((a, b) => (
        new Date(a.data_vencimento.slice(0, 10).split('-'))
        - new Date(b.data_vencimento.slice(0, 10).split('-'))
      ));
      setSortedDate(true);
    }
    if (sortedDate) {
      charges.sort((a, b) => (
        new Date(b.data_vencimento.slice(0, 10).split('-'))
        - new Date(a.data_vencimento.slice(0, 10).split('-'))
      ));
      setSortedDate(false);
    }
  }

  function handleSortId() {
    if (!sortedId) {
      charges.sort((a, b) => a.id - b.id);
      setSortedId(true);
    }
    if (sortedId) {
      charges.sort((a, b) => b.id - a.id);
      setSortedId(false);
    }
  }

  function handleShowModalEditCharge(charge) {
    setCharge(charge);
    setShowModalEditCharge(!showModalEditCharge);
  }

  function handleShowModalDeleteCharge(charge) {
    setCharge(charge);
    setOpenConfirmDelete(true);
  }

  function onCloseDeleteCharge(result) {
    setOpenConfirmDelete(false);
    if (!result.error) {
      setRefreshPage(!refreshPage);
    }
    setResultDeleteCharge(result);
  }

  function openDetails(charge) {
    setCharge(charge);
    setShowDetails(true);
  }

  useEffect(() => {
    handleClientCharges();
  }, [refreshPage, refreshCharges]);

  return (
    <TableContainer
      className="table_clientcharges"
      component={Paper}
      style={{ width: '100%' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className="header-title_table" align="left">
              <div className="title-centralized" onClick={handleSortId}>
                <img src={OrderIcon} alt="order icon" />
                <span>ID Cob.</span>
              </div>
            </StyledTableCell>
            <StyledTableCell className="header-title_table" align="left">
              <div className="title-centralized" onClick={handleSortDate}>
                <img src={OrderIcon} alt="order icon" />
                <span>Data de venc.</span>
              </div>
            </StyledTableCell>
            <StyledTableCell className="header-title_table" align="left">
              Valor
            </StyledTableCell>
            <StyledTableCell className="header-title_table" align="left">
              Status
            </StyledTableCell>
            <StyledTableCell
              className="header-title_table"
              align="left"
              style={{ width: '30%' }}
            >
              Descrição
            </StyledTableCell>
            <StyledTableCell
              className="header-title_table"
              align="left"
              style={{ width: '15%' }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {charges
            && charges.map((charge) => (
              <StyledTableRow key={charge.id} className="row_table">
                <StyledTableCell align="left" onClick={() => openDetails(charge)}>{charge.id}</StyledTableCell>
                <StyledTableCell align="left" onClick={() => openDetails(charge)}>
                  {new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(
                    new Date(charge.data_vencimento.slice(0, 10).split('-')),
                  )}
                </StyledTableCell>
                <StyledTableCell align="left" onClick={() => openDetails(charge)}>
                  {`R$ ${(charge.valor / 100).toFixed(2).replace('.', ',')}`}
                </StyledTableCell>
                <StyledTableCell align="left" onClick={() => openDetails(charge)}>
                  <GetStatus charge={charge} />
                </StyledTableCell>
                <StyledTableCell align="left" onClick={() => openDetails(charge)}>
                  {charge.descricao}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ display: 'flex' }}>
                  <div
                    className="buttons__edit"
                    onClick={() => handleShowModalEditCharge(charge)}
                  >
                    <img
                      className="edit__img"
                      src={EditClientCharge}
                      alt="Editar"
                    />
                    <p>Editar</p>
                  </div>
                  <div
                    className="buttons__delete"
                    onClick={() => handleShowModalDeleteCharge(charge)}
                  >
                    <img
                      className="delete__img"
                      src={DeleteClientCharge}
                      alt="Deletar"
                    />
                    <p>Excluir</p>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {showModalEditCharge && (
        <ModEditCharge
          charge={charge}
          handleShowModalEditCharge={handleShowModalEditCharge}
          setShowSucessAddCharge={setShowSucessAddCharge}
          setRefreshPage={setRefreshPage}
          aviso={aviso}
          setAviso={setAviso}
        />
      )}

      <div className="popup-clients">
        {showSucessAddCharge && (
          <PopUpCharge setShowSucessAddCharge={setShowSucessAddCharge} />
        )}
      </div>

      {openConfirmDelete && (
        <ModalDeleteCharge
          charge={charge}
          onCloseModal={onCloseDeleteCharge}
        />
      )}

      <PopupResult
        result={resultDeleteCharge}
        onClose={() => setResultDeleteCharge({ ...resultDeleteCharge, show: false })}
        successMessage="Cobrança excuída com Sucesso!"
      />

      {showDetails && (
        <ModalDetailCharge
          charge={charge}
          showModal={setShowDetails}
        />
      )}

    </TableContainer>
  );
}
