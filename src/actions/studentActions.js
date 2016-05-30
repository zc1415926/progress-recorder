/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');

var env = require('../env.json');
console.log(env.SERVER_BASE_URL);

var StudentAction = {
    createStudent: function () {
        
    },
    getAllStudents: function () {
        $.ajax({
            type: 'GET',
            url: env.SERVER_BASE_URL + '/student/index',
            success: this.dispatchGetAllStudentsAction
        });
    },
    getStudentById: function () {
        
    },
    updateStudent: function () {
        
    },
    deleteStudent: function () {
        
    },

    dispatchGetAllStudentsAction: function (data) {
        //console.log("jQuery get data: ");
        //console.log(data);
        //console.log("jQuery out.");
        
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ALL_STUDENTS,
            students: data
        });
    }
};

module.exports = StudentAction;