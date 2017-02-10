/**
 * Created by zc1415926 on 2017/2/10.
 */
'use strict';

var React = require('react');
var AdminNav = require('./partials/adminNav');

var AdminPage = React.createClass({
    render: function () {
        return (
            <div>
                <AdminNav/>
                <h1>AdminPage</h1>
            </div>
        );
    }
});

module.exports = AdminPage;