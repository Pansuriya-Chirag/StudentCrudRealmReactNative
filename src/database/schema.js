import * as schemaType from './schemaType';

export const StudentSchema = {
    name: schemaType.STUDENT_SCHEMA,
    primaryKey: 'student_id',
    properties: {
        student_id: {type: 'int', default: 0},
        student_name: 'string', 
        student_class: 'string',
        student_subject: 'string',
        created_by: 'date'
    }
};