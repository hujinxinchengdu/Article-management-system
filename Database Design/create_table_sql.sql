--This table is for article category.
CREATE TABLE ArticleCate (
cateId INTEGER PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT
NOT NULL
UNIQUE,
name TEXT UNIQUE ON CONFLICT ROLLBACK
NOT NULL,
alias TEXT UNIQUE ON CONFLICT ROLLBACK
NOT NULL,
isDelete BOOLEAN NOT NULL
DEFAULT (0),
userId REFERENCES Users (userId)
NOT NULL
);

--This table is for saving articles detail information.
CREATE TABLE Articles (
articleId INTEGER PRIMARY KEY AUTOINCREMENT
UNIQUE
NOT NULL,
title TEXT NOT NULL,
content TEXT NOT NULL,
coverImg TEXT,
pubDate DATETIME NOT NULL,
status TEXT NOT NULL,
isDelete BOOLEAN NOT NULL
DEFAULT (0),
userId INTEGER REFERENCES Users (userId)
NOT NULL
);

--This table is connecting Articles table and ArticleCate table which is many to many relationship.
CREATE TABLE Belong (
belongId INTEGER PRIMARY KEY AUTOINCREMENT
NOT NULL
UNIQUE,
cateId INTEGER REFERENCES ArticleCate (cateId)
NOT NULL,
articleId INTEGER REFERENCES Articles (articleId)
NOT NULL
);

--This table is for saving user information.
CREATE TABLE Users (
userId INTEGER PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT
NOT NULL
UNIQUE,
password TEXT (225) NOT NULL,
userName TEXT UNIQUE
NOT NULL,
nickName TEXT,
email TEXT,
userPicture TEXT
);
