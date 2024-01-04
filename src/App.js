// App.js with corrected import for React Router v6
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
      </Routes>
    </Router>
  );
}

const FlashcardPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [selectedSortAttribute, setSelectedSortAttribute] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedFlashcards, setSortedFlashcards] = useState([]);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((res) => {
        setCategories(res.data.trivia_categories);
      });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
              status: 'Active', // Assuming a default status for new flashcards
              lastModified: new Date().toLocaleString(), // Assuming a default lastModified for new flashcards
            };
          })
        );
      });
  }

  // Search Functionality
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = flashcards.filter((card) =>
      card.question.toLowerCase().includes(term) ||
      card.answer.toLowerCase().includes(term)
    );
    setSearchResults(results);
  }, [searchTerm, flashcards]);

  // Filter Functionality
  useEffect(() => {
    if (selectedStatus) {
      const filtered = flashcards.filter((card) => card.status === selectedStatus);
      setFilteredFlashcards(filtered);
    } else {
      setFilteredFlashcards([]);
    }
  }, [selectedStatus, flashcards]);

  // Sort Functionality
  useEffect(() => {
    if (selectedSortAttribute) {
      const sorted = flashcards.slice().sort((a, b) => {
        const aValue = a[selectedSortAttribute];
        const bValue = b[selectedSortAttribute];
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
      setSortedFlashcards(sorted);
    } else {
      setSortedFlashcards([]);
    }
  }, [selectedSortAttribute, sortOrder, flashcards]);

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn" onClick={() => setSearchTerm(searchTerm)}>
            Search
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="status">Filter by Status</label>
          <select id="status" onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="btn" onClick={() => setFilteredFlashcards(flashcards)}>
            Clear Filter
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="sortAttribute">Sort by</label>
          <select
            id="sortAttribute"
            onChange={(e) => setSelectedSortAttribute(e.target.value)}
          >
            <option value="">None</option>
            <option value="question">Question</option>
            <option value="answer">Answer</option>
            {/* Add more attributes as needed */}
          </select>
          <label htmlFor="sortOrder">Order</label>
          <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button className="btn" onClick={() => setSortedFlashcards(flashcards)}>
            Clear Sort
          </button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={sortedFlashcards.length ? sortedFlashcards : (filteredFlashcards.length ? filteredFlashcards : (searchResults.length ? searchResults : flashcards))} />
      </div>
    </>
  );
};

export default App;
