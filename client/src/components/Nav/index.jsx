import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Cart from '../Cart/index';

function Nav() {
    
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div class="offcanvas offcanvas-start" tabindex="-1" id="siteMenu" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul className="flex-row">
                            <li className="mx-1">
                                <Link to="/orderHistory">
                                Order History
                                </Link>
                            </li>
                            <li className="mx-1">
                                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                                <a href="/" onClick={() => Auth.logout()}>
                                Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="offcanvas offcanvas-start" tabindex="-1" id="siteMenu" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title text-center" id="offcanvasExampleLabel">Menu</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul className="flex-row">
                            <li className="mx-1" data-bs-dismiss="offcanvas">
                                <Link to="/signup">
                                Signup
                                </Link>
                            </li>
                            <li className="mx-1" data-bs-dismiss="offcanvas">
                                <Link to="/login">
                                Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>  
            );
        }
    }
        
    return (
    <header>
        <div class="navbar-fixed">
            <nav className="navbar bg-body-tertiary">
                <div class="container">

                    <span class="material-symbols-outlined" data-bs-toggle="offcanvas" href="#siteMenu" role="button" aria-controls="offcanvasExample">
                        Menu
                    </span>   
                   
                    {showNavigation()}

                    <h1>
                        <Link to="/">
                            <span role="img" aria-label="shopping bag"></span>
                            The Back Alley
                        </Link>
                    </h1>
                    
                    <Cart />
                    
                </div>
            </nav>
        </div>
    </header>
    );
}

export default Nav;