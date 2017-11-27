import * as Types from './../actions/actionTypes'

function posts (state=[], action) {
	switch (action.type) {
		case Types.FETCH_POSTS:
		  return action.res;
		case Types.VOTE_POST:
		  return state.map(post => {
	        if (post.id === action.postID) {
	          if (action.option === "upVote") {
	            post.voteScore += 1
	          }
	          if (action.option === "downVote") {
	            post.voteScore -= 1
	          }
	        }
	        return post
	      });
	    case Types.EDIT_POST:
	      return state.map(post => {
	        if(post.id === action.postId) {
	          post = action.updatedPost
	        }
	        return post
	      })
		case Types.DELETE_POST:
			return state.filter(post => post.id !== action.postId)
		case Types.ADD_POST:
      		return state.concat([action.post])
		default:
		  return state;
	}
}

export default posts