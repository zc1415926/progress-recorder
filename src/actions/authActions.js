/**
 * Created by zc1415926 on 2016/10/21.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var toastr = require('toastr');
var browserHistory = require('react-router').browserHistory;

var env = require('../env.json');
console.log('服务器端地址：' + env.SERVER_BASE_URL);

var AuthAction = {

    login: function (credential) {
        axios.post(env.SERVER_BASE_URL + '/auth/authenticate', {
            username: credential.username,
            password: credential.password
        })
            .then(function (response) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.AUTHENTICATION,
                    role:response['data']['role'],
                    token: response['data']['token']});
            })
            .catch(function (error) {
                console.log(error);
                if(error == "Error: Network Error"){
                    toastr.error("网络不给力...");
                }
                else if(error == "Error: Request failed with status code 401"){
                    toastr.error("用户名或密码错误");
                }
            });
    },

    logout: function () {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');

        browserHistory.push('/');
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