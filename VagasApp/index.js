import { AppRegistry } from "react-native";
import Navigator from "./View/rotas";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

