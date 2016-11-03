/**
 * Created by ZC on 2016/7/29.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var toastr = require('toastr');
var env = require('../env.json');

var GradeClassActions = {

    getGradeClasses: function(token){
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
        getGradeClasses(token);
    },

    createGradeClass: function (gradeClass) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/create', {
            data: gradeClass
        })
            .then(function(response){
                if(response['data']['status'] == "success"){

                    getGradeClasses();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.CREATE_STUDENT,
                        gradeClass: response['data']['data']});

                }else{
                    console.log(response['data']['data']);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    updateGradeClass: function (gradeClass) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/update', {
            data: gradeClass
        })
            .then(function(response){
                if(response['data']['status'] == "success"){

                    getGradeClasses();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.UPDATE_GRADE_CLASS,
                        gradeClass: response['data']['data']});

                }else{
                    console.log(response['data']['data']);
                }
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
    },

    getGrades: function () {
        axios.get(env.SERVER_BASE_URL + '/gradeClasses/getGrades')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_GRADES,
                    grades: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });
    },

    getClassesByGradeNum: function (gradeNum) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/getClassesByGradeNum', {
            data: gradeNum
        })
            .then(function(response){
                if(response['data']['status'] == "success"){

                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_CLASSES,
                        classes: response['data']['data']});

                }else{
                    console.log(response['data']['data']);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

var getGradeClasses = function(token){
    axios.get(env.SERVER_BASE_URL + '/gradeClasses', {
        params:{
            token: token
        }
    })
        .then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GRADE_CLASSES,
                gradeClasses: response['data']
            });
        })
        .catch(function(error){
            console.log(error);
            if(error == "Error: Request failed with status code 400"){
                toastr.error("请您重新登录")
            }
        });
};

module.exports = GradeClassActions;