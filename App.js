import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";
import HomeScreen from "./src/screens/HomeScreen";
import DocPicker from './src/screens/uploadFile.screen';
import SelectPassportTypeScreen from './src/screens/selectPassportType.screen';
import PassportDetailScreen from './src/screens/passportDetail.screen';
import LoginScreen from './src/screens/login.screen';
import TopBarWithLogoComponent from './src/components/topbarWithLogoAndLogoutBtn';
import PassportDetailComponent from './src/components/passportDetail';
import { Provider as AuthProvider } from './src/context/AuthContext';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    UploadFile: DocPicker,
    SelectPassportType: SelectPassportTypeScreen,
    TopBarWithLogo: TopBarWithLogoComponent,
    PassportDetails: PassportDetailScreen,
    PassportDetailComponent: PassportDetailComponent
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "",
    },
  }
);

// export default createAppContainer(navigator);


// instead of immediately exporting the AppNavigator component we assign in to a constant. 
const RootApp = createAppContainer(navigator);
// require in the font 
const customFonts = {
  PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
};

const App = () => {
    // the same as Font.loadAsync , the hook returns  true | error 
    const [isLoaded] = useFonts(customFonts);


    if (!isLoaded) {
        return <AppLoading />;
    }
    // from the custom App we return the component we assigned to RootApp.
    return <RootApp />;

}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};