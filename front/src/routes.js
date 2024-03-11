/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Clients from './pages/Clients';
import Charges from './pages/Charges';
import ClientDetails from './pages/ClientDetails';
import { getLocalStorage } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {
  const token = getLocalStorage('token');
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />

      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/charges" element={<Charges />} />
      </Route>

      <Route path="*" element={<h1>404 - Not found</h1>} />
    </Routes>
  );
}
export default MainRoutes;
