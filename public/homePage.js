// Выход из личного кабинета
const btnExit = new LogoutButton;
btnExit.action = function exit() {
    ApiConnector.logout(res);
    function res() {
        location.reload();
    }
}

// Получение информации о пользователе
// ApiConnector.current(profileCallback);
// function profileCallback(res) {
//     ProfileWidget.showProfile(res.data);
// }
ApiConnector.current(profileCallback = result => {
    result = ProfileWidget.showProfile(result.data);
}) 


// Получение текущих курсов валюты
const course = new RatesBoard;
function currentСourse () {
    ApiConnector.getStocks(callback);
    function callback(res) {
        course.clearTable();
        course.fillTable(res.data);
    }
}
currentСourse(); 
setInterval(currentСourse, 60000);

// Операции с деньгами

// Реализуйте пополнение баланса:
const moneyTransactions = new MoneyManager;
moneyTransactions.addMoneyCallback = (addMoney) => {
    ApiConnector.addMoney(addMoney, callback);
    console.log(addMoney);
    function callback (res) {
        console.log(res);
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            message = "Пополнение выполнен успешно"
        } else {
            message = res.error
        }
        moneyTransactions.setMessage(res.success, message);
    }
}

// Реализуйте конвертирование валюты
moneyTransactions.conversionMoneyCallback = (convertMoney) => {
    console.log(convertMoney)
    ApiConnector.convertMoney(convertMoney, callback);
    function callback(res) {
        console.log(res)
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            message = "Конвертирование валюты прошло успешно";
        } else {
            message = res.error;
        }
        moneyTransactions.setMessage(res.success, message);
    }
}

//Реализуйте перевод валюты
moneyTransactions.sendMoneyCallback = (translationMoney) => {
    console.log(translationMoney);
    ApiConnector.transferMoney(translationMoney, callback);
    function callback(res) {
        // console.log(res);
        if (res.current) {
            ProfileWidget.showProfile(data);
            message = "Перевод выполнен успешно!"
        } else {
            message = res.error;
        }
        moneyTransactions.setMessage(res.current, message)
    }
}

// Работа с избранным
selectedUser = new FavoritesWidget;
// Запросите начальный список избранного
ApiConnector.getFavorites(callback);
function callback(res) {
    // console.log(res)
    if (res.success) {
        selectedUser.clearTable();
        selectedUser.fillTable(res.data);
        moneyTransactions.updateUsersList(res.data);
    }
}
// Реализуйте добавления пользователя в список избранных
selectedUser.addUserCallback = (addUser ) => {
    // console.log(addUser)
    ApiConnector.addUserToFavorites(addUser, callback);
    function callback(res) {
        // console.log(res)
        if(res.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(res.data);
            moneyTransactions.updateUsersList(res.data);
            message = "Пользователь успешно дабавлен."
        } else {
            message = res.error
        }
        moneyTransactions.setMessage(res.success, message)
    }
}

// Реализуйте удаление пользователя из избранного
selectedUser.removeUserCallback = (deleteUser) => {
    // console.log(deleteUser)
    ApiConnector.removeUserFromFavorites(deleteUser, callback);
    function callback(res) {
        // console.log(res);
        if(res.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(res.data);
            moneyTransactions.updateUsersList(res.data);
            message = "Пользователь успешно удален."
        } else {
            message = res.error
        }
        moneyTransactions.setMessage(res.success, message)
    }
}
