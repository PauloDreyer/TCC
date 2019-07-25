import url from '../Model/url';
import { editEndereco, editSenha } from './Actions/EndAction';

let api = '';
let retorno = '';


export const getEnderecoByCep=(cep)=>{
    api = url.cep.replace('%', cep);
  
    fetch(api)
    .then(response =>response.json())
    .then( data=>{
        this.setState({
            endereco : data.logradouro   
        });
    })
    .done();
}

