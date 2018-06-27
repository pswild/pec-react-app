/*******************************************************************************
/* Developer: Parker Wild
/* GitHub:    @pswild
/* Description: A React component with interactive congressional districts built
/* on top of Google Maps Javascript API using FullstackReact's
/* "google-maps-react" package. The Google Fusion Table layer provided by
/* Sharon Machlis, using Cartographic Boundary KML Files to denote district
/* boundaries taken from the United States Census Bureau on the 115th Congress.
*******************************************************************************/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Import Google Maps API Wrapper
import { Map, GoogleApiWrapper } from 'google-maps-react'

// Google Maps API Key from FullstackReact
const googleMapsAPIKey = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';

// MapContainer component
export class MapContainer extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Princeton Election Consortium</h1>
          <p className="App-subtitle">Featuring an interactive React component to identifies competitive congressional districts for the 2018 midterm elections.</p>
        </header>
        <Map className="App-map" google={this.props.google} zoom={14}>
          
        </Map>
      </div>
    );
  }
}

// Export High-Order Component (HOC) with GoogleAPIWrapper using API key
export default GoogleApiWrapper({
  apiKey : googleMapsAPIKey
}) (MapContainer)
