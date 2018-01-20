CREATE USER 'shop'@'localhost' IDENTIFIED BY 'shopsql';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON shop.* TO 'shop'@'localhost';

INSERT INTO utilisateur (username, password) VALUES ('rootuser', '1f5d9134b47329e61aaf3c2a5a2af8a95d712a6c01ab07b7dc5d2625c8713b54');