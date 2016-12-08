/**
 * Created by zc1415926 on 2016/11/18.
 */
'use strict';

var React = require('react');

var Dropdown = React.createClass({

    createListItems: function (item) {
        return <li key={item}><a href="#" onClick={this.props.onItemClicked.bind(null, item)}>{item}</a></li>;
    },

    render: function () {
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        disabled={this.props.disabled?this.props.disabled:''}
                        aria-haspopup="true" aria-expanded="false">{this.props.text} <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    {this.props.items.map(this.createListItems, this)}
                </ul>
            </div>
        );
    }
});

module.exports = Dropdown;