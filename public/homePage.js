// Выход из личного кабинета
const btnExit = new LogoutButton;

btnExit.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе
ApiConnector.current(profileCallback = result => {
    result = ProfileWidget.showProfile(result.data);
}) 


// Получение текущих курсов валюты
const course = new RatesBoard;

function currentСourse () {
    ApiConnector.getStocks(callback = (result) => {
        course.clearTable();
        course.fillTable(result.data);
    })
}
currentСourse(); 
setInterval(currentСourse, 60000);

// Операции с деньгами
const moneyTransactions = new MoneyManager;

// Реализуйте пополнение баланса:
moneyTransactions.addMoneyCallback = (addMoney) => {
        ApiConnector.addMoney(addMoney, callback = (result) => {
            if(result.success) {
                ProfileWidget.showProfile(result.data);
            }
            moneyTransactions.setMessage(result.success, result.success? "Пополнение выполнен успешно" : result.error);
        });
    }

// Реализуйте конвертирование валюты
moneyTransactions.conversionMoneyCallback = (convertMoney) => {
    console.log(convertMoney)
    ApiConnector.convertMoney(convertMoney, callback = (result) => {
        if( result.success) {
            ProfileWidget.showProfile(result.data);
        }
        moneyTransactions.setMessage(result.success, result.success? "Конвертирование валюты прошло успешно" : result.error)
    });
}

//Реализуйте перевод валюты
moneyTransactions.sendMoneyCallback = (translationMoney) => {
    ApiConnector.transferMoney(translationMoney, callback = (result) => {
        if(result.success) {
            ProfileWidget.showProfile(result.data);
            ApiConnector.current();
        }
        moneyTransactions.setMessage(result.success, result.success? "Перевод выполнен успешно!" : result.error);
    });
}

// Работа с избранным
selectedUser = new FavoritesWidget;

// Запросите начальный список избранного
ApiConnector.getFavorites(callback = (result) => {
    if(result.success) {
        selectedUser.clearTable();
        selectedUser.fillTable(result.data);
        moneyTransactions.updateUsersList(result.data);
    }
});

// Реализуйте добавления пользователя в список избранных
selectedUser.addUserCallback = (addUser ) => {
    ApiConnector.addUserToFavorites(addUser, callback = (result) => {
        if(result.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(result.data);
            moneyTransactions.updateUsersList(result.data);
        }
        moneyTransactions.setMessage(result.success, result.success? "Пользователь успешно дабавлен." : result.error);
    })
}

// Реализуйте удаление пользователя из избранного
selectedUser.removeUserCallback = (deleteUser) => {
    ApiConnector.removeUserFromFavorites(deleteUser, callback = (result) => {
        if(result.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(result.data);
            moneyTransactions.updateUsersList(result.data);
        }
        moneyTransactions.setMessage(result.success, result.success? "Пользователь успешно удален." : result.error);
    });
}
