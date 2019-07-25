import firebase from './Firebase';

const  redefinir = firebase.database().ref('codigoVerificacao');

export const inserirCodigoVerificacao = async(email, codigoVerificacao)=>{  
    return new Promise((resolve, reject) => {
        let chave = redefinir.push().key;;
            
        redefinir.child(chave).set({
            email: email,
            codigoVerificacao: codigoVerificacao
        });
        resolve();
    });

}

