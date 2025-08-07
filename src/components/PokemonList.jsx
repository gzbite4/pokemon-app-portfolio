import { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css';
import PokemonCard from './PokemonCard';
import Loader from './Loader';
import PokemonModal from './PokemonModal';
import SearchBar from './SearchBar';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);          // Initial load
    const [loadingMore, setLoadingMore] = useState(false); // Loading more Pokemon
    const [offset, setOffset] = useState(0);               // Track current position - for lazy loading
    const [hasMore, setHasMore] = useState(true);          // Are there more Pokemon? - for lazy loading
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [error, setError] = useState(null);              // Add error state

    useEffect(() => {
        const fetchInitialPokemon = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
                setPokemon(response.data.results);
                setFilteredPokemon(response.data.results);
                setOffset(150); // set to 150 for next batch

            } catch (error) {
                console.error("Error fetching Pokemon: ", error);
                setError('Failed to load Pokemon. Please check your internet connection and try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPokemon();
    }, []); // Empty dependency - only run once

    const loadMorePokemon = async () => {
        if (loadingMore || !hasMore) return; // Prevent duplicate calls

        try {
            setLoadingMore(true);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

            const newPokemon = [...pokemon, ...response.data.results];
            setPokemon(newPokemon);

            // Update filteredPokemon only if no search is active
            if (searchTerm.trim() === '') {
                setFilteredPokemon(newPokemon);
            }

            setOffset(prevOffset => prevOffset + 20);

            if (response.data.results.length < 20) {
                setHasMore(false);
            }

        } catch (error) {
        console.error("Error loading more Pokemon:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // scrolling down and load more pokemons
    useEffect(() => {
        const handleScroll = () => {
            // Check if user scrolled near bottom
            const scrolled = window.innerHeight + document.documentElement.scrollTop;
            const totalHeight = document.documentElement.offsetHeight;

            // If scrolled to 90% of page → load more
            if (scrolled >= totalHeight * 0.8 && hasMore && !loadingMore) {
                loadMorePokemon();
            }
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function - remove listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loadingMore, offset]); // Dependencies

    // Add retry function
    const handleRetry = () => {
        setError(null);
        setPokemon([]);
        setFilteredPokemon([]);
        setOffset(0);
        setLoading(true);
        
        // Re-run the initial fetch
        const fetchInitialPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
                setPokemon(response.data.results);
                setFilteredPokemon(response.data.results);
                setOffset(150);
            } catch (error) {
                console.error("Error fetching Pokemon: ", error);
                setError('Failed to load Pokemon. Please check your internet connection and try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchInitialPokemon();
    };

    if (loading) {
        return <Loader />;
    }

    // Show error UI if there's an error and no Pokemon loaded
    if (error && pokemon.length === 0) {
        return (
            <div className="error-container">
                <h2>Unable to Load Pokemon</h2>
                <p>{error}</p>
                <div className="error-details">
                    <p>This might be due to:</p>
                    <ul>
                        <li>Network connection issues</li>
                        <li>PokeAPI server problems</li>
                        <li>Temporary service interruption</li>
                    </ul>
                </div>
                <button onClick={handleRetry} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }
    
    // Handle search
    const handleSearch = async (term) => {
        setSearchTerm(term);
        setSearchNotFound(false);
        
        if (term.trim() === '') {
            // Show all loaded Pokemon when search is empty
            setFilteredPokemon(pokemon);
            return;
    }
    
    // Step 1: Search within already loaded Pokemon
    const localResults = pokemon.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase())
    );
    
    // Step 2: If no local results, try API search for specific Pokemon
    if (localResults.length === 0) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);
            const foundPokemon = {
                name: response.data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
            };
            
            // Add to loaded Pokemon list for future searches
            setPokemon(prevPokemon => {
                const exists = prevPokemon.find(p => p.name === foundPokemon.name);
                return exists ? prevPokemon : [...prevPokemon, foundPokemon];
            });
            
            setFilteredPokemon([foundPokemon]);
        } catch (error) {
            // Pokemon not found
            setFilteredPokemon([]);
            setSearchNotFound(true);
            console.log("Pokemon not found:", term);
        }
    } else {
        // Show local search results
        setFilteredPokemon(localResults);
    }
    };

    const openDetails = (pokemonData) => {
        setSelectedPokemon(pokemonData);
        setIsModalOpen(true);
    };

    const closeDetails = () => {
        setSelectedPokemon(null);
        setIsModalOpen(false);
    };

    return (
        <div className="pokemon-list-container">
            <h1>Discover and explore the world of Pokemon!</h1>
            <SearchBar onSearch={handleSearch} />

            {searchNotFound && (
                <div className="no-results">
                    <p>Pokemon not found: "{searchTerm}"</p>
                </div>
            )}

            <div className="pokemon-grid">
                {filteredPokemon.length > 0 ?  (
                    filteredPokemon.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                            onCardClick={openDetails}
                        />
                    ))
                ) : null}
            </div>

            {isModalOpen && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={closeDetails}
                />
            )}
        </div>
    );
};

export default PokemonList;