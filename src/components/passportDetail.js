import React, {useState} from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";

const PassportDetailComponent = ({ result }) => {
    // console.log('result = ', JSON.stringify(result));
    if(result && !Object.keys(result).length) {
        // console.log('inside no data detail');
        return <View><Text>Error while fetching data</Text></View>;
    }
    let unwantedKeys = ['signature', 'photo', 'mrz line 1', , 'mrz line 2'];
    if(unwantedKeys.indexOf(result.key.toLowerCase()) > -1) {
        // console.log('inside yes data detail');
        return <View></View>;
    }

    const [tick, setTick] = useState(false);
    const [cross, setCross] = useState(false);
    const changeTickSelection = () => {
        setTick(!tick);
        setCross(tick && false);
    };
    const changeCrossSelection = () => {
        setCross(!cross);
        setTick(cross && false);
    };

    return (
        <View style={styles.textView}>
            <View>
                <Text style={styles.value}>{result.Value}</Text>
                <Text style={styles.key}>{result.key}</Text>
            </View>
            <View style={styles.imageView}>
                <TouchableOpacity onPress={changeTickSelection}>
                    <Image style={tick ? styles.tick : styles.fadedTick} source={require('../../assets/upload_passport/tick2x.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeCrossSelection}>
                    <Image style={cross ? styles.cross : styles.fadedCross} source={require('../../assets/upload_passport/cross.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    textView: { 
        flexDirection: 'row',
    },
    value: {
        width: 135.5,
        height: 37,
        fontFamily: "PoppinsRegular",
        fontSize: 15,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        left: 29.5,
        top: 27,
        flex: 0.3,
        flexWrap: 'wrap'
    },
    key: {
        width: 124.5,
        height: 37,
        fontFamily: "PoppinsRegular",
        fontSize: 15,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "left",
        color: "grey",
        left: 29.5,
        top: 15
    },
    imageView: { 
        flexDirection: "row", 
        left: 104.5, 
        top: 31.5 
    },
    tick: {
        width: 34,
        height: 34,
        backgroundColor: "#ffffff",
        // borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cdcdcd", borderRadius: 17
    },
    fadedTick: {
        width: 34,
        height: 34,
        backgroundColor: "#ffffff",
        // borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cdcdcd", 
        borderRadius: 17,
        opacity: 0.2
    },
    cross: {
        width: 34,
        height: 34,
        backgroundColor: "#ffffff",
        // borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cdcdcd", 
        left: 20.5, 
        borderRadius: 17
    },
    fadedCross: {
        width: 34,
        height: 34,
        backgroundColor: "#ffffff",
        // borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#cdcdcd", 
        left: 20.5, 
        borderRadius: 17,
        opacity: 0.2
    }
});

export default PassportDetailComponent;