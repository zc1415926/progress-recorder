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
var UpdateTermModal = require('./partials/crudTermModal');
var DeleteTermModal = require('./partials/crudTermModal');
var SetCurrentTermModal = require('./partials/crudTermModal');

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
        TermsStore.addEventListener(TermsStore.GET_CURRENT_TERM_EVENT, this.onGetCurrentTerm);

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

    onGetCurrentTerm: function () {
        this.setState({currentTerm: TermsStore.getCurrentTerm()[0]});
    },

    openCrudModal: function (modalName, term) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: true,
                    targetTerm: {}});
                break;
            case 'update':
                this.setState({
                    isUpdateModalOpen: true,
                    targetTerm: term});
                break;
            case 'delete':
                this.setState({
                    isDeleteModalOpen: true,
                    targetTerm: term});
                break;
            case 'setCurrent':
                this.setState({
                    isSetCurrentModalOpen: true,
                    targetTerm: term});
                break;
        }
    },

    closeCrudModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: false});
                break;
            case 'update':
                this.setState({isUpdateModalOpen: false});
                break;
            case 'delete':
                this.setState({isDeleteModalOpen: false});
                break;
            case 'setCurrent':
                this.setState({isSetCurrentModalOpen: false});
                break;
        }

        this.setState({
            targetTerm: {}});
    },

    confirmModal: function (modalName) {
        console.log('confirmModal');
        console.log(this.state.targetTerm);
        /*switch (modalName){
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
            case 'setCurrent':
                StudentActions.deleteStudent(this.state.targetStudent);
                break;
        }*/
    },
    onInputValueChanged: function (e) {
        this.state.targetTerm[e.target.id] = e.target.value;
        this.setState({targetTerm: this.state.targetTerm});
    },

    onSeasonSelect: function (selectItem) {
        this.state.targetTerm.season = selectItem;
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
                    <TermList terms={this.state.terms}
                              onUpdateClick={this.openCrudModal.bind(null, 'update')}
                              onDeleteClick={this.openCrudModal.bind(null, 'delete')}
                              onSetCurrentClick={this.openCrudModal.bind(null, 'setCurrent')}/>

                    <CreateTermModal isOpen={this.state.isCreateModalOpen}
                                     title={'添加学期'}
                                     term={this.state.targetTerm}
                                     onInputValueChanged={this.onInputValueChanged}
                                     onDropdownSelect={this.onSeasonSelect}
                                     confirmModal={this.confirmModal.bind(null, 'create')}
                                     closeModal={this.closeCrudModal.bind(null, 'create')}/>

                    <UpdateTermModal isOpen={this.state.isUpdateModalOpen}
                                     title={'修改学期'}
                                     term={this.state.targetTerm}
                                     onInputValueChanged={this.onInputValueChanged}
                                     onDropdownSelect={this.onSeasonSelect}
                                     confirmModal={this.confirmModal.bind(null, 'update')}
                                     closeModal={this.closeCrudModal.bind(null, 'update')}/>

                    <DeleteTermModal isOpen={this.state.isDeleteModalOpen}
                                     title={'删除学期'}
                                     term={this.state.targetTerm}
                                     onInputValueChanged={this.onInputValueChanged}
                                     disableArray={['disabled', 'disabled']}
                                     confirmBtnClassName={'btn btn-danger'}
                                     confirmModal={this.confirmModal.bind(null, 'delete')}
                                     closeModal={this.closeCrudModal.bind(null, 'delete')}/>

                    <SetCurrentTermModal isOpen={this.state.isSetCurrentModalOpen}
                                     title={'确定要把以下学期设为当前学期？'}
                                     term={this.state.targetTerm}
                                     onInputValueChanged={this.onInputValueChanged}
                                     disableArray={['disabled', 'disabled']}
                                     confirmModal={this.confirmModal.bind(null, 'setCurrent')}
                                     closeModal={this.closeCrudModal.bind(null, 'setCurrent')}/>
                </div>
            </div>
        );
    }
});

module.exports = TermsPage;