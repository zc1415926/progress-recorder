/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');

var env = require('../env.json');
console.log('服务器端地址：' + env.SERVER_BASE_URL);

var StudentAction = {
    createStudent: function () {

    },

    getAllStudents: function () {
        axios.get(env.SERVER_BASE_URL + '/student/index')
            .then(function(response){
                dispatchGetAllStudentsAction(response['data']);
            })
            .catch(function(error){
                console.log(error);
            });
    },
    getStudentById: function () {
        
    },
    updateStudent: function () {
        
    },
    deleteStudent: function () {
        
    }
};

var dispatchGetAllStudentsAction = function (data) {
    Dispatcher.dispatch({
        actionType: ActionTypes.GET_ALL_STUDENTS,
        students: data
    });
};

module.exports = StudentAction;