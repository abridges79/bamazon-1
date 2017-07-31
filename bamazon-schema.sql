CREATE DATABASE IF NOT EXISTS `bamazon`;
USE `bamazon`;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  `price` int(11) DEFAULT 0,
  `stock_quantity` int(11) DEFAULT 0,
  PRIMARY KEY (`item_id`)
);
