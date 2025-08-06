// PokemonModal.jsx shows detailed information for pokemon

import { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonModal.css';
import formatId from '../utils/formatters.js';
import { capitalizeWords } from '../utils/string.js';


const PokemonModal = ({ pokemon, onClose }) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!pokemon) {
        return <p>No Pokemon data</p>;
    }

    // Fetch Pokemon details if we only have basic info
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // If we already have detailed info, use it
                if (pokemon.detailedInfo) {
                    setPokemonDetails(pokemon.detailedInfo);
                    setLoading(false);
                    return;
                }
                
                // Otherwise fetch detailed info using the URL
                const pokemonUrl = pokemon.url || pokemon.basicInfo?.url;
                if (pokemonUrl) {
                    const response = await axios.get(pokemonUrl);
                    setPokemonDetails(response.data);
                }
            } catch (err) {
                setError('Failed to load Pokemon details. Please try again.');
                console.error('Error fetching Pokemon details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (pokemon) {
            fetchPokemonDetails();
        }
    }, [pokemon]);

    // Close modal when clicking outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);


    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>

                {loading && (
                    <div className="modal-loading">
                        <div className="modal-loader"></div>
                        <p>Loading Pokemon details...</p>
                    </div>
                )}

                {error && (
                    <div className="modal-error">
                        <h3>😔 Oops!</h3>
                        <p>{error}</p>
                        <button onClick={onClose} className="error-close-btn">
                            Close
                        </button>
                    </div>
                )}

                {pokemonDetails && !loading && !error && (
                    <div className="pokemon-details">
                        <div className="pokemon-header">
                            <img
                                src={pokemonDetails.sprites?.other?.['official-artwork']?.front_default || pokemonDetails.sprites?.front_default}
                                alt={pokemonDetails.name}
                                className="pokemon-modal-image"
                            />
                            <div className="pokemon-basic-info">
                                <h2 className="pokemon-name pokemon-name-large">{capitalizeWords(pokemonDetails.name)}</h2>
                                <p className="pokemon-modal-id">{formatId(pokemonDetails.id)}</p>
                                
                                <div className="pokemon-types">
                                    {pokemonDetails.types.map((typeInfo) => (
                                        <span 
                                        key={typeInfo.type.name}
                                        className={`type-${typeInfo.type.name}`}>
                                            {capitalizeWords(typeInfo.type.name)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pokemon-stats-section">
                            <h3>Physical Characteristics</h3>
                            <div className="pokemon-characteristics">
                                <div className="characteristic">
                                    <span className="label">Height:</span>
                                    <span className="value">{(pokemonDetails.height / 10).toFixed(1)} m</span>
                                </div>
                                <div className="characteristic">
                                    <span className="label">Weight:</span>
                                    <span className="value">{(pokemonDetails.weight / 10).toFixed(1)} kg</span>
                                </div>
                                <div className="characteristic">
                                    <span className="label">Base Experience:</span>
                                    <span className="value">{pokemonDetails.base_experience}</span>
                                </div>
                            </div>

                            <h3>Base Stats</h3>
                            <div className="pokemon-stats">
                                {pokemonDetails.stats.map((stat) => (
                                    <div key={stat.stat.name} className="stat-item">
                                        <span className="stat-name">{capitalizeWords(stat.stat.name.replace('-', ' '))}</span>
                                        <div className="stat-bar">
                                            <div 
                                                className="stat-fill" 
                                                style={{ 
                                                    width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                                                    backgroundColor: stat.base_stat > 100 ? '#ef4444' : stat.base_stat > 50 ? '#f59e0b' : '#10b981'
                                                }}
                                            ></div>
                                        </div>
                                        <span className="stat-value">{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>

                            <h3>Abilities</h3>
                            <div className="pokemon-abilities">
                                {pokemonDetails.abilities.map((ability) => (
                                    <span key={ability.ability.name} className="ability-badge">
                                        {capitalizeWords(ability.ability.name.replace('-', ' '))}
                                        {ability.is_hidden && <small> (Hidden)</small>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonModal;