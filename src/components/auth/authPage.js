/**
 * Created by zc1415926 on 2016/10/21.
 */
'use strict';

var React = require('react');
var Input = require('../app/ui/inputGroup');
var Password = require('../app/ui/passwordGroup');
var authActions = require('../../actions/authActions');
var AuthStore = require('../../stores/authStore');
var browserHistory = require('react-router').browserHistory;

var AuthPage = React.createClass({

    getInitialState: function () {
        return {
            credential:{
                email: "",
                password: "",
            },
            token:"",
        };
    },

    componentDidMount: function () {
        AuthStore.addEventListener(AuthStore.AUTH_SUCCESS, this.onAuthSuccess);
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthStore.AUTH_SUCCESS, this.onAuthSuccess);
    },

    onAuthSuccess: function () {
        console.log('administrator auth success!');
        authActions.getUserFromToken(AuthStore.getToken());

        browserHistory.push('/admin');
    },

    onModalChange:function(e){
        this.state.credential[e.target.id] = e.target.value;
        return this.setState({credential:this.state.credential});
    },

    onLoginClicked:function () {
        authActions.login(this.state.credential);
    },

    render : function(){
        return (
            <div className="container">
                <h1>登录</h1>
                <form>
                    <Input id="email" text="用户名：" onChange={this.onModalChange}/>
                    <Password id="password" text="密码：" onChange={this.onModalChange}/>
                </form>
                <button className='btn btn-primary' onClick={this.onLoginClicked}>
                    登录
                </button>
            </div>
        )
    }
});

module.exports = AuthPage;