/*******************************************************************************
/* Developer: Parker Wild
/* GitHub:    @pswild
/* Description: A React component with interactive congressional districts built
/* on top of Google Maps Javascript API using FullstackReact's
/* "google-maps-react" package. The Google Fusion Table layer provided by
/* Sharon Machlis, using Cartographic Boundary KML Files to denote district
/* boundaries taken from the United States Census Bureau on the 115th Congress.
/* Fusion Table Layer functionality based on Tom Chen's "react-google-maps"
/* package.
*******************************************************************************/

import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import React DOM
import ReactDOM from 'react-dom';
// Import Google Maps API Wrapper
import { GoogleApiWrapper } from 'google-maps-react';

// Google Maps API Key from FullstackReact
const gAPIKey = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
// Fusion Table ID from Sharon Machlis
const ftID = '1YR6Oe72NnBYAG3_Ezzg3jaq3R69u4rdvyUZ7fxUZ';

// Map component
export class Map extends React.Component {

  // Creates a stateful map
  constructor(props) {
    super(props);
    this.state = {
      zoom : 4.9,
      currentLocation : {
        lat : 39.8283,
        lng : -98.5795
      }
    }
  }

  // Place a marker
  mark() {
    // Sets props to Google
    const google = this.props.google;

    // Place marker at coordinates
    const coords = this.state.currentLocation;
    var marker = new google.maps.Marker({
      position : coords,
      map : this.map,
      animation: google.maps.Animation.DROP
    });
    // Open title
    var title = new google.maps.InfoWindow({
      content : "<h3>Current location</h3>"
    });
    marker.addListener('click', function() {
      title.open(this.map, marker);
    });

    // Pan to coordinates
    this.map.panTo(marker.position);
    this.map.setZoom(10);
  }

  // Loads Google API map when React component updated
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // Detect changes in location
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.mark();
    }
  }
  // Loads Google API map if React component already mounted
  componentDidMount() {
    // Attempt HTML5 Geolocation
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Obtain current coordinates
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat : coords.latitude,
            lng : coords.longitude
          }
        });
      }, (err) => {
        // Browser does not support location services
      });
    }
    // Load map
    this.loadMap();
  }

  // Load map into rendered React component
  loadMap() {
    // Confirm Google API is available
    if (this.props && this.props.google) {
      // Sets props to Google and Google Maps
      const google = this.props.google;
      const maps = google.maps;
      // Reference to DOM component where map is placed
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      // Use variables from this.props to maintain state
      const zoom = this.state.zoom;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      // Map configuration object
      const mapConfig = Object.assign({}, {
        zoom : zoom,
        center : center
      });

      // Create new map
      this.map = new maps.Map(node, mapConfig);

      // Add Fusion Tables Layer, filter for competitive districts
      var layer = new google.maps.FusionTablesLayer({
        query : {
          select : 'geometry',
          from : ftID
        },
        styles : [{
          where : 'CookRatingCode < 1',
          polygonOptions : {
            fillOpacity : '0',
          }
        }]
      });
      // Customize map info windows
      var contentString = '<div class="googft-info-window">' +
        '<b>District: </b>' +
        '<a>Import FT data for each district here.</a>' +
        '</div>'
      var infowindow = new google.maps.InfoWindow({
        content : contentString
      });

      // Set the map
      layer.setMap(this.map);
    }
  }

  render() {
    const style = {
      width : '100vw',
      height : '100vh'
    }

    return (
      <div ref="map" style={style}>Loading...</div>
    )
  }
}

// MapContainer component
export class MapContainer extends React.Component {

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Princeton Election Consortium</h1>
          <p className="App-subtitle">Featuring an interactive React component to identifies competitive congressional districts for the 2018 midterm elections.</p>
        </header>
        <div>
          <Map google={this.props.google} onClick={this.onMapClicked}></Map>
        </div>
      </div>
    );
  }
}

// Export High-Order Component (HOC) with GoogleAPIWrapper using API key
export default GoogleApiWrapper({
  apiKey : gAPIKey
}) (MapContainer)
