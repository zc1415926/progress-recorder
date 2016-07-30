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
    createStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/create', {
            data: stuObj
        })
            .then(function(response){
                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class'])
                }else{
                    console.log(response['data']['data'])
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    getAllStudents: function () {
        axios.get(env.SERVER_BASE_URL + '/student/index')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_ALL_STUDENTS,
                    students: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });
    },
    getStudentById: function () {

    },

    getStudentsByGradeClass: function(gradeNum, classNum){
        getStudentsByGradeClass(gradeNum, classNum);
    },

    updateStudent: function () {
        
    },

    deleteStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/delete', {
            data: stuObj['student_number']
        })
            .then(function(response){
                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class']);
                }else{
                    console.log(response['data']['data']);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },
};

var getStudentsByGradeClass = function(gradeNum, classNum){
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
};

module.exports = StudentAction;