/**
 * Created by zc1415926 on 2016/10/21.
 */
'use strict';

var React = require('react');
var Input = require('./partials/inputGroup');
var authActions = require('../../actions/authActions');
var AuthStore = require('../../stores/authStore');

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
       // this.setState({to});
        //初次打开页面，获取一次数据
       // GradeClassActions.getGradeClasses();
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthStore.AUTH_SUCCESS, this.onAuthSuccess);
    },

    onAuthSuccess: function () {
        console.log('auth success!');

        authActions.getUserFromToken(AuthStore.getToken());
    },

    onModalChange:function(e){
        //console.log(e.target.id);
        //console.log(e.target.value);
        this.state.credential[e.target.id] = e.target.value;
        //console.log(this.state.credential);
        return this.setState({credential:this.state.credential});
    },

    onTokenChange:function(e){
        this.state.token = e.target.value;
        return this.setState({token:this.state.token});
    },

    onLoginClicked:function () {
        authActions.login(this.state.credential);
    },

    onTokenClicked:function () {
       // authActions.login(this.state.credential);
        console.log(this.state.token);
        authActions.getUsers(this.state.token);
    },

    onGetUserFromTokenClicked: function () {
        console.log(this.state.token);
        authActions.getUserFromToken(this.state.token);
    },

    render : function(){
        return (
            <div className="container">
                <h1>登录</h1>
                <form>
                    <Input id="email" text="用户名：" onChange={this.onModalChange}/>
                    <Input id="password" text="密码：" onChange={this.onModalChange}/>
                </form>
                <button className='btn btn-primary' onClick={this.onLoginClicked}>
                    登录
                </button>

                <h1>GetUserFromToken测试</h1>
                <form>
                    <Input id="token" text="Token：" onChange={this.onTokenChange}/>
                </form>
                <button className='btn btn-primary' onClick={this.onGetUserFromTokenClicked}>
                    测试
                </button>
            </div>
        )
    }
});

module.exports = AuthPage;