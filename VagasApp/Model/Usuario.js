import firebase from './Firebase';
import { insereEstacionamento, atualizarDadosEstacionamento } from './Estacionamentos';
import { createUser , redefinirSenha } from './FirebaseAuth';

const  usuario = firebase.database().ref('usuario');

export const insereUsuario = async(nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude)=>{  

    var usuarioCriado = await createUser(nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude);

    if(usuarioCriado){
        let chave = usuario.push().key;
        
        if(tipoUsuario == 'M'){
            usuario.child(chave).set({
                tipoUsuario: tipoUsuario,
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: fone,
                placa: placa,
            });
        }
        else{
            usuario.child(chave).set({
                tipoUsuario: tipoUsuario,
                nome: nome,
                cnpj: cnpj,
                email: email,
                telefoneComercial: foneComercial,
                telefone: fone,
                cep: cep,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                estado: estado,
                latitude: latitude,
                longitude: longitude,
            });

            insereEstacionamento(chave, nome, cidade, estado, latitude, longitude);
        }
        return true;
    }
    return false;

}

export const atualizarDados =(id, nome, cpf, cnpj, email, foneComercial, fone, placa, cep, endereco, numero, cidade, estado, senha, tipoUsuario, latitude, longitude, senhaAtual)=>{
    let valido = true;

    if(senha != senhaAtual){
        valido = redefinirSenha(senha)
    }

    if(valido){

        if(tipoUsuario == 'M'){
            usuario.child(id).set({
                tipoUsuario: tipoUsuario,
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: fone,
                placa: placa
            });
        }
        else{
            usuario.child(id).set({
                tipoUsuario: tipoUsuario,
                nome: nome,
                cnpj: cnpj,
                email: email,
                telefoneComercial: foneComercial,
                telefone: fone,
                cep: cep,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                estado: estado,
                latitude: latitude,
                longitude: longitude
            });
            atualizarDadosEstacionamento(global.estacionamento.id,  global.estacionamento);
        }
    }

    return valido;
}