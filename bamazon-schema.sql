CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  stock_quantity INT(11) DEFAULT 0,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (item_id)
);
