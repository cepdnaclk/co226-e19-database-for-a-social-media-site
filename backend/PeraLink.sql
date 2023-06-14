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
  PRIMARY KEY (friend_id),
  FOREIGN KEY (requester_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (accepter_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
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
  `req_date` date NOT NULL,
  `req_status` varchar(25) NOT NULL,
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
-- Table structure for table `user_interests`
DROP TABLE IF EXISTS `user_interests`;

CREATE TABLE IF NOT EXISTS `user_interests` (
  `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `interest` varchar(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(u_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data into the `user` table
INSERT INTO
  `user` (
    user_name,
    password,
    first_name,
    last_name,
    email,
    sex,
    b_year,
    b_month,
    b_date,
    bio
  )
VALUES
  (
    'john_doe',
    'password123',
    'John',
    'Doe',
    'john.doe@example.com',
    1,
    1990,
    1,
    1,
    'I am John Doe.'
  ),
  (
    'jane_smith',
    'password456',
    'Jane',
    'Smith',
    'jane.smith@example.com',
    0,
    1992,
    3,
    15,
    'I am Jane Smith.'
  ),
  (
    'alice',
    'password789',
    'Alice',
    'Johnson',
    'alice@example.com',
    0,
    1995,
    6,
    12,
    'I am Alice Johnson.'
  ),
  (
    'bob',
    'password321',
    'Bob',
    'Smith',
    'bob@example.com',
    1,
    1993,
    9,
    25,
    'I am Bob Smith.'
  ),
  (
    'emma',
    'password654',
    'Emma',
    'Davis',
    'emma@example.com',
    0,
    1998,
    2,
    7,
    'I am Emma Davis.'
  ),
  (
    'michael',
    'password987',
    'Michael',
    'Wilson',
    'michael@example.com',
    1,
    1991,
    12,
    3,
    'I am Michael Wilson.'
  ),
  (
    'sophia',
    'password012',
    'Sophia',
    'Brown',
    'sophia@example.com',
    0,
    1997,
    4,
    18,
    'I am Sophia Brown.'
  ),
  (
    'david',
    'password345',
    'David',
    'Lee',
    'david@example.com',
    1,
    1994,
    7,
    9,
    'I am David Lee.'
  ),
  (
    'olivia',
    'password678',
    'Olivia',
    'Miller',
    'olivia@example.com',
    0,
    1996,
    10,
    27,
    'I am Olivia Miller.'
  ),
  (
    'james',
    'password901',
    'James',
    'Taylor',
    'james@example.com',
    1,
    1992,
    8,
    14,
    'I am James Taylor.'
  ),
  (
    'lily',
    'password234',
    'Lily',
    'Anderson',
    'lily@example.com',
    0,
    1999,
    5,
    6,
    'I am Lily Anderson.'
  ),
  (
    'benjamin',
    'password567',
    'Benjamin',
    'Clark',
    'benjamin@example.com',
    1,
    1990,
    11,
    22,
    'I am Benjamin Clark.'
  );

-- Insert sample data into the `friends_with` table
INSERT INTO
  `friends_with` (accepter_id, requester_id, acc_date)
VALUES
  (3, 1, '2023-02-05'),
  -- Alice Johnson is friends with John Doe
  (4, 2, '2023-03-10'),
  -- Bob Smith is friends with Jane Smith
  (5, 3, '2023-04-15'),
  -- Emma Davis is friends with Alice Johnson
  (6, 4, '2023-05-20'),
  -- Michael Wilson is friends with Bob Smith
  (7, 5, '2023-06-25'),
  -- Sophia Brown is friends with Jane Smith
  (8, 6, '2023-07-30'),
  -- David Lee is friends with Alice Johnson
  (9, 7, '2023-08-04'),
  -- Olivia Miller is friends with Bob Smith
  (10, 8, '2023-09-09'),
  -- James Taylor is friends with Jane Smith
  (1, 9, '2023-10-14'),
  -- John Doe is friends with Lily Anderson
  (2, 10, '2023-11-19');

-- Jane Smith is friends with Benjamin Clark;
-- Insert sample data into the `post` table
INSERT INTO
  `post` (
    p_time,
    p_date,
    p_month,
    p_year,
    content,
    user_id
  )
VALUES
  ('12:00:00', 1, 1, 2023, 'Hello world!', 1),
  -- John Doe's post
  ('09:00:00', 2, 2, 2023, 'Good morning!', 2),
  -- Jane Smith's post
  ('14:30:00', 3, 3, 2023, 'Hello everyone!', 1),
  -- John Doe's post
  ('18:45:00', 4, 4, 2023, 'I had a great day!', 3),
  -- Alice Johnson's post
  ('20:15:00', 5, 5, 2023, 'Feeling excited!', 4),
  -- Bob Smith's post
  ('11:20:00', 6, 6, 2023, 'Just chilling...', 2),
  -- Jane Smith's post
  (
    '16:10:00',
    7,
    7,
    2023,
    'Enjoying the weekend!',
    1
  ),
  -- John Doe's post
  (
    '19:30:00',
    8,
    8,
    2023,
    'Having fun with friends!',
    5
  ),
  -- Sophia Brown's post
  (
    '21:45:00',
    9,
    9,
    2023,
    'Looking forward to the future!',
    6
  ),
  -- David Lee's post
  ('10:05:00', 10, 10, 2023, 'New beginnings!', 7),
  -- Olivia Miller's post
  ('15:50:00', 11, 11, 2023, 'Feeling blessed!', 8);

-- James Taylor's post;
INSERT INTO
  `like_type` (type_name, type_emoji)
VALUES
  ('Like', '👍'),
  ('Love', '❤️'),
  ('Haha', '😄'),
  ('Wow', '😲'),
  ('Sad', '😢'),
  ('Angry', '😡');

-- Insert sample data into the `comment` table
INSERT INTO
  `comment` (
    c_time,
    c_date,
    c_month,
    c_year,
    content,
    user_id,
    post_id
  )
VALUES
  ('12:30:00', 1, 1, 2023, 'Nice post!', 2, 1),
  -- Jane Smith's comment on John Doe's post
  (
    '09:30:00',
    2,
    2,
    2023,
    'Good morning, Jane!',
    1,
    1
  ),
  -- John Doe's comment on Jane Smith's post
  (
    '10:00:00',
    2,
    2,
    2023,
    'Have a great day!',
    3,
    1
  ),
  -- Alice Johnson's comment on Jane Smith's post
  ('15:00:00', 3, 3, 2023, 'Hello John!', 2, 2),
  -- Jane Smith's comment on John Doe's post
  (
    '16:30:00',
    4,
    4,
    2023,
    'Nice post, Alice!',
    4,
    3
  ),
  -- Bob Smith's comment on Alice Johnson's post
  (
    '11:45:00',
    5,
    5,
    2023,
    'Feeling excited too!',
    5,
    4
  ),
  -- Sophia Brown's comment on Bob Smith's post
  ('12:00:00', 5, 5, 2023, 'Same here!', 6, 4),
  -- David Lee's comment on Bob Smith's post
  ('17:15:00', 6, 6, 2023, 'Just relaxing...', 3, 5),
  -- Alice Johnson's comment on Jane Smith's post
  (
    '18:00:00',
    6,
    6,
    2023,
    'Enjoy your weekend!',
    7,
    5
  ),
  -- Olivia Miller's comment on Jane Smith's post
  (
    '20:20:00',
    7,
    7,
    2023,
    'Looking forward to it!',
    8,
    6
  ),
  -- James Taylor's comment on Alice Johnson's post
  ('13:10:00', 8, 8, 2023, 'Sounds fun!', 9, 7);

-- Lily Anderson's comment on Sophia Brown's post;
-- Insert sample data into the `post_like` table
INSERT INTO
  `post_like` (
    l_time,
    l_date,
    l_month,
    l_year,
    liketype_id,
    user_id,
    post_id
  )
VALUES
  ('12:30:00', 1, 1, 2023, 1, 2, 1),
  -- Jane Smith's like on John Doe's post
  ('12:30:00', 1, 1, 2023, 1, 2, 1),
  -- Jane Smith's like on John Doe's post
  ('09:40:00', 2, 2, 2023, 1, 1, 1),
  -- John Doe likes Jane Smith's post
  ('10:15:00', 2, 2, 2023, 2, 3, 1),
  -- Alice Johnson loves Jane Smith's post
  ('15:30:00', 3, 3, 2023, 1, 2, 2),
  -- Jane Smith likes John Doe's post
  ('16:45:00', 4, 4, 2023, 3, 4, 3),
  -- Bob Smith laughs at Alice Johnson's post
  ('11:50:00', 5, 5, 2023, 1, 5, 4),
  -- Sophia Brown likes Bob Smith's post
  ('12:15:00', 5, 5, 2023, 2, 6, 4),
  -- David Lee loves Bob Smith's post
  ('17:30:00', 6, 6, 2023, 1, 3, 5),
  -- Alice Johnson likes Jane Smith's post
  ('18:20:00', 6, 6, 2023, 2, 7, 5),
  -- Olivia Miller loves Jane Smith's post
  ('20:30:00', 7, 7, 2023, 1, 8, 6),
  -- James Taylor likes Alice Johnson's post
  ('13:20:00', 8, 8, 2023, 2, 9, 7);

-- Insert sample data into the `comment_like` table
INSERT INTO
  `comment_like` (
    l_time,
    l_date,
    l_month,
    l_year,
    liketype_id,
    user_id,
    comment_id
  )
VALUES
  ('12:30:00', 1, 1, 2023, 1, 2, 1),
  -- Jane Smith's like on John Doe's comment
  ('12:30:00', 1, 1, 2023, 1, 2, 1),
  -- Jane Smith's like on John Doe's comment
  ('09:50:00', 2, 2, 2023, 1, 1, 1),
  -- John Doe likes a comment on Jane Smith's post
  ('10:30:00', 2, 2, 2023, 2, 3, 1),
  -- Alice Johnson loves a comment on Jane Smith's post
  ('15:45:00', 3, 3, 2023, 1, 2, 2),
  -- Jane Smith likes a comment on John Doe's post
  ('17:00:00', 4, 4, 2023, 3, 4, 3),
  -- Bob Smith laughs at a comment on Alice Johnson's post
  ('11:55:00', 5, 5, 2023, 1, 5, 4),
  -- Sophia Brown likes a comment on Bob Smith's post
  ('12:30:00', 5, 5, 2023, 2, 6, 4),
  -- David Lee loves a comment on Bob Smith's post
  ('17:45:00', 6, 6, 2023, 1, 3, 5),
  -- Alice Johnson likes a comment on Jane Smith's post
  ('18:30:00', 6, 6, 2023, 2, 7, 5),
  -- Olivia Miller loves a comment on Jane Smith's post
  ('20:40:00', 7, 7, 2023, 1, 8, 6),
  -- James Taylor likes a comment on Alice Johnson's post
  ('13:30:00', 8, 8, 2023, 2, 9, 7);

INSERT INTO
  friend_request (
    requestee_id,
    requester_id,
    req_time,
    req_date,
    req_status
  )
VALUES
  (
    1,
    2,
    '10:15:00',
    '2023-06-01',
    'pending'
  ),
  (
    3,
    1,
    '14:30:00',
    '2023-05-28',
    'accepted'
  ),
  (
    4,
    1,
    '09:45:00',
    '2023-06-02',
    'pending'
  ),
  (
    2,
    3,
    '16:20:00',
    '2023-05-30',
    'rejected'
  ),
  (
    5,
    2,
    '11:55:00',
    '2023-05-29',
    'accepted'
  ),
  (
    3,
    4,
    '13:10:00',
    '2023-06-01',
    'rejected'
  ),
  (
    2,
    4,
    '17:30:00',
    '2023-06-02',
    'pending'
  ),
  (
    5,
    1,
    '10:00:00',
    '2023-05-31',
    'accepted'
  ),
  (
    4,
    '15:45:00',
    '2023-05-29',
    'rejected'
  ),
  (
    1,
    3,
    '12:05:00',
    '2023-06-01',
    'accepted'
  );

INSERT INTO
  user_interests (user_id, interest)
VALUES
  (1, 'Music'),
  (1, 'Sports'),
  (1, 'Reading'),
  (2, 'Travel'),
  (2, 'Photography'),
  (3, 'Cooking'),
  (4, 'Technology'),
  (5, 'Art'),
  (6, 'Dancing'),
  (7, 'Fitness'),
  (8, 'Gaming'),
  (9, 'Movies'),
  (10, 'Fashion'),
  (11, 'Writing'),
  (12, 'Hiking');