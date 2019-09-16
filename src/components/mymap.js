import React from "react";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import ReactMapGL, {Marker } from 'react-map-gl';
import Pin from './pin';
import axios from 'axios';

const ACCESS_TOKEN = "pk.eyJ1Ijoic2hyYXZhbmlyb3kiLCJhIjoiY2swNmtyeTI3MDI4ZzNwbHZjeXV6cGtkYyJ9.WaVp-OCmQvE53OrHWcwZqg";
class MyMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationselected: null,
            viewport: {
                width: 500,
                height: 400,
                latitude: 17.718,
                longitude: 78.291,
                zoom: 10
            },
            marker: {
                latitude: 17.718,
                longitude: 78.291
            },
            events: {}

        };
        this._suggestionSelect = this._suggestionSelect.bind(this);
        this.setPinToCity = this.setPinToCity.bind(this);
    }

    componentDidMount(){
        
        let { Cityname } = this.props;    
        if(Cityname){
            this.setPinToCity(Cityname);
        }
        //pass the selected city as text to setPinToCity

    }

    _suggestionSelect(result, lat, lang, text) {
        let { viewport } = this.state;
        viewport.latitude = parseFloat(lat);
        viewport.longitude = parseFloat(lang);
        this.setState({
            locationselected: result,
            viewport: viewport,
            marker: {
                longitude: viewport.longitude,
                latitude: viewport.latitude
            }
        });
        // finalData.Location = result;
    }
    updateViewport (viewport) {
        this.setState({
            viewport
        })
    }

    logDragEvent(name, event){
        this.setState({
            events: {
                ...this.state.events,
                [name] : event.lnglat
            }
        });
    }

    onMarkerDragStart(event){
        event.preventDefault();
        // const {longitude, latitude} = event;
        this.logDragEvent('onDragStart', event);
    }
    
    
    onMarkerDrag(event){
        event.preventDefault();
        // const {longitude, latitude} = event;
        this.logDragEvent('onDrag', event);
    }

    
    onMarkerDragEnd(event){
        event.preventDefault();
        // const {longitude, latitude} = event;
        this.logDragEvent('onDragEnd', event);
        // console.log(event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
            }
        })
        // this.updateAddressBar(event.lngLat[0], event.lngLat[1]);
        
    }

    // async updateAddressBar(lng, lat){
    //     let Address = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+lng+','+lat+'.json?access_token='+ACCESS_TOKEN);
    //     //the above service call returns place close to the coordinates passed.
    //     alert( Address.data.features[0].place_name);
    // }

   async setPinToCity(value){
   
        // let value = value;
        
        let locateAddress = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+value+'.json?access_token='+ACCESS_TOKEN);
        //the above service call returns coordinates.
        console.log(locateAddress);
        let lng = locateAddress.data.features[0].center[0];
        let lat = locateAddress.data.features[0].center[1];
        console.log(lng,lat);
        this.setState({
            marker: {
                longitude: parseFloat(lng),
                latitude: parseFloat(lat)
            }
        })
    }

    render() {
        // const {locationselected} = this.state;
        
                return (
            <div className="col-md-6 col-12 map-center">
                
                    
                    
                        <div className="input-group">
                            
                            {/* <Geocoder accessToken="pk.eyJ1IjoiYW5lZWxrYXVzaGlrIiwiYSI6ImNqeHdzdWJmNDA1eHQzY3BqdjF2NjQ2cngifQ.TibZtO9WqWAJvx9PiTukLg" /> */}
                            {/* <input type="text" placeholder="Type your address" value={locationselected} name="textAddress" onChange={this.handleAddressInput.bind(this)} /> */}
                            <MapboxAutocomplete publicKey={ACCESS_TOKEN}
                                inputClass='form-control search'
                                onSuggestionSelect={this._suggestionSelect}
                                country='in'
                                resetSearch={false} />
                            
                        </div>

                        <ReactMapGL
                            {...this.state.viewport}
                            mapboxApiAccessToken={ACCESS_TOKEN}
                            onViewportChange={(viewport) => this.setState({ viewport })}
                            mapStyle="mapbox://styles/mapbox/streets-v10"
                        >
                            
                            <Marker longitude={this.state.marker.longitude} 
                                    latitude={this.state.marker.latitude}
                                    onDragStart={this.onMarkerDragStart.bind(this)}
                                    onDragEnd={this.onMarkerDragEnd.bind(this)}
                                    onDrag={this.onMarkerDrag.bind(this)}
                                    draggable={true}
                                    >
                                <Pin />
                            </Marker>
                        </ReactMapGL>
                        
                        <p>
                            Please fill in or place the pin on the map to the exact location of your delivery. Like godown or warehouse.
                        </p>
                    
                </div>
            
        );
    }
}

export default MyMap;