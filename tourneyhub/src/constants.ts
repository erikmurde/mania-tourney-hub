export const STORED_USER = 'user';

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
])

// COLORS
export const TERTIARY = '#9575CD';

// FORM VALIDATION
export const REQUIRED = 'Required';

// STAGE TYPES
export const STANDARD = 'standard';
export const QUALIFIER = 'qualifier';

// TOURNAMENT PLACEMENT
export const SUFFIX_MAP = new Map<number, string>([
    [1, 'st'], [2, 'nd'], [3, 'rd']
])

// STATUSES
export const ACTIVE = 'active';
export const ELIMINATED = 'eliminated';
export const DISQUALIFIED = 'disqualified';
export const REGISTERED = 'registered';

// TIMEZONES

export const TIMEZONES = [
    -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]