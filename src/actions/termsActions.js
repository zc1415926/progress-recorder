'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var env = require('../env.json');
var AuthStore = require('../stores/authStore');

var TermsActions = {
    indexTerms: function () {
        indexTerms();
    },

    getCurrentTerm: function () {
        axios.get(env.SERVER_BASE_URL + '/terms/current', {
            params:{
                token: AuthStore.getToken()
            }
        })
            .then(function(response){
                if(response.status == 200)
                {
                    Dispatcher.dispatch({
                        actionType: ActionTypes.GET_CURRENT_TERM,
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
};

var indexTerms = function(){
    axios.get(env.SERVER_BASE_URL + '/terms', {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            if(response.status == 200)
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.INDEX_TERMS,
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

module.exports = TermsActions;