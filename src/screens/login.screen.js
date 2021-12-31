import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, TextInput, AsyncStorage, Platform } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getToken = async () => {
        return await AsyncStorage.getItem('token');
    }

    if(!getToken()) {
        navigation.navigate('SelectPassportType');
        return;
    }

    const login = () => {
        // if (!email || !password) return;
        const url = 'http://10.101.21.16/auth/local';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let formData = JSON.stringify({ "email": email, "password": password });
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        };
        let userName = email.split('@')[0];
        console.log('hitting login = ', JSON.stringify(formData));

        // navigation.navigate('SelectPassportType', { name: userName });
        fetch(url, options).then((response) => {
            console.log('login response = ', JSON.stringify(response));
            response.json().then(async function (data) {
                console.log('login API success');
                let userName = email.split('@')[0];
                await AsyncStorage.setItem('token', JSON.stringify(data.token));
                await AsyncStorage.setItem('name', email);
                console.log('userName = ', userName);
                navigation.navigate('SelectPassportType', { name: userName });
            })
        }).catch(async (err) => { console.log(err) });
    }

    return (
        <View style={{
            // width: 375,
            // height: 667,
            height: 'auto',
            backgroundColor: "#ffffff"
        }}>
            <View style={{
                // width: 375.5,
                // height: 305,
            }}>
                <Image
                    style={{
                        // width: 375,
                        height: 305.5,
                        position: "absolute"
                    }}
                    source={require('../../assets/auth/illustrations2x.png')} />

                <Image
                    style={{
                        // width: 375,
                        height: 305.5,
                        opacity: 0.35,
                        backgroundColor: "#eabf4c",
                        position: "absolute"
                    }}
                    source={require('../../assets/auth/80535Ai2x.png')} />

                <View style={{ flexDirection: 'column' }}>
                    <Image
                        style={styles.neomLogo}
                        source={require('../../assets/logoNeom.png')} />
                    <Text style={styles.neomText}>NEOM</Text>
                    <Text style={styles.idText}>ID Verification {"\n"}
                        System</Text>
                </View>
            </View>

            <View style={{position: 'absolute'}}>
                <View style={{}}>
                    <Image style={{
                        top: 400,
                        left: 50.5,
                        width: 18,
                        height: 13.5
                    }}
                        source={require('../../assets/auth/mail2x.png')} />
                    <TextInput style={styles.emailBox} value={email} onChangeText={setEmail} />
                </View>
                <View style={{ position: "absolute" }}>
                    <Image style={{
                        top: 485,
                        left: 50.5,
                        width: 12.5,
                        height: 15
                    }}
                        source={require('../../assets/auth/password.png')} />

                    <TextInput style={styles.passwordBox} secureTextEntry value={password} onChangeText={setPassword} />
                </View>
                <View style={{ position: "absolute" }}>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.text} onPress={login}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.forgetText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    neomLogo: {
        width: 79.5,
        height: 79.5,
        top: 51.5,
        left: 30.5,
        position: "absolute"
    },
    neomText: {
        top: 139,
        left: 47,
        width: 48,
        // height: 16,
        borderRadius: 5,
        flexShrink: 1,
        position: "absolute"
    },
    idText: {
        // width: 199.5,
        height: 164.5,
        fontFamily: "PoppinsMedium",
        fontSize: 28.5,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#0e0e0e",
        top: 198.5,
        left: 30.5,
        position: 'absolute'
    },
    emailBox: {
        width: 315,
        height: 57,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ffd956",
        top: 365,
        left: 30,
        paddingLeft: 58.5
    },
    passwordBox: {
        width: 315,
        height: 57,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ffd956",
        top: 450,
        left: 30,
        paddingLeft: 58.5
    },
    loginBtn: {
        width: 315,
        height: 57,
        borderRadius: 10,
        backgroundColor: "#b89535",
        left: 30,
        top: 550.5,
    },
    text: {
        fontFamily: "PoppinsMedium",
        fontSize: 13,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff",
        top: 23.5
    },
    forgetText: {
        width: 137,
        fontFamily: "PoppinsRegular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#b89535",
        left: 119,
        top: 580
    }
});

export default LoginScreen;
