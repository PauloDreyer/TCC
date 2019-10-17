import firebase from './Firebase';
import {atualizarVagas} from './Estacionamentos';
import {ToastAndroid } from 'react-native';
const reserva = firebase.database().ref("reserva");
let insere;
let chave = '';

const existeReserva =async (dados)=>{
    insere = true;
    if(dados.dataEntrada !=''){
        dados.dataInicial = dados.dataEntrada;
        dados.horarioInicial = dados.horaEntrada;
        dados.horarioFinal = dados.horaSaida;
    }
    reserva.orderByChild("keyUsuario").equalTo(dados.keyUsuario).on("child_added", function(snapshot) {
        if(dados.dataInicial == snapshot.toJSON().dataEntrada && (chave != snapshot.key) && insere == true){
            if((dados.horarioInicial >= snapshot.toJSON().horaEntrada &&
                dados.horarioInicial < snapshot.toJSON().horaSaida) ||
               (dados.horarioFinal > snapshot.toJSON().horaEntrada &&
                dados.horarioFinal <= snapshot.toJSON().horaSaida)){
                insere = false;
                ToastAndroid.showWithGravity('Já existe uma reserva cadastrada neste horário!', ToastAndroid.SHORT, ToastAndroid.CENTER);     
            }
        }  
    }); 
    return insere;  
}

export const insereReserva = async(dados)=>{
    global.registrouReserva = false;
    
    let retorno = await existeReserva(dados);

    setTimeout(function(){
    let vagaEspecial = 0;
    if(dados.vagasEsp){
        vagaEspecial = 1;
    }
    if(insere){
        global.registrouReserva = true;
        chave = reserva.push().key;
        reserva.child(chave).set({
            keyUsuario: dados.keyUsuario,
            keyEstacionamento: dados.keyEstacionamento,
            nomeMotorista: dados.nomeMotorista,
            nomeEstacionamento: dados.estacionamento.nome,
            dataEntrada: dados.dataInicial,
            horaEntrada: dados.horarioInicial,
            dataSaida: dados.dataFinal,
            horaSaida: dados.horarioFinal,
            valor: dados.valorTotal,
            placa: dados.placa,
            vagaEspecial: vagaEspecial,
            status: "A",
            pago: "N",
            statusEntSai: "",
            horaEntradaRegistrada: "",
            horaSaidaRegistrada: "",
        });
        atualizarVagas(dados.keyEstacionamentoVagas, dados.estacionamento, vagaEspecial,'', 'I');
        ToastAndroid.showWithGravity('Reserva Efetuada!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } 
    }, 1000);
    
}

export const atualizarReserva =async(dados, status)=>{
    let statusReserva = '';
    let tipo = 'U';
    chave = dados.key;
    let retorno = await existeReserva(dados);

    if(status == 'C'){
        statusReserva = status;
    }
    else{
        statusReserva = dados.status;
    }

    if(status == 'S'){
        tipo = status;
    }

    setTimeout(function(){
        if(insere){
            reserva.child(dados.key).set({
                keyUsuario: dados.keyUsuario,
                keyEstacionamento: dados.keyEstacionamento,
                nomeMotorista: dados.nomeMotorista,
                nomeEstacionamento: dados.nomeEstacionamento,
                dataEntrada: dados.dataEntrada,
                horaEntrada: dados.horaEntrada,
                dataSaida: dados.dataSaida,
                horaSaida: dados.horaSaida,
                valor: dados.valor,
                status: statusReserva,
                placa: dados.placa,
                vagaEspecial: dados.vagaEspecial,
                pago: dados.pago,
                statusEntSai: dados.statusEntSai,
                horaEntradaRegistrada: "",
                horaSaidaRegistrada: "",
            });
            
            if(global.estacionamento.id != ''){
                dados.keyEstacionamentoVagas = global.estacionamento.id;
                dados.estacionamento = global.estacionamento;
            }
            
            atualizarVagas(dados.keyEstacionamentoVagas, dados.estacionamento, dados.vagaEspecial, statusReserva, tipo);
    
            if(status ==''){
                ToastAndroid.showWithGravity('Reserva Alterada!', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
            else{
                ToastAndroid.showWithGravity('Reserva Cancelada!', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
    }, 1000);
}

export const consultaReserva =(key)=>{
    let result = [];
    return new Promise((resolve, reject) => {
		reserva.child(key).on("value", function(snapshot) {
            result = {id: snapshot.key, ...snapshot.toJSON()}
            resolve(result);          
        })		
	});    
}