/**
 * Created by ZC on 2016/7/27.
 */
'use strict';

var React = require('react');

var DropdownMenu = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.text,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        return this.state.text = nextProps.text;
    },

    onListItemClicked: function (listItem) {
        this.setState({text: listItem});
        this.props.callbackParent(listItem);
    },
    createListItems: function (listItem) {
        return <li key={listItem}><a href="#" onClick={this.onListItemClicked.bind(this, listItem)}>{listItem}</a></li>;
    },

    render: function () {
        return (
                <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">{this.state.text} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {this.props.listItems.map(this.createListItems, this)}
                    </ul>
                </div>
        );
    }
});

module.exports = DropdownMenu;