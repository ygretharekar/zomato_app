import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchZomato, attendHotel } from '../reducers/actions/zomato_actions';

class SearchComp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			query: '',
			animate: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.attend = this.attend.bind(this);
	}

	componentWillMount(){
		if( localStorage.getItem('zomato') && (this.props.searchResults.length === 0) ){
			console.log('returning..');

			this.setState({
				query: localStorage.getItem('zomato'),
				animate: true
			});
			
			this.handleSubmit();
		}
		window.addEventListener('keypress', this.handleKeypress);
	}
	
	handleKeypress(e){
		if(e.keyCode === 13) this.handleSubmit();
	}

	attend(res_id){

		// console.log(res_id);

		let data = {
			res_id,
			city: localStorage.getItem('zomato'),
			userID: this.props.userID,
			token: this.props.token
		};

		this.props.attendHotel(data);
	}

	handleSubmit(){

		const { query } = this.state;

		if( query !== '' ){
			this.props.searchZomato(query);
			this.setState(
				{
					animate: true
				}
			);
		}
	}



	handleChange(e){
		this.setState(
			{
				query: e.target.value
			}
		);
	}

	render(){

		const renderResults = this.props.searchResults.map(
			(rest, i) => (
				<div 
					key={i}
					className='card result'
					style={
						{
							marginBottom: '10px',
							animationDelay: 2 + 0.2* i + 's'  
						}
					}
				>

					{/* <img className='card-img-top img-fluid' src={ rest.restaurant.photos_url } alt='restaurant image' /> */}
					<div className='card-block'>
						<div className='card-title d-flex justify-content-between'>
							<h3>
								{ rest.restaurant.name }
							</h3>
							<button
								className= 'btn btn-sm'
								onClick= { this.attend.bind(this, rest.restaurant.R.res_id) }
							>	
								
								{
									this.props.currentAttendance.find(
										id => {
											if(id.id == rest.restaurant.R.res_id) {
												return id.attendees.find(
													a => a == this.props.userID
												);
											}
										}
									) ? 
										<span className="text-danger">Cancel</span> 
										:
										<span className="text-primary">Going?</span> 
								}
							</button>
						</div>
						<div className='d-flex justify-content-between'>
							<h6 className='card-subtitle text-muted'>
								{ rest.restaurant.cuisines }
							</h6>
							<h6 className='card-subtitle'>
								{
									this.props.currentAttendance.find(
										id => {
											if(id.id == rest.restaurant.R.res_id) {
												return id.attendees.find(
													a => a == this.props.userID
												);
											}
										}
									) &&
									'Attending'
								}
							</h6>
							

							<h6 className='badge badge-warning'>
								{
									this.props.currentAttendance.map(
										id =>{
											if(id.id == rest.restaurant.R.res_id){
												console.log('attending..', id.attendees);
												return id.attendees.length + ' Going';

											}
										}
									)
								}
							</h6>
						</div>
					</div>
				</div>
			)
		);

		return(
			<div>
				<div className = 'search-page'>
					{
						!this.props.searchResults.length > 0 && 
						!this.props.isSearching && 
						<div>
							<div
								className='text-center search-name'
								style={{
									textTransform: 'uppercase',
									position: 'relative',
									top: '-70px'
								}}
							>
							nightlife coordinator
							</div>
							<p 
								className='text-muted text-center'
								style={{fontSize:'100', position:'relative', top: '-50px'}}
							>
								Powered by Zomato
							</p>
						</div>
					}
					{
						this.props.isSearching && 
						<div
							className= 'loader'
							style={{
								position: 'relative',
								top: '-70px'
							}}
						>
						</div>
					}
					{
						!this.props.isSearching &&
						this.props.failed &&
						<div>
							<h1>
								Search failed
							</h1>
						</div>
					}
					<div> 
						<div
							className='input-group'
							style={{
								position: 'relative',
								top: '-30px',
								animation: this.props.searchResults.length > 0 && 'searchbox 2s forwards'
							}}
						>

						
							<input
								type='text'
								id='searchBox'
								className='form-control'
								placeholder='Type the city '
								value={this.state.query}
								onChange={this.handleChange}/>
							<span className="input-group-btn">
								<button 
									className="btn btn-secondary" 
									type="button" 
									onClick={this.handleSubmit}
								>
									Go!
								</button>
							</span>
						</div>
					</div>
				</div>
				{
					this.props.searchResults.length > 0 &&
					<div className='container dis-results' style={{marginBottom: '20px', marginTop:'20px'}}>
						{ renderResults }
					</div>
				}
			</div>

		);
	}
}

const mapStateToProps = state => (
	{
		loggedIn: state.auth.isAuthenticated,
		isSearching: state.zomato.isSearching,
		failed: state.zomato.isSearching,
		currentAttendance: state.zomato.attendance,
		searchResults: state.zomato.data,
		user: state.auth.user,
		userID: state.auth.userID,
		token: state.auth.id_token
	}
);

SearchComp.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	isSearching: PropTypes.bool.isRequired,
	failed: PropTypes.bool.isRequired,
	user: PropTypes.string.isRequired,
	userID: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	currentAttendance: PropTypes.array.isRequired,
	searchResults: PropTypes.array.isRequired,
	attendHotel: PropTypes.func.isRequired,
	searchZomato: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { searchZomato, attendHotel } )(SearchComp);