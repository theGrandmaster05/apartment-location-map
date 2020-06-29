import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import MdMenu from "react-ionicons/lib/MdMenu";

import MapContainer from "../../components/map";
import MdListBox from "react-ionicons/lib/MdListBox";

const AppBar = styled.nav`
  display: flex;
  height: 70px;
  background-color: #b43232;
  z-index: 999;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  * {
    color: #ffffff;
  }
  span:nth-child(2) {
    font-size: 24px;
    font-weight: bolder;
    text-transform: uppercase;
  }
`;

const FABContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    background-color: #b43232;
    position: absolute;
    bottom: 30px;
    color: #ffffff;
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 1em;
    padding: 12px 20px;
    border-radius: 30px;
    border: 0;
    box-shadow: -0.5px -0.5px 5px grey;
    cursor: pointer;
  }
`;

const Map = () => {
  const history = useHistory();

  return (
    <>
      <AppBar>
        <MdMenu fontSize="20px" color="#ffffff" />
        <span>Logo</span>
        <MdListBox
          onClick={() => history.push("/")}
          fontSize="20px"
          color="#ffffff"
        />
      </AppBar>
      <MapContainer />
      <FABContainer>
        <button onClick={() => history.push("/create/")}>Create Ad</button>
      </FABContainer>
    </>
  );
};

export default Map;
