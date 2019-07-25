const initialState = {
    endereco: '',
    cidade: '',
    estado: '',
};

const EndReducer = (state = [], action) => {

    if(state.length == 0){
        return initialState;
    }

    if(action.type == 'editEndereco'){
        return{
            ...state, email:action.payload.email
        };
    }

    if(action.type == 'editCidade'){
        return{
            ...state, cidade:action.payload.cidade
        }
    }

    if(action.type == 'editEstado'){
        return{
            ...state, estado:action.payload.estado
        }
    }

    return state;
};

export default EndReducer;