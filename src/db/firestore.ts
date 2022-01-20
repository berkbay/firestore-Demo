import * as firebase from "firebase";
import "firebase/firestore";
import {TaskType} from "../Types";

const configuration= {
     apiKey: "AIzaSyBlAzg0NQnu7xeNRWFwtdebH2f86ojd2bo",
     authDomain: "usefirestoredemo.firebaseapp.com",
     projectId: "usefirestoredemo",
     storageBucket: "usefirestoredemo.appspot.com",
     messagingSenderId: "244147343006",
     appId: "1:244147343006:web:dc2687ec67e67896ba358f",
     measurementId: "G-3YYKHGHDBX"
};

firebase.initializeApp(configuration)

const db = firebase.firestore();

export const updateTask = (taskId: string, taskUpdatedTo) =>{
    return db.collection('tasks').doc(taskId).update(taskUpdatedTo)
}

export const createTask = (task) => {
    return db.collection('tasks').add(task)
}

export const streamTasks = (observer) => {
    db.collection('tasks')
        .orderBy('createdAt', 'desc')
        .onSnapshot(observer)
}

export const deleteTask = (taskId: string) => {
    return db.collection('tasks')
        .doc(taskId)
        .delete()
}

export const findTask = (taskId: string): Promise<TaskType> => {
    return (
        db.collection('tasks')
            .doc(taskId)
            .get()
            .then(doc => {
                if (doc) {
                    const name = doc.data()?.name
                    return {
                        id: doc.id,
                        name: doc.data()?.name,
                        createdAt: doc.data()?.createdAt,
                        completedAt: doc.data()?.completedAt
                    } as TaskType
                }else{
                    throw new Error('item-does-not-exist')
                }
            })
    );
}

export default db;
