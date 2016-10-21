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
            }
        };
    },

    onModalChange:function(e){
        //console.log(e.target.id);
        //console.log(e.target.value);
        this.state.credential[e.target.id] = e.target.value;
        //console.log(this.state.credential);
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
                    <Input id="password" text="密码：" onChange={this.onModalChange}/>
                </form>
                <button className='btn btn-primary' onClick={this.onLoginClicked}>
                    登录
                </button>
            </div>
        )
    }
});

module.exports = AuthPage;