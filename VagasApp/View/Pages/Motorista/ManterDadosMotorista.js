import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../Componente/Style';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import {alterarCadastroMotorista} from '../../../ViewModel/Acesso';

export default class MeusDadosMotorista extends Component {
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
            senhaAtual:'',
            tipoUsuario: '',
        };
        
        this.alterarDados = this.alterarDados.bind(this);
    } 
    
    componentDidMount() {
        this.setState({
            id: global.usuario.key,
            nome: global.usuario.nome,
            cpf: global.usuario.cpf,
            email: global.usuario.email,
            fone: global.usuario.telefone,
            placa: global.usuario.placa,
            senha: global.usuario.senha,
            contraSenha: global.usuario.senha,
            senhaAtual: global.usuario.senha,
            tipoUsuario: global.usuario.tipoUsuario
        }); 
    }

    alterarDados(){
        let retorno = alterarCadastroMotorista(this.state);
    }

   render() {
      return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.tituloPagina}>Meus Dados</Text>  
                <Text style={styles.label}>Nome</Text>
                <TextInput  style={styles.inputBox}
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardType="name-phone-pad"
                            returnKeyType='next'
                            value={this.state.nome}
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
                            value={this.state.cpf}
                            refInput={(ref)=>this.cpfInput = ref}
                            onChangeText={(cpf) => {this.setState({cpf})}}
                            onSubmitEditing={()=> this.foneInput.focus()}
                            mask={"[000].[000].[000]-[00]"}/>

                <Text style={styles.label}>Telefone</Text>
                <TextInputMask  style={styles.inputBox}
                            placeholderTextColor="#1E273D"
                            underlineColorAndroid="#26A557"
                            keyboardAppearance='dark'
                            keyboardType='phone-pad'
                            returnKeyType='next'
                            value={this.state.fone}
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
                            value={this.state.placa}
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
                            value={this.state.senha}
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
                            value={this.state.contraSenha}
                            ref={(Input)=>this.contraSenhaInput = Input}
                            onChangeText={(contraSenha) => {this.setState({contraSenha})}}/>

                <View style={styles.infoContainer}>
                    <TouchableOpacity style={styles.buttonBoxConfirmar}
                                        onPress={this.alterarDados}>
                        <Text style={styles.buttonTextLogar}>Alterar</Text>
                    </TouchableOpacity>
                </View>    
            </View>              
        </KeyboardAvoidingView>
        );
    }
}