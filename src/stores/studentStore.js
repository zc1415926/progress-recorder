/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var CHANGE_EVENT = 'change';
var _students = [];
var _gradeClasses = {};

var StudentStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT,callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllStudents: function () {
        return _students;
    },

    getGradeClasses: function(){
        return _gradeClasses;
    },

    getAuthorById: function (id) {
        _.find(_authors, {id: id})
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_ALL_STUDENTS:
            _students = action.students;
            StudentStore.emitChange();
            break;
        case ActionTypes.GET_GRADE_CLASSES:
            _gradeClasses = action.gradeClasses;
            StudentStore.emitChange();
            break;
        default:
            //nothing to do...
    }
});

module.exports = StudentStore;