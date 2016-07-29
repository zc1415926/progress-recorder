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

    getStudentsByGradeClass: function(gradeNum, classNum){
        axios.get(env.SERVER_BASE_URL + '/student/' + gradeNum + '/' + classNum)
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_STUDENTS_BY_GRADE_CLASS,
                    students: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });
    },

    updateStudent: function () {
        
    },
    deleteStudent: function () {
        
    },

    getGradeClasses: function(){
        axios.get(env.SERVER_BASE_URL + '/gradeClasses')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_GRADE_CLASSES,
                    gradeClasses: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

var dispatchGetAllStudentsAction = function (data) {
    Dispatcher.dispatch({
        actionType: ActionTypes.GET_ALL_STUDENTS,
        students: data
    });
};

module.exports = StudentAction;