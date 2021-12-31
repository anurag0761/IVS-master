import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles}>
      <TouchableOpacity>
      <Image
        source = {{uri: '../../assets/select_passport_type/logoNeom@3x.png'}}
      />
      <Text style={styles.text}>Home screen</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
