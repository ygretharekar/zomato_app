import axios from 'axios';

//actions

const SEARCH_SUBMITTED = 'SEARCH_SUBMITTED';
const SEARCH_FAILED = 'SEARCH_FAILED';
const HANDLE_SEARCH_RESULTS = 'HANDLE_SEARCH_RESULTS';

//action creators

export const submitSearch = () => (
	{
		type: SEARCH_SUBMITTED
	}
);

export const cancelSearch = () => (
	{
		type: SEARCH_FAILED
	}
);

export const handleSearchResults = results => (
	{
		type: HANDLE_SEARCH_RESULTS,
		data: results.data,
		attendance: results.attendance
	}
);

//async

export const searchZomato =
	query => 
		dispatch => {
			localStorage.setItem('zomato', query);
			dispatch(submitSearch());

			axios
				.get(
					'https://developers.zomato.com/api/v2.1/cities',
					{
						params: {
							'q': query
						},
						headers: {
							'user-key': '2f31f11b4705cdc98e29ac95ded3f4dd'
						}
					}
				)
				.then(
					resp => {

						// console.log(resp.data.location_suggestions);
						let { location_suggestions } = resp.data;
						
						axios
							.get(
								'https://developers.zomato.com/api/v2.1/search',
								{
									params: {
										entity_id: location_suggestions[0].id,
										entity_type: 'city'
									},
									headers: {
										'user-key': '2f31f11b4705cdc98e29ac95ded3f4dd'
									}
								}
							)
							.then(
								res => {

									console.log(res.data.restaurants);

									
									axios
										.post(
											'/api/zomato',
											{
												results: res.data.restaurants
											} 
										)
										.then(
											response => {
												console.log('data from response', response.data.attendance);
												dispatch(handleSearchResults(response.data));
											}
										)
										.catch(
											err => {
												console.log(JSON.stringify(err));
												dispatch(cancelSearch());

											}
										);
								}
							)
							.catch(
								err => {
									alert('No good restaurants there! :(');
									console.log(JSON.stringify(err.data));
									dispatch(cancelSearch());
								}
							);
					}
				)
				.catch(
					err => {
						alert('City not found :(');
						console.log(JSON.stringify(err));
						dispatch(cancelSearch());
					}
				);
		};


export const attendHotel = 
		data => 
			dispatch =>
				axios
					.post('/api/attend', data)
					.then(resp => dispatch(searchZomato(data.city)))
					.catch(err => alert(err.response.data));



//