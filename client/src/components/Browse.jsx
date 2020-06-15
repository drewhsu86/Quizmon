import React, { Component } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'
import { getQuestions, getAllTopics } from '../services/questions'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: [],
      topics: [],
      chosenTopicId: 0,
      sortQs: this.sortByDiffAsce
    }
  }

  async componentDidMount() {
    const topicResponse = await getAllTopics()

    // initialize questions with the first topic 
    const topic_id = topicResponse[0].id 

    const questionResponse = await getQuestions(false, topic_id) 

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
    const sortType = e.target.value 
    if (sortType === "diffA") {
      this.setState({
        sortQs: this.sortByDiffAsce
      })
    } else if (sortType === "diffD") {
      this.setState({
        sortQs: this.sortByDiffDesc 
      })
    }
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
        </div>
        <div className="browseQuestions"> 
          <h1>Questions</h1>
          {
          this.state.questions.sort(this.state.sortQs).map((question, ind) => {
            return (
              <Link to={`/questions/${question.id}`} >
                <div className="browseQuestion" key={ind}>
                <p>{question.content}</p>
                <h4>Difficulty: {question.difficulty}</h4>
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
