import React from "react";
import {Button, Text, TextInput, View} from "react-native";
import {Formik} from "formik";
import db from "../db/firestore";
import {useNavigation} from "@react-navigation/native";
import * as yup from 'yup';

type FormProps = {
    name: string
}

const CreateTask = () => {

    const navigation = useNavigation()

    const validationSchema = yup.object().shape<FormProps>({
        name: yup.string().required()
    })

    return (
        <View>
            <Formik
                initialValues={{name: ''}}
                onSubmit={(values) => {
                    db.collection('tasks').add({
                        name: values.name,
                        createdAt: new Date(),
                        completedAt: null
                    }).then(result => navigation.navigate('Tasks'))
                        .catch(err => console.log(err))
                }}
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
                        <Button title={'Create'} onPress={() => handleSubmit()} />
                    </View>
                )}
            </Formik>
        </View>
    );
}

export default CreateTask;
