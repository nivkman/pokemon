import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Description from './Description';
import Alert from './Alert';

export default function Pokemon() {
    const [props, setProps] = useState({});
    const [alertText, setAlertText] = useState('loading ...');
    const errText = "pokémon hasn't been found";

    useEffect(() => {
        const pokemonName = window.location.pathname.slice(1);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(async (res) => {
            const data = await res.data;
            const speciesId = await res.data.species.url.slice(42, res.data.species.url.length - 1);
            axios.get(res.data.location_area_encounters).then(async (res) => {
                const locationAreas = await res.data;
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}`).then(async (res) => {
                    const species = await res.data;
                    axios.get(res.data.evolution_chain.url).then(async (res) => {
                        const evolutionData = await extractEvolutionData(res.data);
                        await dataReprocessing(data, locationAreas, species, evolutionData);
                    }).catch(() => {
                        setAlertText();
                    });
                }).catch(() => {
                    setAlertText(errText);
                });
            }).catch(() => {
                setAlertText(errText);
            });
        }).catch(() => {
            setAlertText(errText);
        });
    }, [])


    const extractEvolutionData = async (data) => {
        const evolutionsArray = [];
        const evolutionData = await data.chain;

        evolutionsArray.push(evolutionData?.species.name);
        evolutionsArray.push(evolutionData.evolves_to[0]?.species.name);
        const masterEvolution = await evolutionData.evolves_to[0]?.evolves_to[0]?.species.name;
        if (masterEvolution) {
            evolutionsArray.push(masterEvolution);
        }
        return evolutionsArray;
    }

    const dataReprocessing = async (data, locationAreas, species, evolutionData) => {
        const props = {
            name: data.name,
            img: data.sprites.front_default,
            types: data.types,
            abilities: data.abilities,
            moves: data.moves,
            locationAreas,
            evolutions: evolutionData,
            evolvesFromSpecies: species.evolves_from_species,
            games: data.game_indices
        };

        setProps(props);

    }

    return (
        <>
            {
                Object.keys(props).length !== 0 ?
                    <Description props={props} /> : 
                        <Alert text={alertText} />

            }
        </>
    )
}
