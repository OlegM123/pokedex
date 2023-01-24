import StyledPokeCard from './components/Card';
import React, { useEffect } from 'react';
import './App.css';

import styled from 'styled-components';
import SearchPanel from './components/SearchPanel';
import CardContainer from './components/CardContainer';
import { useSelector } from 'react-redux';



function App() {

  const pokeList = useSelector(state => state.response.results) || [];

  return (
    <div className="App">
      <SearchPanel></SearchPanel>
      <CardContainer content={pokeList.map((item, index) => {
        
        return (
          <StyledPokeCard
            key={index}
            url={item.url}
          />
        )
      })

      }>
      </CardContainer>
    </div>
  );
}

export default App;
