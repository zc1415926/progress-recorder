/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');
var _ = require('lodash');

var StudentInfoModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen,
            student_number: '',
            student_name: '',
            student_entry_year: '',
            student_grade: '',
            student_class: '',
            errors: {}
        };
    },

    shouldComponentUpdate: function (nextProps) {
        return this.state.modalIsOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.modalIsOpen){
            this.props.callbackParent('StuCreate');
        }
    },

    handleModalCloseRequest: function () {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
    },

    handleSaveClicked: function (e) {

        this.state.errors = {};

        if(this.state.student_number == '' || _.isNaN(_.toNumber(this.state.student_number))){
            console.log('student number error!');
            this.state.errors.student_number = 'student_number error';
        }
        if(this.state.student_name == '' || this.state.student_name.length < 2){
            console.log('student_name error!');
            this.state.errors.student_name = 'student_name error';
        }
        if(this.state.student_entry_year == ''){
            console.log('student_entry_year error!');
            this.state.errors.student_entry_year = 'student_entry_year error';
        }
        if(this.state.student_grade == ''){
            console.log('student number error!');
            this.state.errors.student_grade = 'student_grade error';
        }
        if(this.state.student_class == ''){
            console.log('student number error!');
            this.state.errors.student_class = 'student_class error';
        }

        this.setState({errors: this.state.errors});

        console.log(_.keys(this.state.errors));
        if(_.keys(this.state.errors).length == 0){
            console.log('valid');
        }else{
            console.log('invalid');
        }
        /*this.props.callbackParent([
            this.state.student_number,
            this.state.student_name,
            this.state.student_entry_year,
            this.state.student_grade,
            this.state.student_class
        ]);*/
        //console.log(this.state);
        //this.setState({modalIsOpen: false});
    },

    onModalChange:function(param, e){
        var obj = {};
        obj[param]=e.target.value;

        this.setState(obj);
    },

    render: function () {
        return (
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">添加学生信息{this.state.errors.toString()}</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="student_number" className="control-label">学号：</label>
                                <input type="text" className="form-control" id="student_number"
                                       onChange={this.onModalChange.bind(this, "student_number")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_name" className="control-label">姓名：</label>
                                <input type="text" className="form-control" id="student_name"
                                       onChange={this.onModalChange.bind(this, "student_name")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_entry_year" className="control-label">入学年：</label>
                                <input type="text" className="form-control" id="student_entry_year"
                                       onChange={this.onModalChange.bind(this, "student_entry_year")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_grade" className="control-label">年级：</label>
                                <input type="text" className="form-control" id="student_grade"
                                       onChange={this.onModalChange.bind(this, "student_grade")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_class" className="control-label">班级：</label>
                                <input type="text" className="form-control" id="student_class"
                                       onChange={this.onModalChange.bind(this, "student_class")}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>
                            确认添加
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = StudentInfoModal;