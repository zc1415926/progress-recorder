/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');
var Nav = require('./partials/nav');
var Footer = require('./partials/footer');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Nav/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = App;