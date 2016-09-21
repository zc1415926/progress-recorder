/**
 * Created by ZC on 2016/7/28.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var _gradeClasses = {};
var _gradeClassCode = {};
var _grades = [];
var _classes = [];

var GradeClassStore = assign({}, EventEmitter.prototype, {

    CREATE_EVENT : 'create',
    DELETE_EVENT : 'delete',
    UPDATE_EVENT : 'update',
    RETRIEVE_EVENT : 'retrieve',
    GET_GRADES_EVENT: 'get_grade',
    GET_CLASSES_EVENT: 'get_classes_event',
    //CHANGE_EVENT : 'change',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    getGradeClasses: function(){
        return _gradeClasses;
    },

    getGradeClassCode: function () {
        return _gradeClassCode;
    },

    getGrades: function () {
        return _grades;
    },

    getClasses: function () {
        return _classes;
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_GRADE_CLASSES:
            _gradeClasses = action.gradeClasses;
            GradeClassStore.emitEvent(GradeClassStore.RETRIEVE_EVENT);
            break;
        case ActionTypes.CREATE_STUDENT:
            _gradeClasses = action.gradeClass;
            GradeClassStore.emitEvent(GradeClassStore.CREATE_EVENT);
            break;
        case ActionTypes.UPDATE_GRADE_CLASS:
            _gradeClasses = action.gradeClass;
            GradeClassStore.emitEvent(GradeClassStore.UPDATE_EVENT);
            break;
        case ActionTypes.DELETE_GRADE_CLASS:
            _gradeClassCode = action.gradeClassCode;
            GradeClassStore.emitEvent(GradeClassStore.DELETE_EVENT);
            break;
        case ActionTypes.GET_GRADES:
            _grades = action.grades;
            GradeClassStore.emitEvent(GradeClassStore.GET_GRADES_EVENT);
            break;
        case ActionTypes.GET_CLASSES:
            _classes = action.classes;
            GradeClassStore.emitEvent(GradeClassStore.GET_CLASSES_EVENT);
            break;
        default:
        //nothing to do...
    }
});

module.exports = GradeClassStore;