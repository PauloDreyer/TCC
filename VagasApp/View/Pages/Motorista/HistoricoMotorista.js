import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../Componente/Style';
import firebase from '../../../Model/Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import { NavigationEvents } from 'react-navigation';

export default class HistoricoMotorista extends Component {
    constructor(props){
        super(props)
        this.state = {
            reservas: [],
            dataConsulta: '',
            dataAtual: new Date(),
            maxData: new Date(),
            minData: new Date(),
            valorTotal: 0,
            valorTotalDia: 0,
        };
        this.hoje = '';
        this.reserva =[]; 
        hist = this;
    }

    componentDidMount=()=>{
        hist.setState({
            dataConsulta: hist.hoje,
        });
    }

    consultarReservas=()=>{
        let valorTotal = 0;
        let valorTotalDia = 0;
        let data = new Date();
        let d = data.getDate();
        let m = data.getMonth() + 1;
        let yy = data.getFullYear();
        let y = data.getFullYear() + 1;
        let yyyy = data.getFullYear() - 1;
        let dd = d+'';
        let mm = m+'';
        hist.hoje = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
        let dataAtual = hist.hoje;
        let dataMin = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yyyy;
        let datamax = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + y;

        if(hist.state.dataConsulta != ''){
          dataAtual = hist.state.dataConsulta;
        }
        else{
          hist.setState({dataConsulta: dataAtual});
        }
        for(let i = hist.reserva.length; i > 0; i--){
            hist.reserva.pop();
        }
        hist.setState({ reservas: [], maxData: datamax, minData: dataMin, valorTotal: valorTotal, valorTotalDia: valorTotalDia});

        let ref = firebase.database().ref("reserva");
        ref.orderByChild("keyUsuario").equalTo(global.usuario.key).on("child_added", function(snapshot) {
            if(snapshot.toJSON().dataEntrada.split('/').reverse().join('/') == dataAtual.split('/').reverse().join('/') &&
               snapshot.toJSON().status == "A"){
                valorTotalDia = valorTotalDia + Number(snapshot.toJSON().valor);
                hist.reserva.push({key: snapshot.key, ...snapshot.toJSON()})
                hist.setState({reservas: hist.reserva, valorTotalDia: valorTotalDia.toFixed(2)});
            }

            if(snapshot.toJSON().status == "A"){
                valorTotal = valorTotal + Number(snapshot.toJSON().valor);
                hist.setState({valorTotal: valorTotal.toFixed(2)});
            }
        });
    }

    irParaReserva=(reserva)=>{
        global.reserva = reserva;
        global.permiteCancelar = 1;
        if(hist.state.dataConsulta.split('/').reverse().join('/') < hist.hoje.split('/').reverse().join('/')){
            global.permiteCancelar = 0;
        }
        
        hist.props.navigation.navigate('ManterReservas');
    }

    separador=()=>{
        return(
            <View style={styles.separadorFlatList}/>
        );
    }

    exibirListagem=(item)=>{
        return(
            <View style={styles.flatList}>
                <Text style={styles.itemFlatList1}>{item.nomeEstacionamento}</Text>
                <View style={styles.viewRowFlat}>
                    <View style={styles.viewFlat}>
                        <Text style={styles.itemFlatList2}>Entrada: {item.dataEntrada} às {item.horaEntrada} </Text>
                        <Text style={styles.itemFlatList2}>Saída: {item.dataSaida} às {item.horaSaida} </Text>
                    </View>
                    <TouchableOpacity  onPress={() =>{hist.irParaReserva(item)}}>
                    <IconMaterial name="arrow-right" size={34} color={"#26A557"}/>
                    </TouchableOpacity>
                </View>
            </View> 
        );
    }

    render() {
        return (
            <View style={styles.Container}>    
                <View style={{...styles.infoContainer2, height: '96%'}}>
                    <Text style={styles.tituloPagina}>Histórico</Text> 
                    <Text style={styles.labelCentralizado}>Dia</Text>
                    <View style={styles.dataPickerContainerConsulta}>
                        <DatePicker
                            style={styles.dataPickerConsulta}
                            date={hist.state.dataConsulta}
                            mode="date"
                            placeholder="Selecione da Data"
                            format="DD/MM/YYYY"
                            minDate={hist.state.minData}
                            maxDate={hist.state.maxData}
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
                            onDateChange={(date) => {hist.setState({dataConsulta: date}), hist.consultarReservas()}}
                        />
                    </View> 
                    <Text style={{...styles.labelTitulo3, fontSize: 20}}>Valor do Dia R$: {hist.state.valorTotalDia}</Text> 
                    <Text style={{...styles.labelTitulo5, fontSize: 20}}>Valor Geral R$: {hist.state.valorTotal}</Text> 
                    <ScrollView>
                        <FlatList
                            data={hist.state.reservas}
                            ItemSeparatorComponent={() => hist.separador()}
                            renderItem={({item}) => hist.exibirListagem(item)}
                        />
                    </ScrollView>
                </View>
                <NavigationEvents onDidFocus={payload => {hist.consultarReservas()}}/>             
          </View>
        );
    }
}