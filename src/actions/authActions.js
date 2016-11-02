/**
 * Created by zc1415926 on 2016/10/21.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');

var env = require('../env.json');
console.log('服务器端地址：' + env.SERVER_BASE_URL);

var AuthAction = {

    login: function (credential) {
        axios.post(env.SERVER_BASE_URL + '/auth/authenticate', {
            email: credential.email,
            password: credential.password
        })
            .then(function (response) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.AUTHENTICATION,
                    token: response['data']['token']});
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    logout: function () {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
    },

    getUsers: function (token) {
        axios.get(env.SERVER_BASE_URL + '/users', {
            params:{
                token: token
            }
        })
            .then(function (response) {
                console.log(response['data']);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    
    getUserFromToken: function (token) {
        axios.get(env.SERVER_BASE_URL + '/auth/getUserFromToken', {
            params:{
                token: token
            }
        })
            .then(function (response) {
                //console.log(response['data']['user']['name']);
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_USER_FROM_TOKEN,
                    userName: response['data']['user']['name']});
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};

module.exports = AuthAction;