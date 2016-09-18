/**
 * Created by ZC on 2016/7/29.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');

var env = require('../env.json');

var GradeClassActions = {

    getGradeClasses: function(){
        /*axios.get(env.SERVER_BASE_URL + '/gradeClasses')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_GRADE_CLASSES,
                    gradeClasses: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });*/
        getGradeClasses();
    },

    createGradeClass: function (gradeClass) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/create', {
            data: gradeClass
        })
            .then(function(response){

                console.log(response['data']);
                /*

                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.CREATE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response['data']['data']);
                }*/
            })
            .catch(function(error){
                console.log(error);
            });
    },

    deleteGradeClass: function (classCode) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/delete', {
            data: classCode
        })
            .then(function(response){
                 if(response['data']['status'] == "success"){

                     getGradeClasses();
                     Dispatcher.dispatch({
                         actionType: ActionTypes.DELETE_GRADE_CLASS,
                         gradeClassCode: response['data']['data']});

                 }else{
                     console.log(response['data']['data']);
                 }
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

var getGradeClasses = function(){
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
};

module.exports = GradeClassActions;