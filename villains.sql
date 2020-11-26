CREATE DATABASE disneyCharacters;

USE disneyCharacters;

CREATE TABLE villains (
    id INT auto_increment,
    name VARCHAR(255),
    movie VARCHAR(255),
    slug VARCHAR (255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(id)
)

