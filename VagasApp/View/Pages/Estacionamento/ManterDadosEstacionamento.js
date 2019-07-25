import React, {Component} from 'react'
import { View, KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../Componente/Style';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import { alterarCadastroEstacionamento } from '../../../ViewModel/Acesso';
import Url from '../../../Model/url';
import firebase from '../../../Model/Firebase';
export default class MeusDadosEstacionamento extends Component {
    constructor(props){
        super(props);
        this.state ={
            key: null,
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
            tipoUsuario: '',
        };
        
        this.getLatLong = this.getLatLong.bind(this);
        this.getEndereco = this.getEndereco.bind(this);
        this.alterarDados = this.alterarDados.bind(this);
        this.latitude = null;
    }
    
    componentDidMount() {
        this.setState({
            key: global.usuario.key,
            nome: global.usuario.nome,
            cnpj: global.usuario.cnpj,
            email: global.usuario.email,
            foneComercial: global.usuario.telefoneComercial,
            fone: global.usuario.telefone,
            cep: global.usuario.cep,
            endereco: global.usuario.endereco,
            numero: global.usuario.numero,
            cidade: global.usuario.cidade,
            estado: global.usuario.estado,
            senha: global.usuario.senha,
            contraSenha: global.usuario.senha,
            senhaAtual: global.usuario.senha,
            latitude: global.usuario.latitude,
            longitude: global.usuario.longitude,
            vagas: global.usuario.vagas,
            vagasEspeciais: global.usuario.vagasEspeciais,
            tipoUsuario: global.usuario.tipoUsuario
        }); 
        if(global.estacionamento.id == null ||
           global.atulizarEstacionamento){
            var ref = firebase.database().ref("estacionamento");
            ref.orderByChild("key").equalTo(global.usuario.key).on("child_added", function(snapshot) {
                global.estacionamento = {id: snapshot.key, ...snapshot.toJSON()}
            })
        }
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

    alterarDados(){
        global.usuario = this.state;
        global.estacionamento.nome = this.state.nome;
        global.estacionamento.cidade = this.state.cidade;
        global.estacionamento.estado = this.state.estado;
        global.estacionamento.latitude = this.state.latitude;
        global.estacionamento.longitude = this.state.longitude;
    
        let retorno = alterarCadastroEstacionamento(this.state)
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
            <View style={{...styles.infoContainer, height: '95%'}}>
                <Text style={styles.tituloPagina}>Meus Dados</Text>
                <ScrollView>
                    <Text style={styles.label}>Razão Social</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                returnKeyType='next'
                                value={this.state.nome}
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
                                value={this.state.cnpj}
                                refInput={(ref)=>this.cnpjInput = ref}
                                onChangeText={(cnpj) => {this.setState({cnpj})}}
                                onSubmitEditing={()=> this.foneComercialInput.focus()}
                                mask={"[00].[000].[000]/[0000]-[00]"}/>

                    <Text style={styles.label}>Telefone Comercial</Text>
                    <TextInputMask  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='phone-pad'
                                returnKeyType='next'
                                value={this.state.foneComercial}
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
                                value={this.state.fone}
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
                                value={this.state.cep}
                                refInput={(ref)=>this.cepInput = ref}
                                onChangeText={(cep) => {this.setState({cep})}}
                                onEndEditing={(cep) =>{this.getEndereco(this.state.cep)}}
                                onSubmitEditing={()=> this.enderecoInput.focus()}
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

                    <Text style={styles.label}>Nº</Text>
                    <TextInput  style={styles.inputBox}
                                placeholderTextColor="#1E273D"
                                underlineColorAndroid="#26A557"
                                keyboardAppearance='dark'
                                keyboardType='numeric'
                                returnKeyType='next'
                                value={this.state.numero}
                                ref={(Input)=>this.numeroInput = Input}
                                onChangeText={(numero) => {this.setState({numero}); this.getLatLong(this.state.endereco, this.state.numero, this.state.cidade, this.state.estado)}}
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

                    
                        <TouchableOpacity style={styles.buttonBoxConfirmar}
                                        onPress={this.alterarDados}>
                            <Text style={styles.buttonTextLogar}>Alterar</Text>
                        </TouchableOpacity>
                     
                </ScrollView>   
            </View>             
        </KeyboardAvoidingView>

        );
    }
}