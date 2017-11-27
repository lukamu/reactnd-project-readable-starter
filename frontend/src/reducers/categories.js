import * as Types from './../actions/actionTypes'

function categories (state=[], action) {
	switch (action.type) {
		case Types.FETCH_CATEGORIES:
		  return  action.res
		default:
		  return state
	}
}

export default categories