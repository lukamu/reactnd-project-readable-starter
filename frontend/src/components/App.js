import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListPosts from './post/ListPosts'
import PostDetail from './post/PostDetail'
import { fetchCategories, createPost } from './../actions/index'
import { guid } from '../utils/utils'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

class App extends Component {

  static propTypes = {
    cat: PropTypes.array.isRequired,
  }


  state = {
    createPostOpen: false,
    orderBy: 'voteScore',
  }
  
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleAddPost = (e) => {
    e.preventDefault()
    const submitPost = {
      id: guid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value,
    }
    this.props.dispatch(createPost(submitPost))
    this.closePostModal()
    this.props.history.push('/')
  }

  openPostModal = () => {
      this.setState(() => ({
        createPostOpen: true,
      }))
  }

  closePostModal = () => {this.setState(() => ({createPostOpen: false}))}


  render() {
      const { cat } = this.props
      const orderByArrayValues = ['voteScore', 'timestamp'];
      return (
        <div className="app">
          <div className="row">
          <div className="col-sm-6">
            <Link className="home" to="/">
              <h1>Udacity - Readable</h1>
            </Link>
          </div>
          <div className="col-sm-6">
            <Button bsStyle="primary" bsSize="large" className="pull-right h1" onClick={() => this.openPostModal()}>
              Add Post
            </Button>
          </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <ButtonToolbar className="pull-right">
              {cat && cat.map(category => (
                <Link key={category.name} to={`/${category.path}`}>
                  {/* Improve removing button and using a link with image and description for that category*/}
                  <Button>{category.name}</Button>
                </Link>
              ))}
              </ButtonToolbar>
            </div>
            <div className="col-sm-6">
              <span>OrderBy:</span>
              {orderByArrayValues && orderByArrayValues.map(value => (
                  <Button key={value} bsStyle="link" onClick={() => this.setState({orderBy: value})} >{value}</Button>
              ))}
            </div>
          </div>

          <Modal show={this.state.createPostOpen} onHide={this.closePostModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={this.handleAddPost} className="create-post-form">
                <div className="create-post-details">
                  <input type="text" name="author" placeholder="Author" required/>
                  <input type="text" name="title" placeholder="Title" required/>
                  <select name="category" className="field-select">
                    {this.props.cat && this.props.cat.map((category) => {
                      return(
                        category.name !=='all' && (
                        <option key={category.name} value={category.name}>{category.name}</option>
                      ))}
                    )}
                  </select>
                  <textarea name="body" placeholder="Insert your comment" required/>
                  <button>Create a new post</button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          <Route exact path="/" render={(props) => (
            <ListPosts {...props} orderBy={this.state.orderBy} />
          )}/>
          <Route exact path="/:category" render={(props) => (
            <ListPosts {...props} orderBy={this.state.orderBy} />
          )}/>
          <Route exact path="/:category/:postId" component={PostDetail} />
      </div>
      )
    }
}

function mapStatetoProps(state) {
  return { 
    /* 
    * Return an array of objects, adding 'all' to the list.
    * The user can always select 'all' to see all the posts.
    */
    cat: state.categories.concat({ name: 'all', path: ''}) 
  }
}


export default withRouter(connect(mapStatetoProps)(App));

