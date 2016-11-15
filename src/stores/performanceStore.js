'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var _performanceOfStudent = [];

var PerformanceScoreStore = assign({}, EventEmitter.prototype, {

    GET_PERFORMANCE_OF_STUDENT : 'get_performance_of_student',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    getRecordsOfStudent: function () {
        return _performanceOfStudent;
    }
});

Dispatcher.register(function (action) {
    //console.log(action);
    switch (action.actionType){
        case ActionTypes.GET_PERF_RECORDS_BY_STUDENT_NUMBER:
            _performanceOfStudent = action.records;
            PerformanceScoreStore.emitEvent(PerformanceScoreStore.GET_PERFORMANCE_OF_STUDENT);
            break;
        default:
        //nothing to do...
    }
});

module.exports = PerformanceScoreStore;