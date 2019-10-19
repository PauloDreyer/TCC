import { atualizarDadosEstacionamento } from '../Model/Estacionamentos';
import {ToastAndroid} from 'react-native';

export const atualizarInfoEstacionamento =(id, dados)=>{
    let valida = true;
    if(dados.horaAbertura >= dados.horaFechamento){
        valida = false;
        ToastAndroid.showWithGravity('Horário de abertura, não pode ser igual ou posterior ao horário de Fechamento!', ToastAndroid.SHORT, ToastAndroid.CENTER);        
    }

    if(valida){
        atualizarDadosEstacionamento(id, dados);
        ToastAndroid.showWithGravity('Informações Atualizadas!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}

export const calcularMediaAvaliacao=(id, dados, valorAvaliacao)=>{

    let totalAvaliacao = Number(dados.totalAvaliacao) + Number(valorAvaliacao);
    let totalQtdeAvaliacao = Number(dados.qtdeAvaliacao) + 1;

    dados.avaliacao = (totalAvaliacao / totalQtdeAvaliacao).toFixed(2);

    dados.totalAvaliacao = totalAvaliacao;
    dados.qtdeAvaliacao = totalQtdeAvaliacao;
    console.log(totalAvaliacao + ' - '+ totalQtdeAvaliacao);
    atualizarDadosEstacionamento(id, dados);
    ToastAndroid.showWithGravity('Obrigado por sua Avaliação!', ToastAndroid.SHORT, ToastAndroid.CENTER); 

}