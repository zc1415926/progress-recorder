/**
 * Created by zc1415926 on 2017/2/10.
 */
'use strict';

var React = require('react');
var AdminNav = require('../../admin/partials/adminNav');

var SecondNav = React.createClass({
    render: function () {

        if(sessionStorage.getItem('token'))
        {
            if(sessionStorage.getItem('role') == 'admin'){
                return (
                    <AdminNav/>
                );
            }
            else if(sessionStorage.getItem('role') == 'teacher'){
                return (
                    <AdminNav/>
                );
            }
        }
        else{
            return null;
        }

    }
});

module.exports = SecondNav;