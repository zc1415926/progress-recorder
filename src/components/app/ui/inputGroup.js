/**
 * Created by ZC on 2016/7/31.
 */
'use strict';

var React = require('react');

var InputGroup = React.createClass({
    render: function () {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="control-label">{this.props.text}</label>
                <input id={this.props.id} type="text" className="form-control"
                       disabled={this.props.disabled?this.props.disabled:""}
                       value={this.props.value}
                       onChange={this.props.onChange} />
            </div>
        );
    }
});

module.exports = InputGroup;