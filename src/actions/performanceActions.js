'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var env = require('../env.json');
var AuthStore = require('../stores/authStore');

var PerformanceScoreActions = {
    getPerformanceByStudentNumber: function (studentNumber) {
        getPerformanceByStudentNumber(studentNumber);
    },
};

var getPerformanceByStudentNumber = function(studentNumber){
    axios.get(env.SERVER_BASE_URL + '/performance/records_by_student_number/' + studentNumber, {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            if(response.status == 200)
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_PERF_RECORDS_BY_STUDENT_NUMBER,
                    records: response.data.records
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