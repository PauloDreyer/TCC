const initialState = {
    email: '',
    senha: ''
};

const AuthReducer = (state = [], action) => {

    if(state.length == 0){
        return initialState;
    }

    if(action.type == 'editEmail'){
        return{
            ...state, email:action.payload.email
        };
    }

    if(action.type == 'editSenha'){
        return{
            ...state, senha:action.payload.senha
        }
    }

    return state;
};

export default AuthReducer;