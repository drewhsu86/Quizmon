import React from 'react'
import './FiveStars.css'

export default function FiveStars(props) {

  // converts an integer from 1 to 5 to a bunch of stars 
  const num = props.num || 1 
  let arr = []

  for (let i = 1; i <= 5; i++) {
    // make an array we can map 
    if (num < i) {
      // empty star 
      arr.push(<span className="oneStar">&#9734;</span>)
    } else {
      // filled star 
      arr.push(<span className="oneStar">&#9733;</span>)
    }
  }

  return (
    <div className="fiveStars">
      {arr.map(char => {
        return char
      })}
    </div>
  )
}
