import React, { Component } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'
import { getQuestions, getAllTopics } from '../services/questions'
import FiveStars from './FiveStars'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: [],
      topics: [],
      chosenTopicId: 0,
      searchInput: ''
    }
  }

  async componentDidMount() {
    const topicResponse = await getAllTopics()

    // initialize questions with the first topic 
    const topic_id = topicResponse[0].id 

    const questionResponse = await getQuestions(false, topic_id) 

    questionResponse.sort(this.sortByDiffAsce)

    this.setState({
      topics: topicResponse,
      questions: questionResponse,
      chosenTopicId: topic_id 
    })
  }

  handleChangeTopic = async (e) => {
    const topic_id = e.target.value 

    const questionResponse = await getQuestions(false, topic_id) 
    
    this.setState({
      questions: questionResponse,
      chosenTopicId: topic_id 
    })
  }

  sortByDiffAsce = (a, b) => {
    return a.difficulty - b.difficulty 
  }

  sortByDiffDesc = (a, b) => {
    return b.difficulty - a.difficulty 
  }

  handleSort = (e) => {
    let sortType = e.target.value 
    if (sortType === "diffA") {
      sortType = this.sortByDiffAsce
    } else if (sortType === "diffD") {
      sortType = this.sortByDiffDesc 
    }

    let sortedQuestions = this.state.questions.slice() 
    sortedQuestions.sort((a, b) => sortType(a, b)) 

    this.setState({
      questions: sortedQuestions 
    })
  }

  sortBySearch = (a, b) => {
    // for sort functions, if it returns negative then 
    // a goes before b, so we want more relevant searches to 
    // set -1 point if found in content 
    let aScore = 0
    let bScore = 0 

    const searchTerm = this.state.searchInput.toLowerCase()
    
    if (a.content.toLowerCase().includes(searchTerm)) {
      console.log(a.content, 'A has', searchTerm)
      aScore -= 1
    }

    if (b.content.toLowerCase().includes(searchTerm)) {
      console.log(b.content, 'B has', searchTerm)
      bScore -= 1
    }
      
    console.log(aScore, bScore)
    return aScore - bScore 
  }

  // submit for the search function 
  handleSubmit = (e) => {
    e.preventDefault() 

    let sortedQuestions = this.state.questions.slice() 
    sortedQuestions.sort((a, b) => this.sortBySearch(a, b)) 

    this.setState({
      questions: sortedQuestions 
    })
  }

  // on change for the search function
  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value 
    })
  }

  render() {
    return (
      <div className="browse">
        <div className="browseInfo">
        <h1>Browse Questions</h1>

        <label htmlFor="chooseTopic"> Choose a topic </label>
        <select onChange={this.handleChangeTopic}>
          {
            this.state.topics.map((topic, ind) => {
              return <option value={topic.id} key={ind}>{topic.name}</option>
            })
          }
        </select>
        </div>
        <div className="browseQuestionsHeader">  
          <label htmlFor="sortQs">Sort by:</label>
          <select name="sortQs" onChange={this.handleSort}>
            <option value="diffA">Difficulty: Ascending</option>
            <option value="diffD">Difficulty: Descending</option>
          </select>
          
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
          <h1>Questions</h1>
          {
          this.state.questions.map((question, ind) => {
            return (
              <Link to={`/questions/${question.id}`} >
                <div className="browseQuestion" key={ind}>
                <p>{question.content}</p>
                <h4>Difficulty: <FiveStars num={question.difficulty} /> </h4>
                </div>
              </Link>
          )
          })
          }
        </div>
      </div>
    )
  }
}
