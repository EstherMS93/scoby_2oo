import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    };
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/item")
      .then((response) => {
        this.setState({
          item: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h1>MAPBOX MAP HERE</h1>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[2.333333, 48.866667]}
        >
          {this.state.item.map((item) => {
            return (
              <Marker coordinates={item.location.coordinates} anchor="bottom">
                <img 
                style={{
                  height: 64,
                  width: 64
                }}
                className="icon2" alt="" src={this.emoji(item.category[0])} />
              </Marker>
            );
          })}
        </Map>
        ;
      </div>
    );
  }
  }
export default Home;
