import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../Componente/Style';
import firebase from '../../../Model/Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import { NavigationEvents } from 'react-navigation';
export default class HomeEstacionamento extends Component{
  constructor(props){
    super(props)
    this.state = {
        reservas: [],
        dataConsulta: new Date(),
        dataAtual: new Date(),
        maxData: new Date(),
        minData: new Date(),
    }
    comp = this;
    this.hoje = '';
}

  componentDidMount=()=>{
    comp.setState({
        dataConsulta: comp.hoje,
    });
    
}

atualizar=()=>{

  let data = new Date();
  let d = data.getDate();
  let m = data.getMonth() + 1;
  let y = data.getFullYear() + 1;
  let yyyy = data.getFullYear() - 1;
  let yy = data.getFullYear();
  let dd = d+'';
  let mm = m+'';
  comp.state.reservas.pop();
  let datamax = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + y;
  comp.hoje = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
  let dataMin = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yyyy;
  comp.setState({maxData: datamax, minData: dataMin, reservas: []});
  let dataAtual= comp.hoje;

  if(comp.state.dataConsulta != ''){
    dataAtual = comp.state.dataConsulta;
  }
  else{
    comp.setState({dataConsulta: dataAtual});
  }
  let ref = firebase.database().ref("reserva");
  ref.orderByChild("keyEstacionamento").equalTo(global.usuario.key).on("child_added", function(snapshot) {
    if(snapshot.toJSON().dataEntrada.split('/').reverse().join('/') == dataAtual.split('/').reverse().join('/') &&
        snapshot.toJSON().status == "A"){
        comp.setState({reservas: [...comp.state.reservas, {key: snapshot.key, ...snapshot.toJSON()}]});
    }
  });
}

irParaReserva=(reserva)=>{
    global.reserva = reserva;
    global.permiteCancelar = 1;
    comp.props.navigation.navigate('ReservaCliente');
}

separador=()=>{
    return(
        <View style={styles.separadorFlatList}/>
    );
}

exibirListagem=(item)=>{
    return(
        
        <View style={styles.flatList}>
            <Text style={styles.itemFlatList1}>Nome: {item.nomeMotorista}</Text>
            <View style={styles.viewRowFlat}>
                <View style={styles.viewFlat}>
                    <Text style={styles.itemFlatList2}>Placa: {item.placa}  Valor R$: {item.valor} </Text>
                    <Text style={styles.itemFlatList2}>Entrada: {item.dataEntrada} às {item.horaEntrada} </Text>
                    <Text style={styles.itemFlatList2}>Saída: {item.dataSaida} às {item.horaSaida} </Text>
                </View>
                <TouchableOpacity  onPress={() =>{comp.irParaReserva(item)}}>
                <IconMaterial name="arrow-right" size={34} color={"#26A557"}/>
                </TouchableOpacity>
            </View>
        </View> 
    );
}

render() {
    return (
        <View style={{...styles.container}}>    
        
            <View style={{...styles.infoContainer2}}>
                <Text style={styles.tituloPagina}>Resersas Programadas</Text>      
                <Text style={styles.labelCentralizado}>Dia</Text>
                <View style={styles.dataPickerContainerConsulta}>
                    <DatePicker
                        style={styles.dataPickerConsulta}
                        date={comp.state.dataConsulta}
                        mode="date"
                        placeholder="Selecione da Data"
                        format="DD/MM/YYYY"
                        minDate={comp.state.minData}
                        maxDate={comp.state.maxData}
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
                        onDateChange={(date) => {comp.setState({dataConsulta: date}), comp.atualizar()}}
                    />
                </View>  
                <ScrollView>     
                    <FlatList
                        data={comp.state.reservas}
                        ItemSeparatorComponent={() => comp.separador()}
                        renderItem={({item}) => comp.exibirListagem(item)}
                    />
                </ScrollView>
            </View>  
            <View style={{...styles.footerContainer, backgroundColor: '#F1F2F3'}}>
                <TouchableOpacity style={styles.buttonBoxValidar}
                                onPress={() =>{comp.props.navigation.navigate('RegistrarEntrada')}}>
                    <Text style={styles.labelCentralizadoClaro}>Registrar Entrada </Text>
                </TouchableOpacity>
            </View> 
        
            <NavigationEvents onDidFocus={payload => {comp.setState({reservas: []}), comp.atualizar()}}/>   
        </View>    
    );
}
}
