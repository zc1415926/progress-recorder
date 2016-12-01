/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var React = require('react');
var TermsActions = require('../../actions/termsActions');
var TermsStore = require('../../stores/termsStore');
var TermList = require('./partials/termsList');
var CurrentTerm = require('./partials/currentTerm');

var TermsPage = React.createClass({
    getInitialState: function () {
        return {
            terms: [],
            currentTerm: {},
        };
    },

    componentDidMount: function () {
        TermsStore.addEventListener(TermsStore.INDEX_TERMS_EVENT, this.onIndexTerms);
        TermsStore.addEventListener(TermsStore.GET_CURRENT_TERM_EVENT, this.onCurrentTerm);

        TermsActions.getCurrentTerm();
        TermsActions.indexTerms();
    },

    componentWillUnmount: function () {
        TermsStore.removeEventListener(TermsStore.INDEX_TERMS_EVENT, this.onIndexTerms);
        TermsStore.removeEventListener(TermsStore.GET_CURRENT_TERM_EVENT, this.onCurrentTerm);
    },

    onIndexTerms: function () {
        this.setState({terms: TermsStore.getTerms()});
    },

    onCurrentTerm: function () {
        console.log(TermsStore.getCurrentTerm()[0]);
        this.setState({currentTerm: TermsStore.getCurrentTerm()[0]});
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <CurrentTerm currentTerm={this.state.currentTerm} />
                    <TermList terms={this.state.terms} />
                </div>
            </div>
        );
    }
});

module.exports = TermsPage;