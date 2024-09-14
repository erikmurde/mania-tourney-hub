import { ICountryDto } from './dto/ICountryDto';

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
]);

// URL REGEX
export const URL_REGEX = /^(?:(?:https?|ftp):\/\/)(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

// COLORS
export const TERTIARY = '#9575CD';

// FORM VALIDATION
export const REQUIRED = 'Required';
export const MIN1 = 'Must be 1 or more';
export const INVALID_URL = 'Must be a full url'

// STAGE TYPES
export const STANDARD = 'standard';
export const QUALIFIER = 'qualifier';

// TOURNAMENT PLACEMENT
export const SUFFIX_MAP = new Map<number, string>([
    [1, 'st'], [2, 'nd'], [3, 'rd']
]);

// STATUSES
export const ACTIVE = 'active';
export const ELIMINATED = 'eliminated';
export const DISQUALIFIED = 'disqualified';
export const REGISTERED = 'registered';

// TIMEZONES
export const TIMEZONES = [
    -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

export const MAP_TYPES = [
    'RC', 'LN', 'HB', 'SV', 'TB'
];

// COUNTRIES
export const COUNTRIES: ICountryDto[] = [
    { ISO2: 'AD', name: 'Andorra' },
    { ISO2: 'AE', name: 'United Arab Emirates' },
    { ISO2: 'AF', name: 'Afghanistan' },
    { ISO2: 'AG', name: 'Antigua and Barbuda' },
    { ISO2: 'AI', name: 'Anguilla' },
    { ISO2: 'AL', name: 'Albania' },
    { ISO2: 'AM', name: 'Armenia' },
    { ISO2: 'AO', name: 'Angola' },
    { ISO2: 'AR', name: 'Argentina' },
    { ISO2: 'AS', name: 'American Samoa' },
    { ISO2: 'AT', name: 'Austria' },
    { ISO2: 'AU', name: 'Australia' },
    { ISO2: 'AW', name: 'Aruba' },
    { ISO2: 'AX', name: 'Alland Islands' },
    { ISO2: 'AZ', name: 'Azerbaijan' },
    { ISO2: 'BA', name: 'Bosnia and Herzegovina' },
    { ISO2: 'BB', name: 'Barbados' },
    { ISO2: 'BD', name: 'Bangladesh' },
    { ISO2: 'BE', name: 'Belgium' },
    { ISO2: 'BF', name: 'Burkina Faso' },
    { ISO2: 'BG', name: 'Bulgaria' },
    { ISO2: 'BH', name: 'Bahrain' },
    { ISO2: 'BI', name: 'Burundi' },
    { ISO2: 'BJ', name: 'Benin' },
    { ISO2: 'BL', name: 'Saint Barthelemy' },
    { ISO2: 'BM', name: 'Bermuda' },
    { ISO2: 'BN', name: 'Brunei Darussalam' },
    { ISO2: 'BO', name: 'Bolivia' },
    { ISO2: 'BR', name: 'Brazil' },
    { ISO2: 'BS', name: 'Bahamas' },
    { ISO2: 'BT', name: 'Bhutan' },
    { ISO2: 'BW', name: 'Botswana' },
    { ISO2: 'BY', name: 'Belarus' },
    { ISO2: 'BZ', name: 'Belize' },
    { ISO2: 'CA', name: 'Canada' },
    { ISO2: 'CD', name: 'Democratic Republic of the Congo' },
    { ISO2: 'CF', name: 'Central African Republic' },
    { ISO2: 'CG', name: 'Republic of the Congo' },
    { ISO2: 'CH', name: 'Switzerland' },
    { ISO2: 'CI', name: 'Cote d\'Ivoire' },
    { ISO2: 'CL', name: 'Chile' },
    { ISO2: 'CM', name: 'Cameroon' },
    { ISO2: 'CN', name: 'China' },
    { ISO2: 'CO', name: 'Colombia' },
    { ISO2: 'CR', name: 'Costa Rica' },
    { ISO2: 'CU', name: 'Cuba' },
    { ISO2: 'CV', name: 'Cape Verde' },
    { ISO2: 'CX', name: 'Christmas Island' },
    { ISO2: 'CY', name: 'Cyprus' },
    { ISO2: 'CZ', name: 'Czech Republic' },
    { ISO2: 'DE', name: 'Germany' },
    { ISO2: 'DJ', name: 'Djibouti' },
    { ISO2: 'DK', name: 'Denmark' },
    { ISO2: 'DM', name: 'Dominica' },
    { ISO2: 'DO', name: 'Dominican Republic' },
    { ISO2: 'DZ', name: 'Algeria' },
    { ISO2: 'EC', name: 'Ecuador' },
    { ISO2: 'EE', name: 'Estonia' },
    { ISO2: 'EG', name: 'Egypt' },
    { ISO2: 'ER', name: 'Eritrea' },
    { ISO2: 'ES', name: 'Spain' },
    { ISO2: 'ET', name: 'Ethiopia' },
    { ISO2: 'FI', name: 'Finland' },
    { ISO2: 'FJ', name: 'Fiji' },
    { ISO2: 'FK', name: 'Falkland Islands (Malvinas)' },
    { ISO2: 'FM', name: 'Micronesia' },
    { ISO2: 'FO', name: 'Faroe Islands' },
    { ISO2: 'FR', name: 'France' },
    { ISO2: 'GA', name: 'Gabon' },
    { ISO2: 'GB', name: 'United Kingdom' },
    { ISO2: 'GD', name: 'Grenada' },
    { ISO2: 'GE', name: 'Georgia' },
    { ISO2: 'GF', name: 'French Guiana' },
    { ISO2: 'GG', name: 'Guernsey' },
    { ISO2: 'GH', name: 'Ghana' },
    { ISO2: 'GI', name: 'Gibraltar' },
    { ISO2: 'GL', name: 'Greenland' },
    { ISO2: 'GM', name: 'Gambia' },
    { ISO2: 'GN', name: 'Guinea' },
    { ISO2: 'GP', name: 'Guadeloupe' },
    { ISO2: 'GQ', name: 'Equatorial Guinea' },
    { ISO2: 'GR', name: 'Greece' },
    { ISO2: 'GT', name: 'Guatemala' },
    { ISO2: 'GU', name: 'Guam' },
    { ISO2: 'GW', name: 'Guinea-Bissau' },
    { ISO2: 'GY', name: 'Guyana' },
    { ISO2: 'HK', name: 'Hong Kong' },
    { ISO2: 'HM', name: 'Heard Island and McDonald Islands' },
    { ISO2: 'HN', name: 'Honduras' },
    { ISO2: 'HR', name: 'Croatia' },
    { ISO2: 'HT', name: 'Haiti' },
    { ISO2: 'HU', name: 'Hungary' },
    { ISO2: 'ID', name: 'Indonesia' },
    { ISO2: 'IE', name: 'Ireland' },
    { ISO2: 'IL', name: 'Israel' },
    { ISO2: 'IM', name: 'Isle of Man' },
    { ISO2: 'IN', name: 'India' },
    { ISO2: 'IQ', name: 'Iraq' },
    { ISO2: 'IR', name: 'Iran' },
    { ISO2: 'IS', name: 'Iceland' },
    { ISO2: 'IT', name: 'Italy' },
    { ISO2: 'JE', name: 'Jersey' },
    { ISO2: 'JM', name: 'Jamaica' },
    { ISO2: 'JO', name: 'Jordan' },
    { ISO2: 'JP', name: 'Japan' },
    { ISO2: 'KE', name: 'Kenya' },
    { ISO2: 'KG', name: 'Kyrgyzstan' },
    { ISO2: 'KH', name: 'Cambodia' },
    { ISO2: 'KI', name: 'Kiribati' },
    { ISO2: 'KM', name: 'Comoros' },
    { ISO2: 'KN', name: 'Saint Kitts and Nevis' },
    { ISO2: 'KR', name: 'South Korea' },
    { ISO2: 'KW', name: 'Kuwait' },
    { ISO2: 'KY', name: 'Cayman Islands' },
    { ISO2: 'KZ', name: 'Kazakhstan' },
    { ISO2: 'LA', name: 'Lao' },
    { ISO2: 'LB', name: 'Lebanon' },
    { ISO2: 'LC', name: 'Saint Lucia' },
    { ISO2: 'LI', name: 'Liechtenstein' },
    { ISO2: 'LK', name: 'Sri Lanka' },
    { ISO2: 'LR', name: 'Liberia' },
    { ISO2: 'LS', name: 'Lesotho' },
    { ISO2: 'LT', name: 'Lithuania' },
    { ISO2: 'LU', name: 'Luxembourg' },
    { ISO2: 'LV', name: 'Latvia' },
    { ISO2: 'LY', name: 'Libya' },
    { ISO2: 'MA', name: 'Morocco' },
    { ISO2: 'MC', name: 'Monaco' },
    { ISO2: 'MD', name: 'Moldova' },
    { ISO2: 'ME', name: 'Montenegro' },
    { ISO2: 'MF', name: 'Saint Martin (French part)' },
    { ISO2: 'MG', name: 'Madagascar' },
    { ISO2: 'MH', name: 'Marshall Islands' },
    { ISO2: 'MK', name: 'Macedonia' },
    { ISO2: 'ML', name: 'Mali' },
    { ISO2: 'MM', name: 'Myanmar' },
    { ISO2: 'MN', name: 'Mongolia' },
    { ISO2: 'MO', name: 'Macao' },
    { ISO2: 'MP', name: 'Northern Mariana Islands' },
    { ISO2: 'MQ', name: 'Martinique' },
    { ISO2: 'MR', name: 'Mauritania' },
    { ISO2: 'MS', name: 'Montserrat' },
    { ISO2: 'MT', name: 'Malta' },
    { ISO2: 'MU', name: 'Mauritius' },
    { ISO2: 'MV', name: 'Maldives' },
    { ISO2: 'MW', name: 'Malawi' },
    { ISO2: 'MX', name: 'Mexico' },
    { ISO2: 'MY', name: 'Malaysia' },
    { ISO2: 'MZ', name: 'Mozambique' },
    { ISO2: 'NA', name: 'Namibia' },
    { ISO2: 'NC', name: 'New Caledonia' },
    { ISO2: 'NE', name: 'Niger' },
    { ISO2: 'NF', name: 'Norfolk Island' },
    { ISO2: 'NG', name: 'Nigeria' },
    { ISO2: 'NI', name: 'Nicaragua' },
    { ISO2: 'NL', name: 'Netherlands' },
    { ISO2: 'NO', name: 'Norway' },
    { ISO2: 'NP', name: 'Nepal' },
    { ISO2: 'NR', name: 'Nauru' },
    { ISO2: 'NU', name: 'Niue' },
    { ISO2: 'NZ', name: 'New Zealand' },
    { ISO2: 'OM', name: 'Oman' },
    { ISO2: 'PA', name: 'Panama' },
    { ISO2: 'PE', name: 'Peru' },
    { ISO2: 'PF', name: 'French Polynesia' },
    { ISO2: 'PG', name: 'Papua New Guinea' },
    { ISO2: 'PH', name: 'Philippines' },
    { ISO2: 'PK', name: 'Pakistan' },
    { ISO2: 'PL', name: 'Poland' },
    { ISO2: 'PM', name: 'Saint Pierre and Miquelon' },
    { ISO2: 'PN', name: 'Pitcairn' },
    { ISO2: 'PR', name: 'Puerto Rico' },
    { ISO2: 'PS', name: 'Palestine' },
    { ISO2: 'PT', name: 'Portugal' },
    { ISO2: 'PW', name: 'Palau' },
    { ISO2: 'PY', name: 'Paraguay' },
    { ISO2: 'QA', name: 'Qatar' },
    { ISO2: 'RE', name: 'Reunion' },
    { ISO2: 'RO', name: 'Romania' },
    { ISO2: 'RS', name: 'Serbia' },
    { ISO2: 'RU', name: 'Russian Federation' },
    { ISO2: 'RW', name: 'Rwanda' },
    { ISO2: 'SA', name: 'Saudi Arabia' },
    { ISO2: 'SB', name: 'Solomon Islands' },
    { ISO2: 'SC', name: 'Seychelles' },
    { ISO2: 'SD', name: 'Sudan' },
    { ISO2: 'SE', name: 'Sweden' },
    { ISO2: 'SG', name: 'Singapore' },
    { ISO2: 'SH', name: 'Saint Helena' },
    { ISO2: 'SI', name: 'Slovenia' },
    { ISO2: 'SJ', name: 'Svalbard and Jan Mayen' },
    { ISO2: 'SK', name: 'Slovakia' },
    { ISO2: 'SL', name: 'Sierra Leone' },
    { ISO2: 'SM', name: 'San Marino' },
    { ISO2: 'SN', name: 'Senegal' },
    { ISO2: 'SO', name: 'Somalia' },
    { ISO2: 'SR', name: 'Suriname' },
    { ISO2: 'SS', name: 'South Sudan' },
    { ISO2: 'ST', name: 'Sao Tome and Principe' },
    { ISO2: 'SV', name: 'El Salvador' },
    { ISO2: 'SY', name: 'Syrian Arab Republic' },
    { ISO2: 'SZ', name: 'Swaziland' },
    { ISO2: 'TC', name: 'Turks and Caicos Islands' },
    { ISO2: 'TD', name: 'Chad' },
    { ISO2: 'TG', name: 'Togo' },
    { ISO2: 'TH', name: 'Thailand' },
    { ISO2: 'TJ', name: 'Tajikistan' },
    { ISO2: 'TL', name: 'Timor-Leste' },
    { ISO2: 'TM', name: 'Turkmenistan' },
    { ISO2: 'TN', name: 'Tunisia' },
    { ISO2: 'TO', name: 'Tonga' },
    { ISO2: 'TR', name: 'Turkey' },
    { ISO2: 'TT', name: 'Trinidad and Tobago' },
    { ISO2: 'TV', name: 'Tuvalu' },
    { ISO2: 'TW', name: 'Taiwan' },
    { ISO2: 'TZ', name: 'United Republic of Tanzania' },
    { ISO2: 'UA', name: 'Ukraine' },
    { ISO2: 'UG', name: 'Uganda' },
    { ISO2: 'US', name: 'United States' },
    { ISO2: 'UY', name: 'Uruguay' },
    { ISO2: 'UZ', name: 'Uzbekistan' },
    { ISO2: 'VA', name: 'Holy See (Vatican City State)' },
    { ISO2: 'VC', name: 'Saint Vincent and the Grenadines' },
    { ISO2: 'VE', name: 'Venezuela' },
    { ISO2: 'VG', name: 'British Virgin Islands' },
    { ISO2: 'VI', name: 'US Virgin Islands' },
    { ISO2: 'VN', name: 'Vietnam' },
    { ISO2: 'VU', name: 'Vanuatu' },
    { ISO2: 'WS', name: 'Samoa' },
    { ISO2: 'XK', name: 'Kosovo' },
    { ISO2: 'YE', name: 'Yemen' },
    { ISO2: 'YT', name: 'Mayotte' },
    { ISO2: 'ZA', name: 'South Africa' },
    { ISO2: 'ZM', name: 'Zambia' },
    { ISO2: 'ZW', name: 'Zimbabwe' }
];