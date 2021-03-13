-- Copyright 2020-2021 Maksym Liannoi
--
-- Licensed under the Apache License, Version 2.0 (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--    http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.

/*USE master;
GO

IF DB_ID('Wlodzimierz') IS NOT NULL DROP DATABASE Wlodzimierz;

CREATE DATABASE Wlodzimierz;
GO

USE Wlodzimierz;
GO*/

---------------------------------------------------------------------
-- Create Tables
---------------------------------------------------------------------

-- Drop table dbo.Groups
IF OBJECT_ID('dbo.Groups') IS NOT NULL DROP TABLE dbo.Groups;
GO

-- Create table dbo.Groups
CREATE TABLE dbo.Groups
(
    GroupId   INT          NOT NULL IDENTITY,
    Name      NVARCHAR(64) NOT NULL,
    IsRemoved BIT          NOT NULL
        CONSTRAINT DFT_Groups_IsRemoved DEFAULT (0),
    CONSTRAINT PK_Groups PRIMARY KEY (GroupId),
    CONSTRAINT CHK_Groups_Name CHECK (DATALENGTH(Name) >= 2)
);

-- Drop table dbo.GroupBlacklists
IF OBJECT_ID('dbo.GroupBlacklists') IS NOT NULL DROP TABLE dbo.GroupBlacklists;
GO

-- Create table dbo.GroupBlacklists
CREATE TABLE dbo.GroupBlacklists
(
    GroupBlacklistId INT           NOT NULL IDENTITY,
    GroupId          INT           NOT NULL,
    BlockedUserId    NVARCHAR(450) NOT NULL,
    IsRemoved        BIT           NOT NULL
        CONSTRAINT DFT_GroupBlacklists_IsRemoved DEFAULT (0),
    CONSTRAINT PK_GroupBlacklists PRIMARY KEY (GroupBlacklistId),
    CONSTRAINT FK_GroupBlacklists_GroupId FOREIGN KEY (GroupId) REFERENCES dbo.Groups (GroupId),
    CONSTRAINT CHK_GroupBlacklists_BlockedUserId CHECK (DATALENGTH(BlockedUserId) >= 2)
);

-- Drop table dbo.GroupAdministrators
IF OBJECT_ID('dbo.GroupAdministrators') IS NOT NULL DROP TABLE dbo.GroupAdministrators;
GO

-- Create table dbo.GroupAdministrators
CREATE TABLE dbo.GroupAdministrators
(
    GroupAdministratorId INT           NOT NULL IDENTITY,
    GroupId              INT           NOT NULL,
    AdministratorUserId  NVARCHAR(450) NOT NULL,
    IsRemoved            BIT           NOT NULL
        CONSTRAINT DFT_GroupAdministrators_IsRemoved DEFAULT (0),
    CONSTRAINT PK_GroupAdministrators PRIMARY KEY (GroupAdministratorId),
    CONSTRAINT FK_GroupAdministrators_GroupId FOREIGN KEY (GroupId) REFERENCES dbo.Groups (GroupId),
    CONSTRAINT CHK_GroupAdministrators_AdministratorUserId CHECK (DATALENGTH(AdministratorUserId) >= 2)
);

-- Drop table dbo.GroupMessages
IF OBJECT_ID('dbo.GroupMessages') IS NOT NULL DROP TABLE dbo.GroupMessages;
GO

-- Create table dbo.GroupMessages
CREATE TABLE dbo.GroupMessages
(
    GroupMessageId INT            NOT NULL IDENTITY,
    GroupId        INT            NOT NULL,
    OwnerUserId    NVARCHAR(450)  NOT NULL,
    Message        NVARCHAR(1024) NOT NULL,
    Publish        DATETIME       NOT NULL
        CONSTRAINT DFT_GroupMessages_Publish DEFAULT (GETDATE()),
    IsRemoved      BIT            NOT NULL
        CONSTRAINT DFT_GroupMessages_IsRemoved DEFAULT (0),
    CONSTRAINT PK_GroupMessages PRIMARY KEY (GroupMessageId),
    CONSTRAINT FK_GroupMessages_GroupId FOREIGN KEY (GroupId) REFERENCES dbo.Groups (GroupId),
    CONSTRAINT CHK_GroupMessages_OwnerUserId CHECK (DATALENGTH(OwnerUserId) >= 2),
    CONSTRAINT CHK_GroupMessages_Message CHECK (DATALENGTH(Message) >= 2),
    CONSTRAINT CHK_GroupMessages_Publish CHECK (Publish <= GETDATE())
);

-- Drop table dbo.UserGroups
IF OBJECT_ID('dbo.UserGroups') IS NOT NULL DROP TABLE dbo.UserGroups;
GO

-- Create table dbo.UserGroups
CREATE TABLE dbo.UserGroups
(
    GroupId   INT           NOT NULL,
    UserId    NVARCHAR(450) NOT NULL,
    IsRemoved BIT           NOT NULL
        CONSTRAINT DFT_UserGroups_IsRemoved DEFAULT (0),
    CONSTRAINT PK_UserGroups PRIMARY KEY (GroupId, UserId),
    CONSTRAINT FK_UserGroups_GroupId FOREIGN KEY (GroupId) REFERENCES dbo.Groups (GroupId),
    CONSTRAINT CHK_UserGroups_UserId CHECK (DATALENGTH(UserId) >= 2)
);

-- Drop table dbo.Conversations
IF OBJECT_ID('dbo.Conversations') IS NOT NULL DROP TABLE dbo.Conversations;
GO

-- Create table dbo.Conversations
CREATE TABLE dbo.Conversations
(
    ConversationId INT           NOT NULL IDENTITY,
    LeftUserId     NVARCHAR(450) NOT NULL,
    RightUserId    NVARCHAR(450) NOT NULL,
    IsRemoved      BIT           NOT NULL
        CONSTRAINT DFT_Conversations_IsRemoved DEFAULT (0),
    CONSTRAINT PK_Conversations PRIMARY KEY (ConversationId),
    CONSTRAINT CHK_Conversations_LeftUserId CHECK (DATALENGTH(LeftUserId) >= 2),
    CONSTRAINT CHK_Conversations_RightUserId CHECK (DATALENGTH(RightUserId) >= 2)
);

-- Drop table dbo.ConversationMessages
IF OBJECT_ID('dbo.ConversationMessages') IS NOT NULL DROP TABLE dbo.ConversationMessages;
GO

-- Create table dbo.ConversationMessages
CREATE TABLE dbo.ConversationMessages
(
    ConversationMessageId INT            NOT NULL IDENTITY,
    ConversationId        INT            NOT NULL,
    OwnerUserId           NVARCHAR(450)  NOT NULL,
    Message               NVARCHAR(1024) NOT NULL,
    Publish               DATETIME       NOT NULL
        CONSTRAINT DFT_ConversationMessages_Publish DEFAULT (GETDATE()),
    IsRemoved             BIT            NOT NULL
        CONSTRAINT DFT_ConversationMessages_IsRemoved DEFAULT (0),
    CONSTRAINT PK_ConversationMessages PRIMARY KEY (ConversationMessageId),
    CONSTRAINT FK_ConversationMessages_ConversationId FOREIGN KEY (ConversationId) REFERENCES dbo.Conversations (ConversationId),
    CONSTRAINT CHK_ConversationMessages_OwnerUserId CHECK (DATALENGTH(OwnerUserId) >= 2),
    CONSTRAINT CHK_ConversationMessages_Message CHECK (DATALENGTH(Message) >= 2),
    CONSTRAINT CHK_ConversationMessages_Publish CHECK (Publish <= GETDATE())
);

-- Drop table dbo.Contacts
IF OBJECT_ID('dbo.Contacts') IS NOT NULL DROP TABLE dbo.Contacts;
GO

-- Create table dbo.Contacts
CREATE TABLE dbo.Contacts
(
    ContactId     INT           NOT NULL IDENTITY,
    OwnerUserId   NVARCHAR(450) NOT NULL,
    ContactUserId NVARCHAR(450) NOT NULL,
    FirstName     NVARCHAR(64)  NULL,
    LastName      NVARCHAR(64)  NULL,
    Email         NVARCHAR(128) NULL,
    Photo         NVARCHAR(256) NULL,
    IsRemoved     BIT           NOT NULL
        CONSTRAINT DFT_Contacts_IsRemoved DEFAULT (0),
    CONSTRAINT PK_Contacts PRIMARY KEY (ContactId),
    CONSTRAINT CHK_Contacts_OwnerUserId CHECK (DATALENGTH(OwnerUserId) >= 2),
    CONSTRAINT CHK_Contacts_ContactUserId CHECK (DATALENGTH(ContactUserId) >= 2)
);

-- Drop table dbo.UserBlacklists
IF OBJECT_ID('dbo.UserBlacklists') IS NOT NULL DROP TABLE dbo.UserBlacklists;
GO

-- Create table dbo.UserBlacklists
CREATE TABLE dbo.UserBlacklists
(
    UserBlacklistId INT           NOT NULL IDENTITY,
    OwnerUserId     NVARCHAR(450) NOT NULL,
    BlockedUserId   NVARCHAR(450) NOT NULL,
    IsRemoved       BIT           NOT NULL
        CONSTRAINT DFT_UserBlacklists_IsRemoved DEFAULT (0),
    CONSTRAINT PK_UserBlacklists PRIMARY KEY (UserBlacklistId),
    CONSTRAINT CHK_UserBlacklists_OwnerUserId CHECK (DATALENGTH(OwnerUserId) >= 2),
    CONSTRAINT CHK_UserBlacklists_BlockedUserId CHECK (DATALENGTH(BlockedUserId) >= 2)
);
GO

---------------------------------------------------------------------
-- Populate Tables
---------------------------------------------------------------------

SET NOCOUNT ON;

-- Populate table dbo.Groups
INSERT INTO Groups (name)
VALUES ('elementum in hac habitasse');
INSERT INTO Groups (name)
VALUES ('nulla sed accumsan felis ut');
INSERT INTO Groups (name)
VALUES ('sapien ut nunc vestibulum');
INSERT INTO Groups (name)
VALUES ('at dolor quis');
INSERT INTO Groups (name)
VALUES ('sed tincidunt eu felis');
INSERT INTO Groups (name)
VALUES ('in quis justo');
INSERT INTO Groups (name)
VALUES ('in est risus auctor');
INSERT INTO Groups (name)
VALUES ('est risus auctor sed');
INSERT INTO Groups (name)
VALUES ('diam erat fermentum');
INSERT INTO Groups (name)
VALUES ('tempus vel pede morbi');
INSERT INTO Groups (name)
VALUES ('ac consequat metus');
INSERT INTO Groups (name)
VALUES ('penatibus et magnis');
INSERT INTO Groups (name)
VALUES ('metus vitae ipsum aliquam non');
INSERT INTO Groups (name)
VALUES ('mollis molestie lorem quisque');
INSERT INTO Groups (name)
VALUES ('euismod scelerisque quam');
INSERT INTO Groups (name)
VALUES ('mi nulla ac');
INSERT INTO Groups (name)
VALUES ('at feugiat non');
INSERT INTO Groups (name)
VALUES ('justo in hac');
INSERT INTO Groups (name)
VALUES ('a ipsum');
INSERT INTO Groups (name)
VALUES ('vitae nisi');
INSERT INTO Groups (name)
VALUES ('libero nam dui');
INSERT INTO Groups (name)
VALUES ('sed vel enim sit amet');
INSERT INTO Groups (name)
VALUES ('vel nisl');
INSERT INTO Groups (name)
VALUES ('vestibulum sagittis sapien cum');
INSERT INTO Groups (name)
VALUES ('id ornare imperdiet sapien');
INSERT INTO Groups (name)
VALUES ('iaculis diam erat fermentum justo');
INSERT INTO Groups (name)
VALUES ('orci luctus et');
INSERT INTO Groups (name)
VALUES ('dapibus duis');
INSERT INTO Groups (name)
VALUES ('in tempus sit amet');
INSERT INTO Groups (name)
VALUES ('in felis eu sapien');
INSERT INTO Groups (name)
VALUES ('aliquam augue');
INSERT INTO Groups (name)
VALUES ('elementum ligula');
INSERT INTO Groups (name)
VALUES ('lacus purus');
INSERT INTO Groups (name)
VALUES ('ac nibh fusce lacus purus');
INSERT INTO Groups (name)
VALUES ('vulputate vitae');
INSERT INTO Groups (name)
VALUES ('phasellus sit amet');
INSERT INTO Groups (name)
VALUES ('sit amet erat nulla');
INSERT INTO Groups (name)
VALUES ('in consequat ut nulla sed');
INSERT INTO Groups (name)
VALUES ('erat tortor sollicitudin mi sit');

-- Populate table dbo.UserGroups
INSERT INTO UserGroups (groupid, userid)
VALUES (1, N'00');
INSERT INTO UserGroups (groupid, userid)
VALUES (5, N'00');
INSERT INTO UserGroups (groupid, userid)
VALUES (8, N'00');

-- Populate table dbo.GroupBlacklists


-- Populate table dbo.GroupAdministrators
INSERT INTO GroupAdministrators (groupid, administratoruserid)
VALUES (1, N'00');
INSERT INTO GroupAdministrators (groupid, administratoruserid)
VALUES (5, N'00');
INSERT INTO GroupAdministrators (groupid, administratoruserid)
VALUES (8, N'00');

-- Populate table dbo.GroupMessages
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.');
INSERT INTO GroupMessages (GroupId, OwnerUserId, Message)
VALUES (1, N'00',
        'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.');

-- Populate table dbo.Conversations
INSERT INTO Conversations (leftuserid, rightuserid)
VALUES (N'00', N'00');
INSERT INTO Conversations (leftuserid, rightuserid)
VALUES (N'00', N'00');

-- Populate table dbo.ConversationMessages
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (2, N'00',
        'Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (2, N'00',
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (2, N'00', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (2, N'00',
        'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (2, N'00',
        'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (1, N'00',
        'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (1, N'00', 'Quisque ut erat.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (1, N'00',
        'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (1, N'00',
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.');
INSERT INTO ConversationMessages (ConversationId, OwnerUserId, Message)
VALUES (1, N'00',
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.');

-- Populate table dbo.Contacts
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Dorian', 'Yaxley', 'dyaxley0@census.gov');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Zaccaria', 'Showler', 'zshowler1@simplemachines.org');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Edmon', 'Kiff', 'ekiff2@4shared.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Gordie', 'Luard', 'gluard3@yellowpages.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Valdemar', 'Halcro', 'vhalcro4@e-recht24.de');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Isidoro', 'Cluse', 'icluse5@tuttocitta.it');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Florrie', 'Rubinchik', 'frubinchik6@cpanel.net');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Kelsey', 'Mallya', 'kmallya7@aol.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Ives', 'Mc Grath', 'imcgrath8@rambler.ru');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Cory', 'Varley', 'cvarleyc@aol.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Tannie', 'Breese', 'tbreesea@youku.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Alphard', 'Hedingham', 'ahedingham1@loc.gov');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Veronika', 'Roose', 'vroose2@cnn.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Bethanne', 'McFall', 'bmcfall3@mail.ru');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Payton', 'Harlow', 'pharlow4@kickstarter.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Ariel', 'Videneev', 'avideneev5@reuters.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Donny', 'Trevon', 'dtrevon6@ftc.gov');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Douglass', 'Zielinski', 'dzielinski7@stumbleupon.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Joey', 'Castelow', 'jcastelow8@surveymonkey.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Corella', 'Scullion', 'cscullion9@jugem.jp');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Emmalyn', 'Feldhorn', 'efeldhornd@washington.edu');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Cathie', 'Turley', 'cturleye@prweb.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Aldrich', 'Trenear', 'atrenearf@drupal.org');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Marietta', 'Tembey', 'mtembeyg@symantec.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Ekaterina', 'Strafford', 'estraffordh@washington.edu');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Fraser', 'Kilrow', 'fkilrowi@cdbaby.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Leopold', 'Beddoe', 'lbeddoej@homestead.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Moselle', 'Turgoose', 'mturgoose0@kickstarter.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Jemimah', 'Tuhy', 'jtuhy9@latimes.com');
INSERT INTO Contacts (owneruserid, contactuserid, firstname, lastname, email)
VALUES (N'00', N'00', 'Hillary', 'Cholerton', 'hcholertonb@de.vu');

-- Populate table dbo.UserBlacklists
INSERT INTO UserBlacklists (owneruserid, blockeduserid)
VALUES (N'00', N'00');

SET
    NOCOUNT OFF;
GO
