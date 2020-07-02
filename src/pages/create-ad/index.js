import React, { useState } from "react";
import styled from "styled-components";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useHistory } from "react-router-dom";
import MdArrowRoundBack from "react-ionicons/lib/MdArrowRoundBack";
import MdImages from "react-ionicons/lib/MdImages";

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
  span:last-child {
    color: #b43232;
  }
`;

const FormContainer = styled.form`
  max-width: 1080px;
  margin: auto;
  padding: 100px 10px;

  label {
    display: block;
    line-height: 30px;

    input {
      height: 45px;
    }

    input,
    textarea {
      margin-bottom: 20px;
      padding: 0 10px;
      width: 100%;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      border-bottom-width: 2px;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      border-bottom: solid #d7d7d7;
      border-radius: 1px;

      &:focus {
        border-color: #b43232;
        border-radius: 4px;
        outline: thick #b43232;
        -moz-outline-radius: 4px;
      }
    }
    textarea {
      padding: 10px;
      resize: vertical;
    }
  }
  button {
    background-color: #b43232;
    color: #ffffff;
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 1em;
    padding: 12px 20px;
    border-radius: 30px;
    border: 0;
    box-shadow: -0.5px -0.5px 5px grey;
    cursor: pointer;

    &:disabled {
      color: #b43232;
      background: grey;
    }
  }
  div.image-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;

    span {
      color: #b43232;
      font-size: 1.3em;
      font-weight: bold;
    }
  }
`;

const CreateAd = () => {
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hideList, setHideList] = useState(false);
  const history = useHistory();

  const handleSelect = (d) => () => {
    setValue(d.description, false);
    setHideList(true);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => (
      <li key={suggestion.id} onClick={handleSelect(suggestion)}>
        {suggestion.description}
      </li>
    ));

  const create = (e) => {
    e.preventDefault();
    const mapData = JSON.parse(localStorage.getItem("mapData") || "[]");

    getGeocode({ address: value })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        localStorage.setItem(
          "mapData",
          JSON.stringify([
            ...mapData,
            {
              address: value,
              title,
              description,
              lat,
              lng,
            },
          ])
        );
        window.alert("Added successfully");
        history.push("/");
      })
      .catch((error) => {
        window.alert(`An error occurred: ${error}`);
      });
  };

  return (
    <>
      <AppBar>
        <MdArrowRoundBack
          onClick={() => history.push("/")}
          fontSize="20px"
          color="#ffffff"
        />
        <span>Logo</span>
        <span>=</span>
      </AppBar>
      <FormContainer>
        <div className={"image-container"}>
          <MdImages fontSize="80px" color="#b43232" />
          <span>Add a Photo</span>
        </div>
        <label htmlFor="address">
          Property Address
          <input
            type="text"
            required
            autoFocus={"on"}
            value={value}
            onChange={({ target: { value } }) => {
              setHideList((c) => !!c && false);
              setValue(value);
            }}
          />
          {status === "OK" && !hideList && <ul>{renderSuggestions()}</ul>}
        </label>
        <label htmlFor="address">
          Property Title
          <input
            type="text"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </label>
        <label htmlFor="address">
          Describe more about your property
          <textarea
            required
            rows={5}
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
        </label>
        <button onClick={create}>submit</button>
      </FormContainer>
    </>
  );
};

export default CreateAd;
