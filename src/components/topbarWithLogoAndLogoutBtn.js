import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, AsyncStorage } from "react-native";

const TopBarWithLogoComponent = ({navigation}) => {
    const logOut = async () => {
        console.log('logging out');
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
        return;
    };

    return (
        <View style={{flexDirection: 'row', alignItems: "flex-start"}}>
            <Image style={styles.logo} source={require('../../assets/logoNeom.png')} />

            <Text style={{flex: 1}}> </Text>

            <Text style={styles.needHelpText}>NEED HELP </Text>
            <TouchableOpacity onPress={logOut}>
                <Image style={styles.logOutLogo} source={require('../../assets/select_passport_type/logOut.png')} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        width: 375,
        height: 667,
        backgroundColor: "#ffffff",
        flexDirection: "column",
        position: 'absolute'
        
    },
    logo: {
        width: 50,
        height: 48,
        left: 30,
        top: 30,
    },
    needHelpText: {
        // width: 58,
        // height: 8.5,
        fontFamily: "PoppinsRegular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        // textAlign: "left",
        color: "#000000",
        // marginLeft: 252.5,
        top: 49.5,
        right: 44.5
    },
    logOutLogo: {
        width: 15,
        height: 16,
        top: 49.5,
        right: 30,
    },
    //=================== 2 =================//

});

export default TopBarWithLogoComponent;
