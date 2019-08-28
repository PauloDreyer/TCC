import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../Componente/Style';
import firebase from '../../../Model/Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationEvents } from 'react-navigation';
export default class MinhasReservas extends Component {
    constructor(props){
        super(props)
        this.state = {
            reservas: [],
        };
        this.reserva =[];  
        comp = this;
    }

    consultarReservas=()=>{
        let data = new Date();
        let d = data.getDate();
        let m = data.getMonth() + 1;
        let yy = data.getFullYear();
        let dd = d+'';
        let mm = m+'';
        for(let i = comp.reserva.length; i > 0; i--){
            comp.reserva.pop();
        }
        comp.setState({ reservas: []});
        let dataAtual =   dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
        let ref = firebase.database().ref("reserva");
        ref.orderByChild("keyUsuario").equalTo(global.usuario.key).on("child_added", function(snapshot) {
            if(snapshot.toJSON().dataEntrada.split('/').reverse().join('/') == dataAtual.split('/').reverse().join('/') &&
            snapshot.toJSON().status == "A"){
                comp.reserva.push({key: snapshot.key, ...snapshot.toJSON()})
                comp.setState({ reservas: comp.reserva});
            }
        });
    }

    irParaReserva=(reserva)=>{
        global.reserva = reserva;
        global.permiteCancelar = 1;
        comp.props.navigation.navigate('ManterReservas');
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
                    <TouchableOpacity  onPress={() =>{comp.irParaReserva(item)}}>
                    <IconMaterial name="arrow-right" size={34} color={"#26A557"}/>
                    </TouchableOpacity>
                </View>
            </View> 
        );
    }
    
    render() {
        return (
            <View style={styles.container}>    
                <View style={styles.infoContainer}>
                    <Text style={styles.tituloPagina}>Minhas Reservas</Text>   
                    <ScrollView>
                        <FlatList
                            data={comp.state.reservas}
                            ItemSeparatorComponent={() => comp.separador()}
                            renderItem={({item}) => comp.exibirListagem(item)}
                        />
                    </ScrollView>
                </View>
                <NavigationEvents onDidFocus={payload => {comp.consultarReservas()}}/>             
          </View>
        );
    }
}