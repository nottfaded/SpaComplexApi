create database SpaComplex;
use SpaComplex;

create table Category(
Category_Id int not null IDENTITY,
Name nvarchar(50) not null,
primary key (Category_Id)	
);

create table Status(
Status_Id int not null IDENTITY,
Status_Title nvarchar(15) not null,
primary key (Status_Id)	
);
CREATE UNIQUE INDEX Status_Title
ON Status(Status_Title);

create table Role(
Role_Id int not null IDENTITY,
Title nvarchar(20) not null,
primary key (Role_Id)	
);
CREATE UNIQUE INDEX Title
ON Role(Title);

create table [User](
User_Id int not null IDENTITY,
FirstName nvarchar(50) not null,
LastName nvarchar(50) not null,
Email nvarchar(50) not null,
Password nvarchar(100) not null,
Role_Id int not null DEFAULT '1',
primary key (User_Id),
FOREIGN KEY (Role_Id) REFERENCES Role(Role_Id)
);
CREATE UNIQUE INDEX Email
ON [User](Email);

create table Receipt(
Receipt_Id int not null IDENTITY,
User_Id int not null,
Status_Id int not null DEFAULT '1',
Name nvarchar(20) not null,
Surname nvarchar(20) not null,
Email nvarchar(50) not null,
Phone nvarchar(10) not null,
City nvarchar(20) not null,
Address nvarchar(20) not null,
Comment nvarchar(20) not null DEFAULT null,
primary key (Receipt_Id),
FOREIGN KEY (User_Id) REFERENCES [User](User_Id),
FOREIGN KEY (Status_Id) REFERENCES Status(Status_Id),
);

create table Subscription(
Subscription_Id int not null IDENTITY,
Title nvarchar(50) not null, --------
Category_Id int not null,
Days_type nvarchar(100) not null,
Time_type nvarchar(100) not null,
Amount int not null,
Price decimal(10,0) not null,
primary key (Subscription_Id),
FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id),
);
CREATE UNIQUE INDEX Title
ON Subscription(Title);

create table Receipt_has_Subscription(
Subscription_Id int not null,
Receipt_Id int not null,
Count int not null,	
FOREIGN KEY (Subscription_Id) REFERENCES Subscription(Subscription_Id),
FOREIGN KEY (Receipt_Id) REFERENCES Receipt(Receipt_Id)
);

-- default values

INSERT INTO Category(Name) VALUES (N'взрослый');
INSERT INTO Category(Name) VALUES (N'детский');
INSERT INTO Category(Name) VALUES (N'студенческий');
INSERT INTO Category(Name) VALUES (N'особый');

INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'В-1', 1, N'Будний день', N'Абонемент на 1 час', 50000, 250);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'В-2', 1, N'Будний день', N'Абонемент на 3 час', 50000, 600);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'В-3', 1, N'Будний день', N'Абонемент на весь день', 50000, 1200);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'Д-1', 2, N'Будний день', N'Абонемент на 1 час', 50000, 250);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'Д-2', 2, N'Будний день', N'Абонемент на 3 час', 50000, 600);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'Д-3', 2, N'Будний день', N'Абонемент на весь день', 50000, 1200);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'C-1', 3, N'Будний день', N'Абонемент на 1 час', 50000, 250);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'C-2', 3, N'Будний день', N'Абонемент на 3 час', 50000, 600);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'C-3', 3, N'Будний день', N'Абонемент на весь день', 50000, 1200);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'O-1', 4, N'Будний день', N'Абонемент на 1 час', 50000, 600);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'O-2', 4, N'Будний день', N'Абонемент на 3 час', 50000, 900);
INSERT INTO Subscription(Title, Category_Id, Days_type, Time_type, Amount, Price) 
	VALUES (N'O-3', 4, N'Будний день', N'Абонемент на весь день', 50000, 1800);

INSERT INTO Role(Title) VALUES ('client');
INSERT INTO Role(Title) VALUES ('admin');
INSERT INTO Role(Title) VALUES ('store_clerk');
INSERT INTO Role(Title) VALUES ('courier');

INSERT INTO Status(Status_Title) VALUES (N'Новый');
INSERT INTO Status(Status_Title) VALUES (N'Принят');
INSERT INTO Status(Status_Title) VALUES (N'Формируется');
INSERT INTO Status(Status_Title) VALUES (N'Сформирован');
INSERT INTO Status(Status_Title) VALUES (N'Доставляется');
INSERT INTO Status(Status_Title) VALUES (N'Доставлен');
INSERT INTO Status(Status_Title) VALUES (N'Не Доставлен');
INSERT INTO Status(Status_Title) VALUES (N'Отменен');
