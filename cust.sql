DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock INT(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, price, stock)
VALUES ("Pencils (pack of ten)", "Home & Office", 2.99, 45), ("Chocolate Syrup", "Food & Bev", 6.45, 90), ("Desktop Fan", "Home & Office", 32.82, 15), ("Double A batteries (8-pack)", "Home & Office", 6.54, 87), ("Deluxe Trashcan", "Home & Office", 3.01, 98), ("Desktop PC gaming mouse", "Tech", 44.65, 35), ("Monopoly", "Toys", 20, 15), ("Fidget Spinner", "Toys", 2.99, 450), ("Atlanta Braves Hat", "Apparel", 33, 98), ("Plain black T-shirt", "Apparel", 12.99, 46), ("Plain White T-shirt", "Apparel", 12.99, 34), ("Plain Yellow T-shirt", "Apparel", 12.99, 89);
