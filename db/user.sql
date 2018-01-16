CREATE USER 'shop'@'localhost' IDENTIFIED BY 'shopsql';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON shop.* TO 'shop'@'localhost';