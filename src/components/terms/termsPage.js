/**
 * Created by zc1415926 on 2016/12/1.
 */
'use strict';

var React = require('react');
var TermsActions = require('../../actions/termsActions');
var TermsStore = require('../../stores/termsStore');
var TermList = require('./partials/termsList');
var CurrentTerm = require('./partials/currentTerm');
var CreateTermModal = require('./partials/crudTermModal');

var TermsPage = React.createClass({
    getInitialState: function () {
        return {
            terms: [],
            currentTerm: {},
            targetTerm: {},
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

    openCrudModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: true});
                break;
            case 'update':
                this.setState({isEditModalOpen: false});
                break;
            case 'delete':
                this.setState({isStuDelModalOpen: false});
                break;
        }
    },

    closeCrudModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: false});
                break;
            case 'update':
                this.setState({isEditModalOpen: false});
                break;
            case 'delete':
                this.setState({isStuDelModalOpen: false});
                break;
        }

        this.setState({targetStudent: {}});
    },

    confirmModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.state.targetStudent.gradeNum = this.state.targetGradeNum;
                this.state.targetStudent.classNum = this.state.targetClassNum;
                StudentActions.createStudent(this.state.targetStudent);
                break;
            case 'update':
                StudentActions.updateStudent(this.state.targetStudent);
                break;
            case 'delete':
                StudentActions.deleteStudent(this.state.targetStudent);
                break;
        }
    },

    onInputValueChanged: function (e) {
        this.state.targetTerm[e.target.id] = e.target.value;
        this.setState({targetTerm: this.state.targetTerm});
    },

    render: function () {
        return (
            <div>
                <div className="container">

                    <CurrentTerm currentTerm={this.state.currentTerm} />
                    <button type="button" className="btn btn-primary btn-block "
                            onClick={this.openCrudModal.bind(null, 'create')}>
                        添加一个学期
                    </button>
                    <TermList terms={this.state.terms} />
                    <CreateTermModal isOpen={this.state.isCreateModalOpen}
                                     title={'添加学期 '}
                                     term={this.state.targetTerm}
                                     onInputValueChanged={this.onInputValueChanged}
                                     confirmModal={this.confirmModal.bind(null, 'create')}
                                     closeModal={this.closeCrudModal.bind(null, 'create')}/>
                </div>
            </div>
        );
    }
});

module.exports = TermsPage;