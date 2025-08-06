// PokemonCard.jsx shows basic information for pokemon

import { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css';
import Loader from './Loader';
import formatId from '../utils/formatters.js';
import { capitalizeWords } from '../utils/string.js';


const PokemonCard = ({ pokemon, onCardClick }) => {
    if (!pokemon) {
        return <p>No Pokemon data</p>;
    }

    const [pokemonData, setPokemonData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoadingData(true);
                const response = await axios.get(pokemon.url);
                setPokemonData(response.data);
            } catch (error) {
                console.error("Error fetching Pokemon: ", error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchPokemonData();
    }, []);

    if (loadingData) {
        return <Loader />;
    }

    const handleCardClick = () => {
        if (pokemonData && !loadingData) {
            onCardClick({
                basicInfo: pokemon,
                detailedInfo: pokemonData
            });
        }
    };

    return (
        <div className="pokemon-card"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
            >
            <div className="pokemon-image-container">
                <img
                    src={pokemonData.sprites?.other?.['official-artwork']?.front_default}
                    alt={pokemon.name}
                    className="pokemon-image loaded"
                />
            </div>

            <div className="pokemon-info">
                <p className="pokemon-id">{formatId(pokemonData.id)}</p>
                <h3 className="pokemon-name" id="pokemon-name">{capitalizeWords(pokemon.name)}</h3>
                <div className="type-container">
                         {pokemonData.types.map(value => (
                            <div key={value.slot} className={`type-${value.type.name}`}>{value.type.name}</div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;