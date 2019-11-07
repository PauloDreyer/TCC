import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text, StatusBar } from 'react-native';
import styles from '../../Componente/Style';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import {criarCadastroMotorista} from '../../../ViewModel/Acesso';
export default class CadastroScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            nome:'',
            cpf:'',
            email:'',
            fone:'',
            placa: '',
            senha:'',
            contraSenha:'',
        };

        this.criarLoginUsuario = this.criarLoginUsuario.bind(this);
    }  
    criarLoginUsuario =async()=>{
        let retorno = await criarCadastroMotorista(this.state.nome, this.state.cpf, this.state.email, this.state.fone, this.state.placa, this.state.senha, this.state.contraSenha,this);
    }

   render() {
      return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar animated
                        barStyle='light-content'
                        translucent 
            />
            
            <View style={styles.infoContainer}>
                <ScrollView>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardType="name-phone-pad"
                                returnKeyType='next'
                                ref={(Input)=>this.nomeInput = Input}
                                onChangeText={(nome) => {this.setState({nome})}}
                                onSubmitEditing={()=> this.cpfInput.focus()}/>

                    <Text style={styles.label}>CPF</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='decimal-pad'
                                returnKeyType='next'
                                refInput={(ref)=>this.cpfInput = ref}
                                onChangeText={(cpf) => {this.setState({cpf})}}
                                onSubmitEditing={()=> this.emailInput.focus()}
                                mask={"[000].[000].[000]-[00]"}/>

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                ref={(input)=>this.emailInput = input}
                                onChangeText={(email) => {this.setState({email})}}
                                onSubmitEditing={()=> this.foneInput.focus()}/>

                    <Text style={styles.label}>Telefone</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='phone-pad'
                                returnKeyType='next'
                                refInput={(ref)=>this.foneInput = ref}
                                onChangeText={(fone) => {this.setState({fone})}}
                                onSubmitEditing={()=> this.placaInput.focus()}
                                mask={"([00])[0] [0000]-[0000]"}/>
                
                    <Text style={styles.label}>Placa</Text>
                    <TextInputMask  style={styles.inputBox}
                                autoCapitalize='characters'
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='name-phone-pad'
                                returnKeyType='next'
                                autoCapitalize='characters'
                                refInput={(ref)=>this.placaInput = ref}
                                onChangeText={(placa) => {this.setState({placa})}}
                                onSubmitEditing={()=> this.senhaInput.focus()}
                                mask={"[AAA]-[0000]"}/>

                    <Text style={styles.label}>Senha</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                secureTextEntry = {true} 
                                returnKeyType='next'
                                ref={(Input)=>this.senhaInput = Input}
                                onChangeText={(senha) => {this.setState({senha})}}
                                onSubmitEditing={()=> this.contraSenhaInput.focus()}/>   
                    
                    <Text style={styles.label}>Confirme a Senha</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                secureTextEntry
                                returnKeyType='go'
                                ref={(Input)=>this.contraSenhaInput = Input}
                                onChangeText={(contraSenha) => {this.setState({contraSenha})}}/>

                    <View style={styles.infoContainer}>
                        <TouchableOpacity style={styles.buttonBoxConfirmar}
                                            onPress={this.criarLoginUsuario}>
                            <Text style={styles.buttonTextLogar}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>  
                </ScrollView>  
            </View>              
        </KeyboardAvoidingView>
        );
    }
}