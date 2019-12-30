import React, { useState } from "react";
import {
  View,
  Picker as PickerNative,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text
} from "react-native";

const PickerWeb = ({ selectedValue, onValueChange, style, ...props }) => {
  const [visble, setVisble] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisble(true)}>
        <Text style={{ backgroundColor: "#aaa", width: 200, height: 50 }}>
          {selectedValue}
        </Text>
      </TouchableOpacity>
      {visble ? (
        <PickerNative
          style={[styles.picker, style]}
          selectedValue={selectedValue}
          onValueChange={v => {
            setVisble(false);
            onValueChange(v);
          }}
          {...props}
        ></PickerNative>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 400
  }
});

export const Picker = PickerWeb;
export const PickerItem = PickerNative.Item;
