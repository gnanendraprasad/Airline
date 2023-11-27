CREATE DATABASE arsnew2;

DROP TABLE IF EXISTS `aircrafts`;

CREATE TABLE `aircrafts` (
  `AircraftID` int NOT NULL AUTO_INCREMENT,
  `AircraftName` varchar(255) NOT NULL,
  `AirlineID` int DEFAULT NULL,
  PRIMARY KEY (`AircraftID`),
  KEY `AirlineID` (`AirlineID`),
  CONSTRAINT `aircrafts_ibfk_1` FOREIGN KEY (`AirlineID`) REFERENCES `airlines` (`AirlineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `airlines`;

CREATE TABLE `airlines` (
  `AirlineID` int NOT NULL AUTO_INCREMENT,
  `AirlineName` varchar(255) NOT NULL,
  PRIMARY KEY (`AirlineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `airports`;

CREATE TABLE `airports` (
  `AirportID` int NOT NULL AUTO_INCREMENT,
  `AirportName` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`AirportID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `arrivals`;

CREATE TABLE `arrivals` (
  `ArrivalID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `ArrivalGate` varchar(10) NOT NULL,
  `ArrivalTime` datetime NOT NULL,
  PRIMARY KEY (`ArrivalID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `arrivals_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `baggage`;

CREATE TABLE `baggage` (
  `BaggageID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` varchar(45) DEFAULT NULL,
  `Weight` decimal(5,2) NOT NULL,
  PRIMARY KEY (`BaggageID`),
  KEY `PassengerID` (`PassengerID`),
  CONSTRAINT `baggage_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `booking_details`;

CREATE TABLE `booking_details` (
  `Booking_Id` int NOT NULL AUTO_INCREMENT,
  `Class_Type` varchar(45) NOT NULL,
  `Booking_Date` date NOT NULL,
  `Passport_No` varchar(45) DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `Card_No` varchar(45) NOT NULL,
  `Name_On_Card` varchar(45) NOT NULL,
  `Type_Of_Payment` varchar(45) NOT NULL,
  `Total_Amount` int NOT NULL,
  `Flight_No` int NOT NULL,
  `Id` varchar(45) NOT NULL,
  PRIMARY KEY (`Booking_Id`),
  KEY `flight_no_fk_idx` (`Flight_No`),
  KEY `id2_fk_idx` (`Id`),
  CONSTRAINT `flight_no_fk` FOREIGN KEY (`Flight_No`) REFERENCES `flight` (`Flight_No`) ON DELETE CASCADE,
  CONSTRAINT `id2_fk` FOREIGN KEY (`Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `checkin`;

CREATE TABLE `checkin` (
  `CheckInID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` varchar(45) DEFAULT NULL,
  `FlightID` int DEFAULT NULL,
  `CheckInTime` datetime NOT NULL,
  PRIMARY KEY (`CheckInID`),
  KEY `PassengerID` (`PassengerID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `user` (`Id`),
  CONSTRAINT `checkin_ibfk_2` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `departures`;

CREATE TABLE `departures` (
  `DepartureID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `DepartureGate` varchar(10) NOT NULL,
  `DepartureTime` datetime NOT NULL,
  PRIMARY KEY (`DepartureID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `departures_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `flight`;

CREATE TABLE `flight` (
  `Flight_No` int NOT NULL AUTO_INCREMENT,
  `Flight_Name` varchar(45) NOT NULL,
  `Source` varchar(45) NOT NULL,
  `Destination` varchar(45) NOT NULL,
  `Takeoff_Time` time NOT NULL,
  `Landing_Time` time NOT NULL,
  `Business_Cost` int NOT NULL,
  `Economy_Cost` int NOT NULL,
  `Available_Tickets` int NOT NULL,
  `Travel_Date` date NOT NULL,
  `Id` varchar(45) NOT NULL,
  PRIMARY KEY (`Flight_No`),
  KEY `id1_fk_idx` (`Id`),
  CONSTRAINT `id1_fk` FOREIGN KEY (`Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `flightdelays`;

CREATE TABLE `flightdelays` (
  `DelayID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `DelayReason` text NOT NULL,
  `DelayTime` int NOT NULL,
  PRIMARY KEY (`DelayID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `flightdelays_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `frequentflyerprogram`;

CREATE TABLE `frequentflyerprogram` (
  `ProgramID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` varchar(45) DEFAULT NULL,
  `ProgramName` varchar(50) NOT NULL,
  `MilesEarned` int NOT NULL,
  PRIMARY KEY (`ProgramID`),
  KEY `PassengerID` (`PassengerID`),
  CONSTRAINT `frequentflyerprogram_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `inflightmeals`;

CREATE TABLE `inflightmeals` (
  `MealID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `MealName` varchar(50) NOT NULL,
  `Price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`MealID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `inflightmeals_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `lostandfounditems`;

CREATE TABLE `lostandfounditems` (
  `ItemID` int NOT NULL AUTO_INCREMENT,
  `FoundByEmployeeID` int DEFAULT NULL,
  `Description` text NOT NULL,
  `FoundDate` datetime NOT NULL,
  `Status` varchar(20) NOT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `maintenancerecords`;

CREATE TABLE `maintenancerecords` (
  `MaintenanceID` int NOT NULL AUTO_INCREMENT,
  `AircraftID` int DEFAULT NULL,
  `MaintenanceDate` datetime NOT NULL,
  `Description` text,
  PRIMARY KEY (`MaintenanceID`),
  KEY `AircraftID` (`AircraftID`),
  CONSTRAINT `maintenancerecords_ibfk_1` FOREIGN KEY (`AircraftID`) REFERENCES `aircrafts` (`AircraftID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `reservations`;

CREATE TABLE `reservations` (
  `ReservationID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` varchar(45) DEFAULT NULL,
  `FlightID` int DEFAULT NULL,
  `ReservationDate` datetime NOT NULL,
  PRIMARY KEY (`ReservationID`),
  KEY `PassengerID` (`PassengerID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `user` (`Id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `seats`;

CREATE TABLE `seats` (
  `SeatID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `SeatNumber` varchar(10) NOT NULL,
  `Class` varchar(10) NOT NULL,
  PRIMARY KEY (`SeatID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `securitycheck`;

CREATE TABLE `securitycheck` (
  `CheckID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` varchar(45) DEFAULT NULL,
  `FlightID` int DEFAULT NULL,
  `CheckDate` datetime NOT NULL,
  `SecurityStatus` varchar(20) NOT NULL,
  PRIMARY KEY (`CheckID`),
  KEY `PassengerID` (`PassengerID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `securitycheck_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `user` (`Id`),
  CONSTRAINT `securitycheck_ibfk_2` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ticketprices`;

CREATE TABLE `ticketprices` (
  `PriceID` int NOT NULL AUTO_INCREMENT,
  `FlightID` int DEFAULT NULL,
  `Class` varchar(10) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`PriceID`),
  KEY `FlightID` (`FlightID`),
  CONSTRAINT `ticketprices_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flight` (`Flight_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `Id` varchar(45) NOT NULL,
  `First_Name` varchar(45) NOT NULL,
  `Last_Name` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `Contact` mediumtext NOT NULL,
  `User_Type` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`Id`, `First_Name`, `Last_Name`, `Password`, `Gender`, `Contact`, `User_Type`) VALUES
('admin1@gmail.com', 'John', 'Doe', 'admin@1', 'Male', '123456789', 'admin'),
('user1', 'Jane', 'Doe', 'user1', 'Female', '987654321', 'user');