"use strict";

const userForm =  new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, callback => {
        if (callback.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(callback.error);
        }
    });
}
userForm.registerFormCallback = data => {
    ApiConnector.register(data, callback => {
        userForm.setRegisterErrorMessage(callback.error);
    })
}