CREATE DATABASE  IF NOT EXISTS `vacationsapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacationsapp`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacationsapp
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `salt` varchar(250) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','root@root.com','$2b$10$h8vppFcI/qB0aHRccnINSuYksIDJAhMs417Z6gVlWesj0tm7vbm.W','admin','$2b$10$h8vppFcI/qB0aHRccnINSu'),(2,'user','user','user@user.com','$2b$10$irh34r70EqWMqUhelcDZaunFZyyB2x4beTKWiB2nhqFrtQN/MDd1C','user','$2b$10$irh34r70EqWMqUhelcDZau');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int NOT NULL,
  `image` varchar(600) NOT NULL,
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'los angeles','Los Angeles, often referred to by its initials L.A officially the City of Los Angeles, is the most populous city in the U.S. state of California. With roughly 3.9 million residents within the city limits as of 2020,[7] Los Angeles is the second-most populous city in the United States, behind only New York City; it is the commercial, financial and cultural center of the Southern California region. Los Angeles has a Mediterranean climate, an ethnically and culturally diverse population, in addition to a sprawling metropolitan area.','2023-08-28','2023-08-31',1500,'https://static.independent.co.uk/2023/07/07/10/iStock-515064346.jpg'),(2,'athens','Athens is a major coastal urban area in the Mediterranean and it is both the capital and the largest city of Greece. With its urban area\'s population numbering over three million, it is also the eighth largest urban area in the European Union. Athens dominates and is the capital of the Attica region and is one of the world\'s oldest cities, with its recorded history spanning over 3,400 years,[6] and its earliest human presence beginning somewhere between the 11th and 7th millennia BC. The city was named after Athena, the ancient Greek goddess of wisdom.','2023-09-01','2023-09-11',650,'https://cdn.britannica.com/66/102266-050-FBDEFCA1/acropolis-city-state-Greece-Athens.jpg'),(3,'new york','New York, often called New York City[a] or NYC, is the most populous city in the United States. With a 2020 population of 8,804,190 distributed over 300.46 square miles (778.2 km2), New York City is the most densely populated major city in the United States. The city is more than twice as populous as Los Angeles, the nation\'s second-largest city. New York City is situated at the southern tip of New York State. Situated on one of the world\'s largest natural harbors, New York City comprises five boroughs, each of which is coextensive with a respective county. The five boroughs, which were created in 1898 when local governments were consolidated into a single municipality, are: Brooklyn (Kings County), Queens (Queens County), Manhattan (New York County), the Bronx (Bronx County), and Staten Island (Richmond County). New York City is a global city and a cultural, financial, high-tech, entertainment, glamour, and media center with a significant influence on commerce, health care and scientific output in life sciences, research, technology, education, politics, tourism, dining, art, fashion, and sports. Home to the headquarters of the United Nations, New York is an important center for international diplomacy, and it is sometimes described as the world\'s most important city and the capital of the world.','2023-09-10','2023-09-28',1250,'https://www.frommers.com/system/media_items/attachments/000/868/461/s980/Frommers-New-York-City-Getting-Around-1190x768.jpg?1647177178'),(4,'bangkok','Bangkok,[a] officially known in Thai as Krung Thep Maha Nakhon[b] and colloquially as Krung Thep,[c] is the capital and most populous city of Thailand. The city occupies 1,568.7 square kilometres (605.7 sq mi) in the Chao Phraya River delta in central Thailand and has an estimated population of 10.539 million as of 2020, 15.3 per cent of the country\'s population. Over 14 million people (22.2 per cent) lived within the surrounding Bangkok Metropolitan Region at the 2010 census, making Bangkok an extreme primate city, dwarfing Thailand\'s other urban centres in both size and importance to the national economy.','2023-09-26','2023-10-16',900,'https://a.cdn-hotels.com/gdcs/production146/d585/aa60115c-bdfc-479f-88ba-5cb0f15a5af8.jpg?impolicy=fcrop&w=800&h=533&q=medium'),(5,'vietnam','Vietnam is a country at the eastern edge of mainland Southeast Asia, with an area of 331,212 square kilometres (127,882 sq mi) and a population of over 100 million, making it the world\'s fifteenth-most populous country. Vietnam shares land borders with China to the north, and Laos and Cambodia to the west. It shares maritime borders with Thailand through the Gulf of Thailand, and the Philippines, Indonesia, and Malaysia through the South China Sea. Its capital is Hanoi and its largest city is Ho Chi Minh City (commonly referred to by its former name, Saigon).','2023-09-11','2023-09-23',1100,'https://static.independent.co.uk/2023/06/21/14/newFile-1.jpg'),(6,'delhi','Delhi,[a] officially the National Capital Territory (NCT) of Delhi, is a city and a union territory of India containing New Delhi, the capital of India. Straddling the Yamuna river, primarily its western or right bank, Delhi shares borders with the state of Uttar Pradesh in the east and with the state of Haryana in the remaining directions. The NCT covers an area of 1,484 square kilometres (573 sq mi).[2] According to the 2011 census, Delhi\'s city proper population was over 11 million,[3][12] while the NCT\'s population was about 16.8 million.[4] Delhi\'s urban agglomeration, which includes the satellite cities Ghaziabad, Faridabad, Gurgaon and Noida in an area known as the National Capital Region (NCR), has an estimated population of over 28 million, making it the largest metropolitan area in India and the second-largest in the world (after Tokyo).','2023-09-25','2023-10-25',650,'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg'),(7,'london','London (/ˈlʌndən/ (listen)) is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.[1][note 1] It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea and has been a major settlement for two millennia.[9] The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains its medieval boundaries.[note 2][10] The City of Westminster, to the west of the City of London, has for centuries hosted the national government and parliament. Since the 19th century,[11] the name \"London\" also refers to the metropolis around this core, historically split among the counties of Middlesex, Essex, Surrey, Kent, and Hertfordshire,[12] which since 1965 has largely comprised Greater London,[13] which is governed by 33 local authorities and the Greater London Authority.','2023-10-04','2023-10-11',750,'https://www.syracuse.edu/images/cY6KOgf0WxbGixUTeTUUC62ZfVA=/3943/width-1100/london-large-image_08-10-202115-20-48.jpg'),(8,'paris','Paris (English: /ˈpærɪs/; French pronunciation: ​[paʁi] (listen)) is the capital and most populous city of France, with an official estimated population of 2,102,650 residents as of 1 January 2023[2] in an area of more than 105 km2 (41 sq mi),[5] making it the fourth-most populated city in the European Union as well as the 30th most densely populated city in the world in 2022.[6] Since the 17th century, Paris has been one of the world\'s major centres of finance, diplomacy, commerce, culture, fashion, gastronomy and many areas. For its leading role in the arts and sciences, as well as its early and extensive system of street lighting, in the 19th century, it became known as \"the City of Light\".','2023-10-29','2023-11-05',800,'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900'),(9,'dublin','Dublin (/ˈdʌblɪn/; Irish: Baile Átha Cliath,[10] pronounced [ˈbˠalʲə aːhə ˈclʲiə] or [ˌbʲlʲaː ˈclʲiə]) is the capital and largest city of Ireland.[11][12] On a bay at the mouth of the River Liffey, it is in the province of Leinster, bordered on the south by the Dublin Mountains, a part of the Wicklow Mountains range. At the 2022 census, the municipal area had a population of 592,713, while Dublin City and its suburbs had a population of 1,263,219.','2023-10-16','2023-10-30',800,'https://worldstrides.com/wp-content/uploads/2015/07/Double-day2-786x524.jpg'),(10,'santorini','Santorini (Greek: Σαντορίνη, pronounced [sandoˈrini]), officially Thira (Greek: Θήρα Greek pronunciation: [ˈθira]) and Classical Greek Thera (English pronunciation /ˈθɪərə/), is an island in the southern Aegean Sea, about 200 km (120 mi) southeast from the Greek mainland. It is the largest island of a small circular archipelago, which bears the same name and is the remnant of a caldera. It forms the southernmost member of the Cyclades group of islands, with an area of approximately 73 km2 (28 sq mi) and a 2011 census population of 15,550. The municipality of Santorini includes the inhabited islands of Santorini and Therasia, as well as the uninhabited islands of Nea Kameni, Palaia Kameni, Aspronisi and Christiana. The total land area is 90.623 km2 (34.990 sq mi).[2] Santorini is part of the Thira regional unit.','2023-09-22','2023-09-29',690,'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/30/3f/caption.jpg?w=700&h=-1&s=1&cx=1846&cy=1833&chk=v1_6ae0a81ae3361e988707'),(11,'berlin','Berlin (/bɜːrˈlɪn/ bur-LIN, German: [bɛʁˈliːn] (listen))[7] is the capital and largest city of Germany by both area and population.[8][9] Its more than 3.85 million inhabitants[10] make it the European Union\'s most populous city, according to population within city limits.[2] One of Germany\'s sixteen constituent states, Berlin is surrounded by the State of Brandenburg and contiguous with Potsdam, Brandenburg\'s capital. Berlin\'s urban area, which has a population of around 4.5 million, is the most populous urban area in Germany.[3][11] The Berlin-Brandenburg capital region has around 6.2 million inhabitants and is Germany\'s second-largest metropolitan region after the Rhine-Ruhr region.','2023-09-04','2023-09-18',700,'https://www.germany.travel/media/redaktion/staedte_kultur_content/Berlin_Brandenburger_Tor_im_Sonnenuntergang_Leitmotiv_German_Summer_Cities.jpg'),(12,'istanbul','Istanbul (/ˌɪstænˈbʊl/ IST-an-BUUL,[7][8] US also /ˈɪstænbʊl/ IST-an-buul; Turkish: İstanbul [isˈtanbuɫ] (listen)), formerly known as Constantinople[b] (Greek: Κωνσταντινούπολις; Latin: Constantinopolis; Ottoman Turkish: قسطنطينيه), is the largest city in Turkey, serving as the country\'s economic, cultural and historic hub. The city straddles the Bosporus strait, lying in both Europe and Asia, and has a population of over 15 million residents, comprising 19% of the population of Turkey.[4] Istanbul is the most populous European city[c] and the world\'s 15th-largest city.','2023-11-21','2023-11-30',450,'https://a.cdn-hotels.com/gdcs/production6/d781/3bae040b-2afb-4b11-9542-859eeb8ebaf1.jpg'),(13,'tokyo','Tokyo (/ˈtoʊkioʊ/;[7] Japanese: 東京, Tōkyō, [toːkʲoː] (listen)), officially the Tokyo Metropolis (東京都, Tōkyō-to), is the capital and most populous city of Japan.[8] Formerly known as Edo, its metropolitan area (including neighboring prefectures, 13,452 square kilometers or 5,194 square miles) is the most populous in the world, with an estimated 37.468 million residents as of 2018;[9] although this number has been gradually decreasing since then, the prefecture itself has a population of 14.09 million people[4] while the city\'s central 23 special wards have a population of 9.73 million.[10] Located at the head of Tokyo Bay, the prefecture forms part of the Kantō region on the central coast of Honshu, Japan\'s largest island. Tokyo serves as Japan\'s economic center and is the seat of both the Japanese government and the Emperor of Japan.','2023-08-31','2023-09-18',2100,'https://s.yimg.com/ny/api/res/1.2/tD04hh_aV_XFqzLb9ymBVQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/huffpost_life_308/5f99682ed85568a8f20e496a66bfc7d0'),(14,'manila','Manila (/məˈnɪlə/ mə-NIL-ə, Spanish: [maˈnila]; Filipino: Maynila, pronounced [majˈnilaʔ]), officially the City of Manila (Filipino: Lungsod ng Maynila, [luŋˈsod nɐŋ majˈnilaʔ]), is the capital and second-most populous city of the Philippines. Located on the eastern shore of Manila Bay on the island of Luzon, it is classified as a highly urbanized city. As of 2019, it is the world\'s most densely populated city proper. It was the first chartered city in the country, and was designated as such by the Philippine Commission Act No. 183 on July 31, 1901. It became autonomous with the passage of Republic Act No. 409, \"The Revised Charter of the City of Manila\", on June 18, 1949.[10] Manila is considered to be part of the world\'s original set of global cities because its commercial networks were the first to extend across the Pacific Ocean and connect Asia with the Spanish Americas through the galleon trade; when this was accomplished, it was the first time an uninterrupted chain of trade routes circling the planet had been established.[11][12] Manila is among the most-populous and fastest-growing cities in Southeast Asia.','2023-09-19','2023-10-19',1300,'https://i.natgeofe.com/n/04505c35-858b-4e95-a1a7-d72e5418b7fc/steep-karst-cliffs-of-el-nido-in-palawan.jpg?w=1024&h=512'),(15,'rome','Rome (Italian and Latin: Roma [ˈroːma] (listen)) is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale. With 2,860,009 residents in 1,285 km2 (496.1 sq mi),[2] Rome is the country\'s most populated comune and the third most populous city in the European Union by population within city limits. The Metropolitan City of Rome, with a population of 4,355,725 residents, is the most populous metropolitan city in Italy.[3] Its metropolitan area is the third-most populous within Italy.[4] Rome is located in the central-western portion of the Italian Peninsula, within Lazio (Latium), along the shores of the Tiber. Vatican City (the smallest country in the world)[5] is an independent country inside the city boundaries of Rome, the only existing example of a country within a city. Rome is often referred to as the City of Seven Hills due to its geographic location, and also as the \"Eternal City\".[6] Rome is generally considered to be the \"cradle of Western civilization and Christian culture\", and the centre of the Catholic Church.','2023-10-23','2023-10-30',650,'https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350-1?wid=1600&hei=900&fit=constrain,1&fmt=webp');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-04 12:42:35
