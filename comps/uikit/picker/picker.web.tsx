import React, { useState } from "react";
import { View, Picker as PickerWeb, TouchableOpacity, StyleSheet } from "react-native";




export const Picker =  ({style, ...probs})=><View><PickerWeb style={[{backgroundColor:"#fff", borderWidth:0},style]} {...probs}/></View>
export const PickerItem = PickerWeb.Item