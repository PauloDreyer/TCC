import firebase from './Firebase';
import {ToastAndroid} from 'react-native';

export const signIn =(email, senha, dados)=>{
    var ref = firebase.database().ref("usuario");
    let component = [];
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => 
            ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
                component = snapshot.toJSON();
                global.usuario = component;
                global.usuario.key = snapshot.key;
                global.usuario.senha = senha;
                global.logar = true;
                if(global.usuario.tipoUsuario == 'M'){ 
                    dados.props.navigation.navigate('InicioMotorista')
                }
                else{
                    dados.props.navigation.navigate('InicioEstacionamento')
                }
            }))
    .catch(function(error){
        if(error.code == 'auth/wrong-password'){
            ToastAndroid.showWithGravity('Ops! Senha Incorreta!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        else if(error.code == 'auth/user-not-found'){
            ToastAndroid.showWithGravity('Ops! Não encontramos uma conta com o o email informado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        global.logar = false;  
    })

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            global.logar = true;       
        }
    });
}

export const signOut=(dados)=>{
    firebase.auth().signOut()
}

export const createUser =async(nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude)=>{
    var retorno = false;
    retorno  = await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(function(){
         return true;
    })
    .catch((error)=>{
        if(error.code == 'auth/weak-password'){
            ToastAndroid.showWithGravity('Senha Fraca! Informe Números e Caracteres!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }        
        else if(error.code == 'auth/invalid-email'){
            ToastAndroid.showWithGravity('Informe um e-mail válido!', ToastAndroid.SHORT);
        }
        else if(error.code == 'auth/email-already-exists'){
            ToastAndroid.showWithGravity('Ops! Já existe um usuário com este e-mail!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        else if(error.code == 'auth/email-already-in-use'){
            ToastAndroid.showWithGravity('Ops! Já existe um usuário com este e-mail!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        return false;
    })
    return retorno;
}

const alteraSenha =(senha)=>{

    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        user.updatePassword(senha).then(function() {
            resolve(true); 
    
        }).catch(function(error) {
            if(error.code == 'auth/weak-password'){
                ToastAndroid.showWithGravity('Senha Fraca! Informe Números e Caracteres!', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }  
            reject(false);
        });	
	}); 

}

export const redefinirSenha=async(senha)=>{

    return await alteraSenha(senha);
}

export const enviarEmailRedefinicaoSenha = async(email)=>{
    
    return new Promise((resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            ToastAndroid.showWithGravity('Email Enviado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
            resolve();
          }).catch(function(error) {
            reject();
          });    
    });    
}