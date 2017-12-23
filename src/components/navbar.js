import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = props => {

	return(
		<div>
			<nav className="navbar d-flex">
				<ul className="nav nav-pills justify-content-end">
					<li className='nav-item'>
						<Link 
							to='/login'
							className='nav-link'
						>
							Login
						</Link>
					</li>
					<li className='nav-item'>
						<Link 
							to='/'
							className='nav-link'
						>
							Signup
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);

};

export default Navbar;