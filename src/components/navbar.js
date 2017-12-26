import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = props => {
	return(
		<div>
			<nav className="navbar d-flex">
				<ul className="nav nav-pills justify-content-end">
					<li className='nav-item'>
						{
							!props.loggedIn &&
							<Link 
								to='/login'
								className='nav-link'
							>
								Login
							</Link>		
						}

						{ props.loggedIn && <div className='username'><h4>{props.name}</h4></div> }

					</li>
					{
						props.loggedIn &&
						<li className='nav-item'>
							<button 
								className='btn btn-info'
								onClick={ props.logout }
							>
								Logout
							</button>
						</li>
					}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;