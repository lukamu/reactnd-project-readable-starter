import * as ReadableApi from './../utils/ReadableApi'
import * as Types from './actionTypes.js';

/*******************************/
/***** CATEGORIES ACTIONS ******/
/*******************************/
const receiveCategories = (res) => ({
  type: Types.FETCH_CATEGORIES,
  res
});

/* Async call: action returns a function */
export const fetchCategories = () => dispatch => (
	ReadableApi.getCategories()
	.then(categories => dispatch(receiveCategories(categories)))
);

/*************************/
/***** POST ACTIONS ******/
/*************************/
const receivePost = (res) => ({
  type: Types.FETCH_POSTS,
  res
});

/* Async call: action returns a function */
export const fetchAllPosts = () => dispatch => (
	ReadableApi.getPosts()
	.then(posts => dispatch(receivePost(posts)))
);

const votePost = (postID, option) => ({
  type: Types.VOTE_POST,
  postID,
  option
});

export const updateVotePost = (postID, option) => dispatch => (
  ReadableApi.votePost(postID, option)
  .then(post => dispatch(votePost(postID, option)))
);

export const deletePost = (postId) => dispatch => (
    ReadableApi.deletePost(postId)
    .then(() => dispatch({ type: Types.DELETE_POST, postId }))
);

export const createPost = (post) => dispatch => (
    ReadableApi.addPost(post)
    .then(() => dispatch({ type: Types.ADD_POST, post }))
);

export const editPost = (postId, title, body) => dispatch => (
    ReadableApi.editPost(postId, title, body)
    .then(updatedPost => {dispatch({ type: Types.EDIT_POST, updatedPost, postId })})
);

/****************************/
/***** COMMENT ACTIONS ******/
/****************************/
const receiveComments = (parentId, comments) => ({
  type: Types.FETCH_COMMENTS,
  parentId,
  comments
});

/* Async call: action returns a function */
export const fetchAllCommentsByPostId = (parentId) => dispatch => (
	ReadableApi.getAllComments(parentId)
	.then(comments => dispatch(receiveComments(parentId, comments)))
);

const voteComment = (commentId, parentId, option) => ({
  type: Types.VOTE_COMMENT,
  commentId,
  parentId,
  option
});

export const updateVoteComment = (commentId, parentId, option) => dispatch => (
    ReadableApi.voteComment(commentId, option)
    .then(updatedComment => dispatch(voteComment(commentId, parentId, option)))
);

export const deleteComment = (commentId) => dispatch => (
    ReadableApi.deleteComment(commentId)
    .then(() => dispatch({ type: Types.DELETE_COMMENT, commentId }))
);

const addComment = (parentId, comment) => ({
  type: Types.ADD_COMMENT, 
  parentId, 
  comment
});

export const createComment = (parentId, comment) => dispatch => (
    ReadableApi.addComment(comment)
    .then(comment => dispatch(addComment(parentId, comment)))
);

const updateComment = (updatedComment, commentId, parentId) => ({
  type: Types.EDIT_COMMENT, 
  updatedComment, 
  commentId, 
  parentId 
})

export const editComment = (commentId, parentId, timestamp, body) => dispatch => (
    ReadableApi.editComment(commentId, timestamp, body)
      .then(updatedComment => dispatch(updateComment(updatedComment, commentId, parentId)))
);

