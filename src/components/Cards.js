import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Alert from './Alert';

export default function Cards({ showFavorites }) {
  const [pokes, setPokes] = useState([]);
  const [savedAmount, setSavedAmount] = useState(0);
  const [showError, setShowError] = useState('');

  useEffect(() => {
    const getSaved = async () => {
      const savedPokemons = await getSavedPokemons();
      setSavedAmount(savedPokemons.length);

      if (showFavorites) {
        await savedPokemons.forEach(poke => {
          poke.saved = true;
        });
        
        setPokes(savedPokemons);
        return;
      }
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(async (r) => {
        const apiPokes = await r.data.results;
        await savedPokemons.forEach(poke => {
          apiPokes[poke.index].saved = true;
        });
        setPokes(apiPokes);
      })
    }
    getSaved();
  }, [savedAmount])


  const getSavedPokemons = async () => {
    const savedPokemons = localStorage.getItem('savedPokemons');
    if (savedPokemons === null) {
      return [];
    }
    return JSON.parse(savedPokemons);
  }

  const updateSavedPokemons = async (savedPokemons) => {
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
  }

  const addSaved = async (index) => {
    if (savedAmount < 6) {
      setSavedAmount(savedAmount + 1);
      const savedPokemons = await getSavedPokemons();
      pokes[index].index = index;
      await savedPokemons.push(pokes[index]);
      await updateSavedPokemons(savedPokemons);
      return true;
    }
    window.scrollTo(0, 0);
    setShowError('Can not save more than 6 Pokemons');
    return false;
  }

  const removeSaved = async (index) => {
    setSavedAmount(savedAmount - 1);
    const savedPokemons = await getSavedPokemons();
    const newSavedPokemons = await savedPokemons.filter(poke => poke.index !== index);
    await updateSavedPokemons(newSavedPokemons);
    setShowError('');
  }
  const showCards = () => (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {pokes.map((poke, i) => (
      <Card key={i} poke={poke} index={poke.index? poke.index: i} addSaved={addSaved} removeSaved={removeSaved} />
    ))}
  </ul>
  )

  return (
    <div>
      {showError ? <Alert text={showError} /> : null}
      {
        pokes.length ? showCards(): <Alert text='No Pokemons to show' />
      }
    </div>
  )
}
