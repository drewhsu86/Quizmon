import React, { Component } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'
import { getQuestions } from '../services/questions'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: []
    }
  }

  async componentDidMount() {

    const questionResponse = await getQuestions(true) 
    console.log(questionResponse)

    this.setState({
      questions: questionResponse 
    })
  }

  render() {
    console.log('token', localStorage.getItem('authToken'))
    // if we are not logged in, return a 'you are not logged in' screen 
      return (
        <div className="browse">
          <div className="browseInfo">
            <h1>Home - Your Quizmon Dashboard </h1>
            <Link to="/create">
            <button>Create A Question</button>
            </Link>
          </div>
          <div className="browseQuestions"> 
          <h1>Your Questions</h1>
          {
            this.state.questions.map((question, ind) => {
              return (
                <div className="browseQuestion" key={ind}>
                  <Link to={`/edit/${question.id}`} >
                    <p>{question.content}</p>
                    <h4>Difficulty: {question.difficulty}</h4>
                  </Link>
                </div>
              )
            })
            }
            </div>
        </div>
      )
    
  }
}

