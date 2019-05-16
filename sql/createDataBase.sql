CREATE TABLE IF NOT EXISTS `article_list`(
    article_id INT UNSIGNED AUTO_INCREMENT,
    article_title VARCHAR(40) NOT NULL,
    article_create_time VARCHAR(30) NOT NULL,
    article_summary VARCHAR(100) NOT NULL,
    article_content VARCHAR(5000) NOT NULL,
    article_tag VARCHAR(20) NOT NULL,
    PRIMARY KEY (article_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
