import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  // get state from the auth context
  const { isLoggedIn } = useContext(AuthContext);

  // Display nav. links based on the isLoggedIn state
  return (
    <nav className="nav">
      <ul className="nav-list">
        {/* NOT logged IN */}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/" className="nav-list-item">
                HOME
              </Link>
            </li>

            <li>
              <Link to="/art-gallery" className="nav-list-item">
                ART GALLERY
              </Link>
            </li>
          </>
        )}
        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/" className="nav-list-item">
                <i id="logo-icon" className="fa-brands fa-artstation"></i>
              </Link>
            </li>
            <li>
              <Link to="/my-portfolio" className="nav-list-item">
                My_Portfolio
              </Link>
            </li>
            <li>
              <Link to="/add-artwork" className="nav-list-item">
                Add_Artwork
              </Link>
            </li>
            <li>
              <Link to="/art-gallery" className="nav-list-item">
                Art_Gallery
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-list-item">
                <i className="fa-solid fa-right-from-bracket">{'  '}Sign out</i>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
