/**
 * Created by zc1415926 on 2016/12/16.
 */
'use strict';

var React = require('react');
var TermDropdown = require('../../app/ui/dropdownA');
var TermConstants = require('./termConstants');

var TermSelectDropdown = React.createClass({

    getInitialState: function () {
        return {
            termItems: [],
        };
    },

    componentWillReceiveProps: function (nextProps) {

        var dropdownItems = [];
        var termText = '';
        var termCode = '';

        //console.log('nextProps');
        //console.log(nextProps);
        nextProps.terms.forEach(function (item) {
            if(0 == item.season){
               // termCode =
                termText = item.year + TermConstants.FIRST_HALF_YEAR_SEASON;
            }
            else if(1 == item.season){
                termText = item.year + TermConstants.SECOND_HALF_YEAR_SEASON;
            }

            //termText += '学期';
            dropdownItems.push({
                id: item.term_code,
                text: termText});
        });

        this.setState({termItems: dropdownItems});
    },

    render: function () {

        return (
            <div>
                <TermDropdown text="请选择学期" items={this.state.termItems}
                              onItemClicked={this.props.onTermSelect}/>
            </div>
        );
    }
});

module.exports = TermSelectDropdown;