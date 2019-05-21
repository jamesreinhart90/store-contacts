CREATE DATABASE FHStore;

USE FHStore;

CREATE TABLE Store (
	storeID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	regionID int FOREIGN KEY REFERENCES RegionManager(regionManagerID),
	districtID int FOREIGN KEY REFERENCES DistrictManager(districtManagerID),
	storeTelecomID int FOREIGN KEY REFERENCES StoreTelecom(storeTelecomID),
	contactID int FOREIGN KEY REFERENCES Contact(contactID),
	storeNumber int NOT NULL,
	nursery bit NULL,
	petWashStation bit NULL,
	smallEngine bit NULL,
	books bit NULL,
	fishing bit NULL,
	fishingAndGuns bit NULL,
	size varchar(5) NULL,
	petSize varchar(5) NULL,
	modified varchar(25) NULL
);


CREATE TABLE RegionManager (
	regionManagerID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	contactID int FOREIGN KEY REFERENCES Contact(contactID),
	regionNumber int NOT NULL,
	modified varchar(25) NULL
);


CREATE TABLE DistrictManager (
	districtManagerID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	contactID int FOREIGN KEY REFERENCES Contact(contactID),
	districtNumber int NOT NULL,
	cellPhone varchar(10) NULL,
	modified varchar(25) NULL
);


CREATE TABLE Contact (
	contactID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	firstName varchar(50) NULL,
	lastName varchar(50) NULL,
	phoneNumber varchar(10) NULL,
	faxNumber varchar(10) NULL,
	streetAddress varchar(50) NULL,
	state varchar(2) NULL,
	zip varchar(9) NULL,
	modified varchar(25) NULL,
	city varchar(50) NULL
);


CREATE TABLE StoreTelecom (
	storeTelecomID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	storeID int FOREIGN KEY REFERENCES store(storeID),
	/*contactID int FOREIGN KEY REFERENCES Contact(contactID),
	telecomNotesID int FOREIGN KEY REFERENCES StoreTelecomNote(storeTelecomNoteID),  REMOVE*/
	speedDialNumber varchar(4) NULL,
	rollOver varchar(10) NULL,
	alternate1 varchar(50) NULL,
	alternate2 varchar(50) NULL,
	burglarAlarm varchar(10) NULL,
	fireAlarm varchar(10) NULL,
	fireAlarm2 varchar(10) NULL,
	localTelephoneCompany varchar(50) NULL,
	localTollCarrier varchar(50) NULL,
	interstateCarrier varchar(50) NULL,
	telecomNotes varchar(600) NULL,
	datacomNotes varchar(600) NULL,
	tollFree varchar(50) NULL,
	budgetNeeds varchar(600) NULL,
	internetServiceProvider varchar(50) NULL,
	ipAddress varchar(15) NULL,
	phoneSystemInstallDate varchar(10) NULL,
	telephoneSystem bit NULL,
	modified varchar(25) NULL
);


CREATE TABLE StoreTelecomNote (
	storeTelecomNoteID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	storeID int FOREIGN KEY REFERENCES Store(storeID),
	note varchar(600) NOT NULL,
	tech varchar(50) NOT NULL,
	date datetime NOT NULL,
	modified varchar(25) NULL
);


CREATE PROCEDURE spContactInsert
(
	@firstName varchar(50) = NULL,
	@lastname varchar(50) = NULL,
	@phoneNumber varchar(10) = NULL,
	@faxNumber varchar(10) = NULL,
	@streetAddress varchar(50) = NULL,
	@state varchar(2) = NULL,
	@zip varchar(9) = NULL,
	@city varchar(50) = NULL
)
AS
	BEGIN TRANSACTION
	INSERT INTO Contact	(
							firstName,
							lastName,
							phoneNumber,
							faxNumber,
							streetAddress,
							state,
							zip,
							city
						)
	VALUES	(
				@firstName,
				@lastname,
				@phoneNumber,
				@faxNumber,
				@streetAddress,
				@state,
				@zip,
				@city
			)
	RETURN @@IDENTITY
COMMIT


CREATE PROCEDURE spStoreInsert
(
	@contactID int,
	@regionID int,
	@districtID int,
	@storeNumber int,
	@nursery bit = NULL,
	@petWashStation bit = NULL,
	@smallEngine bit = NULL,
	@books bit = NULL,
	@fishing bit = NULL,
	@fishingAndGuns bit = NULL,
	@size varchar(5) = NULL,
	@petSize varchar(5) = NULL
)
AS
	BEGIN TRANSACTION
	INSERT INTO Store(
							regionID,
							districtID,
							contactID,
							storeNumber,
							nursery,
							petWashStation,
							smallEngine,
							books,
							fishing,
							fishingAndGuns,
							size,
							petSize
						)
	VALUES	(
				(SELECT regionManagerID FROM RegionManager WHERE regionNumber = @regionID),
				(SELECT districtManagerID FROM DistrictManager WHERE districtNumber = @districtID),				
				@ContactID,
				@storeNumber,
				@nursery,
				@petWashStation,
				@smallEngine,
				@books,
				@fishing,
				@fishingAndGuns,
				@size,
				@petSize
			)
	RETURN @@IDENTITY
COMMIT


--CREATE PROCEDURE spFHStoreInsert
--(
--	@firstName varchar(50) = NULL,
--	@lastname varchar(50) = NULL,
--	@phoneNumber varchar(10) = NULL,
--	@faxNumber varchar(10) = NULL,
--	@streetAddress varchar(50) = NULL,
--	@state varchar(2) = NULL,
--	@zip varchar(9) = NULL,
--	@city varchar(50) = NULL,
--	@regionID int,
--	@districtID int,
--	@storeNumber int,
--	@nursery bit = NULL,
--	@petWashStation bit = NULL,
--	@smallEngine bit = NULL,
--	@books bit = NULL,
--	@fishing bit = NULL,
--	@fishingAndGuns bit = NULL,
--	@size varchar(5) = NULL,
--	@petSize varchar(5) = NULL
--)
--AS
--	BEGIN TRANSACTION
--	DECLARE @ContactID int
--	INSERT INTO Contact (
--							firstName,
--							lastName,
--							phoneNumber,
--							faxNumber,
--							streetAddress,
--							state,
--							zip,
--							city
--						)
--	VALUES (
--				@firstName,
--				@lastname,
--				@phoneNumber,
--				@faxNumber,
--				@streetAddress,
--				@state,
--				@zip,
--				@city
--			)
--	SET @ContactID = SCOPE_IDENTITY()
--	INSERT INTO Store (
--						regionID,
--						districtID,
--						contactID,
--						storeNumber,
--						nursery,
--						petWashStation,
--						smallEngine,
--						books,
--						fishing,
--						fishingAndGuns,
--						size,
--						petSize
--					   )
--	VALUES (
--				(SELECT regionManagerID FROM RegionManager WHERE regionNumber = @regionID),
--				(SELECT districtManagerID FROM DistrictManager WHERE districtNumber = @districtID),
--				@storeNumber,
--				@ContactID,
--				@nursery,
--				@petWashStation,
--				@smallEngine,
--				@books,
--				@fishing,
--				@fishingAndGuns,
--				@size,
--				@petSize
--		  )
--	--could be @@Identity
--	RAISERROR(1, 1, 1)
--	return SCOPE_IDENTITY()
--COMMIT

/*insert into Store (storeNumber, nursery, petWashStation, smallEngine, books, fishing, fishingAndGuns, size, petSize)
values (1,1,null,null,1, null,null, 'A', 'L')*/
/*insert into Contact (firstName, lastName, phoneNumber, faxNumber, streetAddress, state, zip, city)
values ('Samantha', 'Richerson', '6608266092', '6608260583', '2424 South Limit Avenue',	'MO', '65301', 'Sedalia')*/

/*update Store
set contactID = (select contactID from Contact where streetAddress = '2424 South Limit Avenue')
where storeNumber = 1*/

/* CREATE New Region Manager
declare @ContactID int
insert into Contact (firstName, lastName) values ('Dwight', 'Isringhausen')
set @ContactID = SCOPE_IDENTITY()
insert into RegionManager (contactID, regionNumber) values (@ContactID, 2)*/

/* CREATE New District Manager
DECLARE @ContactID int
INSERT INTO Contact (firstName, lastName, phoneNumber, faxNumber, streetAddress, state, zip, city)
VALUES ('Mark', 'Cullifer', '6606511743', null,'26 Woodland Trails Drive', 'MO', '65270', 'Moberly')
SET @ContactID = SCOPE_IDENTITY()
INSERT INTO DistrictManager (contactID, districtNumber, cellPhone)
VALUES (@ContactID, 1, '6606511743')*/

/*UPDATE Store 
SET regionID = (SELECT regionManagerID FROM RegionManager WHERE regionNumber = 1), 
	districtID = (SELECT districtManagerID FROM DistrictManager WHERE districtNumber = 10)*/