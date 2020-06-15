import React, { Component } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'
import { getQuestions } from '../services/questions'
import FiveStars from './FiveStars'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: []
    }
  }

  async componentDidMount() {

    const questionResponse = await getQuestions(true) 

    this.setState({
      questions: questionResponse 
    })
  }

  render() {
    // uses the same css as browse because it's mapping a table of questions 
      return (
        <div className="browse">
          <div className="browseInfo">
            <h1> Your Quizmon Dashboard </h1>
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
                    <h4>Difficulty: <FiveStars num={question.difficulty} /></h4>
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

