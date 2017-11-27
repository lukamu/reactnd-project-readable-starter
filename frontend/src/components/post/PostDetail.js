import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap';
import _ from 'lodash'
import { guid } from '../../utils/utils'
import { fetchAllPosts, fetchAllCommentsByPostId,
         updateVoteComment, deleteComment, deletePost, createComment,
         editComment, editPost } from './../../actions/index'
import Comment from './../comment/Comment'
import Post from './Post'
import NotFound from './NotFound'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    fetchAllPosts: PropTypes.func.isRequired,
  }

  state = {
    createCommentOpen: false,
    editCommentOpen: false,
    comment: '',
  }

  componentDidMount() {
    this.props.fetchAllPosts()
    //this.props.fetchAllCommentsByPostId(this.props.match.params.postId)
  }

  onDeleteComment = (comment) => {
    this.props.deleteComment(comment.id);
    //this.props.history.push(`/post/${comment.parentId}`);
    this.props.fetchAllCommentsByPostId(comment.parentId);    
  }

  handleAddComment = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.postId
    const commendBody = e.target.body.value
    const author = e.target.author.value
    const addComment = {
      id: guid(),
      parentId: postId,
      timestamp: Date.now(),
      body: commendBody,
      author: author
    }
    
    this.props.createComment(postId, addComment)
    this.closeCreateCommentModal()
    this.props.fetchAllCommentsByPostId(postId);
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const commentId = this.state.comment.id
    const postId = this.state.comment.parentId
    const timestamp = Date.now()
    const body = e.target.body.value

    this.props.editComment(commentId, postId, timestamp, body)
    this.props.history.push(`/post/${postId}`)

    this.closeEditCommentModal();
  }

  openCreateCommentModal = () => {this.setState(() => ({ createCommentOpen: true }))}
  closeCreateCommentModal = () => {this.setState(() => ({createCommentOpen: false}))}

  openEditCommentModal = (com) => {
    this.setState(() => ({ comment: com }))
    this.setState(() => ({ editCommentOpen: true }))
  }
  closeEditCommentModal = () => {this.setState(() => ({editCommentOpen: false}))}

  render() {
    const { createCommentOpen, editCommentOpen } = this.state;
    const { post, comments } = this.props;
    return(
      <div className='app'>
        {post ? (
          <Post key={post.id} post={post} 
                history={this.props.history}
                showCommentButton={true}
                openCreateCommentModal={this.openCreateCommentModal} />
        ):(
          <NotFound/>
        )}
        {post && comments && (
        <div className='comments-container'>
          <ol className='comments-list'>
              {comments.map(comment => (
                 <Comment key={comment.id} comment={comment} 
                          updateVoteComment={this.props.updateVoteComment}
                          onDeleteComment={this.onDeleteComment}
                          openEditCommentModal={this.openEditCommentModal}/>
            ))}
          </ol>
        </div>)}

        <Modal show={createCommentOpen} onHide={this.closeCreateCommentModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={this.handleAddComment} className="create-post-form">
              <div className="create-post-details">
                <input type="text" name="author" placeholder="Author" required/>
                <textarea name="body" placeholder="Insert your comment" required/>
                <button>Add Comment</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={editCommentOpen} onHide={this.closeEditCommentModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={this.handleEditComment} className="create-post-form">
              <div className="create-post-details">
                <input type="text" name="author" value={this.state.comment.author} style={{color:"#DCDCDC"}} readOnly/>
                <textarea name="body" defaultValue={this.state.comment.body} />
                <button>Edit Comment</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return { 
    post : _.find(state.posts, { id: match.params.postId }),
    comments: state.comments[match.params.postId]
  }
}

export default connect(mapStateToProps, 
  { fetchAllCommentsByPostId, fetchAllPosts,
    updateVoteComment, deleteComment, deletePost, createComment,
    editComment, editPost })(PostDetail);
