import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Picker,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';
import { TextInput, ScrollView, Switch } from 'react-native-gesture-handler';
import url from '../../../Model/url';
import styles from '../../Componente/Style';
 
export default class Filtro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorInicial: 0,
      valorMaximo: 5,
      distancia: 0,
      preco: 0,
      estados:[],
      cidades:[],
      uf: '',
      municipio:'',
      vagasEspeciais: false,
    };
    this.procurarCidades = [];

  }

  UpdateRating(key) {
    if(key == this.state.valorInicial){
      this.setState({ valorInicial: key - 1 })
    }
    else{
      this.setState({ valorInicial: key });
    }  
  }

  componentDidMount() {
    api = url.estados;
    fetch(api)
    .then(response =>response.json())
    .then( data=>{
      this.setState({estados: data});
    })
    .done();
  }

  getCidades =(uf) =>{
    if(uf != ''){
      this.setState({uf: uf});
      api = url.cidades.replace('%', uf);
      fetch(api)
      .then(response =>response.json())
      .then( data=>{
        this.setState({cidades: data});     
        this.procurarCidades = data;
      })
      .done();
    }
  }

  searchFilterFunction =(text) => {    
    const busca = this.procurarCidades.filter(item => {      
      const itemData = `${item.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ cidades: busca });  
  };

  setFiltro = ()=>{
    global.filtrar = true;
    global.raio = this.state.distancia.toFixed(0);
    global.avaliacao = this.state.valorInicial;
    global.preco = this.state.preco;
    global.estado = this.state.uf.replace('BR','');
    global.cidade = this.state.municipio;
    if(this.state.vagasEspeciais){
      global.vagasEspeciais = 1;
    }
    else{
      global.vagasEspeciais = 0;
    }
  }

  render() {
    let barraAvaliacao = [];
    for (var i = 1; i <= this.state.valorMaximo; i++) {
      barraAvaliacao.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.imagemEstrela}
            source={
              i <= this.state.valorInicial
                ? require('../../img/star_filled.png')
                : require('../../img/star_corner.png')
            }
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>

        <View style={styles.infoContainer}>
          <Text style={styles.tituloPagina}>Filtro</Text> 
          <ScrollView>
            <View style={styles.filtro}>
              <Text style={styles.labelCentralizadoClaro}>Distância</Text>  
              <View style={styles.slider}>
                <Slider minimumValue={0}
                      maximumValue={200}
                      onValueChange={(distanciaSelecionada) => this.setState({distancia: distanciaSelecionada})}
                      value={this.state.distancia}
                      minimumTrackTintColor='#818185'
                      thumbTintColor='#2a81d3' />
              </View>        
              <Text style={styles.labelCentralizadoClaro}>{this.state.distancia.toFixed(0)} Km</Text>
            </View>

            <View style={styles.filtro}>
              <Text style={styles.labelCentralizadoClaro}>Avaliação</Text> 
              <View style={styles.estrela}>{barraAvaliacao}</View>
                <Text style={styles.labelCentralizadoClaro}>
                  {this.state.valorInicial} / {this.state.valorMaximo}
                </Text>
            </View>

            <View style={styles.filtro}>
              <Text style={styles.labelCentralizadoClaro}>Faixa de Preço</Text>  
              <View style={styles.slider}>
                <Slider minimumValue={0}
                      maximumValue={200}
                      onValueChange={(precoSelecionada) => this.setState({preco: precoSelecionada})}
                      value={this.state.preco}
                      minimumTrackTintColor='#818185'
                      thumbTintColor='#2A81D3' />
              </View>        
              <Text style={styles.labelCentralizadoClaro}>R$: {this.state.preco.toFixed(0)} </Text>
            </View>
            
            <View style={styles.filtroSwitch}>
              <View style={styles.viewRow}>
                <Text style={styles.labelClaro}>Vagas Especiais</Text>  
                <View style={styles.switch}>
                  <Switch value={this.state.vagasEspeciais} 
                          onValueChange={(valorSwitch) => this.setState({vagasEspeciais: valorSwitch})}
                          thumbColor="#2A81D3"
                          trackColor="#F1F2F3"/>
                </View>
              </View> 
            </View>    

            <View style={styles.filtro}>      
              <Text style={styles.labelCentralizadoClaro}>Estado</Text>
              <Picker selectedValue={this.state.uf} onValueChange={(itemValue) => this.getCidades(itemValue)}>
                <Picker.Item label={'Selecione um estado'} value={'BR'} />
                {this.state.estados.map( (v, i)=>{
                  return <Picker.Item label={v.Estado} value={v.UF} key={v.UF}/>
                  })}
              </Picker>
            </View>  


            <View style={styles.filtroCidade}>      
              <Text style={styles.labelCentralizadoClaro}>Cidade</Text>
              <TextInput placeholder="Pesquisar..." placeholderTextColor="#F1F2F3" underlineColorAndroid="#26A557" onChangeText={(text) => {this.searchFilterFunction(text)}} />
              <Picker selectedValue={this.state.municipio} onValueChange={(itemValue) =>this.setState({municipio: itemValue})}>
                <Picker.Item label={'Selecione uma cidade'} value={''}/>
                {this.state.cidades.map( (v, i)=>{
                  return <Picker.Item label={v} value={v} key={v}/>
                  })}
              </Picker>
            </View>   
            
            <TouchableOpacity style={{...styles.buttonBoxConfirmar, marginTop: 15, marginBottom: 50}} 
                                onPress={() =>{this.setFiltro()}}>
                <Text style={styles.buttonTextLogar}>Aplicar</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    );
  }
}