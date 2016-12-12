'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var env = require('../env.json');
var AuthStore = require('../stores/authStore');

var TermActions = {
    indexTerm: function () {
        indexTerm();
    },

    getCurrentTerm: function () {
        axios.get(env.SERVER_BASE_URL + '/term/current', {
            params:{
                token: AuthStore.getToken()
            }
        })
            .then(function(response){
                if(response.status == 200)
                {
                    Dispatcher.dispatch({
                        actionType: ActionTypes.TERM.GET_CURRENT,
                        currentTerm: response.data.currentTerm
                    });
                }else{
                    //
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },
    
    create: function (termObj) {
        axios.post(env.SERVER_BASE_URL + '/term/create'+'?token='+AuthStore.getToken(), {
            data: termObj
        })
            .then(function(response){
                if(response.status == 201){
                    indexTerm();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.TERM.CREATE,
                        term: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                //当请求失败时，使用error.response获取返回的数据
                console.log(error.response);
            });
    },

    delete: function (termObj) {
        axios.post(env.SERVER_BASE_URL + '/term/delete'+'?token='+AuthStore.getToken(), {
            data: termObj
        })
            .then(function(response){
                if(response.status == 204){
                    indexTerm();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.TERM.DELETE,
                        term: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                console.log(error);
                console.log(error.response);
            });
    },

    setCurrent: function (termObj) {
        axios.post(env.SERVER_BASE_URL + '/term/set_current'+'?token='+AuthStore.getToken(), {
            data: termObj
        })
            .then(function(response){
                if(response.status == 201){
                    indexTerm();
                    Dispatcher.dispatch({
                        actionType: ActionTypes.TERM.SET_CURRENT,
                        term: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                console.log(error);
                console.log(error.response);
            });
    },
};

var indexTerm = function(){
    axios.get(env.SERVER_BASE_URL + '/term/index', {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            if(response.status == 200)
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.TERM.INDEX,
                    terms: response.data.terms
                });
            }else{
                //
            }
        })
        .catch(function(error){
            console.log(error);
        });
};

module.exports = TermActions;