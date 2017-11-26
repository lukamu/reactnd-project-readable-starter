import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp, labelColor } from '../../utils/utils'
import { FaThumbsOUp, FaThumbsODown, FaEdit } from 'react-icons/lib/fa';
import { MdDelete } from 'react-icons/lib/md'

const Comment = ({ comment, updateVoteComment, onDeleteComment, openEditCommentModal }) => (
  <li key={comment.id}>
    <div className="comment-main-level">
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="label label-info" data-reactid="45">{comment.author}</h6>
              &nbsp;
              <h6 className="label label-default" data-reactid="45">Posted on {formatTimestamp(comment.timestamp)}</h6>
              &nbsp;
              <h6 className={labelColor(comment.voteScore)} data-reactid="45">Score: {comment.voteScore}</h6>
                <i>
                  <MdDelete size={20} onClick={() => {onDeleteComment(comment)}}/>
                </i>
                <i>
                  <FaEdit size={18} onClick={() => {openEditCommentModal(comment)}}/>
                </i>
                <i>
                  <FaThumbsODown size={16} onClick={() => {updateVoteComment(comment.id, comment.parentId, "downVote")}}/>
                </i>
                <i>
                  <FaThumbsOUp size={16} onClick={() => {updateVoteComment(comment.id, comment.parentId, "upVote");}}/>
                </i>
            </div>
            <div className="comment-content">
              {comment.body}
            </div>
          </div>
        </div>
  </li>
)


Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  updateVoteComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  openEditCommentModal: PropTypes.func.isRequired,
}


export default Comment;