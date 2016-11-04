/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');
var axios = require('axios');
var AuthStore = require('../stores/authStore');

var env = require('../env.json');
console.log('服务器端地址：' + env.SERVER_BASE_URL);

var StudentAction = {
    createStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/create'+'?token='+AuthStore.getToken(), {
            data: stuObj
        })
            .then(function(response){
                /*
                如果成功添加了一个学生，则重新读取一次该年班学生，之后由getStudentsByGradeClass发射Dispatch
                这样就可以在成功添加一个学生后，自动刷新该年班学生列表
                 */
                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.CREATE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response['data']['data']);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    /*getAllStudents: function () {
        axios.get(env.SERVER_BASE_URL + '/student/index')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.GET_ALL_STUDENTS,
                    students: response['data']
                });
            })
            .catch(function(error){
                console.log(error);
            });
    },
    getStudentById: function () {

    },*/

    getStudentsByGradeClass: function(gradeNum, classNum){
        /*
        将依据年级和班级查询学生的代码独立出去，因为在添加、更新、删除学生后，
        也要使用这一部分代码刷新学生列表
         */
        getStudentsByGradeClass(gradeNum, classNum);
    },

    updateStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/update'+'?token='+AuthStore.getToken(), {
            data: stuObj
        })
            .then(function(response){
                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class']);

                    Dispatcher.dispatch({
                        actionType: ActionTypes.UPDATE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response['data']['data']);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    },

    deleteStudent: function (stuObj) {
        axios.post(env.SERVER_BASE_URL + '/student/delete'+'?token='+AuthStore.getToken(), {
            data: stuObj['student_number']
        })
            .then(function(response){
                if(response['data']['status'] == "success"){
                    getStudentsByGradeClass(stuObj['student_grade'], stuObj['student_class']);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.DELETE_STUDENT,
                        student: response['data']
                    });
                }else{
                    console.log(response['data']['data']);
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
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_STUDENTS_BY_GRADE_CLASS,
                students: response['data']
            });
        })
        .catch(function(error){
            console.log(error);
        });
};

module.exports = StudentAction;