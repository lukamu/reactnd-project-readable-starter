import * as Types from './../actions/actionTypes'

function comments (state={}, action) {
	const { comments, parentId, commentId, updatedComment } = action
	switch (action.type) {
		case Types.FETCH_COMMENTS:
		  return Object.assign({}, state, {[parentId]: comments});
		case Types.VOTE_COMMENT:
	      return {
	        ...state,
	        [parentId]: state[parentId].map(comment => {
	          if(comment.id === commentId) {
		          if (action.option === "upVote") {
		            comment.voteScore += 1
		          }
		          if (action.option === "downVote") {
		            comment.voteScore -= 1
		          }
		        }
		        return comment
		      })
	    	}
	    case Types.EDIT_COMMENT:
	      return {
	        ...state,
	        [parentId]: state[parentId].map(comment => {
	          if(comment.id === commentId) {
	            comment = updatedComment
	          }
	          return comment
	        })
	      }
	    case Types.DELETE_COMMENT:
      		return state
      	case Types.ADD_COMMENT:
      		return {
	        	...state,
	        	[parentId]: state[parentId]
         	}
      	default:
			return state;
		}
}

export default comments
