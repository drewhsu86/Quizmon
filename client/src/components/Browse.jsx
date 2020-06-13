import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getQuestions, getAllTopics } from '../services/questions'

export default class Browse extends Component {
  constructor() {
    super()

    this.state = {
      questions: [],
      topics: []
    }
  }

  async componentDidMount() {
    const topicResponse = await getAllTopics()
    console.log(topicResponse)

    // initialize questions with the first topic 
    const topic_id = topicResponse[0].id 

    const questionResponse = await getQuestions(false, topic_id) 
    console.log(questionResponse)

    this.setState({
      questions: questionResponse 
    })
  }

  render() {
    return (
      <div className="browse">
        <h1>Browse Questions</h1>
        {
          this.state.questions.map((question, ind) => {
          return (
            <div className="browseQuestion" key={ind}>
              <Link to={`/questions/${question.id}`} >
                <p>{question.content}</p>
                <h4>Difficulty: {question.difficulty}</h4>
              </Link>
            </div>
          )
          })
        }
      </div>
    )
  }
}
