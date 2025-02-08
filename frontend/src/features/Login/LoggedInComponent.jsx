import Button from '../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon.jsx';
import { logout } from './loginSlice.js';

export default function () {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear(); //too clear the storage of redux persist. I might come up with a better solution in the future.
    window.location.reload();
  };

  const userName = useSelector((state) => state.login.userName);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        marginTop: '10px',
        fontStyle: 'bold',
      }}
    >
      <Icon name={'person'} text={''}></Icon>
      <p>{userName}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
