CREATE TABLE link (
      tournament_id BIGINT NOT NULL,
      name VARCHAR(32),
      url VARCHAR(512),
      foreign key (tournament_id) REFERENCES tournament(id) ON DELETE CASCADE
);

CREATE TABLE app_user (
      id BIGSERIAL PRIMARY KEY,
      country_id BIGINT NOT NULL,
      player_id INTEGER NOT NULL,
      name VARCHAR(128) NOT NULL,
      rank INTEGER NOT NULL,
      discord_username VARCHAR(128) NOT NULL,
      timezone INTEGER NOT NULL,
      avatar VARCHAR(256) NOT NULL,
      FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE stage (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL,
    stage_type_id BIGINT NOT NULL,
    name VARCHAR(64),
    best_of INTEGER NOT NULL,
    lobby_size INTEGER NOT NULL,
    num_advancing INTEGER NOT NULL,
    scheduling_deadline TIMESTAMP NOT NULL,
    mappool_published BOOLEAN NOT NULL,
    schedule_published BOOLEAN NOT NULL,
    stats_published BOOLEAN NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournament(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_type_id) REFERENCES stage_type(id)
);

CREATE TABLE beatmap (
    id BIGSERIAL PRIMARY KEY,
    stage_id BIGINT NOT NULL,
    beatmap_type_id BIGINT NOT NULL,
    in_mappool BOOLEAN NOT NULL,
    beatmap_id INTEGER,
    title VARCHAR(256) NOT NULL,
    diff VARCHAR(128) NOT NULL,
    artist VARCHAR(128) NOT NULL,
    mapper VARCHAR(128) NOT NULL,
    suggestor VARCHAR(128) NOT NULL,
    cover VARCHAR(512) NOT NULL,
    download VARCHAR(512) NOT NULL,
    song_preview VARCHAR(512),
    sr FLOAT NOT NULL,
    bpm FLOAT NOT NULL,
    hp FLOAT NOT NULL,
    od FLOAT NOT NULL,
    drain_time INTEGER NOT NULL,
    index INTEGER NOT NULL,
    comment VARCHAR(1024),
    FOREIGN KEY (stage_id) REFERENCES stage(id) ON DELETE CASCADE,
    FOREIGN KEY (beatmap_type_id) REFERENCES beatmap_type(id)
);

CREATE TABLE event (
    id BIGSERIAL PRIMARY KEY,
    stage_id BIGINT NOT NULL,
    match_id INTEGER,
    code VARCHAR(16) NOT NULL,
    time TIMESTAMP NOT NULL,
    concluded BOOLEAN NOT NULL,
    FOREIGN KEY (stage_id) REFERENCES stage(id) ON DELETE CASCADE
);

CREATE TABLE event_participant (
    id BIGSERIAL PRIMARY KEY,
    app_user_id BIGINT,
    team_id BIGINT,
    event_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (team_id) REFERENCES team(id),
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE score (
    id BIGSERIAL PRIMARY KEY,
    beatmap_id BIGINT NOT NULL,
    event_id BIGINT,
    app_user_id BIGINT NOT NULL,
    run INTEGER NOT NULL,
    score INTEGER NOT NULL,
    accuracy FLOAT NOT NULL,
    FOREIGN KEY (beatmap_id) REFERENCES beatmap(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE tournament_player (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL,
    app_user_id BIGINT NOT NULL,
    team_id BIGINT,
    status_id BIGINT NOT NULL,
    seed INTEGER NOT NULL,
    placement INTEGER NOT NULL,
    team_captain BOOLEAN NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournament(id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (team_id) REFERENCES team(id),
    FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE tournament_role (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL,
    app_user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    can_reg_with_role BOOLEAN NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournament(id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE staff_request (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT,
    status_id BIGINT NOT NULL,
    description VARCHAR(4096),
    FOREIGN KEY (tournament_id) REFERENCES tournament(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (sender_id) REFERENCES app_user(id),
    FOREIGN KEY (recipient_id) REFERENCES app_user(id),
    FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE restriction (
    country_id BIGINT NOT NULL,
    tournament_id BIGINT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE CASCADE,
    FOREIGN KEY (tournament_id) REFERENCES tournament(id) ON DELETE CASCADE
);