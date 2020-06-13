import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getOneQuestion } from '../services/questions'
import { createComment, deleteComment } from '../services/comments'

class Question extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: null,
      guessedAnswer: '',
      commentInput: ''
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id 
    console.log(id)

    const questionResponse = await getOneQuestion(id) 
    console.log(questionResponse)

    this.setState({
      question: questionResponse 
    })
  }

  handleAnswer = (letter) => {
    this.setState({
      guessedAnswer: letter
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const question = this.state.question

    if (question) {
      return (
        <div className="questionShow">
          <h3> {question.topic.name} Question </h3>
          <h4> Difficulty: {question.difficulty} </h4>
          <p>
            {question.content}
          </p>
          {this.state.guessedAnswer ? (
            <div className="questionAnswers">
              {
                ['a', 'b', 'c', 'd'].map(letter => (
                  <div className="questionAnswer"  key={letter} 
                    style={this.state.guessedAnswer === letter ? (this.state.guessedAnswer === this.state.question.correct_answer ? { backgroundColor: 'green' } : { backgroundColor: 'red' }) : (letter === this.state.question.correct_answer ? { backgroundColor: 'green' } : null)}
                  >
                    {question['answer_' + letter]}
                  </div>
                ))
              }              
            </div> ) : (
            <div className="questionAnswers">
              {
                ['a', 'b', 'c', 'd'].map(letter => (
                  <div className="questionAnswer" key={letter}
                    onClick={() => {this.handleAnswer(letter)}}
                  >
                    {question['answer_' + letter]}
                  </div>
                ))
              }              
            </div> )
          }
          
          <h3>Post a Comment</h3>
          <form onSubmit={this.handleSubmit}>
            <textarea onChange={(e) => {this.setState({ commentInput: e.target.value })}} value={this.state.commentInput}></textarea>
            <button>Submit Comment</button>
          </form>
          
          <h3>Comments</h3> 
          {
            question.comments.map((comment, ind) => (
              <div className="comment" key={ind}> 
                <p> <strong> From: </strong> {comment.user.username} </p>
                <p>{comment.content}</p>
              </div>
            ))
          }
        </div>
      )
    
    } else {
      return (
        <div className="questionShow">
          Loading Question...
        </div>
      )
    }
  }
}

export default withRouter(Question)
