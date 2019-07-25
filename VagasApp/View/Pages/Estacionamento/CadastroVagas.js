import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../Componente/Style';
import {TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import firebase from '../../../Model/Firebase';
import { atualizarInfoEstacionamento } from '../../../ViewModel/GerenciaEstacionamento';
import DatePicker from 'react-native-datepicker';
import { NavigationEvents } from 'react-navigation';
export default class CadastroVagas extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: '',
            key: '',
            nome: '',
            vagas: 0,
            vagasDisp: 0,
            vagasEspeciais: 0,
            vagasEspeciaisDisp: 0,
            preco: 0,
            cidade: '',
            estado: '',
            horaAbertura: '',
            horaFechamento: '',
            avaliacao: 0,
            latitude: 0,
            longitude: 0
        };
        this.estacionamentos =[];
        this.vagas = this.vagas.bind(this);
    }

    componentDidMount() {
        let component = this;
        var ref = firebase.database().ref("estacionamento");
        if(component.estacionamentos.id == null ||
           global.atulizarEstacionamento){
            ref.orderByChild("key").equalTo(global.usuario.key).on("child_added", function(snapshot) {
                component.estacionamentos = {id: snapshot.key,  ...snapshot.toJSON()}
                global.estacionamento = component.estacionamentos;
                component.setState({
                    id: component.estacionamentos.id,
                    key: component.estacionamentos.key,
                    nome: global.usuario.nome,
                    vagas: component.estacionamentos.vagas,
                    vagasDisp: component.estacionamentos.vagasDisp,
                    vagasEspeciais: component.estacionamentos.vagasEspeciais,
                    vagasEspeciaisDisp: component.estacionamentos.vagasEspeciaisDisp,
                    preco: component.estacionamentos.preco,
                    cidade: component.estacionamentos.cidade,
                    estado: component.estacionamentos.estado,
                    avaliacao: component.estacionamentos.avaliacao,
                    latitude: component.estacionamentos.latitude,
                    longitude: component.estacionamentos.longitude,
                    horaAbertura: component.estacionamentos.horaAbertura,
                    horaFechamento: component.estacionamentos.horaFechamento
                })
            })
            global.atulizarEstacionamento = false;
        }
    }

    atualizarDados =()=>{
        let component = this;
        atualizarInfoEstacionamento(component.estacionamentos.id, component.state);
    }

    vagas(e){
        let state = this.state;
        if(e > 0){
            state.vagas += 1;
            state.vagasDisp += 1;
        }
        else if(e < 0 && state.vagas > 0){
            state.vagas -= 1;
            state.vagasDisp -= 1;
        }

        this.setState(state);
    }

    vagasEpeciais(e){
        let state = this.state;
        if(e > 0){
            state.vagasEspeciais += 1;
            state.vagasEspeciaisDisp += 1;
        }
        else if(e < 0 && state.vagasEspeciais > 0){
            state.vagasEspeciais -= 1;
            state.vagasEspeciaisDisp -= 1;
        }

        this.setState(state);
    }

    render() {
        var component = this;
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.tituloPagina}>Registro de Vagas</Text> 
                    <ScrollView>   
                        <Text style={styles.labelCentralizado}>Horário de Funcionamento</Text>
                        <View style={styles.dataPickerContainer}>
                            <View style={styles.viewRow}>
                                <Text style={styles.labelRow}>Abre</Text>
                                <Text style={styles.labelRow}>Fecha</Text>
                            </View>
                            <View style={styles.viewRow}>
                                <DatePicker
                                    style={styles.dataPicker}
                                    date={component.state.horaAbertura}
                                    mode="time"
                                    format="HH:mm"
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
                                    onDateChange={(time) => {component.setState({horaAbertura: time})}}
                                />

                                <DatePicker
                                    style={styles.dataPicker}
                                    date={component.state.horaFechamento}
                                    mode="time"
                                    format="HH:mm"
                                    minDate={component.state.horaAbertura}
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
                                    onDateChange={(time) => {component.setState({horaFechamento: time })}}
                                />
                            </View>
                        </View>
                        <Text style={styles.labelCentralizado}>Vagas</Text>

                        <View style={styles.filtroVagas}>            
                            <Text style={styles.labelCentralizadoClaro}>Normais</Text>
                            <View style={styles.viewRow}>
                                <TouchableOpacity style={styles.buttonMaisMenos} onPress={() => this.vagas(-1)}>
                                    <Text style={styles.buttonTextLogar}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.labelCount}>{component.state.vagas}</Text>
                                <TouchableOpacity style={styles.buttonMaisMenos} onPress={() => this.vagas(+1)}>
                                    <Text style={styles.buttonTextLogar}>+</Text>
                                </TouchableOpacity>    
                            </View>

                            <Text style={styles.labelCentralizadoClaro}>Especiais</Text>
                            <View style={styles.viewRow}>
                                <TouchableOpacity style={styles.buttonMaisMenos} onPress={() => this.vagasEpeciais(-1)}>
                                    <Text style={styles.buttonTextLogar}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.labelCount}>{component.state.vagasEspeciais}</Text>
                                <TouchableOpacity style={styles.buttonMaisMenos} onPress={() => this.vagasEpeciais(+1)}>
                                    <Text style={styles.buttonTextLogar}>+</Text>
                                </TouchableOpacity>      
                            </View>
                        </View>            
                        <Text style={styles.labelCentralizado}>Preço R$</Text>
                        <TextInputMask  style={styles.inputBoxCenter}
                                        underlineColorAndroid="#26A557"
                                        keyboardAppearance='dark'
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        value={component.state.preco}
                                        onChangeText={(preco) => {component.setState({preco: preco})}}
                                        mask={"[00].[00]"}/> 

                        <View style={styles.infoContainer}>
                            <TouchableOpacity style={styles.buttonBoxConfirmar}
                                            onPress={this.atualizarDados}>
                                <Text style={styles.buttonTextLogar}>Salvar</Text>
                            </TouchableOpacity>
                        </View>  

                    </ScrollView> 
                    <NavigationEvents onDidFocus={payload => component.componentDidMount()}/>                              
                </View>
            </KeyboardAvoidingView>
        )
    }    
}