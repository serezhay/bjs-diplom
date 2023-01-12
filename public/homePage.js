// Выход из личного кабинета
const btnExit = new LogoutButton;

btnExit.action = () => {
    ApiConnector.logout(result => {
        if (result.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе
ApiConnector.current(result => {
    result = ProfileWidget.showProfile(result.data);
}) 


// Получение текущих курсов валюты
const course = new RatesBoard;

function currentСourse () {
    ApiConnector.getStocks( (result) => {
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
        ApiConnector.addMoney(addMoney, (result) => {
            if(result.success) {
                ProfileWidget.showProfile(result.data);
            }
            moneyTransactions.setMessage(result.success, result.success? "Пополнение выполнен успешно" : result.error);
        });
    }

// Реализуйте конвертирование валюты
moneyTransactions.conversionMoneyCallback = (convertMoney) => {
    console.log(convertMoney)
    ApiConnector.convertMoney(convertMoney, (result) => {
        if( result.success) {
            ProfileWidget.showProfile(result.data);
        }
        moneyTransactions.setMessage(result.success, result.success? "Конвертирование валюты прошло успешно" : result.error)
    });
}

//Реализуйте перевод валюты
moneyTransactions.sendMoneyCallback = (translationMoney) => {
    ApiConnector.transferMoney(translationMoney, (result) => {
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
ApiConnector.getFavorites( (result) => {
    if(result.success) {
        selectedUser.clearTable();
        selectedUser.fillTable(result.data);
        moneyTransactions.updateUsersList(result.data);
    }
});

// Реализуйте добавления пользователя в список избранных
selectedUser.addUserCallback = (addUser ) => {
    ApiConnector.addUserToFavorites(addUser, (result) => {
        if(result.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(result.data);
            moneyTransactions.updateUsersList(result.data);
        }
        selectedUser.setMessage(result.success, result.success? "Пользователь успешно дабавлен." : result.error);
    })
}

// Реализуйте удаление пользователя из избранного
selectedUser.removeUserCallback = (deleteUser) => {
    ApiConnector.removeUserFromFavorites(deleteUser, (result) => {
        if(result.success) {
            selectedUser.clearTable();
            selectedUser.fillTable(result.data);
            moneyTransactions.updateUsersList(result.data);
        }
        selectedUser.setMessage(result.success, result.success? "Пользователь успешно удален." : result.error);
    });
}
