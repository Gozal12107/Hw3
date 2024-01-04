import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios'




function App() {
  const [flashcards, setFlashcards] = useState(PROTOTYPE_FLASHCARDS)
  const[categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
   axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

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

    function handleSubmit(e) {
      e.preventDefault()
    }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
       <div className="form-group"> 
         <label htmlFor="category">Category</label>
         <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}
            </option>
          })}
          </select>
       </div>
       <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref=
        {amountEl} />
       </div>
       <div className="form-group">
        <button className="btn">Generate</button>
       </div>
      </form>
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
    </>
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
