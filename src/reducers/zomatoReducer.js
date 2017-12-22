
const initialState = {
	isSearching: false,
	data: [],
	attendance: []
};

const zomatoReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SEARCH_SUBMITTED':
		return {
			...state,
			isSearching: true,
			data: [],
			attendance: []
		};
	
	case 'SEARCH_FAILED':
		return {
			...state,
			isSearching: false,
			data: [],
			attendance: []
		};
	
	case 'HANDLE_SEARCH_RESULTS':
		return {
			...state,
			isSearching: false,
			data: action.data,
			attendance: action.attendance
		};
	
	default:
		return state;
	}
};

export default zomatoReducer;