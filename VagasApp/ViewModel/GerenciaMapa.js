import firebase from '../Model/Firebase';
import { retornaEstacionamentos } from '../Model/Estacionamentos';

export const   listaEstacionamentos = async(data)=>{
    await retornaEstacionamentos(data);
}