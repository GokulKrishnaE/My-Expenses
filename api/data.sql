CREATE DATABASE MYEXPENSES;

CREATE TABLE EXPENSES(
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(50),
    category VARCHAR(255),
    date VARCHAR(255),
    amount INT,
    month VARCHAR(255),
    year VARCHAR(255),
    bookname VARCHAR(255)
);


CREATE TABLE EARNINGS(
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(50),
    date VARCHAR(255),
    amount INT,
    month VARCHAR(255),
    year VARCHAR(255),
    bookname VARCHAR(255)
);


CREATE TABLE BOOKS(
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    bookname VARCHAR(50),
);
CREATE TABLE USERS(
    username VARCHAR(255),
    password VARCHAR(50),
    email VARCHAR(255) PRIMARY KEY,
    isAdmin BOOLEAN,
    categories VARCHAR[]
);

INSERT INTO EXPENSES(id,email,title,category,date,amount) VALUES('0','gokulkrishna.e@gmail.com','first expense','travel','04-04-2023',200);
INSERT INTO USERS(username,password,email,isAdmin) VALUES('admin','admin@123','admin@tb.com',true);

SELECT * FROM EXPENSES;

CREATE TABLE USERS(
    email VARCHAR(255),
    password VARCHAR(255)
);