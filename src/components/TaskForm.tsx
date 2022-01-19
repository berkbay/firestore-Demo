import db from "../db/firestore";
import {Button, Text, TextInput, View} from "react-native";
import {Formik} from "formik";
import React, {FC} from "react";
import * as yup from "yup";

type FormProps = {
    name: string
}

type Props = {
    onSubmit: (values) => void
    name: string
    btnValue: string
}

const TaskForm: FC<Props> = ({onSubmit, name, btnValue}: Props) => {

    const validationSchema = yup.object().shape<FormProps>({
        name: yup.string().required()
    })

    return (
        <Formik
            initialValues={{name}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({
                  values,
                  handleChange,
                  errors,
                  handleSubmit}) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('name')}
                        placeholder={'Describe task'}
                        value={values.name}
                        autoFocus={true} />
                    {errors['name'] ? <Text>{errors['name']}</Text>: null}
                    <Button title={btnValue} onPress={() => handleSubmit()} />
                </View>
            )}
        </Formik>
    );
}

export default TaskForm;
