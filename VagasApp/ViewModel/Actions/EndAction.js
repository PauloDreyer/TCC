export const editEndereco = (endereco) => {
    return{
        type: 'editEndereco',
        payload: {
            endereco: endereco
        }
    };
};


export const editCidade = (cidade) =>{
    return{
        type: 'editCidade',
        payload:{
            cidade: cidade
        }
    };
};


export const editEstado = (estado) =>{
    return{
        type: 'editCidade',
        payload:{
            estado: estado
        }
    };
};