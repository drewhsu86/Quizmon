import React, { Component } from 'react'
import './Question.css'
import { withRouter } from 'react-router-dom'
import { getOneQuestion } from '../services/questions'
import { createComment, deleteComment } from '../services/comments'
import FiveStars from './FiveStars'

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
    await this.initializeQuestion()
  }

  initializeQuestion = async () => {
    const id = this.props.match.params.id 

    const questionResponse = await getOneQuestion(id) 

    this.setState({
      question: questionResponse,
      commentInput: ''
    })
  }

  handleAnswer = (letter) => {
    this.setState({
      guessedAnswer: letter
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createComment({
        content: this.state.commentInput,
        question_id: this.state.question.id,
        user_id: this.props.user.id
      })

      this.initializeQuestion()
    } catch (er) {
      console.log(er)
    }
  }

  handleDeleteComment = async (id) => {
    try {
      const response = await deleteComment(id)

      this.initializeQuestion()
    } catch (er) {
    console.log(er)
    }
  }

  render() {
    const question = this.state.question
    
    if (question) {
      return (
        <div className="questionShow">
          <div className="questionInfo">
            <h3> {question.topic.name} Question </h3>
            <h4> Difficulty: <FiveStars num={question.difficulty} /> </h4>
            <h4> Written By: <i>{question.user.username}</i> </h4>
            <p>
            &nbsp; {question.content}
            </p>
          </div>
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
          
          <div className="questionComments">
          { this.props.user ? (<div className="questionPostComment">
            <h3>Post a Comment</h3>
            <form onSubmit={this.handleSubmit}>
              <textarea onChange={(e) => { this.setState({ commentInput: e.target.value }) }} value={this.state.commentInput}></textarea>
              <button>Submit Comment</button>
            </form>
          </div>) : null}
          
          <h3>Comments</h3> 
          {
            question.comments.map((comment, ind) => (
              <div className="questionComment" key={ind}> 
                <p> <strong> From: </strong> {comment.user.username} </p>
                <p className="questionCommentText">{comment.content}</p>
                {
                  this.props.user && this.props.user.id === comment.user.id ? (
                    <button onClick={() => this.handleDeleteComment(comment.id)}>Delete</button>
                  ) : null
                }
              </div>
            ))
            }
          </div>
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
