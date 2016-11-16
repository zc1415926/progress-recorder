'use strict';
var React = require('react');
var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;

var PerfScorePerStudentModal = React.createClass({

    onUpdatePerfClicked: function (performance) {
        this.props.onUpdateClick(performance)
        this.setState({'isOpen': false});
    },

    onDeletePerfClicked: function (performance) {
        this.props.onDeleteClick(performance)
        this.setState({'isOpen': false});
    },
    
    createRecordsRow: function (performance) {
        return (
            <tr key={performance.id}>
                <td>{performance.created_at}</td>
                <td>{performance.delta_score}</td>
                <td>{performance.comment}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.onUpdatePerfClicked.bind(null, performance)}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.onDeletePerfClicked.bind(null, performance)}>
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
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.closeModal}>
                <ModalHeader>
                    <ModalClose onClick={this.props.closeModal}/>
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
                        <tbody>{this.props.performance.map(this.createRecordsRow, this)}</tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.onCreatePerfClicked}>
                        添加
                    </button>
                    <button className="btn btn-default" onClick={this.props.closeModal}>
                        关闭
                    </button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
});

module.exports = PerfScorePerStudentModal;