import {Button, Text, TextInput, View, StyleSheet} from "react-native";
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
                        autoFocus={true}
                        style={styles.textInput}
                    />
                    {errors['name'] ? <Text style={styles.error}>{errors['name']}</Text>: null}
                    <Button title={btnValue} onPress={() => handleSubmit()} />
                </View>
            )}
        </Formik>
    );
}

export default TaskForm;

const styles = StyleSheet.create({
    textInput: {
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 5,
        height: 30,
        paddingHorizontal: 3
    },
    error: {
        color: 'red',
        fontWeight: '700',
        marginTop: 5,
        marginHorizontal: 5
    }
})
