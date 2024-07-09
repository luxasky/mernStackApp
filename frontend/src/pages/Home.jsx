import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import WelcomeMessage from '../components/WelcomeMessage';

function Home() {
  // Get login state from the auth context
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <WelcomeMessage />
  ) : (
    <div className="home">
      <div className="hero-text">
        <h1 className="cursive">Home Page</h1>
        <p>Please login into your account</p>
      </div>
      <LoginForm />
    </div>
  );
}

export default Home;
