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