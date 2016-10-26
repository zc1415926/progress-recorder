/**
 * Created by zc1415926 on 2016/10/26.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var _token = '';

var AuthStore = assign({}, EventEmitter.prototype, {

    AUTH_SUCCESS : 'auth_success',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    getToken: function () {
        return _token;
    },

    clearToken: function () {
        _token = '';
    },
});

Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.AUTHENTICATION:
            _token = action.token;
            AuthStore.emitEvent(AuthStore.AUTH_SUCCESS);
            break;
        default:
        //nothing to do...
    }
});

module.exports = AuthStore;