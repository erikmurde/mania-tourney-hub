-- STATUSES -----------------------------------------------------------------------------------------------------------

INSERT INTO status (name) VALUES ('pending');
INSERT INTO status (name) VALUES ('accepted');
INSERT INTO status (name) VALUES ('rejected');
INSERT INTO status (name) VALUES ('retracted');
INSERT INTO status (name) VALUES ('registered');
INSERT INTO status (name) VALUES ('active');
INSERT INTO status (name) VALUES ('eliminated');
INSERT INTO status (name) VALUES ('disqualified');

-- STAGE TYPES --------------------------------------------------------------------------------------------------------

INSERT INTO stage_type (name) VALUES ('standard');
INSERT INTO stage_type (name) VALUES ('qualifier');

-- MAP TYPES ----------------------------------------------------------------------------------------------------------

INSERT INTO map_type (name) VALUES ('RC');
INSERT INTO map_type (name) VALUES ('LN');
INSERT INTO map_type (name) VALUES ('HB');
INSERT INTO map_type (name) VALUES ('SV');
INSERT INTO map_type (name) VALUES ('TB');

-- ROLES --------------------------------------------------------------------------------------------------------------

INSERT INTO role (name) VALUES ('player');
INSERT INTO role (name) VALUES ('host');
INSERT INTO role (name) VALUES ('admin');
INSERT INTO role (name) VALUES ('mappooler');
INSERT INTO role (name) VALUES ('mapper');
INSERT INTO role (name) VALUES ('playtester');
INSERT INTO role (name) VALUES ('referee');
INSERT INTO role (name) VALUES ('streamer');
INSERT INTO role (name) VALUES ('commentator');
INSERT INTO role (name) VALUES ('sheeter');
INSERT INTO role (name) VALUES ('gfx');

-- COUNTRIES ----------------------------------------------------------------------------------------------------------

INSERT INTO country (name, iso2) VALUES ('Andorra', 'AD');
INSERT INTO country (name, iso2) VALUES ('United Arab Emirates', 'AE');
INSERT INTO country (name, iso2) VALUES ('Afghanistan', 'AF');
INSERT INTO country (name, iso2) VALUES ('Antigua and Barbuda', 'AG');
INSERT INTO country (name, iso2) VALUES ('Anguilla', 'AI');
INSERT INTO country (name, iso2) VALUES ('Albania', 'AL');
INSERT INTO country (name, iso2) VALUES ('Armenia', 'AM');
INSERT INTO country (name, iso2) VALUES ('Angola', 'AO');
INSERT INTO country (name, iso2) VALUES ('Argentina', 'AR');
INSERT INTO country (name, iso2) VALUES ('American Samoa', 'AS');
INSERT INTO country (name, iso2) VALUES ('Austria', 'AT');
INSERT INTO country (name, iso2) VALUES ('Australia', 'AU');
INSERT INTO country (name, iso2) VALUES ('Aruba', 'AW');
INSERT INTO country (name, iso2) VALUES ('Allard Islands', 'AX');
INSERT INTO country (name, iso2) VALUES ('Azerbaijan', 'AZ');
INSERT INTO country (name, iso2) VALUES ('Bosnia and Herzegovina', 'BA');
INSERT INTO country (name, iso2) VALUES ('Barbados', 'BB');
INSERT INTO country (name, iso2) VALUES ('Bangladesh', 'BD');
INSERT INTO country (name, iso2) VALUES ('Belgium', 'BE');
INSERT INTO country (name, iso2) VALUES ('Burkina Faso', 'BF');
INSERT INTO country (name, iso2) VALUES ('Bulgaria', 'BG');
INSERT INTO country (name, iso2) VALUES ('Bahrain', 'BH');
INSERT INTO country (name, iso2) VALUES ('Burundi', 'BI');
INSERT INTO country (name, iso2) VALUES ('Benin', 'BJ');
INSERT INTO country (name, iso2) VALUES ('Saint Barthelemy', 'BL');
INSERT INTO country (name, iso2) VALUES ('Bermuda', 'BM');
INSERT INTO country (name, iso2) VALUES ('Brunei Darussalam', 'BN');
INSERT INTO country (name, iso2) VALUES ('Bolivia', 'BO');
INSERT INTO country (name, iso2) VALUES ('Brazil', 'BR');
INSERT INTO country (name, iso2) VALUES ('Bahamas', 'BS');
INSERT INTO country (name, iso2) VALUES ('Bhutan', 'BT');
INSERT INTO country (name, iso2) VALUES ('Botswana', 'BW');
INSERT INTO country (name, iso2) VALUES ('Belarus', 'BY');
INSERT INTO country (name, iso2) VALUES ('Belize', 'BZ');
INSERT INTO country (name, iso2) VALUES ('Canada', 'CA');
INSERT INTO country (name, iso2) VALUES ('Democratic Republic of the Congo', 'CD');
INSERT INTO country (name, iso2) VALUES ('Central African Republic', 'CF');
INSERT INTO country (name, iso2) VALUES ('Republic of the Congo', 'CG');
INSERT INTO country (name, iso2) VALUES ('Switzerland', 'CH');
INSERT INTO country (name, iso2) VALUES ('Cote d''Ivoire', 'CI');
INSERT INTO country (name, iso2) VALUES ('Chile', 'CL');
INSERT INTO country (name, iso2) VALUES ('Cameroon', 'CM');
INSERT INTO country (name, iso2) VALUES ('China', 'CN');
INSERT INTO country (name, iso2) VALUES ('Colombia', 'CO');
INSERT INTO country (name, iso2) VALUES ('Costa Rica', 'CR');
INSERT INTO country (name, iso2) VALUES ('Cuba', 'CU');
INSERT INTO country (name, iso2) VALUES ('Cape Verde', 'CV');
INSERT INTO country (name, iso2) VALUES ('Christmas Island', 'CX');
INSERT INTO country (name, iso2) VALUES ('Cyprus', 'CY');
INSERT INTO country (name, iso2) VALUES ('Czech Republic', 'CZ');
INSERT INTO country (name, iso2) VALUES ('Germany', 'DE');
INSERT INTO country (name, iso2) VALUES ('Djibouti', 'DJ');
INSERT INTO country (name, iso2) VALUES ('Denmark', 'DK');
INSERT INTO country (name, iso2) VALUES ('Dominica', 'DM');
INSERT INTO country (name, iso2) VALUES ('Dominican Republic', 'DO');
INSERT INTO country (name, iso2) VALUES ('Algeria', 'DZ');
INSERT INTO country (name, iso2) VALUES ('Ecuador', 'EC');
INSERT INTO country (name, iso2) VALUES ('Estonia', 'EE');
INSERT INTO country (name, iso2) VALUES ('Egypt', 'EG');
INSERT INTO country (name, iso2) VALUES ('Eritrea', 'ER');
INSERT INTO country (name, iso2) VALUES ('Spain', 'ES');
INSERT INTO country (name, iso2) VALUES ('Ethiopia', 'ET');
INSERT INTO country (name, iso2) VALUES ('Finland', 'FI');
INSERT INTO country (name, iso2) VALUES ('Fiji', 'FJ');
INSERT INTO country (name, iso2) VALUES ('Falkland Islands (Malvinas)', 'FK');
INSERT INTO country (name, iso2) VALUES ('Micronesia', 'FM');
INSERT INTO country (name, iso2) VALUES ('Faroe Islands', 'FO');
INSERT INTO country (name, iso2) VALUES ('France', 'FR');
INSERT INTO country (name, iso2) VALUES ('Gabon', 'GA');
INSERT INTO country (name, iso2) VALUES ('United Kingdom', 'GB');
INSERT INTO country (name, iso2) VALUES ('Grenada', 'GD');
INSERT INTO country (name, iso2) VALUES ('Georgia', 'GE');
INSERT INTO country (name, iso2) VALUES ('French Guiana', 'GF');
INSERT INTO country (name, iso2) VALUES ('Guernsey', 'GG');
INSERT INTO country (name, iso2) VALUES ('Ghana', 'GH');
INSERT INTO country (name, iso2) VALUES ('Gibraltar', 'GI');
INSERT INTO country (name, iso2) VALUES ('Greenland', 'GL');
INSERT INTO country (name, iso2) VALUES ('Gambia', 'GM');
INSERT INTO country (name, iso2) VALUES ('Guinea', 'GN');
INSERT INTO country (name, iso2) VALUES ('Guadeloupe', 'GP');
INSERT INTO country (name, iso2) VALUES ('Equatorial Guinea', 'GQ');
INSERT INTO country (name, iso2) VALUES ('Greece', 'GR');
INSERT INTO country (name, iso2) VALUES ('Guatemala', 'GT');
INSERT INTO country (name, iso2) VALUES ('Guam', 'GU');
INSERT INTO country (name, iso2) VALUES ('Guinea-Bissau', 'GW');
INSERT INTO country (name, iso2) VALUES ('Guyana', 'GY');
INSERT INTO country (name, iso2) VALUES ('Hong Kong', 'HK');
INSERT INTO country (name, iso2) VALUES ('Heard Island and McDonald Islands', 'HM');
INSERT INTO country (name, iso2) VALUES ('Honduras', 'HN');
INSERT INTO country (name, iso2) VALUES ('Croatia', 'HR');
INSERT INTO country (name, iso2) VALUES ('Haiti', 'HT');
INSERT INTO country (name, iso2) VALUES ('Hungary', 'HU');
INSERT INTO country (name, iso2) VALUES ('Indonesia', 'ID');
INSERT INTO country (name, iso2) VALUES ('Ireland', 'IE');
INSERT INTO country (name, iso2) VALUES ('Israel', 'IL');
INSERT INTO country (name, iso2) VALUES ('Isle of Man', 'IM');
INSERT INTO country (name, iso2) VALUES ('India', 'IN');
INSERT INTO country (name, iso2) VALUES ('Iraq', 'IQ');
INSERT INTO country (name, iso2) VALUES ('Iran', 'IR');
INSERT INTO country (name, iso2) VALUES ('Iceland', 'IS');
INSERT INTO country (name, iso2) VALUES ('Italy', 'IT');
INSERT INTO country (name, iso2) VALUES ('Jersey', 'JE');
INSERT INTO country (name, iso2) VALUES ('Jamaica', 'JM');
INSERT INTO country (name, iso2) VALUES ('Jordan', 'JO');
INSERT INTO country (name, iso2) VALUES ('Japan', 'JP');
INSERT INTO country (name, iso2) VALUES ('Kenya', 'KE');
INSERT INTO country (name, iso2) VALUES ('Kyrgyzstan', 'KG');
INSERT INTO country (name, iso2) VALUES ('Cambodia', 'KH');
INSERT INTO country (name, iso2) VALUES ('Kiribati', 'KI');
INSERT INTO country (name, iso2) VALUES ('Comoros', 'KM');
INSERT INTO country (name, iso2) VALUES ('Saint Kitts and Nevis', 'KN');
INSERT INTO country (name, iso2) VALUES ('South Korea', 'KR');
INSERT INTO country (name, iso2) VALUES ('Kuwait', 'KW');
INSERT INTO country (name, iso2) VALUES ('Cayman Islands', 'KY');
INSERT INTO country (name, iso2) VALUES ('Kazakhstan', 'KZ');
INSERT INTO country (name, iso2) VALUES ('Lao', 'LA');
INSERT INTO country (name, iso2) VALUES ('Lebanon', 'LB');
INSERT INTO country (name, iso2) VALUES ('Saint Lucia', 'LC');
INSERT INTO country (name, iso2) VALUES ('Liechtenstein', 'LI');
INSERT INTO country (name, iso2) VALUES ('Sri Lanka', 'LK');
INSERT INTO country (name, iso2) VALUES ('Liberia', 'LR');
INSERT INTO country (name, iso2) VALUES ('Lesotho', 'LS');
INSERT INTO country (name, iso2) VALUES ('Lithuania', 'LT');
INSERT INTO country (name, iso2) VALUES ('Luxembourg', 'LU');
INSERT INTO country (name, iso2) VALUES ('Latvia', 'LV');
INSERT INTO country (name, iso2) VALUES ('Libya', 'LY');
INSERT INTO country (name, iso2) VALUES ('Morocco', 'MA');
INSERT INTO country (name, iso2) VALUES ('Monaco', 'MC');
INSERT INTO country (name, iso2) VALUES ('Moldova', 'MD');
INSERT INTO country (name, iso2) VALUES ('Montenegro', 'ME');
INSERT INTO country (name, iso2) VALUES ('Saint Martin (French part)', 'MF');
INSERT INTO country (name, iso2) VALUES ('Madagascar', 'MG');
INSERT INTO country (name, iso2) VALUES ('Marshall Islands', 'MH');
INSERT INTO country (name, iso2) VALUES ('Macedonia', 'MK');
INSERT INTO country (name, iso2) VALUES ('Mali', 'ML');
INSERT INTO country (name, iso2) VALUES ('Myanmar', 'MM');
INSERT INTO country (name, iso2) VALUES ('Mongolia', 'MN');
INSERT INTO country (name, iso2) VALUES ('Macao', 'MO');
INSERT INTO country (name, iso2) VALUES ('Northern Mariana Islands', 'MP');
INSERT INTO country (name, iso2) VALUES ('Martinique', 'MQ');
INSERT INTO country (name, iso2) VALUES ('Mauritania', 'MR');
INSERT INTO country (name, iso2) VALUES ('Montserrat', 'MS');
INSERT INTO country (name, iso2) VALUES ('Malta', 'MT');
INSERT INTO country (name, iso2) VALUES ('Mauritius', 'MU');
INSERT INTO country (name, iso2) VALUES ('Maldives', 'MV');
INSERT INTO country (name, iso2) VALUES ('Malawi', 'MW');
INSERT INTO country (name, iso2) VALUES ('Mexico', 'MX');
INSERT INTO country (name, iso2) VALUES ('Malaysia', 'MY');
INSERT INTO country (name, iso2) VALUES ('Mozambique', 'MZ');
INSERT INTO country (name, iso2) VALUES ('Namibia', 'NA');
INSERT INTO country (name, iso2) VALUES ('New Caledonia', 'NC');
INSERT INTO country (name, iso2) VALUES ('Niger', 'NE');
INSERT INTO country (name, iso2) VALUES ('Norfolk Island', 'NF');
INSERT INTO country (name, iso2) VALUES ('Nigeria', 'NG');
INSERT INTO country (name, iso2) VALUES ('Nicaragua', 'NI');
INSERT INTO country (name, iso2) VALUES ('Netherlands', 'NL');
INSERT INTO country (name, iso2) VALUES ('Norway', 'NO');
INSERT INTO country (name, iso2) VALUES ('Nepal', 'NP');
INSERT INTO country (name, iso2) VALUES ('Nauru', 'NR');
INSERT INTO country (name, iso2) VALUES ('Niue', 'NU');
INSERT INTO country (name, iso2) VALUES ('New Zealand', 'NZ');
INSERT INTO country (name, iso2) VALUES ('Oman', 'OM');
INSERT INTO country (name, iso2) VALUES ('Panama', 'PA');
INSERT INTO country (name, iso2) VALUES ('Peru', 'PE');
INSERT INTO country (name, iso2) VALUES ('French Polynesia', 'PF');
INSERT INTO country (name, iso2) VALUES ('Papua New Guinea', 'PG');
INSERT INTO country (name, iso2) VALUES ('Philippines', 'PH');
INSERT INTO country (name, iso2) VALUES ('Pakistan', 'PK');
INSERT INTO country (name, iso2) VALUES ('Poland', 'PL');
INSERT INTO country (name, iso2) VALUES ('Saint Pierre and Miquelon', 'PM');
INSERT INTO country (name, iso2) VALUES ('Pitcairn', 'PN');
INSERT INTO country (name, iso2) VALUES ('Puerto Rico', 'PR');
INSERT INTO country (name, iso2) VALUES ('Palestine', 'PS');
INSERT INTO country (name, iso2) VALUES ('Portugal', 'PT');
INSERT INTO country (name, iso2) VALUES ('Palau', 'PW');
INSERT INTO country (name, iso2) VALUES ('Paraguay', 'PY');
INSERT INTO country (name, iso2) VALUES ('Qatar', 'QA');
INSERT INTO country (name, iso2) VALUES ('Reunion', 'RE');
INSERT INTO country (name, iso2) VALUES ('Romania', 'RO');
INSERT INTO country (name, iso2) VALUES ('Serbia', 'RS');
INSERT INTO country (name, iso2) VALUES ('Russian Federation', 'RU');
INSERT INTO country (name, iso2) VALUES ('Rwanda', 'RW');
INSERT INTO country (name, iso2) VALUES ('Saudi Arabia', 'SA');
INSERT INTO country (name, iso2) VALUES ('Solomon Islands', 'SB');
INSERT INTO country (name, iso2) VALUES ('Seychelles', 'SC');
INSERT INTO country (name, iso2) VALUES ('Sudan', 'SD');
INSERT INTO country (name, iso2) VALUES ('Sweden', 'SE');
INSERT INTO country (name, iso2) VALUES ('Singapore', 'SG');
INSERT INTO country (name, iso2) VALUES ('Saint Helena', 'SH');
INSERT INTO country (name, iso2) VALUES ('Slovenia', 'SI');
INSERT INTO country (name, iso2) VALUES ('Svalbard and Jan Mayen', 'SJ');
INSERT INTO country (name, iso2) VALUES ('Slovakia', 'SK');
INSERT INTO country (name, iso2) VALUES ('Sierra Leone', 'SL');
INSERT INTO country (name, iso2) VALUES ('San Marino', 'SM');
INSERT INTO country (name, iso2) VALUES ('Senegal', 'SN');
INSERT INTO country (name, iso2) VALUES ('Somalia', 'SO');
INSERT INTO country (name, iso2) VALUES ('Suriname', 'SR');
INSERT INTO country (name, iso2) VALUES ('South Sudan', 'SS');
INSERT INTO country (name, iso2) VALUES ('Sao Tome and Principe', 'ST');
INSERT INTO country (name, iso2) VALUES ('El Salvador', 'SV');
INSERT INTO country (name, iso2) VALUES ('Syrian Arab Republic', 'SY');
INSERT INTO country (name, iso2) VALUES ('Swaziland', 'SZ');
INSERT INTO country (name, iso2) VALUES ('Turks and Caicos Islands', 'TC');
INSERT INTO country (name, iso2) VALUES ('Chad', 'TD');
INSERT INTO country (name, iso2) VALUES ('Togo', 'TG');
INSERT INTO country (name, iso2) VALUES ('Thailand', 'TH');
INSERT INTO country (name, iso2) VALUES ('Tajikistan', 'TJ');
INSERT INTO country (name, iso2) VALUES ('Timor-Leste', 'TL');
INSERT INTO country (name, iso2) VALUES ('Turkmenistan', 'TM');
INSERT INTO country (name, iso2) VALUES ('Tunisia', 'TN');
INSERT INTO country (name, iso2) VALUES ('Tonga', 'TO');
INSERT INTO country (name, iso2) VALUES ('Turkey', 'TR');
INSERT INTO country (name, iso2) VALUES ('Trinidad and Tobago', 'TT');
INSERT INTO country (name, iso2) VALUES ('Tuvalu', 'TV');
INSERT INTO country (name, iso2) VALUES ('Taiwan', 'TW');
INSERT INTO country (name, iso2) VALUES ('United Republic of Tanzania', 'TZ');
INSERT INTO country (name, iso2) VALUES ('Ukraine', 'UA');
INSERT INTO country (name, iso2) VALUES ('Uganda', 'UG');
INSERT INTO country (name, iso2) VALUES ('United States', 'US');
INSERT INTO country (name, iso2) VALUES ('Uruguay', 'UY');
INSERT INTO country (name, iso2) VALUES ('Uzbekistan', 'UZ');
INSERT INTO country (name, iso2) VALUES ('Holy See (Vatican City State)', 'VA');
INSERT INTO country (name, iso2) VALUES ('Saint Vincent and the Grenadines', 'VC');
INSERT INTO country (name, iso2) VALUES ('Venezuela', 'VE');
INSERT INTO country (name, iso2) VALUES ('British Virgin Islands', 'VG');
INSERT INTO country (name, iso2) VALUES ('US Virgin Islands', 'VI');
INSERT INTO country (name, iso2) VALUES ('Vietnam', 'VN');
INSERT INTO country (name, iso2) VALUES ('Vanuatu', 'VU');
INSERT INTO country (name, iso2) VALUES ('Samoa', 'WS');
INSERT INTO country (name, iso2) VALUES ('Kosovo', 'XK');
INSERT INTO country (name, iso2) VALUES ('Yemen', 'YE');
INSERT INTO country (name, iso2) VALUES ('Mayotte', 'YT');
INSERT INTO country (name, iso2) VALUES ('South Africa', 'ZA');
INSERT INTO country (name, iso2) VALUES ('Zambia', 'ZM');
INSERT INTO country (name, iso2) VALUES ('Zimbabwe', 'ZW');

-- USERS --------------------------------------------------------------------------------------------------------------

INSERT INTO app_user (name, player_id, rank, discord_username, timezone, avatar, country_id)
VALUES ('Arcaxio', 16819909, 109, 'arcaxio_', 2, 'https://a.ppy.sh/16819909', 58);

INSERT INTO app_user (name, player_id, rank, discord_username, timezone, avatar, country_id)
VALUES ('SunApple', 11817622, 1654, 'test_username', 0, 'https://a.ppy.sh/11817622', 219);

INSERT INTO app_user (name, player_id, rank, discord_username, timezone, avatar, country_id)
VALUES ('BKWind', 8900975, 109, 'test_username', 0, 'https://a.ppy.sh/8900975', 43);

INSERT INTO app_user (name, player_id, rank, discord_username, timezone, avatar, country_id)
VALUES ('TheHunter1', 6496016, 0, 'test_username', 0, 'https://a.ppy.sh/6496016', 51);

INSERT INTO app_user (name, player_id, rank, discord_username, timezone, avatar, country_id)
VALUES ('Japeynius', 13993659, 1688, 'test_username', 0, 'https://a.ppy.sh/13993659', 188);

-- TOURNAMENTS

INSERT INTO tournament (
    applications_open, concluded, max_player_rank, max_team_size, min_player_rank, min_team_size, players_public,
    protects, published, regs_open, warmups, application_deadline, reg_deadline, code, name, description, banner,
    information
)
VALUES (
    true, false, 0, 1, 0, 1, true, true, true, true, true,
    '2024-10-23T07:00:00.000Z', '2024-10-16T07:00:00.000Z', '6KAST', '6K Autumn Showdown',
    '6K Autumn Showdown Tournament (6KAST) is an osu!mania Free for all 1v1 Double-Elimination tournament focused ' ||
    'on the 6 key gamemode.This is one of the first ever 6 key focused tournament ever hosted on osu!mania. ' ||
    'So we hope you enjoy your experience on the newest tourney keymode meta!',
    'https://i.ppy.sh/333a6da130763d34fb218cd7d3dc9cd24bb25a35/68747470733a2f2f696d6' ||
    '775722d617263686976652e7070792e73682f646973636f72642f31313134393431383635363136' ||
    '3232303137312d313131363635313138383330323133353330382d415354364b5f42616e6e65725f52656374616e676c652e706e67', ''
);
INSERT INTO tournament (
    applications_open, concluded, max_player_rank, max_team_size, min_player_rank, min_team_size, players_public,
    protects, published, regs_open, warmups, application_deadline, reg_deadline, code, name, description, banner,
    information
)
VALUES (
    true, false, 0, 4, 0, 6, true, false, true, true, false,
    '2024-10-16T07:00:00.000Z', '2024-11-21T08:00:00.000Z', '4KMWC2023', 'osu!mania 4K World Cup 2023',
    'The osu!mania 4K World Cup 2023 (MWC 4K 2023) was a country-based osu!mania tournament hosted by the osu! ' ||
    'team. It was the seventh installment of the osu!mania 4K World Cup.',
    'https://assets.ppy.sh/tournament-banners/official/mwc4k2023.jpg', ''
);

-- STAFF REQUESTS -----------------------------------------------------------------------------------------------------

INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 9, 2, 1, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 5, 3, 1, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 7, 4, 1, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 5, 5, 1, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 5, 1, 1, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 11, 1, 2, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
    null, 10, 1, 3, 1,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' ||
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' ||
    'commodo consequat.'
);

-- STAGES -------------------------------------------------------------------------------------------------------------

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 2, 'Qualifiers', 0, 10, 5, '2024-07-17T07:00:00.000Z', true, true, true);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'Round of 64', 7, 0, 0, '2024-07-17T07:00:00.000Z', true, true, true);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'Round of 32', 7, 0, 0, '2024-07-17T07:00:00.000Z', true, true, true);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'Round of 16', 9, 0, 0, '2024-07-17T07:00:00.000Z', true, true, true);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'QuarterFinals', 11, 0, 0, '2024-07-17T07:00:00.000Z', true, false, false);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'SemiFinals', 11, 0, 0, '2024-07-17T07:00:00.000Z', false, false, false);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'Finals', 13, 0, 0, '2024-07-17T07:00:00.000Z', false, false, false);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 1, 'Grand Finals', 13, 0, 0, '2024-07-17T07:00:00.000Z', false, false, false);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (2, 1, 'QuarterFinals', 13, 0, 0, '2024-07-17T07:00:00.000Z', true, true, false);

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (2, 2, 'Qualifiers', 0, 10, 3, '2024-07-17T07:00:00.000Z', true, true, true);

-- MAPS ---------------------------------------------------------------------------------------------------------------

INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 4368325, 'world devoid of you (fairydust radio edit)', 'Silent Sky', 'void feat. Hiroko',
           'YuzakiTsukasa', 'YuzakiTsukasa', 'https://assets.ppy.sh/beatmaps/2085230/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085230/download', 5.42, 140, 152, 8, 8, 1, '',
           '//b.ppy.sh/preview/2085230.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 4368161, 'Decoy', 'Yoced', 'Yooh',
           '_IceRain', 'Tastydumpl1ng', 'https://assets.ppy.sh/beatmaps/2085155/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085155/download', 5.84, 180, 132, 8, 8, 2, '',
           '//b.ppy.sh/preview/2085155.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 4368407, '9876734123 ("Hyperprime" Full Version)', '1.05x For AST', 'Silentroom',
           '553343477', 'Phukiir', 'https://assets.ppy.sh/beatmaps/2085258/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085258/download', 5.71, 165, 232, 8, 8, 3, '',
           '//b.ppy.sh/preview/2085258.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, false, 4368168, 'A Dichroic Glass Snafu', 'Broken', 'Blitz Lunar',
           '_IceRain', '_IceRain', 'https://assets.ppy.sh/beatmaps/2085157/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085157/download', 5.23, 180, 117, 8, 8, 4, '',
           '//b.ppy.sh/preview/2085157.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 2999060, 'fffff op.2', 'Evening''s Extreme', 'Five Hammer',
           'Evening', 'U1d', 'https://assets.ppy.sh/beatmaps/1452883/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/1452883/download', 6.13, 266, 114, 8.5, 8.5, 4, '',
           '//b.ppy.sh/preview/1452883.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 4368123, 'Hiroari Shoots a Strange Bird ~ Till When', 'Perfect Cherry Blossom', 'ZUN',
           '_IceRain', '_IceRain', 'https://assets.ppy.sh/beatmaps/2085144/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085144/download', 5.67, 155, 212, 8, 8, 5, '',
           '//b.ppy.sh/preview/2085144.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, true, 4368323, 'Light Colors', 'The Color of Oblivion', 'Lia',
           'YuzakiTsukasa', 'YuzakiTsukasa', 'https://assets.ppy.sh/beatmaps/2085228/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085228/download', 5.85, 131, 147, 8, 8, 6, '',
           '//b.ppy.sh/preview/2085228.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 2, true, 4368724, 'phony', 'Master', 'Hoshimachi Suisei',
           '[Crz]sunnyxxy', '[Crz]sunnyxxy', 'https://assets.ppy.sh/beatmaps/2085404/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085404/download', 6.28, 170, 186, 7, 6, 1, '',
           '//b.ppy.sh/preview/2085404.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 2, true, 4368231, 'Tiferet', 'MeLady', 'Xi feat. Sta',
           'Benson_', 'TheFunk', 'https://assets.ppy.sh/beatmaps/2085191/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085191/download', 6.33, 280, 168, 7, 6, 2, '',
           '//b.ppy.sh/preview/2085191.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 2, true, 4368365, 'G e n g a o z o', 'void (AST Edit)', '-45',
           'tyrcs', 'U1d', 'https://assets.ppy.sh/beatmaps/2085240/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085240/download', 6.37, 153, 177, 7, 6, 3, '',
           '//b.ppy.sh/preview/2085240.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 2, true, 4368924, 'Cerebrite', 'iya', 'Mili',
           'U1d', 'Albionthegreat', 'https://assets.ppy.sh/beatmaps/2085486/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085486/download', 5.26, 148, 155, 7, 6.5, 4, '',
           '//b.ppy.sh/preview/2085486.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 3, true, 4368406, 'BREaK! BREaK! BREaK!', 'Break it all up', 'HiTECH NINJA vs Cranky',
           '553343477', '_IceRain', 'https://assets.ppy.sh/beatmaps/1616398/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/1616398/download', 7.51, 165, 143, 7, 7, 1, '',
           '//b.ppy.sh/preview/1616398.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 3, true, 4368284, 'PhantasmalWar', 'Blood moon', 'SunsetRay',
           'AhoUsagi', 'AhoUsagi', 'https://assets.ppy.sh/beatmaps/2085211/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085211/download', 6.75, 125, 138, 6, 6, 2, '',
           '//b.ppy.sh/preview/2085211.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 3, true, 4368711, 'Catastrophe', 'Apocalypse', 'Juggernaut.',
           'Alptraum', 'Alptraum', 'https://assets.ppy.sh/beatmaps/2085392/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085392/download', 6.24, 180, 179, 7.6, 7.6, 3, '',
           '//b.ppy.sh/preview/2085392.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 5, true, 4368401, 'Heroes of our time', 'The Epic', 'Dragonforce',
           'Imperial Wolf', 'Tastydumpl1ng', 'https://assets.ppy.sh/beatmaps/2085254/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2085254/download', 7.14, 200, 422, 8, 7, 0, '',
           '//b.ppy.sh/preview/2085254.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 1, false, 4455483, 'Clinozoisite', 'Epidosis', 'Ludicin',
           'BKwind', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2120625/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2120625/download', 6.31, 175, 329, 8, 8, 4, '',
           '//b.ppy.sh/preview/2120625.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           5, 3, false, 4256390, 'oddloop', 'Oddities', 'Frederic',
           'White Hare', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2034766/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2034766/download', 3.9, 172, 243, 8, 7.5, 2, '',
           '//b.ppy.sh/preview/2034766.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 1, true, 4334158, 'HiTECH Bass Loops Vol.1', 'Stage 1: Erraticity', 'lapix',
           'Phukiir', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071342/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071342/download', 4.37, 150, 139, 8, 8.5, 1, '',
           '//b.ppy.sh/preview/2071342.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 1, true, 4334134, 'Firmament Castle "Velier"', 'Stage 2: Welkin', 'Uetsu Shi',
           'HMillion', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071330/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071330/download', 4.75, 222, 122, 8, 8, 2, '',
           '//b.ppy.sh/preview/2071330.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 3, true, 4334121, 'Jikai ~ Paganelope', 'Stage 3: Lust', 'Warak',
           'Alptraum', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071323/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071323/download', 5.36, 128, 161, 8, 8, 1, '',
           '//b.ppy.sh/preview/2071323.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 2, true, 4334124, 'Woodfairies', 'Stage 4: Yearning', 'Aethoro',
           'tastydumpl1ng', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071325/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071325/download', 4.49, 174, 147, 7, 7.2, 1, '',
           '//b.ppy.sh/preview/2071325.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 1, true, 4334151, 'Nhelv', 'Stage 5: NERVE', 'Silentroom',
           'YuzakiTsukasa', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071339/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071339/download', 5.08, 175, 155, 8, 8, 3, '',
           '//b.ppy.sh/preview/2071339.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 1, true, 4334143, 'ELPIS', 'Stage 6: Hope', 'dj TAKA',
           '_IceRain', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071335/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071335/download', 5.77, 175, 112, 8, 8, 4, '',
           '//b.ppy.sh/preview/2071335.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           1, 3, true, 4334110, 'Strange Love', 'Stage 8: Affliction', 'Sakuzyo',
           'BKwind', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2071316/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2071316/download', 6.84, 190, 165, 8, 7, 2, '',
           '//b.ppy.sh/preview/2071316.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 4, true, 4253502, 'sha (Cut Ver.)', 'Stage 1: blake', 'sakuraburst',
           'Paturages', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039247/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039247/download', 3.02, 170, 114, 7, 7, 1, '',
           '//b.ppy.sh/preview/2039247.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 1, true, 4253751, 'ultra-blazures (Cut Ver.)', 'Stage 2: amalgam', 'Frums',
           'aeoliancarp', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039339/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039339/download', 4.7, 174, 177, 8.3, 8.3, 1, '',
           '//b.ppy.sh/preview/2039339.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 3, true, 4266621, 'Ten''imuhou', 'Absolute', 'xi',
           'elexire', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039240/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039240/download', 4.63, 148, 249, 8, 7.4, 1, '',
           '//b.ppy.sh/preview/2039240.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 2, true, 4253496, 'End of Fairytale', 'Stage 4: Parable', 'technoplanet feat. Haruno',
           'Raveille', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039243/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039243/download', 5.53, 250, 142, 8, 7, 1, '',
           '//b.ppy.sh/preview/2039243.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 2, true, 4253649, 'Ultra Happy Miracle Bazoooooka!!', 'Stage 5: Overjoy',
           'Hino Isuka vs. Umeboshi Chazuke',
           'Toaph Daddy', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039298/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039298/download', 6.06, 200, 122, 7.7, 7.7, 2, '',
           '//b.ppy.sh/preview/2039298.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 3, true, 4253513, 'onslaught -Retaliation of Bahamut-', 'Stage 6: Massacre', 'Camellia',
           'guden', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039253/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039253/download', 5.74, 238, 116, 8.1, 7.8, 2, '',
           '//b.ppy.sh/preview/2039253.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 1, true, 4253489, 'AMEN KATAGIRI GENERATION', 'Stage 7: Revival', 'katagiri',
           '-mint-', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039237/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039237/download', 5.75, 250, 168, 8.5, 8.5, 2, '',
           '//b.ppy.sh/preview/2039237.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           10, 1, true, 4253740, 'Xuasar Charge', 'A Sea of Stars', 'Kou!',
           '0DZ0', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2039336/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2039336/download', 5.07, 150, 211, 8, 8, 3, '',
           '//b.ppy.sh/preview/2039336.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4283526, 'Gypsophila', 'blossom 1.1x (166bpm)', 'linear ring with RNAcid',
           'MyZterioN-', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/1805950/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/1805950/download', 4.82, 166, 147, 8, 8, 1, '',
           '//b.ppy.sh/preview/1805950.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4272125, 'Cosmo Station', 'Orbis x1.1', 'seatrus',
           'Blessia', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2046586/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2046586/download', 5.59, 247, 198, 8, 8, 2, '',
           '//b.ppy.sh/preview/2046586.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4281865, 'Edison', 'Challenge (Edit) 1.1x (146bpm)', 'EvOke',
           'Miaurichesu', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2050560/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2050560/download', 5.18, 146, 157, 8, 8.5, 3, '',
           '//b.ppy.sh/preview/2050560.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4284901, 'Break The Silence', 'Challenge', 'Camellia',
           '0DZ0', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051831/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051831/download', 4.96, 220, 224, 8.5, 8.3, 4, '',
           '//b.ppy.sh/preview/2051831.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4284906, 'Baka Mitai (Cut Ver.)', 'Ska''s n no. .', 'Kazuma Kiryu (CV: Takaya Kuroda)',
           'elexire', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051835/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051835/download', 4.89, 148, 110, 8, 8, 5, '',
           '//b.ppy.sh/preview/2051835.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 1, true, 4284888, 'Nisemono', 'Impostor (cut 1.05x)', 'Frums',
           'Pizza69', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051825/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051825/download', 5.2, 315, 153, 8, 8, 6, '',
           '//b.ppy.sh/preview/2051825.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 3, true, 4284664, 'Bloomin''', 'Flowerin''', 'MisoilePunch -Forever-',
           'guden', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051734/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051734/download', 5.49, 234, 138, 8, 7.5, 1, '',
           '//b.ppy.sh/preview/2051734.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 3, true, 4284920, 'Upload Your Mind :: Download My Soul', 'Multidimensional', 'Camellia',
           '-mint-', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051840/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051840/download', 5.22, 166, 271, 8, 7.3, 2, '',
           '//b.ppy.sh/preview/2051840.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 3, true, 4284700, 'Calculator', '.857142', 'M-O-T-U',
           '[Crz]FolAH1217', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051746/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051746/download', 4.95, 166, 109, 7.5, 7.3, 3, '',
           '//b.ppy.sh/preview/2051746.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 2, true, 4284564, 'Astra Walkthrough', 'Faded Stars', 'paraoka',
           '[Crz]Crysarlene', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051679/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051679/download', 5.27, 225, 136, 9, 7.3, 1, '',
           '//b.ppy.sh/preview/2051679.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 2, true, 4284669, 'Heaven''s Fall', 'Firmaments', 'Helblinde',
           'guden', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051737/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051737/download', 5.71, 200, 167, 8.6, 7.5, 2, '',
           '//b.ppy.sh/preview/2051737.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 2, true, 4284918, 'Erinyes', 'Enigma', 'Toromaru',
           'Toaph Daddy', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051839/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051839/download', 6.2, 195, 138, 8, 7.5, 3, '',
           '//b.ppy.sh/preview/2051839.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 4, true, 4284932, 'Sample enSemble', 'SV asSemble', 'AltVoid',
           'Tidek', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051846/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051846/download', 3.2, 141, 139, 7, 7, 1, '',
           '//b.ppy.sh/preview/2051846.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 4, true, 4284940, 'Cyber Thunder Cider', '??', 'EZFG',
           'zero2snow', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051849/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051849/download', 3.34, 145, 183, 5, 7, 2, '',
           '//b.ppy.sh/preview/2051849.mp3'
       );
INSERT INTO map (
    stage_id, map_type_id, in_mappool, beatmap_id, title, diff, artist, mapper, suggestor, cover, download,
    sr, bpm, drain_time, hp, od, index, comment, song_preview
)
VALUES (
           9, 5, true, 4284926, 'Drenched in Air', 'Submerge', 'Camellia feat. Ninomae Ina''nis',
           'elexire', 'Arcaxio', 'https://assets.ppy.sh/beatmaps/2051843/covers/card.jpg',
           'https://osu.ppy.sh/beatmapsets/2051843/download', 6.92, 189, 288, 8, 7.3, 0, '',
           '//b.ppy.sh/preview/2051843.mp3'
       );

-- TOURNAMENT ROLES ---------------------------------------------------------------------------------------------------

INSERT INTO tournament_role (can_reg_with_role, app_user_id, role_id, tournament_id) VALUES (false, 1, 2, 1);