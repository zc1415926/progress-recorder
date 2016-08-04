/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var CHANGE_EVENT = 'change';
var UPDATE_EVENT = 'update';
var _students = [];
var _student = {};

var StudentStore = assign({}, EventEmitter.prototype, {

    CREATE_EVENT : 'create',
    DELETE_EVENT : 'delete',
    UPDATE_EVENT : 'update',
    RETRIEVE_EVENT : 'retrieve',

    addChangeListener: function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT,callback);
    },

    addUpdateListener: function (callback) {
        this.addListener(UPDATE_EVENT, callback);
    },

    removeUpdateListener: function (callback) {
        this.removeListener(UPDATE_EVENT,callback);
    },

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    emitUpdate: function () {
        this.emit(UPDATE_EVENT);
    },

    getStudents: function () {
        return _students;
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_ALL_STUDENTS:
            _students = action.students;
            StudentStore.emitChange();
            break;
        case ActionTypes.GET_STUDENTS_BY_GRADE_CLASS:
            _students = action.students;
            StudentStore.emitChange();
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
            StudentStore.emitUpdate();
            break;
        default:
            //nothing to do...
    }
});

module.exports = StudentStore;