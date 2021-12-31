import React, {useState} from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import TopBarWithLogoComponent from "../components/topbarWithLogoAndLogoutBtn";

const SelectPassportTypeScreen = ({ navigation }) => {
    const [selectedType, selectType] = useState('');
    const changeSelection = (param) => selectType(param);
    const logedInUserName = navigation.getParam('name');

    return (
        <View style={styles.view}>
            <TopBarWithLogoComponent />

            <View style={{ top: 115, position: 'absolute' }}>
                <Text style={styles.helloText}>Hello, {logedInUserName}</Text>
                <Text style={styles.selectIdMessage}>Please select the ID type to be uploaded</Text>
            </View>

            <View style={{ position: 'absolute', top: 201.5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={selectedType === 'ksa' ? styles.selected : styles.rectangleBox } onPress={() => changeSelection('ksa')}>
                        <View style={styles.ellipse}>
                            <Image style={styles.ksaPassportIcon} source={require('../../assets/select_passport_type/ksaPassport2x.png')} />
                        </View>
                        <Text style={styles.passportText}>KSA Passport</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={selectedType === 'uk' ? styles.selected2 : styles.rectangleBox2} onPress={() => changeSelection('uk')}>
                        <View style={styles.ellipse}>
                            <Image style={styles.ksaPassportIcon} source={require('../../assets/select_passport_type/ukPassport2x.png')} />
                        </View>
                        <Text style={styles.passportText}>UK Passport</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', top: 18.5 }}>
                    <TouchableOpacity style={selectedType === 'usa' ? styles.selected : styles.rectangleBox} onPress={() => changeSelection('usa')}>
                        <View style={styles.ellipse}>
                            <Image style={styles.ksaPassportIcon} source={require('../../assets/select_passport_type/ksaPassport2x.png')} />
                        </View>
                        <Text style={styles.passportText}>USA Passport</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={selectedType === 'neomId' ? styles.selected2 : styles.rectangleBox2} onPress={() => changeSelection('neomId')}>
                        <View style={styles.ellipse}>
                            <Image style={styles.neomIdIcon} source={require('../../assets/select_passport_type/n2x.png')} />
                        </View>
                        <Text style={styles.passportText}>NEOM ID</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', top: 37 }}>
                    <TouchableOpacity style={selectedType === 'iqamaCard' ? styles.selected : styles.rectangleBox} onPress={() => changeSelection('iqamaCard')}>
                        <View style={styles.ellipse}>
                            <Image style={styles.iqamaCardIcon} source={require('../../assets/select_passport_type/iqamaCard2x.png')} />
                        </View>
                        <Text style={styles.passportText}>Iqama Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('UploadFile', {docType: selectedType})}>
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        width: 375,
        height: 'auto',
        backgroundColor: "#ffffff",
        flexDirection: "column",

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
        right: 64.5
    },
    logOutLogo: {
        width: 15,
        height: 16,
        top: 49.5,
        right: 30,
    },
    //=================== 2 =================//

    helloText: {
        // width: 187,
        height: 28.5,
        fontFamily: "PoppinsMedium",
        fontSize: 24,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        left: 30
    },
    selectIdMessage: {
        width: 260,
        height: 16.5,
        fontFamily: "PoppinsRegular",
        fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        top: 15.5,
        left: 30
    },
    //================ 3 ====================//

    rectangleBox: {
        width: 148.5,
        height: 96,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e6e6e6",
        // top: 124.5,
        left: 30
    },
    selected: {
        width: 148.5,
        height: 96,
        borderRadius: 5,
        backgroundColor: "#ffd956",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e6e6e6",
        left: 30
    },
    ellipse: {
        width: 36,
        height: 36,
        backgroundColor: "#ffd956",
        borderRadius: 18,
        left: 20,
        top: 15
    },
    ksaPassportIcon: {
        width: 14,
        height: 18,
        // backgroundColor: "#000000"
        top: 9,
        left: 11
    },
    iqamaCardIcon: {
        width: 20,
        height: 12,
        top: 12,
        left: 8

    },
    neomIdIcon: {
        width: 9,
        height: 13,
        top: 12,
        left: 13
    },
    passportText: {
        top: 30,
        left: 20
    },
    rectangleBox2: {
        width: 148.5,
        height: 96,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e6e6e6",
        // top: 144.5,
        left: 48.5
    },
    selected2: {
        width: 148.5,
        height: 96,
        borderRadius: 5,
        backgroundColor: "#ffd956",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e6e6e6",
        left: 48.5
    },
    //====================================//


    nextBtn: {
        width: 315,
        height: 57,
        borderRadius: 10,
        backgroundColor: "#b89535",
        top: 566,
        left: 30
        // marginTop: '84.9%',
    },
    nextText: {
        // width: 27.5,
        // height: 9.5,
        fontFamily: "PoppinsMedium",
        fontSize: 13,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff",
        top: 18
    }
});

export default SelectPassportTypeScreen;
