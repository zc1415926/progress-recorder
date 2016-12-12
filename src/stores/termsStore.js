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

var TermsStore = assign({}, EventEmitter.prototype, {

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
            TermsStore.emitEvent(TermsStore.CHANGE_EVENT);
            break;

        case ActionTypes.TERM.CREATE:
            TermsStore.emitEvent(TermsStore.CHANGE_EVENT, 'create');
            break;

        case ActionTypes.TERM.DELETE:
            TermsStore.emitEvent(TermsStore.CHANGE_EVENT, 'delete');
            break;

        case ActionTypes.TERM.GET_CURRENT:
            _currentTerm = action.currentTerm;
            TermsStore.emitEvent(TermsStore.GET_CURRENT_EVENT);
            break;

        case ActionTypes.TERM.SET_CURRENT:
            TermsStore.emitEvent(TermsStore.SET_CURRENT_EVENT, 'setCurrent');
            break;
        default:
        //nothing to do...
    }
});

module.exports = TermsStore;