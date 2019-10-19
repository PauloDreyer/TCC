import TelaLogin from './Pages/Login';
import TelaLogOut from './Pages/Logout';
import TelaEsqueciMinhaSenha from './Pages/EsqueciMinhaSenha';

//Views Motorista
import TelaValidarEntrada from './Pages/Motorista/ValidarEntrada';
import TelaAvaliacao from './Pages/Motorista/Avaliacao';
import TelaCadastroMotorista from './Pages/Motorista/CadastroMotorista';
import TelaMapa from './Pages/Motorista/Mapa';
import TelaHistoricoMotorista from './Pages/Motorista/HistoricoMotorista';
import TelaMinhasReservas from './Pages/Motorista/MinhasReservas';
import TelaReserva from './Pages/Motorista/CadastroReserva';
import TelaFiltro from './Pages/Motorista/Filtro';
import TelaManterReserva from './Pages/Motorista/ManterReserva';
import TelaMeusDadosMotorista from './Pages/Motorista/ManterDadosMotorista';

//Views Estacionamento
import TelaCadastroEstacionamento from './Pages/Estacionamento/CadastroEstabelecimento';
import TelaHomeEstacionamento from './Pages/Estacionamento/HomeEstacionamento';
import TelaMeusDadosEstacionamento from './Pages/Estacionamento/ManterDadosEstacionamento';
import TelaHistoricoEstacionamento from './Pages/Estacionamento/HistoricoEstacionamento';
import TelaReservaCliente from './Pages/Estacionamento/ReservaCliente';
import TelaCadastroVagas from './Pages/Estacionamento/CadastroVagas';
import TelaRegistrarEntrada from './Pages/Estacionamento/RegistrarEntrada';

//
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, drawerIcon} from "react-navigation";
import React from 'react';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Componente/Style';

console.disableYellowBox=true;

const MotoristaTabNavigator = createBottomTabNavigator({
  
  Mapa: { screen: TelaMapa,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <IconMaterial name="google-maps" size={32} color={tintColor}/>
      },
      tabBarLabel: 'Mapa',
    },     
  },
  
  MeusDados: { screen: TelaMeusDadosMotorista,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <FontAwesome name="user-circle" size={28} color={tintColor}/>
      },
      tabBarLabel: 'Dados',    
      fontWeight: 12,   
    }
  },

  Historico: { screen: TelaHistoricoMotorista,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <IconMaterial name="history" size={36} color={tintColor}/>
      },
      tabBarLabel: 'Histórico',
    },
  },
  
  MinhasReservas: { screen: TelaMinhasReservas,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <IconMaterial name="garage-alert" size={42} color={tintColor}/>
      },
      tabBarLabel: 'Reservas',
    }
  },

  Filtro: { screen: TelaFiltro,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <IconMaterial name="filter-outline" size={36} color={tintColor}/>
      },
      tabBarLabel: 'Filtro',
    }
  },
}, 
{
  tabBarOptions: {
    activeTintColor:'#37EF7D',
    inactiveTintColor: '#CCCCCC',
    showIcon: true,
    showLabel: true,
    style:{
      backgroundColor: '#26A557',
      height: 60,
      marginBottom:0,
    },
    indicatorStyle:{
      backgroundColor: '#F1F2F3',
    }
  },
  initialRouteName: 'Mapa',
},
{
  navigationOptions: {
    header: null,
    headerStyle: {
      backgroundColor: '#26A557',
      paddingTop: 20

    },
  }
});

const EstacionamentoTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: TelaHomeEstacionamento,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <IconAntDesign name="home" size={36} color={tintColor}/>
        },
        tabBarLabel: 'Home',
      },
    },

    CadastroVaga: { screen: TelaCadastroVagas,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <IconMaterial name="garage" size={42} color={tintColor}/>
        },
        tabBarLabel: 'Vagas',
      }
    },

    MeusDados: { screen: TelaMeusDadosEstacionamento,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <FontAwesome name="user-circle" size={28} color={tintColor}/>
        },
        tabBarLabel: 'Meus Dados',
      }
    },

    Historico: { screen: TelaHistoricoEstacionamento,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <IconMaterial name="history" size={36} color={tintColor}/>
        },
        tabBarLabel: 'Histórico',
      },
    },
  },
  {
      tabBarOptions: {
        activeTintColor:'#37EF7D',
        inactiveTintColor: '#CCCCCC',
        showIcon: true,
        showLabel: true,
        style:{
          backgroundColor: '#26A557',
          height: 60,
          marginBottom:0,
        },
        indicatorStyle:{
          backgroundColor: '#F1F2F3',
        }
      },
      initialRouteName: 'Home'
    },
  {
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      }
    }
  }
);

const MotoristaDrawerNavigator = createDrawerNavigator({
  Menu:{
    screen: MotoristaTabNavigator,
    navigationOptions: {
      tintColor: '#F1F2F3',
      activeTintColor: '#F1F2F3',
    }, 
  },

  Mapa:{
    screen: TelaMapa,
    navigationOptions: {
      drawerLabel: "Mapa",
      drawerIcon: () => {
        return <IconMaterial name="google-maps" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  },

  MeusDados:{
    screen: TelaMeusDadosMotorista,
    navigationOptions: {
      drawerLabel: "Meus Dados",
      drawerIcon: () => {
        return <FontAwesome name="user-circle" size={38} color={'#2A81D3'} style={{width: 40, marginLeft: 20}}/>
      },
    }, 
  },

  Historico:{
    screen: TelaHistoricoMotorista,
    navigationOptions: {
      drawerLabel: "Histórico",
      drawerIcon: () => {
        return <IconMaterial name="history" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  },

  MinhasReservas:{
    screen: TelaMinhasReservas,
    navigationOptions: {
      drawerLabel: "Minhas Reservas",
      drawerIcon: () => {
        return <IconMaterial name="garage-alert" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  },

  Filtro:{
    screen: TelaFiltro,
    navigationOptions: {
      drawerLabel: "Filtros",
      drawerIcon: () => {
        return <IconMaterial name="filter-outline" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  },

  Sair:{
    screen: TelaLogOut,
    navigationOptions: {
      drawerLabel: "Sair",
      drawerIcon: () => {
        return <IconMaterial name="logout" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  }
},
{
  
initialRouteName: "Menu",
  
contentOptions: {
  activeTintColor: '#F1F2F3',
  activeBackgroundColor: '#F1F2F3',
  inactiveTintColor: '#26A557',
  itemsContainerStyle: {
    paddingTop: 0,
  },
  iconContainerStyle: {
    opacity: 1
  }
},

  drawerBackgroundColor: '#F1F2F3',
  
});

const EstacionamentoDrawerNavigator = createDrawerNavigator({
  Menu:{
    screen: EstacionamentoTabNavigator,
    navigationOptions: {
      tintColor: '#F1F2F3',
      activeTintColor: '#F1F2F3',
    } 
  },

  Home: {
    screen: TelaHomeEstacionamento,
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: () => {
        return <IconAntDesign name="home" size={36} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    },
  },

  CadastroVaga: { 
    screen: TelaCadastroVagas,
    navigationOptions: {
      drawerLabel: "Vagas",
      drawerIcon: () => {
        return <IconMaterial name="garage" size={42} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }
  },
  
  MeusDados:{
    screen: TelaMeusDadosEstacionamento,
    navigationOptions: {
      drawerLabel: "Meus Dados",
      drawerIcon: () => {
        return <FontAwesome name="user-circle" size={38} color={'#2A81D3'} style={{width: 40, marginLeft: 20}}/>
      },
    }, 
  },

  Historico:{
    screen: TelaHistoricoEstacionamento,
    navigationOptions: {
      drawerLabel: "Histórico",
      drawerIcon: () => {
        return <IconMaterial name="history" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  },

  Sair:{
    screen: TelaLogOut,
    navigationOptions: {
      drawerLabel: "Sair",
      drawerIcon: () => {
        return <IconMaterial name="logout" size={46} color={'#2A81D3'} style={{width: 50, marginLeft: 20}}/>
      },
    }, 
  }
},

{
  initialRouteName: "Menu",

  contentOptions: {
    activeTintColor: '#F1F2F3',
    activeBackgroundColor: '#F1F2F3',
    inactiveTintColor: '#26A557',
    itemsContainerStyle: {
      paddingTop: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  
    drawerBackgroundColor: '#F1F2F3',
});

const AppNavigator = createStackNavigator({

  Login: {
    screen: TelaLogin,
    navigationOptions: {
      header: null
    }
  },

  MinhaSenha: {
    screen: TelaEsqueciMinhaSenha,
    navigationOptions: {
      title: 'Esqueci minha Senha',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },

  RegistrarEntrada: {
    screen: TelaRegistrarEntrada,
    navigationOptions: {
      title: 'Registrar Entrada',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  ValidarEntrada: {
    screen: TelaValidarEntrada,
    navigationOptions: {
      title: 'Validar Entrada',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  Avaliacao: {
    screen: TelaAvaliacao,
    navigationOptions: {
      title: 'Avaliar Estacionamento',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  CadastroMotorista: {
    screen: TelaCadastroMotorista,
    navigationOptions: {
      title: 'Cadastro',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  CadastroEstacionamento: {
    screen: TelaCadastroEstacionamento,
    navigationOptions: {
      title: 'Cadastro',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  CadastroReservaVagas: {
    screen: TelaReserva,
    navigationOptions: {
      title: 'Reserva',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  ManterReservas: {
    screen: TelaManterReserva,
    navigationOptions: {
      title: 'Minha Reserva',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  ReservaCliente: {
    screen: TelaReservaCliente,
    navigationOptions: {
      title: 'Reserva',
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
      headerTintColor: '#F1F2F3',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },

  InicioMotorista: {
    screen: MotoristaDrawerNavigator,
    navigationOptions: {
      header: null
    }
  },

  InicioEstacionamento: {
    screen: EstacionamentoDrawerNavigator,
    navigationOptions: {
      header: null
    }
  },

  initialRouteName: 'Login'
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
