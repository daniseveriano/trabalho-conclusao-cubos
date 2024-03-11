/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-no-bind */
import './styles.css';
import { useState } from 'react';
import FilterIcon from '../../Assets/Clients/filter.svg';
import { SidebarCharges } from '../../components/Sidebar';
import User from '../../components/User';
import { HeaderCharges } from '../../components/Headers';
import ChargesIconTitle from '../../Assets/Charges/charges-icon-title.svg';
import SearchIcon from '../../Assets/Clients/search.svg';
import TableCharges from '../../components/TableCharges';

export default function Charges() {
  const [chargesFiltered, setChargesFiltered] = useState([]);
  const [sortedClient, setSortedClient] = useState(false);
  const [sortedId, setSortedId] = useState(false);
  const [search, setSearch] = useState('');

  function handleSortClient() {
    if (!sortedClient) {
      chargesFiltered.sort((a, b) => a.nome.localeCompare(b.nome));
      setSortedClient(true);
    }
    if (sortedClient) {
      chargesFiltered.sort((a, b) => b.nome.localeCompare(a.nome));
      setSortedClient(false);
    }
  }

  function handleSortId() {
    if (!sortedId) {
      chargesFiltered.sort((a, b) => a.id - b.id);
      setSortedId(true);
    }
    if (sortedId) {
      chargesFiltered.sort((a, b) => b.id - a.id);
      setSortedId(false);
    }
  }

  return (
    <div className="container_charges">
      <SidebarCharges />

      <main className="main_charges">
        <User />
        <HeaderCharges />

        <section className="section_charges">
          <div className="title_section">
            <img src={ChargesIconTitle} alt="icon charges" />
            <h1>Cobranças</h1>
          </div>

          <div className="actions_section">
            <img src={FilterIcon} alt="button filter charges" />

            <div className="input-search_action">
              <input
                placeholder="Pesquisa"
                onChange={(e) => setSearch(e.target.value)}
              />
              <img src={SearchIcon} alt="search icon" />
            </div>
          </div>
        </section>
        <TableCharges
          chargesFiltered={chargesFiltered}
          setChargesFiltered={setChargesFiltered}
          search={search}
          onClickClient={handleSortClient}
          onClickId={handleSortId}
        />
      </main>
    </div>
  );
}
