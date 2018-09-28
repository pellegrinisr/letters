import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from "prop-types";

const node = document.getElementById('root');

const data = {
  post: {
    id: 123,
    content: 'Blah blah blah',
    user: 'Mark Thomas'
  },
  comments: [
    {
      id: 0, 
      user: 'David', 
      content: 'such. win'
    },
    {
      id: 1,
      user: 'Hayley',
      content: 'love it',
    },
    {
      id: 2,
      user: 'Peter',
      content: 'Who are you?',
    },
    {
      id: 3,
      user: 'Mitchell',
      content: '@Peter get off Letters and do your homework',
    },
    {
      id: 4,
      user: 'Peter',
      content: '@mitchell ok :)',
    }
  ]
};

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="post">
        <h2 className="postAuthor" id={this.props.id}>
          {this.props.user}
          <span className="postBody">
            {this.props.content}
            {this.props.children}
          </span>
        </h2>
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

class Comment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.user}
          <span className="commentContent">
            {this.props.content}
          </span>
        </h2>
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      user: ''
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      user: val
    }));
    console.log(val);
  }
  handleTextChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      content: val 
    }));
    console.log(val);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onCommentSubmit({
      user: this.state.user.trim(),
      content: this.state.content.trim()
    });
    this.setState(() => ({
      user: '',
      content:''
    }))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="createComment">
        <input
          value={this.state.user}
          onChange={this.handleUserChange}
          placeholder="Your name"
          type="text"
        />
        <input 
          value={this.state.content}
          onChange={this.handleTextChange}
          placeholder="Thoughts?"
          type="text"
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}

CreateComment.propTypes = {
  onCommentSubmit: PropTypes.func.isRequired,
  content: PropTypes.string
};

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  handleCommentSubmit(comment) {
    const comments = this.state.comments;
    comment.id = Date.now();
    const newComments = comments.concat([comment]);
    this.setState({
      comments: newComments
    });
  }
  render() {
    return(
      <div className="commentBox">
        <Post 
          id={this.props.post.id}
          content={this.props.post.content}
          user={this.props.post.user}
        />
        {this.state.comments.map((comment) => {
          return (
            <Comment 
              key={comment.id}
              content={comment.content}
              user={comment.user}
            />
          );
        })}
        <CreateComment 
          onCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

CommentBox.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object)
}

render(
  <CommentBox 
    comments={data.comments}
    post={data.post}
  />,
  node
);