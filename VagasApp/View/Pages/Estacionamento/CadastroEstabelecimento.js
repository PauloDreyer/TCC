import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text, StatusBar } from 'react-native';
import styles from '../../Componente/Style';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import { criarCadastroEstabelecimento } from '../../../ViewModel/Acesso';
import { connect } from 'react-redux';
import { editEndereco } from '../../../ViewModel/Actions/EndAction';
import Url from '../../../Model/url';

export class Estabelecimento extends Component {
    constructor(props){
        super(props);
        this.state ={
            nome: null,
            cnpj: null,
            email: null,
            foneComercial: null,
            fone: null,
            cep: null,
            endereco: null,
            numero: null,
            cidade: null,
            estado: null,
            senha: null,
            contraSenha: null,
            latitude: 0,
            longitude: 0,
        };
        cad = this;
        

        this.getLatLong = this.getLatLong.bind(this);
        this.criarLoginUsuario = this.criarLoginUsuario.bind(this);
        this.getEndereco = this.getEndereco.bind(this);
        this.latitude = null;
    }

    getLatLong(endereco, numero, cidade, estado){
        let address = endereco.replace(/\s/g,'+') + ',+' + numero + ',+' + cidade.replace(/\s/g, '+') + ',+' + estado.replace(/\s/g,'+');
        api = Url.localizacao + address + Url.apykey;
        fetch(api)
        .then(response =>response.json())
        .then( data=>{
            this.setState({
                latitude : Number(data.results[0].geometry.location.lat),
                longitude : Number(data.results[0].geometry.location.lng),    
            });
        })
        .done();
    }           

    criarLoginUsuario =async()=>{
        let retorno = await criarCadastroEstabelecimento(this.state.nome, this.state.cnpj, this.state.email, this.state.foneComercial, this.state.fone, this.state.cep, this.state.endereco, this.state.numero,this.state.cidade, this.state.estado, this.state.senha, this.state.contraSenha, this.state.latitude, this.state.longitude, this);
    }

    getEndereco(cep){
        api = Url.cep.replace('%', cep);
        fetch(api)
        .then(response =>response.json())
        .then( data=>{
            this.setState({
                endereco : data.logradouro,
                cidade : data.localidade,
                estado : data.uf,
            });
        })
        .done();
    }

   render() {
      return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar  animated
                        barStyle='light-content'
                        translucent />
            <View style={styles.infoContainer}>
                <ScrollView>
                    <Text style={styles.label}>Razão Social</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                returnKeyType='next'
                                ref={(Input)=>this.nomeInput = Input}
                                onChangeText={(nome) => {this.setState({nome})}}
                                onSubmitEditing={()=> this.cnpjInput.focus()}/>

                    <Text style={styles.label}>CNPJ</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='decimal-pad'
                                returnKeyType='next'
                                maxLength={18}
                                refInput={(ref)=>this.cnpjInput = ref}
                                onChangeText={(cnpj) => {this.setState({cnpj: cnpj})}}
                                value={this.state.cnpj}
                                onSubmitEditing={()=> this.emailInput.focus()}
                                mask={"[00].[000].[000]/[0000]-[00]"}/>

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize='none'
                                ref={(input)=>this.emailInput = input}
                                onChangeText={(email) => {this.setState({email: email, mensagem: ''})}}
                                onSubmitEditing={()=> this.foneComercialInput.focus()}/>

                    <Text style={styles.label}>Telefone Comercial</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='phone-pad'
                                returnKeyType='next'
                                refInput={(ref)=>this.foneComercialInput = ref}
                                onChangeText={(foneComercial) => {this.setState({foneComercial})}}
                                onSubmitEditing={()=> this.foneInput.focus()}
                                mask={"([00])[0000]-[0000]"}/>

                    <Text style={styles.label}>Telefone</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='phone-pad'
                                returnKeyType='next'
                                refInput={(ref)=>this.foneInput = ref}
                                onChangeText={(fone) => {this.setState({fone})}}
                                onSubmitEditing={()=> this.cepInput.focus()}
                                mask={"([00])[0] [0000]-[0000]"}/>

                    <Text style={styles.label}>CEP</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='numeric'
                                returnKeyType='next'
                                maxLength={9}
                                refInput={(ref)=>this.cepInput = ref}
                                onChangeText={(cep) => {this.setState({cep})}}
                                onEndEditing={(cep) =>{this.getEndereco(this.state.cep)}}
                                onSubmitEditing={()=> this.numeroInput.focus()}
                                mask={"[00000]-[000]"}/>

                    <Text style={styles.label}>Endereço</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='default'
                                returnKeyType='next'
                                autoCapitalize='characters'
                                value={this.state.endereco}
                                ref={(Input)=>this.enderecoInput = Input}
                                onChangeText={(endereco) => {this.setState({endereco})}}
                                onSubmitEditing={()=> this.numeroInput.focus()}/>

                    <Text style={styles.label}>Número</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='numeric'
                                returnKeyType='next'
                                ref={(Input)=>this.numeroInput = Input}
                                onChangeText={(numero) => {this.setState({numero})}}
                                onEndEditing={() => this.getLatLong(this.state.endereco, this.state.numero, this.state.cidade, this.state.estado)}
                                onSubmitEditing={()=> this.senhaInput.focus()}/>

                    <Text style={styles.label}>Cidade</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                value={this.state.cidade}
                                editable={false}
                                ref={(Input)=>this.cidadeInput = Input}
                                onChangeText={(cidade) => {this.setState({cidade})}}
                                onSubmitEditing={()=> this.estadoInput.focus()}/>  

                    <Text style={styles.label}>Estado</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                ref={(Input)=>this.estadoInput = Input}
                                value={this.state.estado}
                                editable={false}
                                onChangeText={(estado) => {this.setState({estado})}}
                                onSubmitEditing={()=> this.senhaInput.focus()}/>                          
                    
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
                                            onPress={() =>{this.criarLoginUsuario()}}>
                            <Text style={styles.buttonTextLogar}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>    
                </ScrollView>   
            </View>             
        </KeyboardAvoidingView>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        endereco:state.endereco.endereco,
    };
  };

const EstabelecimentoConnect = connect(mapStateToProps, { editEndereco })(Estabelecimento);

export default EstabelecimentoConnect;