/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');
var Nav = require('./partials/nav');
var SecondNav = require('./partials/secondNav');
var Footer = require('./partials/footer');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Nav/>
                <SecondNav/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = App;