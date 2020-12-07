import Realm from 'realm';
import * as Schema from './schema';
import * as schemaType from './schemaType';

let schemaArray = [
    Schema.StudentSchema
]

export const databaseOptions = () => {
    return {
        path: 'student.realm',
        schema: schemaArray,
        schemaVersion: 0, //optional  
    }
};

export const createStudent = (studentObj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions()).then((realm) => {
        realm.write(() => {
            realm.create(schemaType.STUDENT_SCHEMA, studentObj);
            resolve();
        });
    })
    .catch((error) => reject(error));
});

export const updateStudent = (studentObj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions()).then((realm) => {
        realm.write(() => {
            let updateObj = realm.objectForPrimaryKey(schemaType.STUDENT_SCHEMA, studentObj.student_id);
            updateObj.student_name = studentObj.student_name;
            updateObj.student_class = studentObj.student_class;
            updateObj.student_subject = studentObj.student_subject;
            updateObj.created_by = studentObj.created_by;
            resolve();
        });
    })
    .catch((error) => reject(error));
});

export const deleteStudent = (studentId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions()).then((realm) => {
        realm.write(() => {
            let deleteObj = realm.objectForPrimaryKey(schemaType.STUDENT_SCHEMA, studentId);
            realm.delete(deleteObj);
            resolve();
        });
    })
    .catch((error) => reject(error));
});

export const deleteAllStudent = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions()).then((realm) => {
        realm.write(() => {
            let allDeleteStudent = realm.objectForPrimaryKey(schemaType.STUDENT_SCHEMA);
            realm.delete(allDeleteStudent);
            resolve();
        });
    })
    .catch((error) => reject(error));
});

export const getAllStudent = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions()).then((realm) => {
        realm.write(() => {
            let studentList = realm.objects(schemaType.STUDENT_SCHEMA);
            resolve(studentList);
        });
    })
        .catch((error) => reject(error));
});

export default new Realm(databaseOptions());