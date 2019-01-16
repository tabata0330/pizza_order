DROP TABLE IF EXISTS pizza;
DROP TABLE IF EXISTS size;

CREATE TABLE pizza(
    id serial,
    name varchar unique
);

INSERT INTO pizza (name) VALUES ('マルゲリータ');
INSERT INTO pizza (name) VALUES ('マリナーラ');
INSERT INTO pizza (name) VALUES ('カプリチョーザ');
INSERT INTO pizza (name) VALUES ('シーフード');


CREATE TABLE size(
    id serial,
    size varchar unique
);

INSERT INTO size (size) VALUES ('L');
INSERT INTO size (size) VALUES ('M');
INSERT INTO size (size) VALUES ('S');
INSERT INTO size (size) VALUES ('SS');