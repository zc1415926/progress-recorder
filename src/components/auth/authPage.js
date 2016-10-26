/**
 * Created by zc1415926 on 2016/10/21.
 */
'use strict';

var React = require('react');
var Input = require('./partials/inputGroup');
var authActions = require('../../actions/authActions');

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


                <h1>GET测试</h1>
                <form>
                    <Input id="token" text="Token：" onChange={this.onTokenChange}/>
                </form>
                <button className='btn btn-primary' onClick={this.onTokenClicked}>
                    测试
                </button>
            </div>
        )
    }
});

module.exports = AuthPage;