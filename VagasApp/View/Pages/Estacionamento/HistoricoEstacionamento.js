import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../Componente/Style';
import firebase from '../../../Model/Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import { NavigationEvents } from 'react-navigation';

export default class HistoricoEstacionamento extends Component{
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
    }
    hist = this;
    this.hoje = '';
}

componentDidMount=()=>{
    hist.setState({
        dataConsulta: hist.hoje,
    });
}

atualizar=()=>{
  
  let valorTotal = 0;
  let valorTotalDia = 0;
  let data = new Date();
  let d = data.getDate();
  let m = data.getMonth() + 1;
  let y = data.getFullYear() + 1;
  let yyyy = data.getFullYear() - 1;
  let yy = data.getFullYear();
  let dd = d+'';
  let mm = m+'';
  hist.state.reservas.pop();
  let datamax = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + y;
  hist.hoje = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
  let dataMin = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yyyy;
  hist.setState({maxData: datamax, minData: dataMin, reservas: [], valorTotal: valorTotal, valorTotalDia: valorTotalDia});
  let dataAtual = hist.hoje;

  if(hist.state.dataConsulta != ''){
    dataAtual = hist.state.dataConsulta;
  }
  else{
    hist.setState({dataConsulta: dataAtual});
  }

  let ref = firebase.database().ref("reserva");
  ref.orderByChild("keyEstacionamento").equalTo(global.usuario.key).on("child_added", function(snapshot) {
      if(snapshot.toJSON().dataEntrada.split('/').reverse().join('/') == dataAtual.split('/').reverse().join('/') &&
         snapshot.toJSON().status == "A"){
          valorTotalDia = valorTotalDia + Number(snapshot.toJSON().valor);
          hist.setState({reservas: [...hist.state.reservas, {key: snapshot.key, ...snapshot.toJSON()}], valorTotalDia: valorTotalDia.toFixed(2)});
      }

      if(snapshot.toJSON().status == "A"){
        valorTotal = valorTotal + Number(snapshot.toJSON().valor);
        hist.setState({valorTotal: valorTotal.toFixed(2)});
      }
  });
}

irParaReserva=(reserva)=>{
    global.reserva = reserva;
    global.permiteCancelar = 0;
    hist.props.navigation.navigate('ReservaCliente');
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
                <TouchableOpacity  onPress={() =>{hist.irParaReserva(item)}}>
                <IconMaterial name="arrow-right" size={34} color={"#26A557"}/>
                </TouchableOpacity>
            </View>
        </View> 
    );
}

    render() {
        return (
            <View style={styles.container}>    
            
                <View style={styles.infoContainer2}>
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
                            onDateChange={(date) => {hist.setState({dataConsulta: date}), hist.atualizar()}}
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
           
                <NavigationEvents onDidFocus={payload => {hist.setState({reservas: []}), hist.atualizar()}}/>   
            </View>    
        );
    }
}
