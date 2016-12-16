/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var AuthStore = require('../stores/authStore');

var env = require('../env.json');

var StudentAction = {

    getStudentsByGradeClass: function(gradeNum, classNum){
        /*
         将依据年级和班级查询学生的代码独立出去，因为在添加、更新、删除学生后，
         也要使用这一部分代码刷新学生列表
         */
        getStudentsByGradeClass(gradeNum, classNum);
    },

    createStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/create'+'?token='+AuthStore.getToken(), {
            data: stuObj
        })
            .then(function(response){
                /*
                如果成功添加了一个学生，则重新读取一次该年班学生，之后由getStudentsByGradeClass发射Dispatch
                这样就可以在成功添加一个学生后，自动刷新该年班学生列表
                 */
                if(response.status == 201){
                    getStudentsByGradeClass(stuObj['gradeNum'], stuObj['classNum']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.CREATE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    updateStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/update'+'?token='+AuthStore.getToken(), {
            data: stuObj
        })
            .then(function(response){
                if(response.status == 201){
                    getStudentsByClassCode(stuObj['classCode']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.UPDATE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                console.log(error);
                console.log(response);
            });
    },

    deleteStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/delete'+'?token='+AuthStore.getToken(), {
            data: stuObj['student_number']
        })
            .then(function(response){
                if(response.status == 204){
                    getStudentsByClassCode(stuObj['classCode']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.DELETE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    dashboardStudent: function(gradeNum, classNum, term){

        axios.get(env.SERVER_BASE_URL + '/student/dashboard/'
                                      + gradeNum + '/' + classNum + '/' + term, {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            console.log('term response action');
            console.log(response.data);
            if(response.status == 200)
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.DASHBOARD_STUDENT,
                    dashboardStudents: response.data.dashboard
                });
            }else{
                //
            }
        })
        .catch(function(error){
            console.log(error);
        });
    },
};

var getStudentsByGradeClass = function(gradeNum, classNum){
    axios.get(env.SERVER_BASE_URL + '/student/' + gradeNum + '/' + classNum, {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            /*
            在成功查询到学生信息后，发射dispatch向studentStore传送新的学生信息，
            并使studentStore发生一个学生信息被修改事件，订阅了这一消息的组件，
            收到消息后，就会从studentStore中读取新的学生信息，更新学生列表
             */
            if(response['data']['status']=='success')
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_STUDENTS_BY_GRADE_CLASS,
                    students: response['data']['data']
                });
            }else{
                //
            }
        })
        .catch(function(error){
            console.log(error);
        });
};

var getStudentsByClassCode = function(classCode){
    axios.get(env.SERVER_BASE_URL + '/student/' + classCode, {
        params:{
            token: AuthStore.getToken()
        }
    })
        .then(function(response){
            if(response['data']['status']=='success')
            {
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_STUDENTS_BY_GRADE_CLASS,
                    students: response['data']['data']['student']
                });
            }else{
                //
            }
        })
        .catch(function(error){
            console.log(error);
        });
};

module.exports = StudentAction;