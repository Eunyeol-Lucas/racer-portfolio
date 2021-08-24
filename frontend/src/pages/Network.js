import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Pagination, UserCount, UserCard, SearchTextField } from "../networkComponents/allNetworkComponents";


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 1232px;
  margin: auto;
  padding-top: 100px;
  flex-direction: column;
`;

const
    UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 398px);
  grid-column-gap: 19px;
  grid-row-gap: 32px;
`;


export default function  Network() {
  const [searchValue, setSearchValue] = useState("");
  const [currPage, setCurrPage] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [totalCardCount, setTotalCardCount] = useState(0);



  const handleChangeSearch = (val) => {
    setSearchValue(val);
  };

  useEffect(() => {
    (async function () {
        const API_END_POINT = "https://api-beta.elicer.io:6664/org/academy/";

        const offset = currPage * 6;
        const filterConditions = searchValue
          
          ? `filter_conditions=${JSON.stringify({ title: searchValue })}&`
          : "";

        const trackUrl = `${API_END_POINT}track/list/?${filterConditions}offset=${offset}&count=6`;
        const response = await axios.get(trackUrl);

        setTotalCardCount(response.data.track_count);
        setCardData(response.data.tracks);
    })();
  }, [searchValue, currPage]);

  return (
    <Container>
      <SearchTextField value={searchValue} onChange={handleChangeSearch} />
      <UserCount count={totalCardCount} />
        <UserContainer>
          {cardData.map((track, i) => (
            <UserCard title={track.title} key={`track-card-${i}`} />
          ))}
        </UserContainer>
    
      <Pagination
        currPage={currPage}
        pageCount={Math.ceil(totalCardCount / 6)}
        onClickPage={setCurrPage}
      />
    </Container>
  );
}
