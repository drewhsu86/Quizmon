import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getOneQuestion } from '../services/questions'

class Question extends Component {
  constructor() {
    super()

    this.state = {
      question: null 
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

  render() {
    const question = this.state.question

    if (question) {
      return (
        <div className="questionShow">
          Question page
          <h3> {question.topic.name} Question </h3>
          <h4> Difficulty: {question.difficulty} </h4>
          <p>
            {question.content}
          </p>
          <div className="questionAnswers">
              <div className="questionAnswer">
                {question.answer_a}
              </div>
              <div className="questionAnswer">
                {question.answer_b}
              </div>
              <div className="questionAnswer">
                {question.answer_c}
              </div>
              <div className="questionAnswer">
                {question.answer_d}
              </div>
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
