import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import { fetchAllPosts } from './../../actions/index'
import Post from './Post'

class ListPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchAllPosts());
  }

  render() {
    
    const { posts, totalPosts, orderBy } = this.props;
    //we can improve the app allowing ascending/descending sorting option for name and vote
    posts.sort(sortBy(`-${orderBy}`))

    return(
      <div className='list-posts'>
        {totalPosts !== posts.length && (
          <div className='showing-posts'>
            <span>Now showing {posts.length} of {totalPosts} total</span>
            <Link to={'/'}>
              <button>Show all posts</button>
            </Link>
          </div>)}
        <ol className='post-list'>
          {posts.map(post => (
             <Post key={post.id} post={post} showIcon={true} history={this.props.history} />
        ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  const selectedCategory = match.params.category
  let showingPosts = selectedCategory ? state.posts.filter(post => post.category === selectedCategory) : state.posts

  return { 
    posts: showingPosts ,
    totalPosts: state.posts.length,
  }
}

export default connect(mapStateToProps)(ListPosts);