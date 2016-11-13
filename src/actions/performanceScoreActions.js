'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var env = require('../env.json');
var AuthStore = require('../stores/authStore');

var PerformanceScoreActions = {
    getPerformanceScoreByStudentNumber: function (studentNumber) {
        getPerformanceScoreByStudentNumber(studentNumber);
    },
};

var getPerformanceScoreByStudentNumber = function(studentNumber){
    axios.get(env.SERVER_BASE_URL + '/performanceScore/getRecordsByStudentNumber/' + studentNumber, {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            if(response['data']['status']=='success')
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_PERF_RECORDS_BY_STUDENT_NUMBER,
                    records: response['data']['data']
                });
            }else{
                //
            }
        })
        .catch(function(error){
            console.log(error);
        });
};

module.exports = PerformanceScoreActions;