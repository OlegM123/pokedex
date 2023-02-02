import StyledPokeCard from './components/Card';
import React, { useMemo } from 'react';
import './App.css';

import styled from 'styled-components';
import SearchPanel from './components/SearchPanel';
import CardContainer from './components/CardContainer';
import { useSelector } from 'react-redux';
import Modal from './components/Modal';
import noWay from './img/no-way.gif';

const NoWayEmptyPage = styled.div`
  max-width: 507px;
  height: 507px;
  background-image: url(${noWay});
  margin: auto;
`

function App() {

  const pokeList = useSelector(state => state.response || state.response.pokemon) || [];
  const actualContent = [];
  const pagination = useSelector(state => state.paginationData);

  useMemo(() => {
    actualContent.length = 0;
    for (let offset = pagination.offset; actualContent.length < pagination.limit && !!pokeList[offset]; offset++) {
      pokeList[offset] && actualContent.push(pokeList[offset]);
    }
  }, [pokeList, pagination]);

  return (
    <div className="App">
      <SearchPanel countOfPokemons={pokeList.length} />
      {actualContent.length > 0 ?
        <CardContainer content={actualContent.map((item, index) => {
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
      <Modal />
    </div>
  );
}

export default App;
