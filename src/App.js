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
// Import React DOM
import ReactDOM from 'react-dom'

// Google Maps API Key from FullstackReact
const gAPIKey = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';

// MapContainer component
export class MapContainer extends Component {

  // // Updates Google API map when component updated
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.google !== this.props.google) {
  //     this.loadMap();
  //   }
  // }
  // componentDidMount() {
  //   this.loadMap();
  // }
  //
  // // Called after component has been rendered
  // loadMap() {
  //   // Confirm Google API is available
  //   if (this.props && this.props.google) {
  //     // Sets props to Google Map
  //     const {google} = this.props;
  //     const maps = google.maps;
  //
  //     // Reference to DOM component where map is placed
  //     const mapRef = this.refs.map;
  //     const node = ReactDOM.findDOMNode(mapRef);
  //   }
  // }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Princeton Election Consortium</h1>
          <p className="App-subtitle">Featuring an interactive React component to identifies competitive congressional districts for the 2018 midterm elections.</p>
        </header>
        <Map className="App-map"
          google={this.props.google}
          initialCenter={{
            lat: 39.8283,
            lng: -98.5795
          }}
          zoom={5}>
        </Map>
      </div>
    );
  }
}

// Export High-Order Component (HOC) with GoogleAPIWrapper using API key
export default GoogleApiWrapper({
  apiKey : gAPIKey
}) (MapContainer)
