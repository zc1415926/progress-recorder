'use strict';

module.exports = {
	GET_ALL_STUDENTS: 'get_all_students',
	CREATE_STUDENT: 'create_student',
    UPDATE_STUDENT: 'update_student',
    DELETE_STUDENT: 'delete_student',
    GET_STUDENTS_BY_GRADE_CLASS: 'get_students_by_grade_class',
    DASHBOARD_STUDENT: 'dashboard_student',

    GET_GRADE_CLASSES: 'get_grade_classes',
    UPDATE_GRADE_CLASS: 'update_grade_class,',
    DELETE_GRADE_CLASS: 'delete_grade_class',
    GET_GRADES: 'get_grades',
    GET_CLASSES: 'get_classes',
    GET_CLASS_CODE: 'get_class_code',

    AUTHENTICATION: 'authentication',
    GET_USER_FROM_TOKEN: 'get_user_from_token',
    
    GET_PERF_RECORDS_BY_STUDENT_NUMBER: 'get_perf_records_by_student_number',

    TERM: {
	    INDEX: 'index_term',
        CREATE: 'create_term',
        DELETE: 'delete_term',
	    GET_CURRENT: 'get_current_term',
	    SET_CURRENT: 'set_current_term',
        INVALIDATION: 'invalidation_term',
    },
};