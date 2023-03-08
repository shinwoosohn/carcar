import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers/">Manufacturer List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new/">Create manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/models/">Vehicle Model List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/models/new/">Create vehicle model</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/automobiles/">Automobile List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/automobiles/new/">Create automobile</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/">Appointment List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/new/">Create appointment</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/services/">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/">Technician List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/new/">Create technician</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>


      <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales/newsale">New Sales Record</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales/saleshistory">View Sales History</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales/newcustomer">New Customer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="/sales/newemployee">New Sales Employee</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  )
}

export default Nav;
