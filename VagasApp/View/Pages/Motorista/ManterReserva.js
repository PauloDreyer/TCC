import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import styles from '../../Componente/Style';
import DatePicker from 'react-native-datepicker';
import firebase from '../../../Model/Firebase';
import {atualizarReseva, irValidarEntrada, irAvaliacao} from '../../../ViewModel/GerenciaReserva';
import getDirections from 'react-native-google-maps-directions';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationEvents } from 'react-navigation';

export default class ManterReserva extends Component{
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
            desabilita: false,
            statusEntSai: '',
			      avaliado: '',
            texto: '',
            opacityAvaliado: 1,
            desabilitaAvaliacao: false,
            opacity: global.permiteCancelar,

            estacionamento: [],
            dataEntradaAux: '',
            dataSaidaAux: '',
        }  
        this_ = this;
        dataAtual = new Date().getDate();
        maxData = new Date();
    }

    componentDidMount() {
        data = new Date();
        let d = data.getDate();
        let m = data.getMonth() + 1;
        let y = data.getFullYear() + 1;
        let dd = d+'';
        let mm = m+'';
        let datamax = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + y;
        this_.maxData = datamax;

        if(global.permiteCancelar == 0){
          alert(global.permiteCancelar)
          this_.setState({desabilita: true, opacity: 0});
        }
        else{
          this_.setState({desabilita: false, opacity: 1});
        }
        
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
                statusEntSai: global.reserva.statusEntSai,
				        avaliado: global.reserva.avaliado,

                dataEntradaAux: global.reserva.dataEntrada.split('/').reverse().join('/'),
                dataSaidaAux: global.reserva.dataSaida.split('/').reverse().join('/'),
            });
        }

        if(global.reserva.statusEntSai == 'S'){
          this_.setState({texto: 'Avaliar Estacionamento', desabilita: true, opacity: 0, opacityAvaliado: 1})
        }else{
          if(global.reserva.statusEntSai == 'E'){
            this_.setState({desabilita: true, opacity: 0});
          }
          this_.setState({texto: 'Validar Entrada/Saída', opacityAvaliado: 1})
        }

        if(global.reserva.status == 'C'){
          this_.setState({opacity: 0})
        }

        if(global.reserva.avaliado == 'S'){
          this_.setState({desabilitaAvaliacao: true, texto:'', opacityAvaliado: 0});
        }

        let ref = firebase.database().ref("estacionamento");
        ref.orderByChild("key").equalTo(global.reserva.keyEstacionamento).on("child_added", function(snapshot) {
          this_.setState({estacionamento: snapshot.toJSON(), keyEstacionamentoVagas: snapshot.key});  
        });
    }

    cancelarReserva=()=>{
      this_.setState({desabilita: true, opacity: 0}); 
      let retorno =atualizarReseva(this_.state, 'C');
    }

    alterarReserva=()=>{
      let retorno =atualizarReseva(this_.state, 'A')
    }

    irPara=()=>{
      if(this_.state.statusEntSai =='S'){
        irAvaliacao(this_);
      }else{
        irValidarEntrada(this_);
      }
    }

    handleGetDirections = () => {
        const data = {
           source: {
            latitude: Number(global.origem.latitude),
            longitude: Number(global.origem.longitude)
          },
          destination: {
            latitude: Number(this_.state.estacionamento.latitude),
            longitude: Number(this_.state.estacionamento.longitude)
          },
          params: [
            {
              key: "travelmode",
              value: "driving" 
            },
            {
              key: "dir_action",
              value: "navigate"
            }
          ],
        }
     
        getDirections(data)
      }
    
    calculaValor=()=>{
        let tempo = (Math.abs(Date.parse(this_.state.dataSaidaAux+' '+this_.state.horaSaida) - Date.parse(this_.state.dataEntradaAux+' '+this_.state.horaEntrada))) / (1000 * 60);
        let preco = this_.state.estacionamento.preco;
        preco = preco.replace(',','.');
        let valorMinuto = Number(preco) / 60;
        let total = tempo * valorMinuto;
        this_.setState({valor: total.toFixed(2)});
    }

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar  animated
                        barStyle='light-content'
                        translucent />
            <View style={styles.infoContainer}>
            <ScrollView>
              <Text style={styles.labelTitulo}>{this_.state.nomeEstacionamento}</Text>
              <Text style={styles.labelTitulo2}>Horário: {this_.state.estacionamento.horaAbertura} às {this_.state.estacionamento.horaFechamento}</Text>
              <Text style={styles.labelTitulo2}>Valor Hora: R$ {this_.state.estacionamento.preco}</Text>
    
              <Text style={styles.labelCentralizado}>Entrada</Text>
              <View style={styles.dataPickerContainer}>
                <View style={styles.viewRow}>
                  <Text style={styles.labelRow}>Data</Text>
                  <Text style={styles.labelRow}>Horário</Text>
                </View>
                <View style={styles.viewRow}>
                  <DatePicker
                    style={styles.dataPicker}
                    date={this_.state.dataEntrada}
                    mode="date"
                    placeholder="Selecione da Data"
                    format="DD/MM/YYYY"
                    minDate={this_.dataAtual}
                    maxDate={this_.maxData}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                      },
                      dateText:{
                        color: '#F1F2F3',
                        marginLeft: 20,
                      }
                    }}
                    onDateChange={(date) => {this_.setState({dataEntrada: date, dataEntradaAux: date.split('/').reverse().join('/')}), this_.calculaValor()}}
                  />
    
                  <DatePicker
                    style={styles.dataPicker}
                    date={this_.state.horaEntrada}
                    mode="time"
                    format="HH:mm"
                    minDate={this_.state.horaEntrada}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                      },
                      dateText:{
                        color: '#F1F2F3'
                      }
                    }}
                    onDateChange={(time) => {this_.setState({horaEntrada: time, horaSaida: time }), this_.calculaValor()}}
                  />
                </View>
              </View>
              <Text style={styles.labelCentralizado}>Saída</Text>
              <View style={styles.dataPickerContainer}>
                <View style={styles.viewRow}>
                  <Text style={styles.labelRow}>Data</Text>
                  <Text style={styles.labelRow}>Horário</Text>
                </View>
                <View style={styles.viewRow}>
                  <DatePicker
                    style={styles.dataPicker}
                    date={this_.state.dataSaida}
                    mode="date"
                    placeholder="Selecione da Data"
                    format="DD/MM/YYYY"
                    minDate={this_.state.dataAtual}
                    maxDate={this_.state.maxData}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                      },
                      dateText:{
                        color: '#F1F2F3',
                        marginLeft: 20,
                      }
                    }}
                    onDateChange={(date) => {this_.setState({dataSaida: date, dataSaidaAux: date.split('/').reverse().join('/')}), this_.calculaValor()}}
                  />
                  <DatePicker
                    style={styles.dataPicker}
                    date={this_.state.horaSaida}
                    mode="time"
                    format="HH:mm"
                    minDate={this_.state.horaSaida}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 0,
                      },
                      dateText:{
                        color: '#F1F2F3',
                      }
                    }}
                    onDateChange={(time) => {this_.setState({horaSaida: time }), this_.calculaValor()}}
                  />
                </View>
              </View>
              <Text style={styles.labelTitulo3}>Total R$ {this_.state.valor}</Text>

              <TouchableOpacity style={{...styles.buttonBoxRota}}
                    onPress={() =>{this_.handleGetDirections()}}>
                    <IconMaterial name="directions" color={'#F1F2F3'} style={styles.ImageIcon} size={40}/>
              </TouchableOpacity>
              <Text style={styles.buttonTextRota}>Rotas</Text>
              
              <TouchableOpacity  style={opacity= this_.state.opacityAvaliado}
                    disabled={this_.state.desabilitaAvaliacao}
                    onPress={() =>{this_.irPara()}}>
                    <View style={{...styles.viewRow, opacity: this_.state.opacityAvaliado}}>
                      <Text style={styles.labelTitulo5}>{this_.state.texto}</Text>
                    </View>
              </TouchableOpacity>

                  <View style={{...styles.viewRow, opacity: this_.state.opacity}}>
                    <TouchableOpacity style={styles.buttonBoxCancelar}
                                disabled={this_.state.desabilita}
                                onPress={() =>{this_.setState({status: "C"}), this_.cancelarReserva()}}>
                        <Text style={styles.buttonTextLogar}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBoxAlterar}
                                disabled={this_.state.desabilita}
                                onPress={() =>{this_.alterarReserva()}}>
                        <Text style={styles.buttonTextLogar}>Alterar</Text>
                    </TouchableOpacity>
                  </View>    
                </ScrollView>
            </View>
            <NavigationEvents onDidFocus={payload => {this_.componentDidMount()}}/>
          </KeyboardAvoidingView>
        );
    }
}