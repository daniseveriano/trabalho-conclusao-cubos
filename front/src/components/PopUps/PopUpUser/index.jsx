import './styles.css';
import LogoutIcon from '../../../Assets/UserInfos/logout-icon.svg';
import EditIcon from '../../../Assets/UserInfos/edit-icon.svg';

export default function PopUpUser({ handleShowModalEditUser, handleShowLogoutUser }) {
  return (
    <div className="container_popup--user">
      <div className="arrow-up_popup--user" />

      <div className="icons_popup--user">
        <button
          type="button"
          onClick={handleShowModalEditUser}
          style={{ all: 'unset' }}
        >
          <img
            src={EditIcon}
            alt="Edit Icon"
          />
        </button>

        <button
          type="button"
          onClick={handleShowLogoutUser}
          style={{ all: 'unset' }}
        >
          <img
            src={LogoutIcon}
            alt="Logout Icon"
          />
        </button>
      </div>
    </div>
  );
}
