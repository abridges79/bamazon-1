var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var connection = require('./connect.js');

function viewAllProducts() {
  connection.query('SELECT * FROM products', function(error, res) {
    if (error) throw error;
    var table = new Table({
      head: ['item_Id', 'Product Name', 'Price Per', 'Stock Qty']
    });

    for (i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    connection.end();
  });
};

function lowInventoryList() {
  connection.query("SELECT item_id, product_name, stock_quantity FROM products  WHERE stock_quantity < 5", function(error, res) {
    if (error) throw error;
    var table = new Table({
      head: ['item_Id', 'Product Name', 'Stock Qty']
    });
    for (i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    connection.end();
  });
};

function completeAddInventory(item) {
  inquirer.prompt([{
    type: 'input',
    message: '\nSpecify amount of stock to add to ' + item.product_name + '.\n',
    name: 'addStock',
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  }]).then(function(amount) {
    var newStockAmt = parseInt(item.stock_quantity) + parseInt(amount.addStock);
    var addStock = [{
      stock_quantity: newStockAmt
    }, {
      item_id: item.item_id
    }];
    connection.query('UPDATE products SET ? WHERE ?', addStock, function(error) {
      if (error) throw error;
    });
    console.log(item.product_name + ' stock has been updated to ' + newStockAmt + '.\n');
    connection.end();
  }).catch(function(error) {
    throw error;
  });
};

function selectAddInventory(data) {
  inquirer.prompt([{
    type: 'list',
    message: 'Select item where you would like to add more stock.\n',
    choices: function() {
      var choiceArr = [];
      for (i = 0; i < data.length; i++) {
        choiceArr.push(data[i].item_id + " : " + data[i].product_name + " : " + data[i].stock_quantity);
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
    completeAddInventory(selectedItem);
  }).catch(function(error) {
    throw error;
  });
};

function addInventory() {
  var sqlQuery = 'SELECT * FROM products';
  connection.query(sqlQuery, function(error, data) {
    if (error) throw error;
    selectAddInventory(data);
  });
};


function completeAddInventory(item) {
  inquirer.prompt([{
    type: 'input',
    message: '\nSpecify amount of stock to add to ' + item.product_name + '.\n',
    name: 'addStock',
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  }]).then(function(amount) {
    var sqlQuery = 'SELECT * FROM products';
    connection.query(sqlQuery, function(error, data) {
      if (error) throw error;
      selectAddInventory(data);
  });
};
};

function promptAction() {
  inquirer.prompt([{
    type: 'list',
    message: 'Select from list below what action you would like to complete.',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    name: "action"
  }, ]).then(function(selection) {
    switch (selection.action) {
      case 'View Products for Sale':
        viewAllProducts();
        break;

      case 'View Low Inventory':
        lowInventoryList();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':

        break;
    }
  }).catch(function(error) {
    throw error;
  });
};

connection.connect(function(error) {
  if (error) throw error;
  console.log('Connected as id: ' + connection.threadId);
  promptAction();
});
