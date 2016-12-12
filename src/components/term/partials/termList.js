/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var React = require('react');
var TermConstants = require('./termConstants');

var TermList = React.createClass({
    createTermRow: function (term) {
        return (
            <tr key={term.id}>
                <td>{term.term_code}</td>
                <td>{term.year}</td>
                <td>{term.season=='0' ? TermConstants.FIRST_HALF_YEAR_SEASON : TermConstants.SECOND_HALF_YEAR_SEASON}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.props.onSetCurrentClick.bind(null, term)}>
                        <span className="glyphicon glyphicon-star"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.props.onDeleteClick.bind(null, term)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </td>
            </tr>
        );
    },

    render: function () {
        return (
            <div>
                <table id="termsListTable" className="table listTable">
                    <thead>
                    <tr>
                        <th>学期代码</th>
                        <th>学年</th>
                        <th>学期</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>{this.props.terms.map(this.createTermRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = TermList;