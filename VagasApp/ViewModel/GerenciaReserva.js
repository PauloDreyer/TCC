import {insereReserva, atualizarReserva, consultaReserva} from '../Model/Reserva';
import {ToastAndroid} from 'react-native';

export const registrarResevar= async (dados)=>{
    let reservou = false;
    if(dados.dataFinal.split('/').reverse().join('/') < dados.dataInicial.split('/').reverse().join('/')){
        ToastAndroid.showWithGravity('Data Final não pode ser anterior a Data Inicial!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else if(dados.dataFinal == dados.dataInicial &&
            dados.horarioFinal <= dados.horarioInicial){
        ToastAndroid.showWithGravity('Horário de Saída não pode ser anterior ao Horário de Entrada!', ToastAndroid.SHORT, ToastAndroid.CENTER);        
    }
    else if(dados.estacionamento.horaAbertura > dados.horarioInicial ||
            dados.estacionamento.horaFechamento < dados.horarioInicial ||
            dados.estacionamento.horaAbertura > dados.horarioFinal ||
            dados.estacionamento.horaFechamento < dados.horarioFinal){
        ToastAndroid.showWithGravity('Horário da reserva, fora do horário de funcionamento do Estacionamento!', ToastAndroid.SHORT, ToastAndroid.CENTER);        
    }
    else if(dados.valorTotal == 0 || dados.valorTotal < 0){
        ToastAndroid.showWithGravity('Informe Datas ou Horários diferentes na Entrada e Saída!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else{
        reservou = await insereReserva(dados)
        
    }    
    return global.registrouReserva;
}


export const atualizarReseva=async (dados, status)=>{
    let alterou = false;
    if(dados.dataSaida.split('/').reverse().join('/') < dados.dataEntrada.split('/').reverse().join('/')){
        ToastAndroid.showWithGravity('Data Final não pode ser anterior a Data Inicial!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else if(dados.dataSaida == dados.dataEntrada &&
            dados.horaSaida <= dados.horaEntrada){
        ToastAndroid.showWithGravity('Horário de Saída não pode ser anterior ao Horário de Entrada!', ToastAndroid.SHORT, ToastAndroid.CENTER);        
    }
    else if(dados.estacionamento.horaAbertura > dados.horaEntrada ||
            dados.estacionamento.horaFechamento < dados.horaEntrada ||
            dados.estacionamento.horaAbertura > dados.horaSaida ||
            dados.estacionamento.horaFechamento < dados.horaSaida){
        ToastAndroid.showWithGravity('Horário da reserva, fora do horário de funcionamento do Estacionamento!', ToastAndroid.SHORT, ToastAndroid.CENTER);        
    }
    else if(dados.valor == 0 || dados.valor < 0){
        ToastAndroid.showWithGravity('Informe Datas ou Horários diferentes na Entrada e Saída!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else{
        alterou = await atualizarReserva(dados, status)
    }    
    return alterou;
}

export const irValidarEntrada=(dados)=>{
    dados.props.navigation.navigate('ValidarEntrada',{keyReserva: dados.state.key});
}

export const liberarEntrada=async (key)=>{
    data = new Date();
    let d = data.getDate();
    let m = data.getMonth() + 1;
    let y = data.getFullYear() + 1;
    let yy = data.getFullYear();
    let hh = data.getHours();
    let min = data.getMinutes();
    let dd = d+'';
    let mm = m+'';
    let h = hh+'';
    let mi = min+'';

    let hoje = dd.padStart(2, "0") + '/' + mm.padStart(2, "0") + '/' + yy;
    let horaAtual =  h.padStart(2,"0")+':'+mi.padStart(2,"0");
    let retorno = [];
    return new Promise((resolve) =>{
        consultaReserva(key)
        .then((result) =>{
            retorno = {result, status: 'Rejeitado!'};
            if(1 != 1){
                console.log('oi')
            }
            /*if(result.dataEntrada != hoje){
                ToastAndroid.showWithGravity('Data da reserva difere da data atual!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                retorno = {result, status: 'Rejeitado!'};
            }
            else if(horaAtual < result.horaEntrada){
                ToastAndroid.showWithGravity('Horário de Entrada fora do horário reservado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                retorno = {result, status: 'Rejeitado!'};
            }
            else if(horaAtual > result.horaSaida){
                ToastAndroid.showWithGravity('Horário de Entrada fora do horário reservado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                retorno = {result, status: 'Rejeitado!'};
            }*/
            else{
                if(result.statusEntSai == 'E'){
                    result.statusEntSai = 'S'
                }
                else{
                    result.statusEntSai = 'E'
                }
                retorno = {result, status: 'Liberado!'};
                retorno.result.key = key;
                atualizarReserva(retorno.result, 'S');
            }     
            resolve(retorno);  
        })
    })
}
