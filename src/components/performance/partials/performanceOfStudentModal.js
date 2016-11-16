'use strict';
var React = require('react');
var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;

var PerfScorePerStudentModal = React.createClass({

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen,
            records: [{
                id: 0,
                created_at: 0,
                delta_score: 0,
                comment: 'Oh yeah!'
            }]
        };
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['records']){
            this.state.records = nextProps['records'];
        }
        return this.state.isOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        //close the open flag in the parent
        if(!this.state.isOpen){
            this.props.closeModal();
        }
    },

    handleModalCloseRequest: function () {
        this.setState({'isOpen': false});
    },

    onUpdatePerfClicked: function (performance) {
        this.props.onUpdateClick(performance)
        this.setState({'isOpen': false});
    },

    onDeletePerfClicked: function (performance) {
        this.props.onDeleteClick(performance)
        this.setState({'isOpen': false});
    },
    
    createRecordsRow: function (record) {
        return (
            <tr key={record.id}>
                <td>{record.created_at}</td>
                <td>{record.delta_score}</td>
                <td>{record.comment}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.onUpdatePerfClicked.bind(null, record)}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.onDeletePerfClicked.bind(null, record)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </td>
            </tr>
        );
    },

    onCreatePerfClicked: function () {
        this.setState({'isOpen': false});
        this.props.openCreatePerfModal();
    },

    render: function () {
        return (
        <div className="container">
            <Modal isOpen={this.state.isOpen} onRequestHide={this.handleModalCloseRequest}>
                <ModalHeader>
                    <ModalClose onClick={this.handleModalCloseRequest}/>
                    <ModalTitle>表现分记录</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <table id="studentListTable" className="table listTable">
                        <thead>
                        <tr>
                            <th>时间</th>
                            <th>分数</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.records.map(this.createRecordsRow, this)}</tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.onCreatePerfClicked}>
                        添加
                    </button>
                    <button className="btn btn-default" onClick={this.handleModalCloseRequest}>
                        关闭
                    </button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
});

module.exports = PerfScorePerStudentModal;