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

    INDEX_TERMS_EVENT: 'index_terms_event',
    GET_CURRENT_TERM_EVENT: 'get_current_terms_event',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event) {
        this.emit(event);
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
        case ActionTypes.INDEX_TERMS:
            _terms = action.terms;
            TermsStore.emitEvent(TermsStore.INDEX_TERMS_EVENT);
            break;
        case ActionTypes.GET_CURRENT_TERM:
            _currentTerm = action.currentTerm;
            TermsStore.emitEvent(TermsStore.GET_CURRENT_TERM_EVENT);
            break;
        default:
        //nothing to do...
    }
});

module.exports = TermsStore;