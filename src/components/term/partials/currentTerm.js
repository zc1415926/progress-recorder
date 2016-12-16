/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var React = require('react');

var CurrentTerm = React.createClass({


    render: function () {
        return (
            <div>
                <label className="control-label">
                当前学期：
                </label>

                <ul className="nav nav-pills" role="tablist">
                    <li  className="active">
                        <a>
                            <span className="badge">{this.props.currentTerm.year}</span> 学年
                            <span className="badge">{this.props.currentTerm.season=='0' ? '春季' : '秋季'}</span> 学期
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = CurrentTerm;