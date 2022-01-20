import {TouchableWithoutFeedback} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {FC} from "react";

type Props = {
    onPress: () => void
    icon: "trash" | "add"
}

const HeaderRightButton: FC<Props> = ({onPress, icon}:Props) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Ionicons
                name={`ios-${icon}`}
                size={35}
                style={{marginRight:25}}
                color={'#0080ff'}
            />
        </TouchableWithoutFeedback>
    );
}

export default HeaderRightButton;
