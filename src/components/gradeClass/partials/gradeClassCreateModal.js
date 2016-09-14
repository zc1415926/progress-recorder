/**
 * Created by zc1415926 on 2016/9/6.
 */
'use strict';

var React = require('react');

var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;
var Input = require('./inputGroup');
var GradeClassActions = require('../../../actions/gradeClassActions');

var ReactModal = React.createClass({

    getInitialState: function () {
        return {
            currentGradeClass:{
                classCode: "",
                entryYear: "",
                gradeNum: "",
                classNum: ""
            },
            isOpen: this.props.isOpen,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['isOpen']){
            this.state.isOpen=nextProps['isOpen'];
        }
        /*if(nextProps['currentGradeClass']){
            this.state.currentGradeClass=nextProps['currentGradeClass'];
        }*/

        //this.state.currentGradeClass = nextProps.currentGradeClass;
        return this.state.isOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.isOpen){
            this.props.closeModal();
        }
    },

    hideModal:function () {
        this.setState({isOpen: false});
    },

    handleConfirm: function () {
        GradeClassActions.createGradeClass(this.state.currentGradeClass);
    },

    onModalChange:function(e){
        this.state.currentGradeClass[e.target.id] = e.target.value;
        return this.setState({currentGradeClass: this.state.currentGradeClass});
    },



    render: function () {
        return (
            <div>
                <div className="container">
                    <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideModal}/>
                            <ModalTitle>添加年级班级信息</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <Input id="entryYear" text="入学年级" value={this.state.currentGradeClass.entryYear}
                                       onChange={this.onModalChange}/>
                                <Input id="gradeNum" text="年级" value={this.state.currentGradeClass.gradeNum}
                                       onChange={this.onModalChange}/>
                                <Input id="classNum" text="班级" value={this.state.currentGradeClass.classNum}
                                       onChange={this.onModalChange}/>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-default' onClick={this.hideModal}>
                                取消
                            </button>
                            <button className='btn btn-primary' onClick={this.handleConfirm}>
                                确定添加
                            </button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
});

module.exports = ReactModal;