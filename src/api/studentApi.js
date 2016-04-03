/**
 * Created by ZC on 2016/4/3.
 */
'use strict';

$ = jQuery = require('jquery');

const SERVER_BASE_URL = 'https://study-angular-backend-zc1415926.c9users.io';

var StudentApi = {
    getAllStudents: function () {
        var returnData = [];

        $.ajax({
            type: 'GET',
            url: SERVER_BASE_URL + '/student/index',
            success: function (data) {
                console.log("jQuery get data: ");
                console.log(data);
                console.log("jQuery out.");

                returnData = data;
            }
        });

        return returnData;
    }
};

module.exports = StudentApi;