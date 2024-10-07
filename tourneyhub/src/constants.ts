export const STORED_USER = 'user';

export const LOGIN_URL = 'http://localhost:8080/oauth2/authorization/osu';
export const LOGOUT_URL = 'http://localhost:8080/logout';

// ROLES
export const PLAYER = 'player';
export const HOST = 'host';
export const ADMIN = 'admin';
export const MAPPOOLER = 'mappooler';
export const MAPPER = 'mapper';
export const PLAYTESTER = 'playtester';
export const REFEREE = 'referee';
export const STREAMER = 'streamer';
export const COMMENTATOR = 'commentator';
export const SHEETER = 'sheeter';
export const GFX = 'gfx';

// ROLE REG
export const ROLE_REG = new Map<string, boolean>([
    [PLAYER, false],
    [HOST, false],
    [ADMIN, false],
    [MAPPOOLER, false],
    [MAPPER, false],
    [PLAYTESTER, false],
    [REFEREE, false],
    [STREAMER, true],
    [COMMENTATOR, true],
    [SHEETER, false],
    [GFX, false]
]);

// REGEX
export const URL_REGEX = /^(?:(?:https?|ftp):\/\/)(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;
export const NUM_REGEX = /^\d+$/

// COLORS
export const TERTIARY = '#9575CD';

// FORM VALIDATION
export const REQUIRED = 'Required';
export const MIN1 = 'Must be 1 or more';
export const INVALID_URL = 'Must be a full URL';
export const INTEGER = 'Must be an integer';
export const NOT_NEGATIVE = 'Must be positive';

export const DUPLICATE_BEATMAP_ID = 'Map already in pool';
export const TOO_LARGE = 'Value too large';

export const INVALID_DATE = 'Invalid date format';
export const FUTURE_DATE = 'Must be in the future';

// STAGE TYPES
export const STANDARD = 'standard';
export const QUALIFIER = 'qualifier';

// STATS TABS
export const SEEDING = 'seeding';
export const MAPPOOL = 'mappool';

// TOURNAMENT PLACEMENT
export const SUFFIX_MAP = new Map<number, string>([
    [1, 'st'], [2, 'nd'], [3, 'rd']
]);

// STATUSES
export const ACTIVE = 'active';
export const ELIMINATED = 'eliminated';
export const REGISTERED = 'registered';

export const PENDING = 'pending';
export const ACCEPTED = 'accepted';
export const REJECTED = 'rejected';
export const RETRACTED = 'retracted';

// TIMEZONES
export const TIMEZONES = [
    -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

// MAP TYPES
export const RC = 'RC';
export const LN = 'LN';
export const HB = 'HB';
export const SV = 'SV';
export const TB = 'TB';