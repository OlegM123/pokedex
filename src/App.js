import StyledPokeCard from './components/Card';
import React from 'react';
import './App.css';

import styled from 'styled-components';
import SearchPanel from './components/SearchPanel';
import CardContainer from './components/CardContainer';
import { useSelector } from 'react-redux';
import noWay from './img/no-way.gif';

const NoWayEmptyPage = styled.div`
  max-width: 507px;
  height: 507px;
  background-image: url(${noWay});
  margin: auto;
`

function App() {

  const pokeList = useSelector(state => state.response || state.response.pokemon) || [];
  return (
    <div className="App">
      <SearchPanel />
      {pokeList.length > 0 ?
        <CardContainer content={pokeList.map((item, index) => {
          return (
            <StyledPokeCard
              key={index}
              name={item.name || item.pokemon.name}
              url={item.url || item.pokemon.url}
            />

          )
        })}>
        </CardContainer>
        :
        <NoWayEmptyPage />
      }
    </div>
  );
}

export default App;
