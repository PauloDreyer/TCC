import React, { Component } from "react";
import {View, Text} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../../Componente/Style';
import {liberarEntrada} from '../../../ViewModel/GerenciaReserva';

export default class RegistrarEntrada extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null,
            nomeMotorista: '',
            placa: '',
            horaEntrada: '',
            horaSaida: '',
            valor: null,
            pago : '',
            color: '#26A557',
            status: 'Libera a Entrada/Saída Aqui!',
            unique: '',
        };

        this_ = this;
    } 
    scanner = '';

    validarEntrada = async(e) => {
        let retorno = await liberarEntrada(e.data);
        this_.setState({
            nomeMotorista: 'Nome: ' + retorno.result.nomeMotorista,
            placa: 'Placa: ' + retorno.result.placa,
            horaEntrada: 'Horário: ' + retorno.result.horaEntrada,
            horaSaida: ' às ' + retorno.result.horaSaida,
            valor: '    R$: ' + retorno.result.valor,
            pago : retorno.result.pago,
            status: retorno.status,
        });

        if(retorno.status == 'Liberado!'){
            this_.setState({
                success: true,
                color: '#26A557',
            });   
        }
        else{
            this_.setState({
                success: false,
                color: '#D63230',
            });   
        }
    };

    handleButton = () => {
        this_.setState({ success: false })
        this_.scanner.reactivate()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerLiberacao}>    
                    <Text style={styles.retornoQrCode}>{this_.state.nomeMotorista}</Text>
                    <Text style={styles.retornoQrCode}>{this_.state.placa}{this_.state.valor} </Text>
                    <Text style={styles.retornoQrCode}>{this_.state.horaEntrada}{this_.state.horaSaida} </Text>
                    <Text style={{...styles.liberacaoQrCode, color: this_.state.color}}>{this_.state.status} </Text>
                </View>
                <QRCodeScanner
                    showMarker={true}
                    reactivate={true}
                    reactivateTimeout={5000}
                    fadeIn={false}
                    onRead={this_.validarEntrada}
                    cameraStyle={styles.cameraContainer}
                    customMarker={
                    <View style={styles.QrCodeContainer}>
                        <View style={styles.topQrCodeContainer}/>
                        <View style={styles.viewRow}>
                            <View style={styles.sideQrCodeContainer} />
                            <View style={styles.cameraQrCode}>
                            </View>
                            <View style={styles.sideQrCodeContainer} />
                        </View>
                        <View style={styles.bottomQrCodeContainer} />
                    </View>
                    }
                    ref={(elem) => { this_.scanner = elem }}
                />
            </View>
        );
    }
}