import React, { useState } from 'react';
import FlashcardList from './FlashcardList';


function App() {
  const [flashcards, setFlashcards] = useState(PROTOTYPE_FLASHCARDS)
  return (
    <FlashcardList flashcards={flashcards} />
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
