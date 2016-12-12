/**
 * Created by ZC on 2016/12/2.
 */
'use strict';

var React = require('react');
var SeasonSelectDropdown = require('../../app/ui/dropdown');
var TermConstants = require('./termConstants');

var GradeClassDropdown = React.createClass({

    getInitialState: function() {
        return {text: '请选择'};
    },

    onSelect: function (item) {

        var selectNum;

        if(TermConstants.FIRST_HALF_YEAR_SEASON == item){
            selectNum = 0;
        }
        else{
            selectNum = 1;
        }
        this.setState({title: item});
        this.props.onItemSelect(selectNum);
    },

    componentWillReceiveProps : function (nextProps) {
        if(0 == nextProps.text){
            this.state.text = TermConstants.FIRST_HALF_YEAR_SEASON;
        }
        else if(1 == nextProps.text){
            this.state.text = TermConstants.SECOND_HALF_YEAR_SEASON;
        }
        else if(null == nextProps.text){
            this.state.text = '请选择';
        }
    },

    render: function () {
        return (
            <div>
                <label>学期：</label>
                <SeasonSelectDropdown text={this.state.text}
                                      items={[TermConstants.FIRST_HALF_YEAR_SEASON, TermConstants.SECOND_HALF_YEAR_SEASON]}
                                      disabled={this.props.disabled} onItemClicked={this.onSelect}/>
            </div>
        );
    }
});

module.exports = GradeClassDropdown;