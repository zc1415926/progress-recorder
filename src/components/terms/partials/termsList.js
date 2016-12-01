/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var React = require('react');

var TermsList = React.createClass({
    createTermRow: function (term) {
        return (
            <tr key={term.id}>
                <td>{term.term_code}</td>
                <td>{term.year}</td>
                <td>{term.season=='0' ? '春季' : '秋季'}</td>
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
                    </tr>
                    </thead>
                    <tbody>{this.props.terms.map(this.createTermRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = TermsList;