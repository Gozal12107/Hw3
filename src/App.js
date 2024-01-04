import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios'


function App() {
  const [flashcards, setFlashcards] = useState(PROTOTYPE_FLASHCARDS)

  useEffect(() => {
    axios
    .get('https://opentdb.com/api.php?amount=10')
    .then( res => {
      setFlashcards(res.data.results.map((questionItem, index)=> {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)
          ), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }, [])


    function decodeString(str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    }

  return (
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const PROTOTYPE_FLASHCARDS = [
{
  id: 1,
  question: 'Which president is Lincoln of USA?',
  answer: '16th',
  options: [
    '23rd',
    '32nd',
    '1st',
    '8th'
  ]
},
{
  id: 2,
  question: 'Question 2?',
  answer: 'Answer',
  options: [
    'Answer',
    'Answer 1',
    'Answer 2',
    'Answer 3'
  ]
}
]
export default App;
