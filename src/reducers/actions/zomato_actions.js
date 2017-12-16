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
			return axios
				.post('/api/yelp', { query })
				.then(
					resp => dispatch(handleSearchResults(resp))
				)
				.catch(
					err => {
						alert(err.response.data);
						dispatch(cancelSearch());
					}
				);
		};

export const attendHotel = 
		data => 
			dispatch => 
				axios
					.post('/api/attend', data)
					.then(resp => dispatch(searchZomato(data.location)))
					.catch(err => alert(err.response.data));

//