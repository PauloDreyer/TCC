import React, {Component} from 'react'
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../Componente/Style';
import {insereCodigoVerificacao} from '../../ViewModel/GerenciaVerificacao';

export default class EsqueciMinhaSenha extends Component {

    constructor(props){
        super(props);
        this.state ={
            email:'',
            senha:'',
            codigoVerificacao: '',
            heightBotton: 60,
            paddingVertical: 17,
            opacityBotton: 1,
        };

        forgot = this;
    }
    

    exibeCamposSenha=()=>{
        if(forgot.state.codigoVerificacao != ''){
            return(
                <View>
                    <Text style={styles.label}>Número Verificação</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='numeric'
                                returnKeyType='next'
                                ref={(Input)=>forgot.numeroVerificacaoInput = Input}
                                onChangeText={(numeroVerificacao) => {forgot.setState({numeroVerificacao})}}
                                onSubmitEditing={()=> forgot.senhaInput.focus()}/>        

                    <Text style={styles.label}>Senha</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                secureTextEntry = {true} 
                                returnKeyType='next'
                                ref={(Input)=>forgot.senhaInput = Input}
                                onChangeText={(senha) => {forgot.setState({senha})}}
                                onSubmitEditing={()=> forgot.contraSenhaInput.focus()}/>   
                    
                    <Text style={styles.label}>Confirme a Senha</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                secureTextEntry = {true} 
                                returnKeyType='go'
                                ref={(Input)=>forgot.contraSenhaInput = Input}
                                onChangeText={(contraSenha) => {forgot.setState({contraSenha})}}/>
                    
                    <TouchableOpacity style={styles.buttonBoxConfirmar}
                                onPress={() =>{forgot.handleEmail()}}>
                        <Text style={styles.buttonTextLogar}>Alterar</Text>
                    </TouchableOpacity>             
                </View> 
            );
        }       
    }


    handleEmail = async() => {
        var codigoVerificacao = await insereCodigoVerificacao(forgot.state.email);
        if(codigoVerificacao != ''){
            forgot.setState({codigoVerificacao: codigoVerificacao, heightBotton: 0, opacityBotton: 0, paddingVertical: 0});
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.labelNormal}>Será enviado para o seu email um código de verificação, para redefinir a senha.</Text>
                    
                    <Text style={{...styles.label, marginTop: 40}}>E-mail</Text>
                    <TextInput style={styles.inputBox}
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardType='email-address'
                            returnKeyType='go'
                            autoCapitalize = 'none'
                            value = {forgot.state.email}
                            onChangeText={(email) => {forgot.setState({email})}}/>

                     {forgot.exibeCamposSenha()}       

                    <TouchableOpacity style={{...styles.buttonBoxConfirmar,opacity: forgot.state.opacityBotton, height: forgot.state.heightBotton, paddingVertical: forgot.state.paddingVertical}}
                                onPress={() =>{forgot.handleEmail()}}>
                        <Text style={{...styles.buttonTextLogar, opacity: forgot.state.opacityBotton}}>Enviar Email</Text>
                    </TouchableOpacity>    
                </View>
            </View>   
        );
    }
}