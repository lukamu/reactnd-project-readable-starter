import { combineReducers } from 'redux'
import * as Types from './../actions/actionTypes'

function categories (state=[], action) {
	switch (action.type) {
		case Types.FETCH_CATEGORIES:
		  return  action.res
		default:
		  return state
	}
}

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

export default combineReducers({
  posts,
  categories,
  comments,
})