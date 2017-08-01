# Bamazon

## Description

Bamazon is a back-end application that runs on the command line and simulates an ecommerce homebrew-supply store.

In the Bamazon [customer module](/bamazonCustomer.js/), you can choose from list of brew supplies and specify the amount of that item to order. The total cost is calculated based on the number of units ordered plus 7% sales tax. The supply ordered is deducted from the inventory and revenue from sale is added to the total product sales for that item in the database.

In the Bamazon [manager module](/bamazonManager.js/), you select from a list of actions including 'View Product List', 'View Low Inventory List', 'Add Inventory', and 'Add New Product'. The "View" options retrieve information from the database and display in a formatted table in the command line. The "Add" options ask what product and the amount of inventory you would like to add or the details of the new product and update the database with the new information.

## Setup

### Customer Module - run node bamazonManager.js in CL
**Select product to order.**
[Product List Screen Grab](/images/bmzCust1.png/)
