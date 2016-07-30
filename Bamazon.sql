CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
ItemID INTEGER NOT NULL AUTO_INCREMENT,
ProductName VARCHAR(50) NOT NULL,
DepartmentName VARCHAR(50) NOT NULL,
Price DECIMAL(10,2) NOT NULL,
StockQuantity INTEGER NOT NULL,
PRIMARY KEY(ItemID)
);

INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
VALUES('Candy', 'Grocery', '2.99', '100');

SELECT * FROM Products;