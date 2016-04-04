/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

//var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');

var CHANGE_EVENT = 'change';
var _students = [];

var _ = require('lodash');

var StudentStore = _.extend({}, EventEmitter.prototype, {
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

    getAuthorById: function (id) {
        _.find(_authors, {id: id})
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_ALL_STUDENTS:
            _students = action.students;
            StudentStore.emitChange();
            break;
        default:
            console.log(action);
    }
});

module.exports = StudentStore;