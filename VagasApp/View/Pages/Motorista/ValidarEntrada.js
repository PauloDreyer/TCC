import React, { Component } from 'react'; 
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import styles from '../../Componente/Style';
 
export default class ValidarEntrada extends Component {
 
  constructor(props){
    super(props);
    this.state={
        keyReserva: '',
        titulo: ''
    }
  }

  componentDidMount=()=>{
      let key = this.props.navigation.getParam('keyReserva');
      this.setState({keyReserva: key,
                    titulo: 'Código de Entrada'
                   });
  }
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.labelTitulo}>{this.state.titulo}</Text>   
                <View style={styles.qrCode}>
                <QRCode value={this.state.keyReserva}
                        size={250}
                        bgColor='#000000'
                        fgColor='#F1F2F3'/>
                </View>
            </View>
        </View>
    );
  }
}