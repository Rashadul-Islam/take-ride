import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./gMap.css"
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 23.81,
      lng: 90.41
    },
    zoom: 11
  };

  render() {
    return (
      <div className="map-area">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBc43LkgQ07RCl8xrqqm6keo_dsVXgRREQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={23.8103}
            lng={90.4125}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;