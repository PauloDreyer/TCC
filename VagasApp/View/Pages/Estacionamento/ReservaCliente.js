import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, View, TouchableOpacity} from 'react-native';
import styles from '../../Componente/Style';
import firebase from '../../../Model/Firebase';
import {atualizarReseva} from '../../../ViewModel/GerenciaReserva';

export default class ReservaCliente extends Component{
    constructor(props){
        super(props)
        this.state = {
            key: '',
            nomeEstacionamento:'',
            dataEntrada: '',
            dataSaida: '',
            horaEntrada: '',
            horaSaida: '',
            keyEstacionamento: '',
            keyUsuario: '',
            nomeEstacionamento: '',
            nomeMotorista: '',
            pago: '',
            status: '',
            valor: 0,
            placa: '',
            keyEstacionamentoVagas: '',
            vagaEspecial: 0,
            descricaoVagaEspecial: '',

            estacionamento: [],
        }  
        this_ = this;
        dataAtual = new Date().getDate();
        maxData = new Date();
    }

    componentDidMount() {

        if(global.reserva.key !=''){
            this_.setState({
                key: global.reserva.key,
                nomeEstacionamento: global.reserva.nomeEstacionamento,
                nomeMotorista: global.reserva.nomeMotorista,
                dataEntrada: global.reserva.dataEntrada,
                dataSaida: global.reserva.dataSaida,
                horaEntrada: global.reserva.horaEntrada,
                horaSaida: global.reserva.horaSaida,
                keyEstacionamento: global.reserva.keyEstacionamento,
                keyUsuario: global.reserva.keyUsuario,
                pago: global.reserva.pago,
                status: global.reserva.status,
                placa: global.reserva.placa,
                valor: Number(global.reserva.valor).toFixed(2),
                vagaEspecial: global.reserva.vagaEspecial,
            });
            if(global.reserva.vagaEspecial == 1){
                this_.setState({
                    descricaoVagaEspecial: 'Vaga Especial',
                });
            }
        }
        let ref = firebase.database().ref("estacionamento");
        ref.orderByChild("key").equalTo(global.reserva.keyEstacionamento).on("child_added", function(snapshot) {
          this_.setState({estacionamento: snapshot.toJSON(), keyEstacionamentoVagas: snapshot.key});  
        });
    }
    vagaEspecial=()=>{
        if(global.reserva.vagaEspecial == 1){
            return 'Vaga Especial';
        }
        else{
            return null;
        }
    }

    cancelarReserva=()=>{
      let retorno =atualizarReseva(this_.state, 'C');
    }

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.labelTitulo1}>Cliente: {this_.state.nomeMotorista}</Text>
              <Text style={styles.labelTitulo2}>Placa: {this_.state.placa}</Text>
              <Text style={styles.labelTitulo4}> {this_.state.descricaoVagaEspecial}</Text>
    
              <Text style={styles.labelCentralizado}>Entrada</Text>
              <View style={styles.dataPickerContainer}>
                <View style={styles.viewRow}>
                    <Text style={styles.labelRow}>Data</Text>
                    <Text style={styles.labelRow}>Horário</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.labelRow}>{this_.state.dataEntrada}</Text>
                    <Text style={styles.labelRow}>{this_.state.horaEntrada}</Text>
                </View>
            </View>
            <Text style={styles.labelCentralizado}>Saída</Text>
            <View style={styles.dataPickerContainer}>
                <View style={styles.viewRow}>
                    <Text style={styles.labelRow}>Data</Text>
                    <Text style={styles.labelRow}>Horário</Text>
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.labelRow}>{this_.state.dataSaida}</Text>
                  <Text style={styles.labelRow}>{this_.state.horaSaida}</Text>
                </View>
            </View>
            <Text style={styles.labelCentralizado}>Total</Text>
            <Text style={styles.labelTitulo3}>R$ {this_.state.valor}</Text>
            <View style={{...styles.viewRow, opacity: global.permiteCancelar}}>
                <TouchableOpacity style={styles.buttonBoxCancelar}
                            onPress={() =>{this_.setState({status: "C"}),this_.cancelarReserva()}}>
                    <Text style={styles.buttonTextLogar}>Cancelar</Text>
                </TouchableOpacity>
            </View>    
        </View>
    </KeyboardAvoidingView>
    );
    }
}