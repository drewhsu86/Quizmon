import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createQuestion, getAllTopics } from '../services/questions'
  
export default class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      correct_answer: 'a',
      difficulty: 1,
      answer_a: '',
      answer_b: '',
      answer_c: '',
      answer_d: '',
      make_private: false,
      topics: [],
      topic_id: 0, // 0 shouldn't exist as a topic id in db 
      msg: ''
    }
  }

  async componentDidMount() {
    const topicResponse = await getAllTopics()
    console.log(topicResponse)

    if (topicResponse.length > 0) {
      this.setState({
        topics: topicResponse,
        topic_id: topicResponse[0].id
      })
    }
  } 

  handleChange = (e, whichState) => {
    console.log('handleChange: ', whichState)
    this.setState({
      [whichState]: e.target.value 
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const questionData = {
      content: this.state.content,
      correct_answer: this.state.correct_answer,
      difficulty: parseInt(this.state.difficulty),
      answer_a: this.state.answer_a,
      answer_b: this.state.answer_b,
      answer_c: this.state.answer_c,
      answer_d: this.state.answer_d,
      private: this.state.make_private,
      user_id: this.props.user.id,
      topic_id: this.state.topic_id
    }

    try {
      const response = await createQuestion(questionData)

      console.log(response)
    } catch (er) {
      console.log(er)
    }
  }


  render() {
    console.log(this.state)
    if (this.state.topics.length <= 0) {
      return (
        <div className="questionCreate">
          <h1> Page is loading... </h1>
        </div>
      )
    } else {
      return (
        <div className="questionCreate">

          {
            this.state.msg ? <h1>{this.state.msg}</h1> : null
          }

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="questionText">Question Text</label>
            <textarea
              id="questionText"
              value={this.state.content}
              onChange={e => this.handleChange(e, 'content')}
            ></textarea>

            <label htmlFor="topic">Topic</label>
            <select
              id="topic"
              onChange={e => this.handleChange(e, 'topic_id')}
            >
              {
                this.state.topics.map((topic) => {
                  return <option value={topic.id}>{topic.name}</option>
                })
              }
            </select>

            <label htmlFor="correctAnswers">Correct Answer</label>
            <select
              id="correctAnswers"
              onChange={e => this.handleChange(e, 'correct_answer')}
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>

            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              onChange={e => this.handleChange(e, 'difficulty')}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label htmlFor="make_private">Make question publicly viewable?</label>
            <select
              id="make_private"
              onChange={e => this.handleChange(e, 'make_private')}
            >
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </select>

            <label htmlFor="answer_a">Answer 'A' Text</label>
            <textarea
              id="answer_a"
              value={this.state.answer_a}
              onChange={e => this.handleChange(e, 'answer_a')}
            ></textarea>

            <label htmlFor="answer_b">Answer 'B' Text</label>
            <textarea
              id="answer_b"
              value={this.state.answer_b}
              onChange={e => this.handleChange(e, 'answer_b')}
            ></textarea>

            <label htmlFor="answer_c">Answer 'C' Text</label>
            <textarea
              id="answer_c"
              value={this.state.answer_c}
              onChange={e => this.handleChange(e, 'answer_c')}
            ></textarea>

            <label htmlFor="answer_d">Answer 'D' Text</label>
            <textarea
              id="answer_d"
              value={this.state.answer_d}
              onChange={e => this.handleChange(e, 'answer_d')}
            ></textarea>

            <button>Submit</button>
          </form>
        
        </div>
      )
    }
  }
  
}