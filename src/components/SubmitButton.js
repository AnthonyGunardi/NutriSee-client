import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function SubmitButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.handleOnPress}>
      <Text style={styles.submit}>Submit</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16
  },
  submit: {
    color: "#fff",
    fontSize: 17
  }
});

export default SubmitButton;
