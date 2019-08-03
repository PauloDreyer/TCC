import firebase from '../Model/Firebase';

export const   listaEstacionamentos = async(data)=>{
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