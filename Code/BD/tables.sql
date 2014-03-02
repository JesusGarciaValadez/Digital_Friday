SET NAMES 'utf8';

SET CHARACTER SET 'utf8';

CREATE DATABASE IF NOT EXISTS `cmv`;

CREATE TABLE IF NOT EXISTS `digital_friday_registers` 
( id SMALLINT UNSIGNED AUTO_INCREMENT, 
  id_user_mail VARCHAR( 140 ) NOT NULL,
  id_session VARCHAR( 2 ) NOT NULL, 
  date_session VARCHAR( 140 ) NOT NULL, 
  CONSTRAINT pk_session PRIMARY KEY ( id ) 
) ENGINE = InnoDB DEFAULT CHARSET = 'utf8';

CREATE TABLE IF NOT EXISTS `digital_friday_mails` 
( id_user SMALLINT UNSIGNED AUTO_INCREMENT, 
  user_mail VARCHAR( 140 ) NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY ( id_user ) 
) ENGINE = InnoDB DEFAULT CHARSET = 'utf8';

CREATE TABLE IF NOT EXISTS `digital_friday_sessions` 
( id_session SMALLINT UNSIGNED AUTO_INCREMENT, 
  course_session VARCHAR( 140 ) NOT NULL,
  CONSTRAINT pk_session PRIMARY KEY ( id_session ) 
) ENGINE = InnoDB DEFAULT CHARSET = 'utf8';

INSERT INTO `cmv`.`digital_friday_mails` 
( `user_mail` ) 
VALUES 
( 'ecd8d9089fe4d1f4e59f1c9fb3d4c525d572baac' ), 
( 'b072ee065c23a791f9078b8cfa65c258dac9d35c' ), 
( '5a5b57d26f0133484af15f8edaf537e699bcd666' ), 
( 'e7e4b75075e0a6ba623ed7510aa33597205c89d2' ), 
( '91bbd0295c00377a16166b3d9e306531b88e5f60' ), 
( 'b49f183b2d51303ae935831aac1dfaa0ddc3d018' ), 
( '85178c42376c219e28c0805fd1a192ffaeb9818e' ), 
( '944b878ee2a0c2263b2bdfa27c99aab5b90b4b9b' ), 
( 'db389eb7312062958d4ec5bfa4969804e7717714' ), 
( 'c27e40b752cc237f76765f8985fa4cf8db0d103f' ), 
( 'a272203a9aa6886fc57c734719ec784dac558413' ), 
( '64d18510d8db090875533f5a05b02adc2e728df8' ), 
( 'd286314f9bb05f072e8a8f7077c40650a9f5ed43' ), 
( '208c49b55f961c97b95556761f19c6b0ee50c672' ), 
( 'd9dfd4bb824546bda4d516d7c82726704d215dba' );

INSERT INTO `cmv`.`digital_friday_sessions` 
( `course_session` ) 
VALUES 
( '1' ), 
( '2' ), 
( '3' ), 
( '4' ), 
( '5' ), 
( '6' ), 
( '7' ), 
( '8' ), 
( '9' ), 
( '10' ), 
( '11' ), 
( '12' ), 
( '13' ), 
( '14' ), 
( '15' );