import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { formatTimestamp, labelColor } from '../../utils/utils'
import { updateVotePost, fetchAllPosts, 
         fetchAllCommentsByPostId, deletePost, editPost } from './../../actions/index'
import { FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';


class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    updateVotePost: PropTypes.func.isRequired,
    showCommentButton: PropTypes.bool,
    showIcon: PropTypes.bool,
  };

  static defaultProps = {
    showCommentButton: false,
    showIcon: false,
  }

  state = {
    editPostOpen: false,
    post: '',
  }

  componentDidMount() {
    this.props.fetchAllCommentsByPostId(this.props.post.id)
  }

  bgImage(name) {
    const imageUrl = require(`./../../icons/${name}.png`)
    return <div className='post-avatar col-sm-2' style={{ backgroundImage: `url(${imageUrl})` }} />
  }

  onDeletePost = (id) => {
    this.props.deletePost(id)
    this.props.history.push('/')
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const postId = this.props.post.id
    const title = e.target.title.value
    const body = e.target.body.value

    this.props.editPost(postId, title, body)
    this.closeEditPostModal();
  }

  openEditPostModal = (post) => {
    this.setState(() => ({ post }))
    this.setState(() => ({ editPostOpen: true }))
  }

  closeEditPostModal = () => {this.setState(() => ({editPostOpen: false}))}


  render() {
    const { editPostOpen } = this.state;
    const { post, comments, updateVotePost, fetchAllPosts, showCommentButton, 
            showIcon, openCreateCommentModal } = this.props;
    return(
      <div className='app'>
      {post && (
        <div className='nav-header'>
          {showIcon && (this.bgImage(post.category))}
          {showIcon && (<div className='col-sm-1'>&nbsp;</div>)}
          <div>
            <div className='post-details'>
              <Link key={post.id} to={`/${post.category}/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.body}</p>
              <p data-reactid="39">
                <span className="label label-info" data-reactid="40">
                  Category: {post.category}
                </span>
                &nbsp;
                <span className="label label-info" data-reactid="45">
                  Author: {post.author}
                </span>
                &nbsp;
                <span className={labelColor(post.voteScore)} data-reactid="45">
                  Score: {post.voteScore}
                </span>
                &nbsp;
                <span className="label label-default" data-reactid="45">
                 {comments && comments ? comments.length : 0} comments 
                </span>
              </p>
            </div>
            {showIcon && (<div className='col-sm-2'>&nbsp;</div>)} 
            <div className="bottom-comment">
                <div className="comment-date">{formatTimestamp(post.timestamp)}</div>
                <ul className="comment-actions">
                    <li className="noline">
                        <FaThumbsOUp onClick={() => {
                        updateVotePost(post.id, "upVote");
                        fetchAllPosts();
                        }} />
                    </li>
                    <li className="withline">
                        <FaThumbsODown onClick={() => {
                        updateVotePost(post.id, "downVote");
                        fetchAllPosts();
                        }} />
                    </li>
                    {showCommentButton &&
                    <li className="withline" onClick={() => openCreateCommentModal()}>Add Comment</li>
                    }
                    <li className="withline" onClick={() => this.openEditPostModal(post)}>Edit</li>
                    <li className="noline" onClick={() => this.onDeletePost(post.id)}>Remove</li>
                </ul>
            </div>
          </div>
        </div>)}

        <Modal show={editPostOpen} onHide={this.closeEditPostModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={this.handleEditPost} className="create-post-form">
              <div className="create-post-details">
                <input type="text" name="title" defaultValue={this.state.post.title} required/>
                <textarea name="body" defaultValue={this.state.post.body} required/>
                <button>Save</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, { post }) {
  return { 
    comments: state.comments[post.id]
  }
}

export default connect(mapStateToProps, 
  { updateVotePost, deletePost, editPost, fetchAllPosts, fetchAllCommentsByPostId })(Post);
