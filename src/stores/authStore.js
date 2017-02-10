/**
 * Created by zc1415926 on 2016/10/26.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var assign = require('lodash.assign');

var AuthStore = assign({}, EventEmitter.prototype, {

    AUTH_SUCCESS : 'auth_success',
    GET_USER_FROM_TOKEN_SUCCESS : 'get_user_from_token_success',

    addEventListener: function (event, callback) {
        this.addListener(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitEvent: function (event, role) {
        this.emit(event, role);
    },

    getToken: function () {
        return sessionStorage.getItem('token');
    },

    getAuthenticatedUser: function () {
        return sessionStorage.getItem('userName');
    },
});

Dispatcher.register(function (action) {
    //console.log(action);
    switch (action.actionType){
        case ActionTypes.AUTHENTICATION:
            sessionStorage.setItem('role', action.role);
            sessionStorage.setItem('token', action.token);
            AuthStore.emitEvent(AuthStore.AUTH_SUCCESS, action.role);
            break;
        case ActionTypes.GET_USER_FROM_TOKEN:
            sessionStorage.setItem('userName', action.userName);
            AuthStore.emitEvent(AuthStore.GET_USER_FROM_TOKEN_SUCCESS);
            break;
        default:
        //nothing to do...
    }
});

module.exports = AuthStore;