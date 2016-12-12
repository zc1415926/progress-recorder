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
var toastr = require('toastr');

var TermsPage = React.createClass({
    getInitialState: function () {
        return {
            terms: [],
            currentTerm: {},
            targetTerm: {},
        };
    },

    componentDidMount: function () {
        TermsStore.addEventListener(TermsStore.CHANGE_EVENT, this.onIndexTerms);
        TermsStore.addEventListener(TermsStore.GET_CURRENT_EVENT, this.onGetCurrent);
        TermsStore.addEventListener(TermsStore.SET_CURRENT_EVENT, this.onSetCurrent);

        TermsActions.getCurrentTerm();
        TermsActions.indexTerms();
    },

    componentWillUnmount: function () {
        TermsStore.removeEventListener(TermsStore.CHANGE_EVENT, this.onIndexTerms);
        TermsStore.removeEventListener(TermsStore.GET_CURRENT_EVENT, this.onGetCurrent);
        TermsStore.removeEventListener(TermsStore.SET_CURRENT_EVENT, this.onSetCurrent);
    },

    onIndexTerms: function (actionName) {
        this.setState({terms: TermsStore.getTerms()});

        switch (actionName){
            case 'create':
                toastr.success('已经成功添加学期');
                this.setState({isCreateModalOpen: false});
                this.setState({targetStudent: {}});
                break;
            case 'update':
                toastr.success('已经成功修改学期');
                this.setState({isUpdateModalOpen: false});
                this.setState({targetStudent: {}});
                break;
            case 'delete':
                toastr.success('已经成功删除学期');
                this.setState({isDeleteModalOpen: false});
                this.setState({targetStudent: {}});
                break;
        }
    },

    onGetCurrent: function () {
        this.setState({currentTerm: TermsStore.getCurrentTerm()[0]});
    },

    onSetCurrent: function () {
        TermsActions.getCurrentTerm();
        this.setState({isSetCurrentModalOpen: false});
        toastr.success('已经设置当前学期');
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
        switch (modalName){
            case 'create':
                TermsActions.create(this.state.targetTerm);
                break;
            case 'update':
                TermsActions.update(this.state.targetTerm);
                break;
            case 'delete':
                TermsActions.delete(this.state.targetTerm);
                break;
            case 'setCurrent':
                TermsActions.setCurrent(this.state.targetTerm);
                break;
        }
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