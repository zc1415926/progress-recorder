/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var _students = [];
var _student = {};

var StudentStore = assign({}, EventEmitter.prototype, {

    CREATE_EVENT : 'create',
    DELETE_EVENT : 'delete',
    UPDATE_EVENT : 'update',
    RETRIEVE_EVENT : 'retrieve',
    CHANGE_EVENT : 'change',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    getStudents: function () {
        return _students;
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_ALL_STUDENTS:
            _students = action.students;
            StudentStore.emitEvent(StudentStore.CHANGE_EVENT);
            break;
        case ActionTypes.GET_STUDENTS_BY_GRADE_CLASS:
            _students = action.students;
            StudentStore.emitEvent(StudentStore.CHANGE_EVENT);
            break;
        case ActionTypes.CREATE_STUDENT:
            _student = action.student;
            StudentStore.emitEvent(StudentStore.CREATE_EVENT);
            break;
        case ActionTypes.DELETE_STUDENT:
            _student = action.student;
            StudentStore.emitEvent(StudentStore.DELETE_EVENT);
            break;
        case ActionTypes.UPDATE_STUDENT:
            _student = action.student;
            StudentStore.emitEvent(StudentStore.UPDATE_EVENT);
            break;
        default:
            //nothing to do...
    }
});

module.exports = StudentStore;