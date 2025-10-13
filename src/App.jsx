import { useState } from 'react';
import './App.css';
import Home from './Home'
import Results from './Results'
import Survey from './Survey'

// Main App Component
export default function App() {

  const [currentPage, setCurrentPage] = useState('home');



  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'survey':
        return <Survey />;
      case 'results':
        return <Results />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <nav className="custom-navbar">
        <span className="navbar-title">My Application</span>
        <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>Home</button>
        <button className={currentPage === 'survey' ? 'active' : ''} onClick={() => setCurrentPage('survey')}>Survey</button>
        <button className={currentPage === 'results' ? 'active' : ''} onClick={() => setCurrentPage('results')}>Results</button>
      </nav>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}