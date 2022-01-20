import * as firebase from "firebase";
import "firebase/firestore";
import {TaskType} from "../Types";
import {number} from "yup";

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

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type DocumentData = firebase.firestore.DocumentData;

export type FirebaseObserver = {
    next?: (snapshot: firebase.firestore.QuerySnapshot<DocumentData>) => void;
    error?: (error: Error) => void;
    complete: () => void;
}

export const updateTask = (taskId: string, taskUpdatedTo) =>{
    return db.collection('tasks').doc(taskId).update(taskUpdatedTo)
}

export const createTask = (task: TaskType) => {
    return db.collection('tasks').add(task)
}

export const getPaginatedTasks = (afterDoc: DocumentSnapshot | undefined, limit: number) => {
    const queryRef = db
        .collection('tasks')
        .orderBy('createdAt', 'desc')
        .limit(limit)

    return (afterDoc ? queryRef.startAfter(afterDoc) : queryRef).get()
}

export function streamTasks  (observer: FirebaseObserver)  {
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

export const mapDocToTask = (document: DocumentSnapshot): TaskType => {
    return {
        id: document.id,
        name: document.data()?.name as string,
        createdAt: document.data()?.createdAt as Date,
        completedAt: (document.data()?.completedAt as Date) || null,
    }
}

export default db;
