
import { combineReducers } from 'redux';
import AuthReducer from '../../ViewModel/Reducers/AuthReducer';
import EndReducer from '../../ViewModel/Reducers/EndReducer';

const Reducers = combineReducers({

    auth: AuthReducer,
    endereco: EndReducer,

});

export default Reducers;

