/**
 * Created by ZC on 2016/7/29.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var toastr = require('toastr');
var env = require('../env.json');
var AuthStore = require('../stores/authStore');

var GradeClassActions = {

    getGradeClasses: function(){
        getGradeClasses();
    },

    createGradeClass: function (gradeClass) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/create'+'?token='+AuthStore.getToken(), {
            data: gradeClass,
        })
            .then(function(response){
                if(response['data']['status'] == "success"){

                    getGradeClasses();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.CREATE_STUDENT,
                        gradeClass: response['data']['data']});

                }else{
                    console.log(response['data']);
                }
            })
            .catch(errorHandler);
    },

    updateGradeClass: function (gradeClass) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/update'+'?token='+AuthStore.getToken(), {
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
            .catch(errorHandler);
    },

    deleteGradeClass: function (classCode) {
        axios.post(env.SERVER_BASE_URL + '/gradeClasses/delete'+'?token='+AuthStore.getToken(), {
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
            .catch(errorHandler);
    },

    getGrades: function () {
        axios.get(env.SERVER_BASE_URL + '/gradeClasses/getGrades')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_GRADES,
                    grades: response['data']
                });
            })
            .catch(errorHandler);
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
            .catch(errorHandler);
    }
};

var getGradeClasses = function(){
    axios.get(env.SERVER_BASE_URL + '/gradeClasses', {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GRADE_CLASSES,
                gradeClasses: response['data']
            });
        })
        .catch(errorHandler);
};

var errorHandler = function (error) {
    console.log(error);
    if(error == "Error: Request failed with status code 400"){
        toastr.error("请您重新登录")
    }
};

module.exports = GradeClassActions;