import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, View, TouchableOpacity, Switch} from 'react-native';
import styles from '../../Componente/Style';
import DatePicker from 'react-native-datepicker';
import firebase from '../../../Model/Firebase';
import {registrarResevar} from '../../../ViewModel/GerenciaReserva';
import getDirections from 'react-native-google-maps-directions';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
export default class CadastroReserva extends Component{
    constructor(props){
        super(props)
        this.state = {
          keyUsuario: global.usuario.key,
          keyEstacionamento: global.keyEstacionamento,
          nomeMotorista: global.usuario.nome,
          placa: global.usuario.placa,
          dataAtual: new Date(),
          horarioAtual: '',
          maxData: new Date(),
          dataInicial: new Date(),
          dataFinal: new Date(),
          horarioInicial: '',
          horarioFinal: '',
          dataInicialAux: '',
          dataFinalAux: '',
          estacionamento: [],
          desabilitaReserva: false,
          desabilitaRota: true,
          vagasEsp: false,
          vagaEspecial: 0,
          opacityVagasEspeciais: 0,
          marginTop: 0,
          marginBottom: 20,
          opacityRota: 0,
          opacityReservar: 1,
          heightSwitch: 0,
          heightRota: 0,
          fontSizeRota: 0,
          heightReservar: 60,
          keyEstacionamentoVagas: '',
          dataEntrada: '',
        }  
        componente = this;
    }

    componentDidMount() {
        data = new Date();
        let d = data.getDate();
        let m = data.getMonth() + 1;
        let y = data.getFullYear() + 1;
        let yy = data.getFullYear();
        let hh = data.getHours();
        let min = data.getMinutes();
        let dd = d+'';
        let mm = m+'';
        let h = hh+'';
        let mi = min+'';
        let datamax = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + y;
        let hoje = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
        let horaAtual =  h.padStart(2,"0")+':'+mi.padStart(2,"0");
        let ref = firebase.database().ref("estacionamento");

        ref.orderByChild("key").equalTo(global.keyEstacionamento).on("child_added", function(snapshot) {
          componente.setState({estacionamento: snapshot.toJSON(), keyEstacionamentoVagas: snapshot.key});
          if(Number(snapshot.toJSON().vagasEspeciaisDisp) > 0){
            
            componente.setState({
              opacityVagasEspeciais: 1,
              heightSwitch: 50,
              marginTop: 10,
              marginBottom: 0,
            });  
          }  
        });
    
        componente.setState({
            maxData: datamax,
            dataInicial: hoje,
            dataFinal: hoje,
            horarioAtual: horaAtual,
            horarioInicial: horaAtual,
            horarioFinal: horaAtual,
            dataInicialAux: hoje.split('/').reverse().join('/'),
            dataFinalAux: hoje.split('/').reverse().join('/'),
            valorTotal: 0
        });
    }

    handleGetDirections = () => {
        const data = {
           source: {
            latitude: Number(global.origem.latitude),
            longitude: Number(global.origem.longitude)
          },
          destination: {
            latitude: Number(global.destino.latitude),
            longitude: Number(global.destino.longitude)
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
    
        let tempo = (Math.abs(Date.parse(componente.state.dataFinalAux+' '+componente.state.horarioFinal)  - Date.parse(componente.state.dataInicialAux+' '+componente.state.horarioInicial))) / (1000 * 60);
        let preco = componente.state.estacionamento.preco;
        preco = preco.replace(',','.');
        let valorMinuto = Number(preco) / 60;
        let total = tempo * valorMinuto;
    
        componente.setState({valorTotal: total.toFixed(2)});
    }

    efetuarReserva=()=>{
      let retorno = registrarResevar(componente.state);
      global.filtrar = true;
      setTimeout(function(){
        if(global.registrouReserva){
          componente.setState({desabilitaReserva: true, 
            desabilitaRota: false, 
            opacityReservar: 0, 
            opacityRota: 1,
            heightReservar: 0,
            heightRota: 44,
            fontSizeRota: 18
          });
        } 
      }, 1500);     
    }

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.labelTitulo}>{componente.state.estacionamento.nome}</Text>
              <Text style={styles.labelTitulo2}>Horário: {componente.state.estacionamento.horaAbertura} às {componente.state.estacionamento.horaFechamento}</Text>
              <Text style={styles.labelTitulo2}>Valor Hora: R$ {componente.state.estacionamento.preco}</Text>
    
              <Text style={styles.labelCentralizado}>Entrada</Text>
              <View style={styles.dataPickerContainer}>
                <View style={styles.viewRow}>
                  <Text style={styles.labelRow}>Data</Text>
                  <Text style={styles.labelRow}>Horário</Text>
                </View>
                <View style={styles.viewRow}>
                  <DatePicker
                    style={styles.dataPicker}
                    date={componente.state.dataInicial}
                    mode="date"
                    placeholder="Selecione da Data"
                    format="DD/MM/YYYY"
                    minDate={componente.state.dataAtual}
                    maxDate={componente.state.maxData}
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
                    onDateChange={(date) => {componente.setState({dataInicial: date, dataFinal: date, dataInicialAux: date.split('/').reverse().join('/')}), componente.calculaValor()}}
                  />
    
                  <DatePicker
                    style={styles.dataPicker}
                    date={componente.state.horarioInicial}
                    mode="time"
                    format="HH:mm"
                    minDate={componente.state.horarioInicial}
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
                    onDateChange={(time) => {componente.setState({horarioInicial: time, horarioFinal: time }), componente.calculaValor()}}
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
                    date={componente.state.dataFinal}
                    mode="date"
                    placeholder="Selecione da Data"
                    format="DD/MM/YYYY"
                    minDate={componente.state.dataAtual}
                    maxDate={componente.state.maxData}
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
                    onDateChange={(date) => {componente.setState({dataFinal: date, dataFinalAux: date.split('/').reverse().join('/')}), componente.calculaValor()}}
                  />
                  <DatePicker
                    style={styles.dataPicker}
                    date={componente.state.horarioFinal + 1}
                    mode="time"
                    format="HH:mm"
                    minDate={componente.state.horarioInicial}
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
                    onDateChange={(time) => {componente.setState({horarioFinal: time }), componente.calculaValor()}}
                  />
                </View>
              </View>
              <View style={{...styles.filtroSwitch, opacity: componente.state.opacityVagasEspeciais, height: componente.state.heightSwitch, marginTop: componente.state.marginTop}}>
                <View style={styles.viewRow}>
                  <Text style={styles.labelClaro}>Vaga Especial</Text>  
                  <View style={styles.switch}>
                    <Switch onValueChange={(valorSwitch) => componente.setState({vagasEsp: valorSwitch})}
                            value={componente.state.vagasEsp} 
                            thumbColor="#2A81D3"
                            trackColor="#F1F2F3"/>
                  </View>
                </View> 
              </View>  
              <Text style={styles.labelCentralizado}>Total</Text>
              <Text style={styles.labelTitulo3}>R$ {componente.state.valorTotal}</Text>
              
              <TouchableOpacity style={{...styles.buttonBoxRota, opacity: componente.state.opacityRota, height: componente.state.heightRota, marginTop: componente.state.marginBottom}}
                    disabled={componente.state.desabilitaRota}
                    onPress={() =>{componente.handleGetDirections()}}>
                    <IconMaterial name="directions" color={'#F1F2F3'} style={{...styles.ImageIcon, height: componente.state.heightRota}} size={componente.state.heightRota-4}/>
              </TouchableOpacity>
              <Text style={{...styles.buttonTextRota, opacity: componente.state.opacityRota, fontSize: componente.state.fontSizeRota}}>Rotas</Text>
     
              <TouchableOpacity style={{...styles.buttonBoxReservar, opacity: componente.state.opacityReservar, height: componente.state.heightReservar, marginTop: componente.state.marginBottom}}
                              disabled={componente.state.desabilitaReserva}
                              onPress={() =>{componente.efetuarReserva()}}>
                <Text style={styles.buttonTextLogar}>Reservar</Text>
              </TouchableOpacity>
              
            </View>
          </KeyboardAvoidingView>
        );
    }
}
