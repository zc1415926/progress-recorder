/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');
var Nav = require('./partials/nav');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Nav/>

                {this.props.children}
            </div>
        );
    }
});

module.exports = App;