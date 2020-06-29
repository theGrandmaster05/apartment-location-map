/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import styled from "styled-components";

const FASContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  form {
    width: 80%;
    position: fixed;
    z-index: 999;
    top: 130px;

    input {
      width: 100%;
      padding: 12px 20px;
      border-radius: 20px;
      box-shadow: -0.1px 0.1px 10px #e5e5e5;
      border: 0;
      &:focus {
        outline-color: #e5e5e5;
        box-shadow: -0.1px 0.1px 15px #999898;
      }
    }
  }
  ul {
    margin-top: 10px;
    list-style-type: none;
    padding-left: 0;

    li {
      background: white;
      padding: 10px 12px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
`;

const MapContainer = ({ google }) => {
  const [markers] = useState(
    () => JSON.parse(localStorage.getItem("mapData")) || []
  );
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState({});
  const [e, setE] = useState(false);
  const [center, setCenter] = useState(() =>
    !!markers.length
      ? { lat: markers[0].lat, lng: markers[0].lng }
      : { lat: 47.444, lng: -122.176 }
  );
  const [hide, setHide] = useState(true);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (!!searchText) {
      setHide(false);
      setE(false);
      const s = markers.find(
        ({ address, description, title }) =>
          address.toLowerCase().includes(searchText.toLowerCase()) ||
          description.toLowerCase().includes(searchText.toLowerCase()) ||
          title.toLowerCase().includes(searchText.toLowerCase())
      );

      if (!!s) {
        setOption({ ...s });
      } else {
        setE(true);
      }
    }
  }, [searchText]);

  const changeLocation = () => {
    setCenter({ lat: option.lat, lng: option.lng });
    setSearchText(option.address);
    setZoom(20);
    setHide(true);
  };

  return (
    <>
      <FASContainer>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder={"Enter search text here..."}
            value={searchText}
            onChange={({ target: { value } }) => setSearchText(value)}
            autoComplete={"on"}
          />
          {!!Object.entries(option).length && !!searchText && (
            <ul>
              {!hide && !e && (
                <li onClick={changeLocation}>{option.address}</li>
              )}
            </ul>
          )}
        </form>
      </FASContainer>
      <Map
        google={google}
        zoom={zoom}
        initialCenter={
          !!markers.length
            ? { lat: markers[0].lat, lng: markers[0].lng }
            : { lat: 47.444, lng: -122.176 }
        }
        center={center}
        style={{ width: "100%", height: "100%", flex: 0.2 }}
      >
        {!!markers.length &&
          markers.map(({ title, address, lat, lng }, index) => (
            <Marker
              key={index}
              title={address}
              name={title}
              position={{ lat, lng }}
            />
          ))}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDk-u6mufXvlbxckOo7Jj7Mij2Kctv-KoQ",
})(MapContainer);
