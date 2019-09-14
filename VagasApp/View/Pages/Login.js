import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text, StatusBar } from 'react-native';
import styles from '../Componente/Style';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {logIn} from '../../ViewModel/Acesso'
import { NavigationEvents } from 'react-navigation';
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state ={
                email:'',
                senha:'',
                logar: false,
                usuario:[]
        };

        global.raio = 5;
        global.avaliacao = 0;
        global.preco = 0;
        global.estado = '';
        global.cidade = '';
        global.usuario = [];
        global.estacionamento = [];
        global.reserva = [];
        global.keyEstacionamento = '';
        global.origem  = [];
        global.destino = [];
        global.latitude = 0;
        global.longitude = 0;
        global.latitudeDelta = Number(0.0422);
        global.longitudeDelta = Number(0.0221);
        global.filtrar = false;
        global.vagasEspeciais = 0;
        global.atulizarEstacionamento = false;
        global.registrouReserva = false;
        global.alterouReserva = false;
        global.permiteCancelar = 1;
        
        this.logar = this.logar.bind(this);
    }    
 
    logar(){
        let email = this.state.email
        let senha =  this.state.senha
        var component = this;
        logIn(email, senha, component);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                <StatusBar animated
                        barStyle = "dark-content"
                        translucent 
                        backgroundColor="rgba(255, 255, 255, 0)"
                        showHideTransition={'fade'}
                />

                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.inputBox}
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCapitalize = 'none'
                            value = {this.state.email}
                            onChangeText={(email) => {this.setState({email})}}
                            onSubmitEditing={()=> this.passwordInput.focus()}/>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.inputBox} 
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardAppearance='dark'
                            secureTextEntry
                            returnKeyType='go'
                            value = {this.state.senha}
                            onChangeText={(senha) => {this.setState({senha})}}
                            ref={(input)=>this.passwordInput = input}/>           
                    
                    <TouchableOpacity style={styles.buttonBox}
                                     onPress={this.logar}>
                        <Text style={styles.buttonTextLogar}>Logar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MinhaSenha')}>
                        <Text style={styles.cadastar}>Esqueci minha Senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CadastroMotorista')}>
                        <Text style={styles.cadastar}>Procurando uma vaga? Cadastre-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CadastroEstacionamento')}>
                        <Text style={styles.cadastar}>Cadastre seu estacionamento. Crie sua conta aqui!</Text>
                    </TouchableOpacity>
                    <NavigationEvents onDidFocus={payload => {this.setState({email: '', senha: ''})}}/> 
                </View>   
            </KeyboardAvoidingView>
        );
    }
}