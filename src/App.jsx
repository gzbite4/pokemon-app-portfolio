import './App.css';
import React from 'react';
import Pokemon_logo from './assets/Pokemon_logo.png';
import PokemonList from './components/PokemonList.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <main>
          <img src={Pokemon_logo} alt="Pokemon logo" />
          <PokemonList />
        </main>
      </div>
    </ErrorBoundary>    
  );
}

export default App