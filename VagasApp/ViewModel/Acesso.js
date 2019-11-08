import { signIn, signOut } from '../Model/FirebaseAuth';
import { insereUsuario, atualizarDados } from '../Model/Usuario';
import { enviarEmailRedefinicaoSenha } from '../Model/FirebaseAuth';
import {ToastAndroid} from 'react-native';

// Login
export const logIn = async(email, senha, dados)=>{
    if(email=='' || senha==''){
        ToastAndroid.showWithGravity('Informe usuário e senha!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        global.logar = false;
    }
    else{
        signIn(email, senha, dados);
    }  
} 
//

// Logout
export const logOut = async(props)=>{
    signOut(props);
}
//

// Criação de Usuários
const criarUsuario = (nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, contraSenha, tipoUsuario, latitude, longitude)=>{
    
    let valido = true;

    if(tipoUsuario =='M'){
        if(nome == "" || cpf == '' || email == '' ||  fone == '' || placa == '' || senha == '' || contraSenha == ''){
            valido = false;
            ToastAndroid.showWithGravity('Informe todos os campos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }
    else if(tipoUsuario =='E'){
        if(nome == "" || cnpj == '' || email == '' || (foneComercial == '' && fone == '') || cep == '' || endereco == '' || numero == '' || cidade == '' || estado == '' || senha == '' || contraSenha == ''){
            valido = false;
            ToastAndroid.showWithGravity('Informe todos os campos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }  
    
    if(senha != contraSenha){
        valido = false;
        ToastAndroid.showWithGravity('Ops! As senhas com conferem!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    
    if(valido){

        return new Promise((resolve, reject) => {
            insereUsuario(nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude).then(function() {
                ToastAndroid.showWithGravity('Cadastro efetuado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                valido = true;
                resolve(valido)
            }).catch(function(error) {
                valido = false;
                reject(valido);
            });    
        });
    }

    return valido;
}

export const criarCadastroMotorista = (nome, cpf, email, fone, placa, senha, contraSenha, this_)=>{
    let tipoUsuario = 'M';
    return new Promise((resolve, reject) => {
        criarUsuario(nome, cpf, '', email, '', fone, placa, '', '', '', '', '', senha, contraSenha, tipoUsuario, '', '').then(function() {
            this_.props.navigation.navigate('Login');
            resolve(true)
        }).catch(function(error) {
            reject(false);
        });    
    });
}

export const criarCadastroEstabelecimento = (nome, cnpj, email, foneComercial, fone, cep, endereco, numero, cidade, estado, senha, contraSenha, latitude, longitude, this_)=>{
    let tipoUsuario = 'E';
    return new Promise((resolve, reject) => {
        criarUsuario(nome, '', cnpj, email, foneComercial, fone, '', cep, endereco, numero, cidade, estado, senha, contraSenha, tipoUsuario, latitude, longitude).then(function() {
            this_.props.navigation.navigate('Login');
            resolve(true)
        }).catch(function(error) {
            reject(false);
        });    
    });
}
//

// Alteração de Dados do Usuário
const alterarUsuario = (id, nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, contraSenha, tipoUsuario, latitude, longitude, senhaAtual)=>{
    let valido = true;

    if(tipoUsuario =='M'){
        if(nome == "" || cpf == '' || email == '' ||  fone == '' || placa == '' || senha == '' || contraSenha == ''){
            valido = false;
            ToastAndroid.showWithGravity('Informe todos os campos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }
    else if(tipoUsuario =='E'){
        if(nome == "" || cnpj == '' || email == '' || (foneComercial == '' && fone == '') || cep == '' || endereco == '' || numero == '' || cidade == '' || estado == '' || senha == '' || contraSenha == ''){
            valido = false;
            ToastAndroid.showWithGravity('Informe todos os campos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }  
    
    if(senha != contraSenha){
        valido = false;
        ToastAndroid.showWithGravity('Ops! As senhas com conferem!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    
    if(valido){
        valido = atualizarDados(id, nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude, senhaAtual);
        if(valido){
            ToastAndroid.showWithGravity('Informações Atualizadas!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    return valido;
}

export const alterarCadastroMotorista = (dados)=>{
    let retorno = alterarUsuario(dados.id, dados.nome, dados.cpf, '', dados.email, '', dados.fone, dados.placa, '', '', '', '', '', dados.senha, dados.contraSenha, dados.tipoUsuario,'','',dados.senhaAtual);
    return retorno;
}

export const alterarCadastroEstacionamento = (dados)=>{
    let retorno = alterarUsuario(dados.key, dados.nome, '', dados.cnpj, dados.email, dados.foneComercial, dados.fone, '', dados.cep, dados.endereco, dados.numero, dados.cidade, dados.estado, dados.senha, dados.contraSenha, dados.tipoUsuario, dados.latitude, dados.longitude, dados.senhaAtual);
    return retorno;
}

export const alterarSenha = async(dados)=>{
  
    return new Promise((resolve, reject) => {
        enviarEmailRedefinicaoSenha(dados.state.email).then(function() {
            dados.props.navigation.navigate('Login')
            resolve('true')
        }).catch(function(error) {
            reject('false');
        });    
    });
}