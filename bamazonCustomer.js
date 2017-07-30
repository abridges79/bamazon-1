var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'WIguIw2bv$$',
  database: 'bamazon'
});

function promptQuantity(item, question) {
  inquirer.prompt([{
    type: 'input',
    message: question,
    name: 'amount',
    validate: function(value) {
      if (isNaN(value) === false) {
        if (value <= item.stock_quantity) {
          return true;
        }
        console.log('\nSorry. There is not enough ' + item.product_name + ' to fulfill your order.\n' +
        'Change order to ' + item.stock_quantity + ' or less... or go back to making weak sauce cider.\n');
        return false;
      }
      return false;
    },
  }, ]).then(function(response) {
    console.log(item);
    console.log(response.amount);
    // completeOrder(item, response.amount);
  });
};

function itemTypeMessage(item) {
  var question;
  switch (item.department_name) {
    case 'Grain':
      question = 'How many pounds of ' + item.product_name + ' would you like to order?';
      break;
    case 'Hops':
      question = 'How many ounces of ' + item.product_name + ' would you like to order?';
      break;
    default:
      question = 'How many units of ' + item.product_name + ' would you like to order?';
  };
  promptQuantity(item, question);
};

function queryCustomer(data) {
  inquirer.prompt([{
    type: 'list',
    message: 'Select item you would like to order from list below\n',
    choices: function() {
      var choiceArr = [];
      for (i = 0; i < data.length; i++) {
        choiceArr.push(data[i].item_id + " : " + data[i].department_name + " : " + data[i].product_name);
      }
      return choiceArr;
    },
    name: 'itemList',
  }, ]).then(function(input) {
    var idArr = input.itemList.split(" : ");
    var selectedItem;
    for (i = 0; i < data.length; i++) {
      if (parseInt(idArr[0]) === parseInt(data[i].item_id)) {
        selectedItem = data[i];
      }
    }
    itemTypeMessage(selectedItem);
  });
};

function getProductList() {
  var sqlQuery = 'SELECT * FROM products';
  connection.query(sqlQuery, function(error, data) {
    if (error) throw error;
    queryCustomer(data);
  })
};

connection.connect(function(error) {
  if (error) throw error;
  console.log('Connected as id: ' + connection.threadId);
  getProductList();
});
