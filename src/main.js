/**
 * Created by ZC on 2016/4/2.
 */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('./components/partials/nav');
var MainRouter = require('./components/router');
var StudentActions = require('./actions/studentActions');

StudentActions.getAllStudents();

ReactDOM.render((
    <div>
        <Nav />
        <MainRouter />
    </div>

), document.getElementById('app'));