import firebase from './Firebase';

export const insereEstacionamento = (key, nome, cidade, estado, latitude, longitude)=>{
    
    let estacionamento = firebase.database().ref('estacionamento');
    let chave = estacionamento.push().key;
    estacionamento.child(chave).set({
            key: key,
            nome: nome,
            vagas: 0,
            vagasDisp: 0,
            vagasEspeciais: 0,
            vagasEspeciaisDisp: 0,
            preco: 0,
            cidade: cidade,
            estado: estado,
            avaliacao: 0,
            totalAvaliacao: 0,
            qtdeAvaliacao: 0,
            latitude: latitude,
            longitude: longitude
        });
}

export const atualizarDadosEstacionamento =(id, dados)=>{
    global.atulizarEstacionamento = true;
    firebase.database().ref("estacionamento").child(id).set({
        key: dados.key,
        nome: dados.nome,
        vagas: dados.vagas,
        vagasDisp: dados.vagasDisp,
        vagasEspeciais: dados.vagasEspeciais,
        vagasEspeciaisDisp: dados.vagasEspeciaisDisp,
        preco: dados.preco,
        cidade: dados.cidade,
        estado: dados.estado,
        avaliacao: dados.avaliacao,
        totalAvaliacao: dados.totalAvaliacao,
        qtdeAvaliacao: dados.qtdeAvaliacao,
        latitude: dados.latitude,
        longitude: dados.longitude,
        horaAbertura: dados.horaAbertura,
        horaFechamento: dados.horaFechamento
    });
}

export const atualizarVagas =(id, dados, vagaEspecial, status, tipo)=>{

    let vagasEsp = 0;
    let vagasNormais = 0;

    if(vagaEspecial == 1 &&
       tipo == 'I'){
       vagasEsp = 1;
    }
    else if(vagaEspecial == 0 &&
            tipo == 'I'){
        vagasNormais = 1;
    }
    else if(vagaEspecial == 1 &&
        tipo == 'S'){
        vagasEsp = -1;
    }
    else if(vagaEspecial == 0 &&
             tipo == 'S'){
         vagasNormais = -1;
    }

    if(status == 'C' && 
       vagaEspecial == 1){
        vagasEsp = -1;
    }
    else if(status == 'C' && 
            vagaEspecial == 0){
        vagasNormais = -1;
    }

    firebase.database().ref("estacionamento").child(id).set({
        key: dados.key,
        nome: dados.nome,
        vagas: dados.vagas,
        vagasDisp: dados.vagasDisp - vagasNormais,
        vagasEspeciais: dados.vagasEspeciais,
        vagasEspeciaisDisp: dados.vagasEspeciaisDisp - vagasEsp,
        preco: dados.preco,
        cidade: dados.cidade,
        estado: dados.estado,
        avaliacao: dados.avaliacao,
        totalAvaliacao: dados.totalAvaliacao,
        qtdeAvaliacao: dados.qtdeAvaliacao,
        latitude: dados.latitude,
        longitude: dados.longitude,
        horaAbertura: dados.horaAbertura,
        horaFechamento: dados.horaFechamento
    });
}

export const retornaEstacionamentos = async(data)=>{
    data.listaEstacionamentos = [];

    var ref = firebase.database().ref("estacionamento");
    return new Promise((resolve, reject) => {
        if(global.cidade != '' && global.estado != ''){
            ref.orderByChild("cidade").equalTo(global.cidade)&&ref.orderByChild("estado").equalTo(global.estado).on("child_added", function(snapshot) {
                data.listaEstacionamentos.push(snapshot.toJSON());
                resolve();
            })
      }
        else if(global.cidade != ''){
            ref.orderByChild("cidade").equalTo(global.cidade).on("child_added", function(snapshot) {
                data.listaEstacionamentos.push(snapshot.toJSON());
                resolve();
            })
      }
        else if(global.estado != ''){
            ref.orderByChild("estado").equalTo(global.estado).on("child_added", function(snapshot) {
                data.listaEstacionamentos.push(snapshot.toJSON());
                resolve();
            })
      }
        else{
            ref.on("child_added", function(snapshot) {
                data.listaEstacionamentos.push(snapshot.toJSON());
                resolve();
            })
        }
    });
}