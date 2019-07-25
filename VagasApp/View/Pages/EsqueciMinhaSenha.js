import React, {Component} from 'react'
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RNSmtpMailer from 'react-native-smtp-mailer';
//import Mailer from 'react-native-mail';
//const nodemailer = require('nodemailer');

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

   /* enviaEmail=()=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'dreyerpaulo89@gmail.com',    
                pass: 'pyangyang'
            }
        });

        const mailOptions ={
            from: 'noreplay@vagasapp.com',
            to: 'dreyerpaulo89@gmail.com',
            subject: 'Teste',
            text: 'Olá Mundo!'
        };

        transporter.sendMail(mailOptions,function(err, response){
            if(err){
                console.error("Erro ao enviar o email",err);
            }
            else{
                console.log('Email enviado! '+response);
            }
        })
    }*/
    enviaEmail=()=>{
        alert('Email!');
        RNSmtpMailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
            username: "dreyerpaulo89@gmail.com",
            password: "pyangyang",
            from: "dreyerpaulo89@gmail.com",
            recipients: "dreyerpaulo89@gmail.com",
            subject: "subject",
            htmlBody: "<h1>header</h1><p>body</p>",
            attachmentPaths: ["pathToFile1.png","pathToFile2.txt","pathToFile3.csv"],
            attachmentNames: ["image.jpg", "firstFile.txt", "secondFile.csv"],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
            attachmentTypes: ["img", "txt", "csv"]//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
          })
            .then(success => alert(success))
            .catch(err => alert(err));
    }

    handleEmail = async() => {
        var codigoVerificacao = await insereCodigoVerificacao(forgot.state.email);
        if(codigoVerificacao != ''){
            forgot.setState({codigoVerificacao: codigoVerificacao, heightBotton: 0, opacityBotton: 0, paddingVertical: 0});
        }
        forgot.enviaEmail();
        
       /* Mailer.mail({
          subject: 'need help',
          recipients: ['noreply@vagasapp.com'],
          ccRecipients: ['dreyerpaulo89@gmail.com'],
         // bccRecipients: ['supportBCC@example.com'],
          body: '<b>A Bold Body</b>',
          isHTML: true,
          attachment: {
            path: '',  // The absolute path of the file from which to read data.
            type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            name: '',   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        });*/
      }
    
    /*componentDidMount =() =>{

        
    }*/

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