import React, { useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  BORDER_COLOR,
  Textbox_BG_COLOR,
  SCREEN_BG_COLOR,
  Button_BG_COLOR,
} from "../theme/color";

const App = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    // setShow(Platform.OS === "ios");
    setShow(false);
    props.date(currentDate);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={showDatepicker}
          regular
          style={{
            height: 45,

            width: "85%",
            alignSelf: "center",
            borderRadius: 5,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 13, color: "#027000" }}>
              {props.availabilityDate[0]
                ? props.availabilityDate[0]
                : "Select Date"}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: "#027000" }}>{"Select"}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default App;
