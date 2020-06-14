import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="about">
      <h1>About Quizmon</h1>
      <p>
        Hi, my name is Andrew and I was inspired to create Quizmon because of my journey trying to learn software engineering and web development. I've found that there are many great and free resources on the web for new and learning developers, including tutorials (such as on <a href="https://www.youtube.com" alt="link to youtube" target="_blank">Youtube</a>) and <a href="https://www.stackoverflow.com" alt="link to stack overflow" target="_blank">Stack Overflow</a> (for asking specific and detailed questions), etc. 
        <br /><br />
        Quizmon is a site dedicated to letting users create short multiple choice questions and browse through the questions written by other users. Hit browse to check out some questions right now, or sign up if you want to start writing questions!
        <br /><br />
        We only have a few topics right now but more are incoming. 
        If you want more topics, the easiest way to contact me is through <a href="https://www.linkedin.com/in/drew-hsu/" alt="my linkedin page" target="_blank">Linkedin</a>. 
        <br /><br />
        <div style={{ textAlign: "right" }}>
          Thank you for checking out Quizmon,
          <br />
          -Andrew
        </div>
      </p>
    </div>
  )
}
