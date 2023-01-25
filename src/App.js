import StyledPokeCard from './components/Card';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import styled from 'styled-components';
import SearchPanel from './components/SearchPanel';
import CardContainer from './components/CardContainer';
import { useSelector } from 'react-redux';
import { getPokeTypes } from './redux-store/actions';



function App() {

  const dispatch = useDispatch();
  const pokeList = useSelector(state => state.response.results || state.response.pokemon) || [];

  return (
    <div className="App">
      <SearchPanel/>
      <CardContainer content={pokeList.map((item, index) => {
        return (
          <StyledPokeCard
            key={index}
            name={item.name || item.pokemon.name}
            url={item.url || item.pokemon.url}
          />
        )
      })

      }>
      </CardContainer>
    </div>
  );
}

export default App;
