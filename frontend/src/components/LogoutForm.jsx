import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LogoutForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = e => {
    e.preventDefault();
    const url = 'http://localhost:4000/api/users/logout';
    axios
      .post(url, {}, { withCredentials: true })
      .then(res => {
        console.log('Logout Success', res.data);
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch(err => console.error('Failed to logout', err));
  };

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button className="btn btn-logout" type="submit">
          Log out
        </button>
      </form>
    </div>
  );
}

export default LogoutForm;
