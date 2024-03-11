import './styles.css';
import { useEffect, useState } from 'react';
import { SidebarHome } from '../../components/Sidebar';
import { HeaderHome } from '../../components/Headers';
import User from '../../components/User';
import TablePaidCharge from '../../components/TablePaidCharge';
import TableOverdueCharge from '../../components/TableOverdueCharge';
import TablePedingCharge from '../../components/TablePedingCharge';
import CardTotalizerPaidCharges from '../../components/CardTotalizerPaidCharges';
import TableDefaultingClients from '../../components/TableDefaultingClients';
import TableNonDefaultingClients from '../../components/TableNonDefaulterClients';
import CardTotalizerOverdueCharges from '../../components/CardTotalizerOverdueCharges';
import CardTotalizerPendingCharges from '../../components/CardTotalizerPendingCharges';
import { getLocalStorage } from '../../utils/storage';
import { showStatusClients, showStatusCharges } from '../../services/api';

export default function Home() {
  const [charges, setCharges] = useState({});
  const [paidCharges, setPaidCharges] = useState([]);
  const [overdueCharges, setOverdueCharges] = useState([]);
  const [pedingCharges, setPedingCharges] = useState([]);
  const [countCharges, setCountCharges] = useState({ paid: 0, overdue: 0, peding: 0 });
  const [countClients, setCountClients] = useState({ defaulters: 0, nonDefaulters: 0 });
  const [, setClients] = useState({});
  const [defaultClients, setDefaultClients] = useState([]);
  const [nonDefaultClients, setNonDefaultClients] = useState([]);

  async function showStatusChargesAndClients() {
    const token = getLocalStorage('token');

    const responseCharges = await showStatusCharges(token);

    const responseClients = await showStatusClients(token);
    if (!responseCharges.error) {
      setCharges(responseCharges);
      setPaidCharges(responseCharges.paid.charges.splice(0, 4));
      setOverdueCharges(responseCharges.overdue.charges.splice(0, 4));
      setPedingCharges(responseCharges.peding.charges.splice(0, 4));
      setCountCharges({
        paid: responseCharges.paid.count,
        overdue: responseCharges.overdue.count,
        peding: responseCharges.peding.count,
      });
    }
    if (!responseClients.error) {
      setClients(responseClients);
      setCountClients({
        defaulters: responseClients.defaulters.count,
        nonDefaulters: responseClients.nonDefaulters.count,
      });
      setDefaultClients(responseClients.defaulters.clients);
      setNonDefaultClients(responseClients.nonDefaulters.clients);
    }
  }

  useEffect(() => {
    showStatusChargesAndClients();
  }, []);

  return (
    <div className="container_home">
      <SidebarHome />
      <main className="main_home">
        <User />
        <HeaderHome />

        <div className="container_charges-resume">

          <section>
            <CardTotalizerPaidCharges amout={charges.paid !== undefined && charges.paid.amout} />

            <div>
              <TablePaidCharge
                count={countCharges.paid !== undefined && countCharges.paid}
                charges={paidCharges !== undefined && paidCharges}
              />

            </div>
          </section>

          <section>
            <CardTotalizerOverdueCharges
              amout={charges.overdue !== undefined && charges.overdue.amout}
            />

            <div>
              <TableOverdueCharge
                count={countCharges.overdue !== undefined && countCharges.overdue}
                charges={overdueCharges !== undefined && overdueCharges}
              />
            </div>
          </section>

          <section>
            <CardTotalizerPendingCharges
              amout={charges.peding !== undefined && charges.peding.amout}
            />

            <div>
              <TablePedingCharge
                count={countCharges.peding !== undefined && countCharges.peding}
                charges={pedingCharges !== undefined && pedingCharges}
              />
            </div>
          </section>
        </div>
        <div className="container_clients-resume">
          <section>
            <TableNonDefaultingClients
              clients={nonDefaultClients}
              count={countClients.nonDefaulters !== undefined && countClients.nonDefaulters}
            />
          </section>
          <section>
            <TableDefaultingClients
              clients={defaultClients}
              count={countClients.defaulters !== undefined && countClients.defaulters}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
