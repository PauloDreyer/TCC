import {inserirCodigoVerificacao} from '../Model/codigoVerificacao';
import {ToastAndroid} from 'react-native';

const geraCodigoVerificacao =()=>{
    var codigoVerificacao = Math.floor(Math.random() * 10000) + 1 ;

    return codigoVerificacao.toString().padStart(4, "0")
}

export const insereCodigoVerificacao = async(email)=>{  
    let codigoVerificacao = '';

    if(email == ''){
        ToastAndroid.showWithGravity('Informe um e-email!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        
    }
    else{
        codigoVerificacao = geraCodigoVerificacao();
        await inserirCodigoVerificacao(email, codigoVerificacao);
    }
    
    return codigoVerificacao;

}