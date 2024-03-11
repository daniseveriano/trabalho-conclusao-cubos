/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import {
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import DeleteIconTable from '../../Assets/Charges/delete-icon-table.svg';
import EditIconTable from '../../Assets/Charges/edit-icon-table.svg';
import EmptySearch from '../../Assets/Clients/empty-search.svg';
import OrderIcon from '../../Assets/Clients/order.svg';
import { showAllCharges } from '../../services/api';
import { dateISOtoDDMMYYYY, isVencida } from '../../utils/date';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';
import ModEditCharge from '../Modals/ModEditCharge';
import PopUpCharghe from '../PopUps/PopUpCharge';
import './styles.css';
import ModalDeleteCharge from '../Modals/ModalDeleteCharge';
import ModalDetailCharge from '../Modals/ModalDetailCharge';
import PopupResult from '../PopUps/PopupResult';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '5px',
    letterSpacing: '0.005em',
    color: '#747488',
    maxWidth: 200,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function GetStatus({ charge }) {
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

export default function TableCharges({
  onClickClient,
  onClickId,
  search,
  chargesFiltered,
  setChargesFiltered,
}) {
  const [allCharges, setAllCharges] = useState([]);
  const [showModalEditCharge, setShowModalEditCharge] = useState(false);
  const [showSucessAddCharge, setShowSucessAddCharge] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [charge, setCharge] = useState('');
  const [aviso, setAviso] = useState({ mensagem: '', exibir: false });
  const [open, setOpen] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [resultDelete, setResultDelete] = useState({ show: false });

  useEffect(() => {
    if (!search) {
      async function showCharges() {
        setOpen(true);
        const token = getLocalStorage('token');
        const chargesFiltered = getLocalStorage('charges');

        const response = await showAllCharges(token, chargesFiltered);

        if (!response.error) {
          setChargesFiltered([...response]);
          removeLocalStorage('charges');
        }
        setOpen(false);
      }
      showCharges();
    }
    if (search) {
      async function showCharges() {
        const token = getLocalStorage('token');
        const response = await showAllCharges(token);

        if (!response.error) {
          setAllCharges([...response]);
          setChargesFiltered(
            allCharges.filter(
              (element) => element.nome.toLowerCase().includes(search.toLowerCase())
                || String(element.id).includes(search),
            ),
          );
        }
      }
      showCharges();
    }
  }, [refreshPage, search]);

  function handleShowModalEditCharge(charge) {
    setCharge(charge);
    setShowModalEditCharge(!showModalEditCharge);
  }

  function handleShowModalDeleteCharge(charge) {
    setCharge(charge);
    setOpenConfirmDelete(true);
  }

  function openDetails(charge) {
    setCharge(charge);
    setShowDetails(true);
  }

  return (
    <>
      <TableContainer className="table-charges" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell className="header-title_table_charge" align="left">
                <div className="title-centralized">
                  <img src={OrderIcon} alt="order icon" onClick={onClickClient} />
                  <span>Cliente</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className="header-title_table_charge" align="left">
                <div className="title-centralized">
                  <img src={OrderIcon} alt="order icon" onClick={onClickId} />
                  <span>ID Cob.</span>
                </div>
              </StyledTableCell>
              <StyledTableCell className="header-title_table_charge" align="left">
                Valor
              </StyledTableCell>
              <StyledTableCell className="header-title_table_charge" align="left">
                Data de venc.
              </StyledTableCell>
              <StyledTableCell className="header-title_table_charge" align="left">
                Status
              </StyledTableCell>
              <StyledTableCell className="header-title_table_charge" align="left">
                Descrição
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chargesFiltered
              && chargesFiltered.map((charge) => (
                <StyledTableRow key={charge.id} className="row_table">
                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    {charge.nome}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    {charge.id}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    {`R$ ${(charge.valor / 100).toFixed(2).replace('.', ',')}`}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    {dateISOtoDDMMYYYY(charge.data_vencimento)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    <GetStatus charge={charge} />
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    onClick={() => openDetails(charge)}
                  >
                    <Typography noWrap>{charge.descricao}</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <button
                      type="button"
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      onClick={() => handleShowModalEditCharge(charge)}
                    >
                      <img
                        style={{
                          marginBottom: '10px',
                          width: '16px',
                          height: '16px',
                        }}
                        src={EditIconTable}
                        alt="add charge"
                      />
                      <span style={{ size: '8px' }}>Editar</span>
                    </button>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <button
                      type="button"
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      onClick={() => handleShowModalDeleteCharge(charge)}
                    >
                      <img
                        style={{
                          marginBottom: '10px',
                          width: '16px',
                          height: '16px',
                        }}
                        src={DeleteIconTable}
                        alt="add charge"
                      />
                      <span style={{ size: '8px', color: '#AE1100' }}>
                        Excluir
                      </span>
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {chargesFiltered.length === 0 ? (
          <div className="empty__search">
            <img src={EmptySearch} alt="Resultado Vazio" />
            <p className="search__title">Nenhum resultado foi encontrado!</p>
            <p className="search__description">
              Verifique se escrita está correta
            </p>
          </div>
        ) : null}
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
        {openConfirmDelete && (
          <ModalDeleteCharge
            charge={charge}
            onCloseModal={(result) => {
              setResultDelete(result);
              setOpenConfirmDelete(false);
              if (!result.error) {
                setRefreshPage(!refreshPage);
              }
            }}
          />
        )}
        <div className="popup-charge">
          {showSucessAddCharge && (
            <PopUpCharghe setShowSucessAddCharge={setShowSucessAddCharge} />
          )}
        </div>
        <Backdrop open={open} style={{ color: '#DA0175' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </TableContainer>

      <PopupResult
        result={resultDelete}
        onClose={() => setResultDelete({ ...resultDelete, show: false })}
        successMessage="Cobrança excluída com Sucesso"
      />

      {showDetails
        && (
          <ModalDetailCharge
            charge={charge}
            showModal={setShowDetails}
          />
        )}
    </>
  );
}
