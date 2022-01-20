import React, {FC, useState} from "react";
import {Feather} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity} from "react-native";

type Props = {
    value: boolean
    onValueChange : (value: boolean) => void
}

const CheckBox:FC<Props> = ({value, onValueChange}:Props) => {

    const [isChecked, setChecked] = useState<boolean>(value)

    const onPress = (currentValue: boolean) => {
        setChecked(!currentValue)
        onValueChange(!currentValue)
    }

    return(
        <TouchableOpacity onPress={() => onPress(isChecked)}>
            {isChecked
                ? <Feather name={'check-square'} size={24} color={'black'}/>
                : <Feather name={'square'} size={24} color={'black'}/>
            }
        </TouchableOpacity>
    );
}

export default CheckBox;

