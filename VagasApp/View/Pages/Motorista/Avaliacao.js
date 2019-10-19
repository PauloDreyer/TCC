import React, {Component} from 'react'
import { View, Text, StatusBar, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../../Componente/Style';
import {avaliarReserva} from '../../../ViewModel/GerenciaReserva';

export default class Avaliacao extends Component {

    constructor(props){
        super(props);
        this.state ={
            valorInicial: 0,
            valorMaximo: 5,
            estacionamento:[]
        };

    }

    componentDidMount=()=>{
        this.carregar();
    }

    avaliacao = async() =>{
        await avaliarReserva(global.reserva, this.state.estacionamento, this.state.valorInicial);
        this.props.navigation.goBack();
    }

    carregar=()=>{
        let estacionamento = this.props.navigation.getParam('estacionamento');
        this.setState({estacionamento: estacionamento});
    }

    UpdateRating = (key) => {
        if(key == this.state.valorInicial){
            this.setState({ valorInicial: key - 1 })
        }
        else{
            this.setState({ valorInicial: key });
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
                <StatusBar  animated
                            barStyle='light-content'
                            translucent />
                <View style={styles.infoContainer}>
                    <Text style={styles.labelNormal}>Deixe sua nota para o estacionamento</Text>
                    <Text style={styles.labelNormal}>{global.reserva.nomeEstacionamento}</Text>
                    <View style={styles.filtro}>
                        <Text style={styles.labelCentralizadoClaro}>Avaliação</Text> 
                        <View style={styles.estrela}>{barraAvaliacao}</View>
                            <Text style={styles.labelCentralizadoClaro}>
                             {this.state.valorInicial} / {this.state.valorMaximo}
                            </Text>
                        </View>  

                     <TouchableOpacity style={styles.buttonBoxConfirmar}
                                       onPress={() =>{this.avaliacao()}}>
                        <Text style={styles.buttonTextLogar}>Avaliar</Text>
                    </TouchableOpacity>      
                </View>
            </View>   
        );
    }
}