const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

//###### CATEGORIES ########//
export const getCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

//###### POSTS ########//
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

// option are upVote or downVote (api-server/post.js)
export const votePost = (postId, option) => 
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
   }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res.json())

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const editPost = (postId, title, body) =>
    fetch(`${api}/posts/${postId}`, {
      method: 'PUT',
      headers: {
      ...headers,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, body: body })
    }).then(res => res.json())

//###### COMMENTS ########//
export const getAllComments = (parentId) =>
  fetch(`${api}/posts/${parentId}/comments`, { headers })
    .then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
   }).then(res => res.json())

export const voteComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const addComment = (comment) => 
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const editComment = (commentId, timestamp, body) => 
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: timestamp, body: body })
  }).then(res => res.json())


