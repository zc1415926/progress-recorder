/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var _terms = [];
var _currentTerm = [];

var TermStore = assign({}, EventEmitter.prototype, {

    CHANGE_EVENT: 'change_event',
    GET_CURRENT_EVENT: 'get_current_event',
    SET_CURRENT_EVENT: 'set_current_event',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event, actionName) {
        this.emit(event, actionName);
    },

    getTerms: function () {
        return _terms;
    },

    getCurrentTerm: function () {
        return _currentTerm;
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){

        case ActionTypes.TERM.INDEX:
            _terms = action.terms;
            TermStore.emitEvent(TermStore.CHANGE_EVENT);
            break;

        case ActionTypes.TERM.CREATE:
            TermStore.emitEvent(TermStore.CHANGE_EVENT, 'create');
            break;

        case ActionTypes.TERM.DELETE:
            TermStore.emitEvent(TermStore.CHANGE_EVENT, 'delete');
            break;

        case ActionTypes.TERM.GET_CURRENT:
            _currentTerm = action.currentTerm;
            TermStore.emitEvent(TermStore.GET_CURRENT_EVENT);
            break;

        case ActionTypes.TERM.SET_CURRENT:
            TermStore.emitEvent(TermStore.SET_CURRENT_EVENT, 'setCurrent');
            break;
        default:
        //nothing to do...
    }
});

module.exports = TermStore;