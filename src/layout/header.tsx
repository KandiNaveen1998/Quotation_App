import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground,StatusBar  } from "react-native";

const Header = () => {
  return (
    <>
      <View style={styles.root}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <ImageBackground
          source={require('../asset/headerBgImg.png')} // Make sure this file exists
          style={styles.background}
        >
          <View style={styles.containerHeader}>
            <View style={styles.rightSection}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                style={styles.image}
              />
              <Text style={styles.code}>SVR001</Text>
            </View>
            <View style={styles.leftSection}>
              <Text style={styles.name}>Sai Kumar</Text>
              <Text style={styles.company}>SKML Auto Consultancy, CPP VZM</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000",
  },
  background: {
    padding: 16,
    justifyContent: "center",
    alignItems:'center',
    overflow: "hidden",
    height: 160,
  },
  containerHeader: {
    flexDirection: "row",
    gap:20,
    marginTop:20
  },
  leftSection: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  company: {
    color: "#dcdcdc",
    fontSize: 14,
  },
  rightSection: {
    alignItems: "center",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 22.5,
    marginBottom: 4,
  },
  code: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },
});
