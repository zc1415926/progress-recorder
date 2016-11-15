'use strict';
var React = require('react');
var Modal = require('react-modal');

var PerfScorePerStudentModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen,
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
        return this.state.modalIsOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        //close the open flag in the parent
        if(!this.state.modalIsOpen){
            this.props.closeModal();
        }
    },

    handleModalCloseRequest: function () {
        this.setState({'modalIsOpen': false});
    },
    
    createRecordsRow: function (record) {
        return (
            <tr key={record.id}>
                <td>{record.created_at}</td>
                <td>{record.delta_score}</td>
                <td>{record.comment}</td>
            </tr>
        );
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
                        <h4 className="modal-title">表现分记录</h4>
                    </div>
                    <div className="modal-body">
                        <table id="studentListTable" className="table listTable">
                            <thead>
                                <tr>
                                    <th>时间</th>
                                    <th>分数</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.records.map(this.createRecordsRow, this)}</tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            确定
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = PerfScorePerStudentModal;