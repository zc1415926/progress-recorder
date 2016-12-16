/**
 * Created by zc1415926 on 2016/11/18.
 */
'use strict';

var React = require('react');

var DropdownA = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.text,
        };
    },

    createListItems: function (item) {
        return <li key={item.id}><a href="#" onClick={this.onItemClick.bind(null, item)}>{item.text}</a></li>;
    },

    onItemClick: function (item) {
        this.setState({text: item.text});
        this.props.onItemClicked(item.id);
    },

    render: function () {
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        disabled={this.props.disabled?this.props.disabled:''}
                        aria-haspopup="true" aria-expanded="false">{this.state.text} <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    {this.props.items.map(this.createListItems, this)}
                </ul>
            </div>
        );
    }
});

module.exports = DropdownA;