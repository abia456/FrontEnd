create database if not exists cloudproject;
use cloudproject;

create table if not exists users(
userID int primary key auto_increment,
userName varchar(100),
userAge int
);
insert ignore into users(userID, userName, userAge) 
values(1, "Hamza", 22),(2, "Murad", 22),(3, "Abia", 22),(4, "Amna", 22),(5, "Faiqa", 22);


create table if not exists vaccines(
vaccineName char(20) primary key,
minAge int,
WeeksBetweenDoses int,
numberOfDoses int
);

insert ignore into vaccines(vaccineName, minAge, WeeksBetweenDoses, numberOfDoses)
values
("sinpharm", 18, 4, 2),
("pakVac", 21, 0, 1),
("Disco Devane", 35, 3, 3);
 
create table if not exists vaccine_center(
centerID int primary key auto_increment,
centerLocation varchar(250)
);
insert ignore into vaccine_center(centerID, centerLocation)
values
(1,"Lahore"),
(2,"Islamabad"),
(3,"Karachi");

create table if not exists vaccine_appointment (
userID int,
foreign key (userID) references users(userID) on delete cascade on update cascade,
centerID int,
foreign key (centerID) references vaccine_center(centerID) on delete cascade on update cascade,
dose_number int,
primary key(userID, centerID, dose_number)
);

create table if not exists vaccine_stock (
centerID int,
foreign key (centerID) references vaccine_center(centerID) on delete cascade on update cascade,
vaccineName char(20),
foreign key (vaccineName) references vaccines(vaccineName) on delete cascade on update cascade,
stockCount int
)