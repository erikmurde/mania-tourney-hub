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

-- TOURNAMENTS -------------------------------------------------------------------------------------------------------

INSERT INTO tournament (
    applications_open, concluded, max_player_rank, max_team_size, min_player_rank, min_team_size, players_published,
    protects, published, regs_open, warmups, key_count, application_deadline, reg_deadline, code, name, description,
    banner, reg_message, information
)
VALUES (
    true, false, 0, 1, 0, 1, true, true, true, true, true, 6,
    '2024-10-23T07:00:00.000Z', '2024-10-16T07:00:00.000Z', '6KAST', '6K Autumn Showdown',
    '6K Autumn Showdown Tournament (6KAST) is an osu!mania Free for all 1v1 Double-Elimination tournament focused ' ||
    'on the 6 key gamemode.This is one of the first ever 6 key focused tournament ever hosted on osu!mania. ' ||
    'So we hope you enjoy your experience on the newest tourney keymode meta!',
    'https://i.ppy.sh/333a6da130763d34fb218cd7d3dc9cd24bb25a35/68747470733a2f2f696d6' ||
    '775722d617263686976652e7070792e73682f646973636f72642f31313134393431383635363136' ||
    '3232303137312d313131363635313138383330323133353330382d415354364b5f42616e6e65725f52656374616e676c652e706e67',
    'Please join our discord server before registering.',
    '<p><span class="ql-size-huge">Schedule</span></p><ul><li><strong>Registration Phase</strong> - ' ||
    '8 September to 22 September</li><li><strong>Screening Phase</strong> - 22 September to 7 October</li><li>' ||
    '<strong>Qualifiers Showcase</strong> - October 8/9</li><li><strong>Qualifiers + Qualifiers Result + RO64 ' ||
    'Showcase</strong> - October 14 to 16</li><li><strong>RO64 + RO32 Showcase</strong> - October 21 to 23</li>' ||
    '<li><strong>RO32 + RO16 Showcase</strong> - October 28 to 30</li><li><strong>RO16 + Quaterfinals Showcase' ||
    '</strong> - November 4 to 6</li><li><strong>Quarterfinals + Semifinals Showcase</strong> - November 11 to 13' ||
    '</li><li><strong>Semifinals + Finals Showcase</strong> - November 18 to 20</li><li><strong>Finals + Grand ' ||
    'Finals Showcase</strong> - November 25 to 26</li><li><strong>Grand Finals + Conclusion</strong> - December ' ||
    '2 to 3</li></ul><p><br></p><p><br></p><p><span class="ql-size-huge">Registrations</span></p><p><br></p><p>' ||
    '<span class="ql-size-large" style="color: rgb(246, 166, 100);">To play in the tournament, you must follow ' ||
    'these rules:</span></p><ol><li>You must be in the 6K Autumn Showdown Tournament Discord Server</li>' ||
    '<li>Registered for the tournament by clicking the register button on the home page.</li><li>Have not violated ' ||
    'the community guidelines over the past 12 months.</li></ol><p><br></p><p><span class="ql-size-large" ' ||
    'style="color: rgb(246, 166, 100);">To staff for the tournament:</span></p><ol><li>You must be in ' ||
    'the 6K Autumn Showdown Tournament Discord Server</li><li>Completed and submitted a staff application with the ' ||
    'requested role(s).</li><li>You may not play in the tournament unless you''re exclusively going to help as a ' ||
    'streamer and/or commentator.</li><li>Once eliminated, you may apply as a playtester or referee.</li></ol><p>' ||
    '<br></p><p><br></p><p><span class="ql-size-huge">Rules</span></p><p><br></p><p><span class="ql-size-large" ' ||
    'style="color: rgb(246, 166, 100);">During the match:</span></p><p><br></p><p>- In advance, players will send ' ||
    'their warmups (if they have) to the referees in-charge of their match. Warmups must be 6K and be below the ' ||
    '4:00 drain time.</p><p>- After warmup has concluded, both players will run the !roll command in the lobby ' ||
    'chat. The player with the higher roll will be able to choose whether to go first or second.</p><p>- The ' ||
    'protect/ban phase will be as followed:As an example, if Player A goes first...</p><p>Player A: Protect -&gt; ' ||
    'Player B: Protect -&gt; Player B: Ban -&gt; Player A: Ban -&gt; Player A: Pick</p><p>- During the match, both ' ||
    'the players will alternate in picks depending on who picked first, and play the picked map together. The ' ||
    'player with the higher score will obtain a point.</p><p><br></p><p><span class="ql-size-large" ' ||
    'style="color: rgb(246, 166, 100);">Additional Rules:</span></p><p><br></p><p><span style="color: ' ||
    'rgb(237, 143, 94);">Mod settings:</span></p><p><br></p><p>- The score system on all matches will be on Score ' ||
    'V2</p><p>- All maps are played with FreeMod turned ON. Visual mods such as Mirror, Hidden, Fade-In, ' ||
    'Flashlight, and any combination of these mods are allowed. NoFail is allowed too.</p><p><br></p><p><span ' ||
    'style="color: rgb(237, 143, 94);">Punctuality:</span></p><p><br></p><p><span style="color: ' ||
    'rgb(255, 255, 255);">- Players are required to be present before their match time. If one player isn''t ' ||
    'present during the match time, a 10 minute grace period will start by the referee.</span></p><p>- If the ' ||
    'player fails to arrive before the 10 minute grace period, the match will be considered as a Win By ' ||
    'Default to the present player.</p><p><br></p><p><span style="color: rgb(237, 143, 94);">Protect/Ban/Pick ' ||
    'Procedures:</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);">- Players will be given 2 ' ||
    'minutes to protect and ban a map from their choosing. Later on, players will have 2 minutes to pick a map ' ||
    'and get ready for the map.</span></p><p>- Any player that fails to Protect/Ban/Pick during the given time, ' ||
    'the referee will choose a map at random to be picked in behalf of the player by using the !roll command.' ||
    '</p><p><br></p><p><span style="color: rgb(237, 143, 94);">Disconnection:</span></p><p><br></p><p>- If any ' ||
    'player gets disconnected from a map during the first 30 seconds of the gameplay, they can ask for the map to ' ||
    'be aborted and replayed.</p><p>This is only available once per match for each player, any subsequent ' ||
    'disconnects will award the other player a point.</p><p>- If any player gets disconnected from a map after the ' ||
    'first 30 seconds of the gameplay, the point will be awarded to the other player.</p><p>- If any player is ' ||
    'unable to return to the lobby within 10 minutes, the match will be considered a win for the other player.' ||
    '</p><p>- If both players are disconnected, the player that comes back will be saved from losing. If the other ' ||
    'player comes back before their grace period ends, the match will continue.</p><p>This will only be available ' ||
    'once. If subsequent cases happen, the player that joins back will be considered the winner of the match.' ||
    '</p><p>- If both players are unable to reconnect to the lobby in time, the current standing will determine the ' ||
    'winner of the match.</p><p>In the case of a tie, the higher seeded player will be awarded the win.</p><p>- The ' ||
    'hosts reserve the right to be more or less lenient at their sole discretion.</p><p><br></p><p><br></p><p><span ' ||
    'class="ql-size-huge">Structure</span></p><p><br></p><p><span class="ql-size-large" style="color: rgb(246, ' ||
    '166, 100);">Qualifiers</span></p><p><br></p><p>The <strong>Qualifiers Stage</strong> will happen in the first ' ||
    'week of the tournament play. All of the registered players who were not screened out during screening are ' ||
    'eligible to</p><p>participate in the Qualifiers. Each player can play the Qualifiers in sequence up to 2 times ' ||
    '(Players may choose to not play a 2nd time).</p><p><br></p><p>The <strong>Qualifiers Pool format</strong> ' ||
    'will have <strong>8 stages</strong>, and they are as followed:</p><p>Stage 1: Accuracy/Tech</p><p>Stage 2: ' ||
    'Speed/Delay</p><p>Stage 3: Early Mixed Hybrid</p><p>Stage 4: LN Release</p><p>Stage 5: Mixed Rice</p><p>' ||
    'Stage 6: Chordstream</p><p>Stage 7: LN Density</p><p>Stage 8: Complex Mixed Hybrid</p><p><br></p><p><strong>' ||
    'The Seeding Calculation</strong> will start after Qualifiers concluded. If you played the Qualifiers twice, ' ||
    'the higher score for each map will be taken.</p><p>This will determine the player''s seed and decide whether ' ||
    'they will proceed on to the next stage.</p><p>Each player''s seed is determined by how well they perform at ' ||
    'each map. The 8 maps will be averaged out and any players that performed well for all of the maps</p><p>will ' ||
    'get a higher seeding. Only the Top 64 seed will proceed on to the bracket stage, while the lower seeds will ' ||
    'be eliminated.</p><p><br></p><p><span class="ql-size-large" style="color: rgb(246, 166, 100);">Bracket ' ||
    'Stages</span></p><p><br></p><p><strong>Bracket Matches</strong> will arrange all the players into a standard ' ||
    'Double Elimination Bracket, where 1st seed will face against 64th seed, 2nd seed will face against 63rd seed,' ||
    '</p><p>and so on.</p><p><br></p><p><strong>The Mappool format</strong> for the bracket stages will be as ' ||
    'followed:</p><p>Round of 64: 10 Maps (Best of 7)</p><p>Round of 32: 12 Maps (Best of 9)</p><p>Round of 16: ' ||
    '12 Maps (Best of 9)</p><p>Quarterfinals: 14 Maps (Best of 11)</p><p>Semifinals: 14 Maps (Best of 11)</p><p>' ||
    'Finals: 16 Maps (Best of 13)</p><p>Grand Finals: 16 Maps (Best of 13)</p><p><br></p><p><br></p><p><span ' ||
    'class="ql-size-huge">Prizes</span></p><p><br></p><p class="ql-align-center"><strong ' ||
    'class="ql-size-large">1st Place</strong><span class="ql-size-large"> - Six Month osu! Supporter ' ||
    '[First Place Badge]</span></p><p class="ql-align-center"><strong class="ql-size-large">2nd Place' ||
    '</strong><span class="ql-size-large"> - Four Month osu! Supporter</span></p><p class="ql-align-center">' ||
    '<strong class="ql-size-large">3rd Place </strong><span class="ql-size-large">- Two Month osu! Supporter' ||
    '</span></p><p class="ql-align-center"><strong class="ql-size-large">4th to 6th</strong><span ' ||
    'class="ql-size-large"> - One Month osu! Supporter</span></p><p class="ql-align-center"><br></p><p ' ||
    'class="ql-align-center">To submit a formal complaint to the Official Tournament Committee about 6KAST,' ||
    '</p><p class="ql-align-center">please access the link below: <a ' ||
    'href="https://pif.ephemeral.ink/tournament-reports" rel="noopener noreferrer" target="_blank" ' ||
    'style="color: rgb(100, 181, 246);"><u>https://pif.ephemeral.ink/tournament-reports</u></a></p>'
);
INSERT INTO tournament (
    applications_open, concluded, max_player_rank, max_team_size, min_player_rank, min_team_size, players_published,
    protects, published, regs_open, warmups, key_count, application_deadline, reg_deadline, code, name, description,
    banner, reg_message, information
)
VALUES (
    true, false, 0, 4, 0, 6, true, false, true, true, false, 4,
    '2024-10-16T07:00:00.000Z', '2024-11-21T08:00:00.000Z', '4KMWC2023', 'osu!mania 4K World Cup 2023',
    'The osu!mania 4K World Cup 2023 (MWC 4K 2023) was a country-based osu!mania tournament hosted by the osu! ' ||
    'team. It was the seventh installment of the osu!mania 4K World Cup.',
    'https://assets.ppy.sh/tournament-banners/official/mwc4k2023.jpg',
    'Please join our discord server before registering.', ''
);
INSERT INTO tournament (
    applications_open, concluded, max_player_rank, max_team_size, min_player_rank, min_team_size, players_published,
    protects, published, regs_open, warmups, key_count, application_deadline, reg_deadline, code, name, description,
    banner, reg_message, information
)
VALUES (
    false, false, 0, 1, 0, 1, false, true, false, false, false, 4,
    null, null, '4KMT', '4K Korean Mania Tournament', 'Test tournament',
    'https://i.ppy.sh/b92ca1365e6f5bead5afbc24e26c6447ee8e0d9a/68747470733a2f2f696d6775722d617263686976652e7070' ||
    '792e73682f646973636f72642f313038383433323930333939313539313032342d313130393731303236393737303337313133322d' ||
    '344b4d545f666f72756d2e706e67', 'Test message', ''
);

-- STAGES -------------------------------------------------------------------------------------------------------------

INSERT INTO stage (
    tournament_id, stage_type_id, name, best_of, lobby_size, num_advancing, scheduling_deadline,
    mappool_published, schedule_published, stats_published
)
VALUES (1, 2, 'Qualifiers', 0, 10, 5, '2024-12-17T07:00:00.000Z', true, true, true);

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

-- USERS --------------------------------------------------------------------------------------------------------------

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (58, 16819909, 'Arcaxio', 109, 'arcaxio_', 2, 'https://a.ppy.sh/16819909');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 11817622, 'SunApple', 1654, 'test_username', 0, 'https://a.ppy.sh/11817622');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 8900975, 'BKWind', 109, 'test_username', 0, 'https://a.ppy.sh/8900975');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 6496016, 'TheHunter1', 0, 'test_username', 0, 'https://a.ppy.sh/6496016');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (188, 13993659, 'Japeynius', 1688, 'test_username', 0, 'https://a.ppy.sh/13993659');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 9853595, 'Albionthegreat', 31730, 'test_username', 0, 'https://a.ppy.sh/9853595');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 18496063, 'Tastydumpl1ng', 343, 'test_username', 0, 'https://a.ppy.sh/18496063');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (188, 13981991, 'TheFunk', 7769, 'test_username', 0, 'https://a.ppy.sh/13981991');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 8814590, 'Arkman', 0, 'test_username', 0, 'https://a.ppy.sh/8814590');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 10333739, '[Crz]sunnyxxy', 285, 'test_username', 0, 'https://a.ppy.sh/10333739');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (147, 9658070, 'My Angel Nilou', 2832, 'test_username', 0, 'https://a.ppy.sh/9658070');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 4556538, 'Phukiir', 4302, 'test_username', 0, 'https://a.ppy.sh/4556538');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 10125072, 'U1d', 210, 'test_username', 0, 'https://a.ppy.sh/10125072');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 4363223, '553343477', 2063, 'test_username', 0, 'https://a.ppy.sh/4363223');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 9784248, 'AhoUsagi', 11233, 'test_username', 0, 'https://a.ppy.sh/9784248');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (87, 26496648, 'Alptraum', 5640, 'test_username', 0, 'https://a.ppy.sh/26496648');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 18471116, 'Benson_', 4705, 'test_username', 0, 'https://a.ppy.sh/18471116');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 11253722, 'DannyPX', 21265, 'test_username', 0, 'https://a.ppy.sh/11253722');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (12, 13360768, 'Decku', 7559, 'test_username', 0, 'https://a.ppy.sh/13360768');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 12891443, 'HMillion', 45996, 'test_username', 0, 'https://a.ppy.sh/12891443');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 18270260, 'hylotl', 4951, 'test_username', 0, 'https://a.ppy.sh/18270260');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 7859973, '_IceRain', 0, 'test_username', 0, 'https://a.ppy.sh/7859973');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (70, 9080296, 'Imperial Wolf', 0, 'test_username', 0, 'https://a.ppy.sh/9080296');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 1653229, '_Stan', 8642, 'test_username', 0, 'https://a.ppy.sh/1653229');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 13026904, 'tyrcs', 12, 'test_username', 0, 'https://a.ppy.sh/13026904');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 17158897, 'YuzakiTsukasa', 3163, 'test_username', 0, 'https://a.ppy.sh/17158897');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 7286896, 'RevVoJH', 283, 'test_username', 0, 'https://a.ppy.sh/7286896');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 7082178, '[Crz]Satori', 37, 'test_username', 0, 'https://a.ppy.sh/7082178');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (112, 16308598, 'winterlover', 1118, 'test_username', 0, 'https://a.ppy.sh/16308598');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 12320264, 'YuJJun', 270, 'test_username', 0, 'https://a.ppy.sh/12320264');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 9308128, 'akace100', 8412, 'test_username', 0, 'https://a.ppy.sh/9308128');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (148, 16417718, 'Auxesiaa', 4073, 'test_username', 0, 'https://a.ppy.sh/16417718');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 3855052, 'EpsilonMaiagare', 4338, 'test_username', 0, 'https://a.ppy.sh/3855052');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (164, 17989444, 'ERA Xuste', 2394, 'test_username', 0, 'https://a.ppy.sh/17989444');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 3046856, '[GB]Rush_FTK', 49217, 'test_username', 0, 'https://a.ppy.sh/3046856');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (227, 10494860, 'MashedPotato', 1417, 'test_username', 0, 'https://a.ppy.sh/10494860');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (147, 21340543, 'N4iveDx', 2572, 'test_username', 0, 'https://a.ppy.sh/21340543');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (227, 17148657, 'Poity', 12842, 'test_username', 0, 'https://a.ppy.sh/17148657');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (188, 8612061, 'Polytetral', 5501, 'test_username', 0, 'https://a.ppy.sh/8612061');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 16630515, 'Reihynn', 2591, 'test_username', 0, 'https://a.ppy.sh/16630515');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (227, 9676089, 'rock-on', 128630, 'test_username', 0, 'https://a.ppy.sh/9676089');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 4928674, 'shizehao', 5978, 'test_username', 0, 'https://a.ppy.sh/4928674');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 32028459, 'Trooperr', 3125, 'test_username', 0, 'https://a.ppy.sh/32028459');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (206, 15665805, 'konkawe', 1131, 'test_username', 0, 'https://a.ppy.sh/15665805');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 11590784, 'SiFouR', 5529, 'test_username', 0, 'https://a.ppy.sh/11590784');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 11818585, 'Baguette2Pain', 1971, 'test_username', 0, 'https://a.ppy.sh/11818585');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 8784587, 'Dynascape', 19576, 'test_username', 0, 'https://a.ppy.sh/8784587');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (188, 12297375, 'ERA Adam', 1509, 'test_username', 0, 'https://a.ppy.sh/12297375');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (167, 18520056, '[LS]Tenshi', 666, 'test_username', 0, 'https://a.ppy.sh/18520056');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (167, 11517895, 'Silhoueska Elze', 1043, 'test_username', 0, 'https://a.ppy.sh/11517895');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 3187959, 'Sparky', 6432, 'test_username', 0, 'https://a.ppy.sh/3187959');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 5183940, '2fast', 5293, 'test_username', 0, 'https://a.ppy.sh/5183940');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (87, 12609866, 'ShadeCegLgMn', 0, 'test_username', 0, 'https://a.ppy.sh/12609866');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (147, 3964918, '-Candy-', 361637, 'test_username', 0, 'https://a.ppy.sh/3964918');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (147, 8291099, 'demiantorp', 495050, 'test_username', 0, 'https://a.ppy.sh/8291099');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (112, 2071008, 'yz1155', 45, 'test_username', 0, 'https://a.ppy.sh/2071008');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (206, 766374, 'LostCool', 8, 'test_username', 0, 'https://a.ppy.sh/766374');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (35, 15314355, 'UmmmMrMoo', 55, 'test_username', 0, 'https://a.ppy.sh/15314355');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (167, 11420405, 'Ojisan-', 3, 'test_username', 0, 'https://a.ppy.sh/11420405');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 13967954, 'Watch01', 153, 'test_username', 0, 'https://a.ppy.sh/13967954');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (167, 3036686, 'Sanni', 57, 'test_username', 0, 'https://a.ppy.sh/3036686');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (167, 2039089, 'arcwinolivirus', 332, 'test_username', 0, 'https://a.ppy.sh/2039089');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 89545, 'VanWilder', 42, 'test_username', 0, 'https://a.ppy.sh/89545');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 29606773, 'Shenzouz', 383, 'test_username', 0, 'https://a.ppy.sh/29606773');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 12598261, 'TsukiyaWhiskers', 46, 'test_username', 0, 'https://a.ppy.sh/12598261');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 24675802, 'Bunsen', 25, 'test_username', 0, 'https://a.ppy.sh/24675802');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (169, 18338179, 'bagjettka', 98, 'test_username', 0, 'https://a.ppy.sh/18338179');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 4980256, 'Alter-', 24, 'test_username', 0, 'https://a.ppy.sh/4980256');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 12452291, 'Krn_', 169, 'test_username', 0, 'https://a.ppy.sh/12452291');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 6264519, 'Milla[Monkey]', 221, 'test_username', 0, 'https://a.ppy.sh/6264519');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 18282863, 'HxcQ777', 48, 'test_username', 0, 'https://a.ppy.sh/18282863');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (41, 2225008, 'Skalim', 267, 'test_username', 0, 'https://a.ppy.sh/2225008');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 12028216, 'mashu', 74, 'test_username', 0, 'https://a.ppy.sh/12028216');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 18664411, 'Potaterr', 139, 'test_username', 0, 'https://a.ppy.sh/18664411');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (41, 3215366, 'Matiias', 703, 'test_username', 0, 'https://a.ppy.sh/3215366');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 9630674, 'Freek', 547, 'test_username', 0, 'https://a.ppy.sh/9630674');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (206, 17721836, 'Natsurio', 115, 'test_username', 0, 'https://a.ppy.sh/17721836');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (43, 10351684, 'AWMRone', 146, 'test_username', 0, 'https://a.ppy.sh/10351684');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (206, 437945, 'KenZ', 181, 'test_username', 0, 'https://a.ppy.sh/437945');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (147, 24140109, '- Kopi -', 212, 'test_username', 0, 'https://a.ppy.sh/24140109');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (70, 8610776, 'Lelloq', 301, 'test_username', 0, 'https://a.ppy.sh/8610776');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 18834550, 'RhymesWithMash', 1068, 'test_username', 0, 'https://a.ppy.sh/18834550');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 13431947, 'Jerem[Monkey]', 282, 'test_username', 0, 'https://a.ppy.sh/13431947');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (188, 16870002, 'sukidayo-', 279, 'test_username', 0, 'https://a.ppy.sh/16870002');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 18172498, 'Tsunakko', 121, 'test_username', 0, 'https://a.ppy.sh/18172498');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 11762834, '[TCJ]ScanL', 6896, 'test_username', 0, 'https://a.ppy.sh/11762834');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 16407268, 'ERA Dev', 564, 'test_username', 0, 'https://a.ppy.sh/16407268');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 17308009, 'Hello_Son', 407, 'test_username', 0, 'https://a.ppy.sh/17308009');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 11734610, 'Nepijin', 329, 'test_username', 0, 'https://a.ppy.sh/11734610');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 15926730, 'PeachMarrow', 692, 'test_username', 0, 'https://a.ppy.sh/15926730');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 7794488, 'Reshiram', 319, 'test_username', 0, 'https://a.ppy.sh/7794488');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (219, 11817838, 'TristanJacob11', 335, 'test_username', 0, 'https://a.ppy.sh/11817838');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 10242062, 'AFOTHER', 1792, 'test_username', 0, 'https://a.ppy.sh/10242062');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 11488604, 'CrewK', 502, 'test_username', 0, 'https://a.ppy.sh/11488604');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 16100800, 'ICECAKE', 896, 'test_username', 0, 'https://a.ppy.sh/16100800');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 10745260, 'jhleetgirl', 264, 'test_username', 0, 'https://a.ppy.sh/10745260');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 25588443, 'Nikoro', 528, 'test_username', 0, 'https://a.ppy.sh/25588443');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (105, 18144664, 'Toxicat', 1273, 'test_username', 0, 'https://a.ppy.sh/18144664');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 18309106, 'adihza', 311, 'test_username', 0, 'https://a.ppy.sh/18309106');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 12689667, '[Albert]', 413, 'test_username', 0, 'https://a.ppy.sh/12689667');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 5179764, 'AZKiFanboy', 3421, 'test_username', 0, 'https://a.ppy.sh/5179764');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 13385865, 'bad hd player', 320, 'test_username', 0, 'https://a.ppy.sh/13385865');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 8677684, 'Onta_Bekasi', 40, 'test_username', 0, 'https://a.ppy.sh/8677684');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (93, 10540515, 'RetroEX', 3915, 'test_username', 0, 'https://a.ppy.sh/10540515');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 10015908, 'Auraah', 1408, 'test_username', 0, 'https://a.ppy.sh/10015908');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 16892459, 'Babibelbleu', 1658, 'test_username', 0, 'https://a.ppy.sh/16892459');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 18867523, 'narahashi', 369, 'test_username', 0, 'https://a.ppy.sh/18867523');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 14055233, 'MisteurFR', 1139, 'test_username', 0, 'https://a.ppy.sh/14055233');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 7306522, 'PatouZ', 3502, 'test_username', 0, 'https://a.ppy.sh/7306522');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (68, 8756421, 'quentin5110054', 680, 'test_username', 0, 'https://a.ppy.sh/8756421');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 20454338, 'Cube9112', 2295, 'test_username', 0, 'https://a.ppy.sh/20454338');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 10944966, 'Outlasted', 724, 'test_username', 0, 'https://a.ppy.sh/10944966');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 16999311, 'Quinnie why', 1237, 'test_username', 0, 'https://a.ppy.sh/16999311');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 10945523, 'samuelhklumpers', 7509, 'test_username', 0, 'https://a.ppy.sh/10945523');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 13377652, 'Shoira', 1780, 'test_username', 0, 'https://a.ppy.sh/13377652');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (156, 12599154, 'Toxic Scent', 604, 'test_username', 0, 'https://a.ppy.sh/12599154');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 10027302, 'Cyaewin', 379, 'test_username', 0, 'https://a.ppy.sh/10027302');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 15440118, 'ERA Leo', 2418, 'test_username', 0, 'https://a.ppy.sh/15440118');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 11625617, 'ERA medium kek', 2105, 'test_username', 0, 'https://a.ppy.sh/11625617');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 10615367, 'ERA Punish', 2823, 'test_username', 0, 'https://a.ppy.sh/10615367');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 14114899, 'Lotex09', 2481, 'test_username', 0, 'https://a.ppy.sh/14114899');

INSERT INTO app_user (country_id, player_id, name, rank, discord_username, timezone, avatar)
VALUES (51, 15806513, 'jkzu123', 422, 'test_username', 0, 'https://a.ppy.sh/15806513');

-- TEAMS --------------------------------------------------------------------------------------------------------------

INSERT INTO team (name, logo, availability)
VALUES ('United States', 'https://assets.ppy.sh/old-flags/US.png', 'We are available whenever.');

INSERT INTO team (name, logo, availability)
VALUES ('Japan', 'https://assets.ppy.sh/old-flags/JP.png', 'We are available whenever.');

INSERT INTO team (name, logo, availability)
VALUES ('Indonesia', 'https://assets.ppy.sh/old-flags/ID.png', 'We are available whenever.');

INSERT INTO team (name, logo, availability)
VALUES ('France', 'https://assets.ppy.sh/old-flags/FR.png', 'We are available whenever.');

INSERT INTO team (name, logo, availability)
VALUES ('Netherlands', 'https://assets.ppy.sh/old-flags/NL.png', 'We are available whenever.');

INSERT INTO team (name, logo, availability)
VALUES ('Germany', 'https://assets.ppy.sh/old-flags/DE.png', 'We are available whenever.');

-- TOURNAMENT ROLES ---------------------------------------------------------------------------------------------------

INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 1, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 1, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 1, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 1, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (3, 1, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 2, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 2, 8, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 2, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 2, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 3, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 4, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 5, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 6, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 6, 10, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 6, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 7, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 7, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 7, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 7, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 8, 2, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 8, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 8, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 8, 10, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 9, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 10, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 11, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 11, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 12, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 12, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 13, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 13, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 14, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 15, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 16, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 17, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 18, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 18, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 19, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 20, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 21, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 22, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 23, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 24, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 25, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 26, 5, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 27, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 28, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 29, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 30, 6, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 31, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 32, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 33, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 33, 8, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 34, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 35, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 35, 8, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 36, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 37, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 38, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 39, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 40, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 41, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 42, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 43, 7, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 43, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 44, 8, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 45, 8, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 45, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 46, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 47, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 48, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 49, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 50, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 51, 9, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 51, 7, true);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 52, 10, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 53, 10, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 53, 11, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 54, 11, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 55, 11, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 56, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 57, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 58, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 59, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 60, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 61, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 62, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 63, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 64, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 65, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 66, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 67, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 68, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 69, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 70, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 71, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 72, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 73, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 74, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 75, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 76, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 77, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 78, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 79, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 80, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 81, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 82, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 83, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 84, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 85, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 86, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 87, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 88, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 89, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 90, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 91, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 92, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 93, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (1, 94, 4, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 94, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 95, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 96, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 97, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 98, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 99, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 100, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 101, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 102, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 103, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 104, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 105, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 106, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 107, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 108, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 109, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 110, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 111, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 112, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 113, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 114, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 115, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 116, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 117, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 118, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 119, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 120, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 121, 1, false);
INSERT INTO tournament_role (tournament_id, app_user_id, role_id, can_reg_with_role) VALUES (2, 122, 1, false);

-- TOURNAMENT STATS ---------------------------------------------------------------------------------------------------

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 1, null, 6, 11, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 56, null, 6, 1, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 57, null, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 58, null, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 59, null, 6, 4, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 60, null, 8, 5, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 61, null, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 62, null, 7, 7, 31, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 63, null, 6, 8, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 64, null, 6, 9, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 65, null, 6, 10, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 66, null, 6, 12, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 67, null, 6, 13, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 68, null, 6, 14, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 69, null, 7, 15, 29, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 70, null, 6, 16, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 71, null, 6, 17, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 72, null, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 73, null, 6, 19, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 74, null, 6, 20, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 75, null, 6, 21, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 76, null, 6, 22, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 77, null, 6, 23, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 78, null, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 79, null, 6, 25, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 80, null, 7, 26, 30, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 81, null, 6, 27, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 82, null, 6, 28, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 83, null, 6, 29, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 84, null, 6, 30, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 85, null, 6, 31, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (1, 86, null, 6, 32, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 87, 1, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 88, 1, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 89, 1, 6, 2, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 90, 1, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 91, 1, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 92, 1, 6, 2, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 93, 2, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 94, 2, 6, 3, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 95, 2, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 96, 2, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 97, 2, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 98, 2, 6, 3, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 99, 3, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 100, 3, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 101, 3, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 102, 3, 6, 6, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 103, 3, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 104, 3, 6, 6, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 105, 4, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 106, 4, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 107, 4, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 108, 4, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 109, 4, 6, 18, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 110, 4, 6, 18, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 111, 5, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 112, 5, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 113, 5, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 114, 5, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 115, 5, 6, 24, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 116, 5, 6, 24, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 117, 6, 6, 26, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 118, 6, 6, 26, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 119, 6, 6, 26, 0, true);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 120, 6, 6, 26, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 121, 6, 6, 26, 0, false);

INSERT INTO tournament_player (tournament_id, app_user_id, team_id, status_id, seed, placement, team_captain)
VALUES (2, 122, 6, 6, 26, 0, false);

-- STAFF REQUESTS -----------------------------------------------------------------------------------------------------

INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 9, 2, 1, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 5, 3, 1, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 7, 4, 1, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 5, 5, 1, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 5, 1, 1, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 11, 1, 2, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (
           null, 10, 1, 3, 1,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' ||
           'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' ||
           'aliquip ex ea commodo consequat.'
       );
INSERT INTO staff_request (recipient_id, role_id, sender_id, status_id, tournament_id, description)
VALUES (1, 9, 2, 1, 1, 'Come join my tournament as a commentator because of reasons.');

-- LINKS --------------------------------------------------------------------------------------------------------------

INSERT INTO link (tournament_id, name, url) VALUES (1, 'Youtube', 'https://www.youtube.com');
INSERT INTO link (tournament_id, name, url) VALUES (1, 'Twitch', 'https://www.twitch.tv');
INSERT INTO link (tournament_id, name, url) VALUES (2, 'Discord', 'https://www.discord.com');

-- EVENTS -------------------------------------------------------------------------------------------------------------

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q25', '2023-10-12T15:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q26', '2023-10-13T13:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q01', '2023-10-14T00:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q02', '2023-10-14T02:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q03', '2023-10-14T04:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q04', '2023-10-14T06:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q05', '2023-10-14T08:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q06', '2023-10-14T10:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q07', '2023-10-14T12:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q08', '2023-10-14T14:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q09', '2023-10-14T16:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q10', '2023-10-14T18:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q11', '2023-10-14T20:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q12', '2023-10-14T22:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q13', '2023-10-15T00:00:00.000Z', 1, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q14', '2023-10-15T02:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q15', '2023-10-15T04:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q16', '2023-10-15T06:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q17', '2023-10-15T08:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q18', '2023-10-15T10:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q19', '2023-10-15T12:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q20', '2023-10-15T14:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q21', '2023-10-15T16:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q22', '2023-10-15T18:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q23', '2023-10-15T20:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (1, 'Q24', '2023-10-15T22:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (10, 'Q01', '2024-09-20T08:06:30.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (10, 'Q02', '2024-09-30T11:14:08.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '110', '2023-11-11T12:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '99', '2023-11-11T12:00:00.000Z', 111255354, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '100', '2023-11-11T14:00:00.000Z', null, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '102', '2023-11-11T14:00:00.000Z', 111256942, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '112', '2023-11-11T15:00:00.000Z', 111257849, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '97', '2023-11-11T21:00:00.000Z', 111264171, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '101', '2023-11-12T03:00:00.000Z', 111268142, true);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '104', '2023-11-12T07:30:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '106d', '2023-11-12T08:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '109', '2023-11-12T08:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '107b', '2023-11-12T13:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '111', '2023-11-12T15:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '105b', '2023-11-12T16:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (5, '123', '2023-11-12T17:00:00.000Z', null, false);

INSERT INTO event (stage_id, code, time, match_id, concluded)
VALUES (9, 'test', '2024-09-26T17:39:35.000Z', null, false);

-- EVENT PARTICIPANTS ------------------------------------------------------------------------------------------------

INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (60, null, 1, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (6, null, 1, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (8, null, 2, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 3, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 4, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (34, null, 6, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (71, null, 7, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (51, null, 7, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (41, null, 8, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (57, null, 9, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (79, null, 9, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (59, null, 9, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (62, null, 9, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 9, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 10, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (65, null, 11, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (84, null, 11, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 11, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (80, null, 12, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (34, null, 12, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (73, null, 13, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (81, null, 13, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (76, null, 13, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 13, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (68, null, 14, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (2, null, 14, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (58, null, 15, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (75, null, 15, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 15, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (64, null, 16, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (34, null, 16, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (82, null, 17, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (32, null, 17, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (78, null, 18, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (51, null, 18, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (44, null, 20, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (77, null, 20, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (46, null, 20, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (42, null, 20, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (61, null, 21, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (56, null, 21, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 21, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (70, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (83, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (63, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (49, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (69, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (48, null, 22, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 22, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (67, null, 23, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (34, null, 23, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (34, null, 24, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (86, null, 25, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (72, null, 25, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (66, null, 25, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 25, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (85, null, 26, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 26, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 1, 27, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 2, 27, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 3, 27, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 4, 27, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (1, null, 27, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (6, null, 28, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (59, null, 29, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (60, null, 29, 1, -1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (4, null, 29, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (67, null, 30, 1, 1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (73, null, 30, 1, 6);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (4, null, 30, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (66, null, 31, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (56, null, 31, 1, -1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (62, null, 32, 1, 6);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (78, null, 32, 1, 1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 32, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 32, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (58, null, 33, 1, 6);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (61, null, 33, 1, 3);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 33, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 33, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (86, null, 34, 1, 1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (72, null, 34, 1, 6);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 34, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 34, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (69, null, 35, 1, 1);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (71, null, 35, 1, 6);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (31, null, 35, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 35, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (51, null, 35, 9, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (1, null, 36, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (82, null, 36, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (4, null, 36, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 36, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (56, null, 37, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (73, null, 37, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (70, null, 38, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (63, null, 38, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (4, null, 38, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 38, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (62, null, 39, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (71, null, 39, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (41, null, 39, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 39, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (57, null, 40, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (65, null, 40, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 40, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 40, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (64, null, 41, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (72, null, 41, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (38, null, 41, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (33, null, 41, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (51, null, 41, 9, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (57, null, 42, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (56, null, 42, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (35, null, 42, 7, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (2, null, 42, 8, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (48, null, 42, 9, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 2, 43, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (null, 4, 43, 1, 0);
INSERT INTO event_participant (app_user_id, team_id, event_id, role_id, score) VALUES (6, null, 43, 7, 0);