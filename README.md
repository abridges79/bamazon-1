# Bamazon

## Description

Bamazon is a back-end application that runs on the command line and simulates an ecommerce homebrew-supply store.

In the Bamazon [customer module](/bamazonCustomer.js/), you can choose from list of brew supplies and specify the amount of that item to order. The total cost is calculated based on the number of units ordered plus 7% sales tax. The supply ordered is deducted from the inventory and revenue from sale is added to the total product sales for that item in the database.

In the Bamazon [manager module](/bamazonManager.js/), you select from a list of actions including 'View Product List', 'View Low Inventory List', 'Add Inventory', and 'Add New Product'. The "View" options retrieve information from the database and display in a formatted table in the command line. The "Add" options ask what product and the amount of inventory you would like to add or the details of the new product and update the database with the new information.

## Setup

To run the Bamazon app, clone the repository and set up a locally hosted mysql database.
 1. Install Node Modules: npm install
 1. Use the [bamazon-schema.sql](/bamazon-schema.sql/) to create the database and tables in mysql.
 2. Use the [bamazon-seeds.sql](/bamazon-seeds.sql/) to insert the data into the products table.
 3. Add password and if necessary change host, port or user values in [connect.js](/connect.js) file.
 
```javascript
var connection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password: '**Password**',
database: 'bamazon'
});
```
## Examples

### Customer Module - run node bamazonCustomer.js in CL

**Select product to order from list retreived from database.**
![Product List Screen Grab](/images/bmzCust1.png/)

**Specify amount to order, confirm order for displayed total cost, continue shopping or end session**
![Order Confirm Screen Grab](/images/bmzCust2.png/)

**Database updated to remove the quantity of the item purchased from stock and tally total sales of the item.**
![Updated Database info Screen Grab](/images/bmzCust3.png/)
***

### Manager Module - run node bamazonManager.js in CL

**Select task from list of options.**
![Product List Screen Grab](/images/bmzMgr1.png/)

**Option 1 - Retrieves and display list of products/details from database.**
![Order Confirm Screen Grab](/images/bmzMgr2.png/)

**Option 2 - Displays list of items from database with less than 5 count in inventory.**
![Updated Database info Screen Grab](/images/bmzMgr3.png/)

**Option 3 - Adds inventory to a selected product, prompts amount to add and updates database with new quantity.**
![Updated Database info Screen Grab](/images/bmzMgr4.png/)

**Option 4 - Adds a new product to database from input on the CL.**
![Updated Database info Screen Grab](/images/bmzMgr5.png/)
***
