import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import TopBarWithLogoComponent from "../components/topbarWithLogoAndLogoutBtn";
import PassportDetailComponent from '../components/passportDetail';

const PassportDetailScreen = ({ navigation }) => {
    // const data = {
    //     "extractedDocs": [
    //         {
    //             "ProcessedDocumentType": "Validated",
    //             "JSONData": {
    //                 "Passport": {
    //                     "Passport No": {
    //                         "Value": "L9630722",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Type": {
    //                         "Value": "P",
    //                         "Validated": false,
    //                         "Confidence": "Low"
    //                     },
    //                     "Country Code": {
    //                         "Value": "IND",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Surname": {
    //                         "Value": "PATEL",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Given Name": {
    //                         "Value": "HUSSEIN MUBARAK",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Nationality": {
    //                         "Value": "INDIAN",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Sex": {
    //                         "Value": "M",
    //                         "Validated": false,
    //                         "Confidence": "Low"
    //                     },
    //                     "Date of Birth": {
    //                         "Value": "30/08/1968",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Place of Birth": {
    //                         "Value": "MAHARASHTRA",
    //                         "Validated": false,
    //                         "Confidence": "Low"
    //                     },
    //                     "Place of Issue": {
    //                         "Value": "THANE",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Date of Expiry": {
    //                         "Value": "11/05/2024",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Date of Issue": {
    //                         "Value": "12/05/2014",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "Photo": {
    //                         "Value": "",
    //                         "Validated": false,
    //                         "Confidence": "Low"
    //                     },
    //                     "Signature": {
    //                         "Value": "",
    //                         "Validated": false,
    //                         "Confidence": "Low"
    //                     },
    //                     "MRZ Line 1": {
    //                         "Value": "P<INDPATEL<<HUSSEIN<MUBARAK<<<<<<<<<<<<<<<<<",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     },
    //                     "MRZ Line 2": {
    //                         "Value": "L9630722<8IND6808301M2405115<<<<<<<<<<<<<<<0",
    //                         "Validated": false,
    //                         "Confidence": "High"
    //                     }
    //                 }
    //             },
    //             "Metadata": {
    //                 "timestamp": {
    //                     "start": "12-08-2021 09:10:33.344462",
    //                     "end": "12-08-2021 09:10:35.679955",
    //                     "duration": 2.335493803024292
    //                 }
    //             },
    //             "FileName": "dummy_passport.jpg",
    //             "clientUniqueID": "mudittest1",
    //             "documentID": "6114e589dec2be00121b0fa9"
    //         }
    //     ],
    //     "errorFileList": [],
    //     "timings": {
    //         "ocrJOBRequest": 30,
    //         "pollForExtractedDocs": 4002
    //     }
    // };
    const data = navigation.getParam('data');
    let docType = navigation.getParam('docType');

    let dict = {};
    let data2 = [];
    const dataValidation = data && data.extractedDocs && data.extractedDocs.length && data.extractedDocs[0].JSONData && data.extractedDocs[0].JSONData.Passport;
    const [apiResultMessage, setApiResultMessage] = useState(dataValidation ? 'Successfully' : 'Unsuccessfully');
    console.log(' fetched data ============ ', data);
    if (dataValidation) {
        dict = data.extractedDocs[0].JSONData.Passport;
        for (let word in dict) {
            dict[word]['key'] = word;
        }
        data2 = Object.values(dict);
    }
    const body = <FlatList style={{}} data={data2}
        renderItem={(element) => {
            return <PassportDetailComponent result={element.item} />
        }}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
    />;
    const bodyFail = <View style={{left: 30, top: 30}}><Text>Error while fetching data. Please retry</Text></View>;


    return (
        <View style={styles.container}>
            <TopBarWithLogoComponent />
            <View style={{ height: 43.5, position: 'absolute', left: 30, top: 125 }}>
                <Text style={styles.neomIdText}>{docType}</Text>
                <Text style={styles.processedText}>Processed {apiResultMessage}</Text>
            </View>
            <Text style={styles.verifyText}>Please verify the details below</Text>
            <View style={styles.line}></View>
            <View style={styles.detailContainer}>
                {/* <FlatList style={{}} data={data2}
                    renderItem={(element) => {
                        return <PassportDetailComponent result={element.item} />
                    }}
                    keyExtractor={item => item.key}
                    showsVerticalScrollIndicator={false}
                /> */}
                {data2 ? body : bodyFail}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 720,
        backgroundColor: "#ffffff",
        flexDirection: "column"
    },
    neomIdText: {
        fontFamily: "PoppinsMedium",
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0, color: '#b89535'
    },
    processedText: {
        fontFamily: "PoppinsMedium",
        fontSize: 24,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },
    verifyText: {
        position: 'absolute',
        width: 194,
        height: 16,
        fontFamily: "PoppinsRegular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        top: 181.5,
        left: 30
    },
    line: {
        width: 375,
        height: 2,
        backgroundColor: "#c2a55e",
        top: 189.5
    },
    detailContainer: {
        width: 375,
        height: 475.5,
        backgroundColor: "#f9f7f2",
        top: 190.5,
        bottom: 10
    }


});

export default PassportDetailScreen;