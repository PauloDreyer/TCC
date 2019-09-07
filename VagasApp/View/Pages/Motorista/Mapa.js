import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../../Componente/Style';
import MapView from 'react-native-maps';
import Url from '../../../Model/url';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { listaEstacionamentos } from '../../../ViewModel/GerenciaMapa';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Mapa extends Component{
  constructor(props) {
    super(props);

    this.state ={
      locationCoordinates:{
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },

      markerLocation:{
        latitude: 0,
        longitude: 0
      },
      markers:[],

  };
  this.listaEstacionamentos =[];

  component = this;
  lat =0;
  lng = 0;

} 

  componentDidMount = async() =>{
    let retorno = await component.getLocalizacao();

    if(retorno){
      component.processa(); 
    }      
  }

  getLocalizacao =()=>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
          locationCoordinates:{
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
          latitudeDelta: Number(0.0422),
          longitudeDelta: Number(0.0221)
          }       
          });
          global.latitude = Number(position.coords.latitude);
          global.longitude = Number(position.coords.longitude);
          global.filtrar = true;
          resolve(true);
          
        });   
    }); 
  }

  reservar=()=>{
    global.origem = {latitude: global.latitude, longitude: global.longitude};
    this.props.navigation.navigate('CadastroReservaVagas')
  }

  processa = async()=>{
    await component.consultar();  
  }

  consultar=async (e)=>{
    if(global.filtrar){
      
      global.filtrar = false;
      let origin;
      let destination;
      let distancia = 0;
      lat = global.latitude;
      lng = global.longitude;
      origin = Url.origin + lat + ',' + lng;

      component.setState({
        markers: [],
        locationCoordinates:{
          latitude: Number(global.latitude),
          longitude: Number(global.longitude),
          latitudeDelta: Number(0.0422),
          longitudeDelta: Number(0.0221)
        }
      });
      await listaEstacionamentos(component);

      component.setState({
          markers: []
      });

      component.listaEstacionamentos.map(item =>{
        if((item.cidade == global.cidade || global.cidade =='') && 
          (item.preco <= global.preco || global.preco == 0) &&
          (item.avaliacao >= global.avaliacao || global.avaliacao == 0) &&
          (item.vagasEspeciaisDisp >= global.vagasEspeciais || global.vagasEspeciais == 0) &&
          (item.vagasDisp > 0)){

            destination = Url.destination + item.latitude + ',' + item.longitude;
            api = Url.directions + origin + destination + Url.apykey;

            fetch(api)
            .then(response =>response.json())
            .then(data=>{
              distancia = (Number(data.routes[0].legs[0].distance.value) / 1000).toFixed(3);
              if(distancia < global.raio || global.raio == 0){
                component.setState({
                  markers: [
                    ...component.state.markers,
                    { 
                      coordinate: {latitude: Number(data.routes[0].legs[0].end_location.lat), longitude: Number(data.routes[0].legs[0].end_location.lng)},
                      key: item.key,
                      description:"Preço: " + item.preco + " Vagas: " + item.vagasDisp + " Vagas Esp.: " + item.vagasEspeciaisDisp,
                      title: item.nome
                    },
                  ],
                });
              } 
            })
            .done();
        }
      })
    }
    return 'ok';
  }

  render() {
    return (
      <View style={styles.containerMap}>
        <MapView
          style={styles.map}
          region={{ latitude: Number(component.state.locationCoordinates.latitude)
                  ,longitude: Number(component.state.locationCoordinates.longitude)
                  ,latitudeDelta: Number(component.state.locationCoordinates.latitudeDelta)
                  ,longitudeDelta: Number(component.state.locationCoordinates.longitudeDelta), }}
          onRegionChangeComplete={component.handleLocationChange}
          zoomEnabled={true}
          scrollEnabled={true}
          showsBuildings={false}
          showsPointsOfInterest={false}
          onPress={component.onMapPress}
          showsUserLocation>
          {component.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinate}
              key={marker.key}
              title={marker.title}
              onPress={()=>{global.keyEstacionamento= marker.key, global.destino = marker.coordinate}}
              description={marker.description}
              onCalloutPress={component.reservar}
              pinColor={'#26A557'}
            />
          ))}
                                
        </MapView>
        <NavigationEvents
          onDidFocus={payload => component.processa()}
        />
        <View>
          <TouchableOpacity style={styles.ImageIconBar}>
            <FontAwesome name="bars" color={'#000'} size={40} />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
