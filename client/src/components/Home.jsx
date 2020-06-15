import React, { Component } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'
import { getQuestions } from '../services/questions'
import FiveStars from './FiveStars'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: [],
      searchInput: ''
    }
  }

  async componentDidMount() {

    const questionResponse = await getQuestions(true) 

    this.setState({
      questions: questionResponse 
    })
  }

  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value 
    })
  }

  sortBySearch = (a, b) => {
    // for sort functions, if it returns negative then 
    // a goes before b, so we want more relevant searches to 
    // add a negative number (using question.content and question.topic)
    // lets say -3 points if topic matches, and -1 point if found in content 
    let aScore = 0
    let bScore = 0 
    
    if (a.topic.name.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
      aScore -= 3
    }
    if (a.content.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
      aScore -= 1
    }
    
    if (b.topic.name.toLowerCase().includes(this.state.searchInput.toLowerCase)) {
      bScore -= 3
    }
    if (b.content.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
      bScore -= 1
    }
      
    return aScore - bScore 
  }

  handleSubmit = (e) => {
    e.preventDefault() 

    let sortedQuestions = this.state.questions.slice() 
    sortedQuestions.sort((a, b) => this.sortBySearch(a, b)) 

    this.setState({
      questions: sortedQuestions 
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

          <div className="browseQuestionsHeader">  
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="searchQs">Search by term:</label>
              <input name="searchQs"
                value={this.state.searchInput}
                onChange={this.handleChange}
              ></input>
              <button>Submit</button>
            </form>
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
                    <p><strong>Topic:</strong> &nbsp; {question.topic.name}</p>
                    { question.private ? <p style={{color: "red"}}>THIS QUESTION IS PRIVATE</p> : null }
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

