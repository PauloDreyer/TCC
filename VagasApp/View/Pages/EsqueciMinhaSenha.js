import React, {Component} from 'react'
import { View, Text, StatusBar } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../Componente/Style';
import { alterarSenha } from '../../ViewModel/Acesso';

export default class EsqueciMinhaSenha extends Component {

    constructor(props){
        super(props);
        this.state ={
            email:'',
        };

        forgot = this;
    }

    redefinirSenha = async() =>{
        await alterarSenha(forgot);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar  animated
                            barStyle='light-content'
                            translucent />
                <View style={styles.infoContainer}>
                    <Text style={styles.labelNormal}>Será enviado um email para redefinição da sua senha.</Text>
                    
                    <Text style={{...styles.label, marginTop: 40}}>E-mail</Text>
                    <TextInput style={styles.inputBox}
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardType='email-address'
                            returnKeyType='go'
                            autoCapitalize = 'none'
                            value = {forgot.state.email}
                            onChangeText={(email) => {forgot.setState({email})}}/>     

                     <TouchableOpacity style={styles.buttonBoxConfirmar}
                                onPress={() =>{forgot.redefinirSenha()}}>
                        <Text style={styles.buttonTextLogar}>Enviar</Text>
                    </TouchableOpacity>      
                </View>
            </View>   
        );
    }
}