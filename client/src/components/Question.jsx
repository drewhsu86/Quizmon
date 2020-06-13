import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getOneQuestion } from '../services/questions'

class Question extends Component {
  constructor() {
    super()

    this.state = {
      question: null,
      guessedAnswer: ''
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
                  <div className="questionAnswer"
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
                  <div className="questionAnswer"
                    onClick={() => {this.handleAnswer(letter)}}
                  >
                    {question['answer_' + letter]}
                  </div>
                ))
              }              
            </div> )
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
