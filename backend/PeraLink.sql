--
-- Database: `peralink`
--
-- --------------------------------------------------------
--
-- Table structure for table `comment`
--

CREATE DATABASE IF NOT EXISTS `PeraLink`;
USE PeraLink;

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `c_id` int NOT NULL auto_increment,
  `c_time` time NOT NULL,
  `c_date` int NOT NULL,
  `c_month` int NOT NULL,
  `c_year` int NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`c_id`),
  FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(p_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table `comment_like`
--

DROP TABLE IF EXISTS `comment_like`;
CREATE TABLE IF NOT EXISTS `comment_like` (
  `id` int NOT NULL auto_increment,
  `l_time` time NOT NULL,
  `l_date` int NOT NULL,
  `l_month` int NOT NULL,
  `l_year` year NOT NULL,
  `liketype_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comment(c_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (liketype_id) REFERENCES like_type(type_id) ON DELETE CASCADE ON UPDATE CASCADE

);

-- --------------------------------------------------------

--
-- Table structure for table `friends_with`
--

DROP TABLE IF EXISTS `friends_with`;
CREATE TABLE IF NOT EXISTS `friends_with` (
  `friend_id` int NOT NULL auto_increment,
  `accepter_id` int NOT NULL,
  `requester_id` int NOT NULL,
  `acc_date` date NOT NULL,
  PRIMARY KEY (accepter_id),
  FOREIGN KEY (friend_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
CREATE TABLE IF NOT EXISTS `friend_request` (
  `requestee_id` int NOT NULL,
  `requester_id` int NOT NULL,
  `req_time` time NOT NULL,
  `req_date` int NOT NULL,
  `req_month` int NOT NULL,
  `req_year` year NOT NULL,
  `req_status` tinyint(1) NOT NULL,
  FOREIGN KEY (requestee_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (requester_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table `like_type`
--

DROP TABLE IF EXISTS `like_type`;
CREATE TABLE IF NOT EXISTS `like_type` (
  `type_id` int NOT NULL auto_increment,
  `type_name` varchar(20) NOT NULL,
  `type_emoji` text NOT NULL,
  PRIMARY KEY (type_id)
);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `p_id` int NOT NULL auto_increment,
  `p_time` time NOT NULL,
  `p_date` int NOT NULL,
  `p_month` int NOT NULL,
  `p_year` int NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`p_id`),
  FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
CREATE TABLE IF NOT EXISTS `post_like` (
  `id` int NOT NULL auto_increment,
  `l_time` time NOT NULL,
  `l_date` int NOT NULL,
  `l_month` int NOT NULL,
  `l_year` year NOT NULL,
  `liketype_id` int NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(p_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sex` tinyint NOT NULL,
  `b_year` YEAR NOT NULL,
  `b_month` int NOT NULL,
  `b_date` int NOT NULL,
  `profile_picture` int NULL,
  `location` varchar(255) NULL,
  `affiliation` varchar(255) NULL,
  `bio` text NOT NULL,
  `interest` varchar(255) NULL,
  PRIMARY KEY (`u_id`)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_interests`
--

-- DROP TABLE IF EXISTS `user_interests`;
-- CREATE TABLE IF NOT EXISTS `user_interests` (
--   `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `interest` varchar(100) NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
-- );


-- insert test user
INSERT INTO `user` (`u_id`, `user_name`, `password`, `first_name`, `last_name`, `email`, `sex`, `b_year`, `b_month`, `b_date`, `profile_picture`, `location`, `bio`) VALUES (NULL, 'test1', 'test1', 'test', 'test', '', '', '', '', '', '', '', '');

-- Insert sample data into the `user` table
INSERT INTO `user` (user_name, password, first_name, last_name, email, sex, b_year, b_month, b_date, bio)
VALUES
  ('john_doe', 'password123', 'John', 'Doe', 'john.doe@example.com', 1, 1990, 1, 1, 'I am John Doe.'),
  ('jane_smith', 'password456', 'Jane', 'Smith', 'jane.smith@example.com', 0, 1992, 3, 15, 'I am Jane Smith.');
  -- Add more sample users

-- Insert sample data into the `friends_with` table
INSERT INTO `friends_with` (accepter_id, requester_id, acc_date)
VALUES
  (2, 1, '2023-01-01'); -- Jane Smith is friends with John Doe
  -- Add more sample friendships

-- Insert sample data into the `post` table
INSERT INTO `post` (p_time, p_date, p_month, p_year, content, user_id)
VALUES
  ('12:00:00', 1, 1, 2023, 'Hello world!', 1); -- John Doe's post
  -- Add more sample posts

-- Insert sample data into the `comment` table
INSERT INTO `comment` (c_time, c_date, c_month, c_year, content, user_id, post_id)
VALUES
  ('12:30:00', 1, 1, 2023, 'Nice post!', 2, 1); -- Jane Smith's comment on John Doe's post
  -- Add more sample comments

-- Insert sample data into the `like_type` table
INSERT INTO `like_type` (type_name, type_emoji)
VALUES
  ('Like', '👍');
  -- Add more sample like types

-- Insert sample data into the `post_like` table
INSERT INTO `post_like` (l_time, l_date, l_month, l_year, liketype_id, user_id, post_id)
VALUES
  ('12:30:00', 1, 1, 2023, 1, 2, 1); -- Jane Smith's like on John Doe's post
  -- Add more sample post likes

-- Insert sample data into the `comment_like` table
INSERT INTO `comment_like` (l_time, l_date, l_month, l_year, liketype_id, user_id, comment_id)
VALUES
  ('12:30:00', 1, 1, 2023, 1, 2, 1); -- Jane Smith's like on John Doe's comment
  -- Add more sample comment likes
