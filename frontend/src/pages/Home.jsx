import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/LogoutForm';

function Home() {
  // Get login state from the auth context
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="home">
      {/* <h1>Welcome to Your Art Portfolio </h1> */}
      <div className="hero-text">
        <h1>Home Page</h1>
        <p>Create, share, and explore unique artworks.</p>
      </div>
      {isLoggedIn ? <LogoutForm /> : <LoginForm />}
    </div>
  );
}

export default Home;
