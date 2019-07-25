import React, {Component} from 'react'
import { View } from 'react-native';
import {logOut} from '../../ViewModel/Acesso'
export default class Logout extends Component {

    constructor(props){
        super(props);
        this.state ={
            email:'',
            senha:'',
        };
    }
    
    componentDidMount =() =>{
        global.raio = 5;
        global.avaliacao = 0;
        global.preco = 0;
        global.estado = '';
        global.cidade = '';
        global.usuario = [];
        global.estacionamento = [];
        global.reserva = [];
        global.keyEstacionamento = '';
        global.origem  = [];
        global.destino = [];
        global.latitude = 0;
        global.longitude = 0;
        global.latitudeDelta = Number(0.0422);
        global.longitudeDelta = Number(0.0221);
        global.filtrar = false;
        global.vagasEspeciais = 0;
        global.atulizarEstacionamento = false;
        global.registrouReserva = false;
        global.alterouReserva = false;
        logOut(this.state);
        this.props.navigation.navigate('Login')
      }

    render() {
        return (
                <View>
                </View>   
        );
    }
}