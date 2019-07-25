import TelaLogin from './Pages/Login';
import TelaLogOut from './Pages/Logout';
import TelaEsqueciMinhaSenha from './Pages/EsqueciMinhaSenha';

//Views Motorista
import TelaValidarEntrada from './Pages/Motorista/ValidarEntrada';
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
import CadastroVagas from './Pages/Estacionamento/CadastroVagas';
import TelaRegistrarEntrada from './Pages/Estacionamento/RegistrarEntrada';

import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator} from "react-navigation";
import React from 'react';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox=true;

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

  HomeMotorista: { screen: createBottomTabNavigator(

    {
    
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

      LogOut: {
        screen: TelaLogOut,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            return <IconMaterial name="logout" size={36} color={tintColor}/>
          },
          tabBarLabel: 'Sair',
        }
      },

    }, 
    {
      tabBarOptions: {
        activeTintColor:'#F1F2F3',
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
      initialRouteName: 'Mapa'
    }
    ),
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#26A557',
        paddingTop: 20

      },
    },
  },

  HomeEstacionamento: { screen: createBottomTabNavigator(
    {
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

      Home: { screen: TelaHomeEstacionamento,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            return <IconAntDesign name="home" size={36} color={tintColor}/>
          },
          tabBarLabel: 'Home',
        },
      },

      CadastroVaga: { screen: CadastroVagas,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            return <IconMaterial name="garage" size={42} color={tintColor}/>
          },
          tabBarLabel: 'Vagas',
        }
      },
      LogOut: {
        screen: TelaLogOut,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            return <IconMaterial name="logout" size={36} color={tintColor}/>
          },
          tabBarLabel: 'Sair',
        }
      },
    },
    {
        tabBarOptions: {
          activeTintColor:'#F1F2F3',
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
      }
    ),
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#26A557',
        height: 65,
        paddingTop: 15

      },
    }
  },

  Mapa: {
    screen: TelaMapa,
    navigationOptions: {
      header: null
    }
  }
},
{
  initialRouteName: 'Login'
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
