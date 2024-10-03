CREATE TABLE beatmap_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE stage_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE status (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE role (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE TABLE country (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    iso2 VARCHAR(2) NOT NULL
);

CREATE TABLE team (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    logo VARCHAR(256) NOT NULL,
    availability VARCHAR(512) NOT NULL
);

CREATE TABLE tournament (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    code VARCHAR(16) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    banner VARCHAR(512) NOT NULL,
    key_count INTEGER NOT NULL,
    min_team_size INTEGER NOT NULL,
    max_team_size INTEGER NOT NULL,
    min_player_rank INTEGER NOT NULL,
    max_player_rank INTEGER NOT NULL,
    concluded BOOLEAN NOT NULL,
    published BOOLEAN NOT NULL,
    players_published BOOLEAN NOT NULL,
    protects BOOLEAN NOT NULL,
    warmups BOOLEAN NOT NULL,
    regs_open BOOLEAN NOT NULL,
    applications_open BOOLEAN NOT NULL,
    reg_deadline TIMESTAMP,
    application_deadline TIMESTAMP,
    information TEXT NOT NULL,
    reg_message VARCHAR(256) NOT NULL
);