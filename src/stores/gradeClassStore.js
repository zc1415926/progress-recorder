/**
 * Created by ZC on 2016/7/28.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var CHANGE_EVENT = 'change';
var _gradeClasses = {};

var GradeClassStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT,callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getGradeClasses: function(){
        return _gradeClasses;
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_GRADE_CLASSES:
            _gradeClasses = action.gradeClasses;
            GradeClassStore.emitChange();
            break;
        default:
        //nothing to do...
    }
});

module.exports = GradeClassStore;