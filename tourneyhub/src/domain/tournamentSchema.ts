import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Schema, array, boolean, date, number, object, string } from 'yup';
import { REQUIRED, MIN1, URL_REGEX, INVALID_URL } from '../constants';

dayjs.extend(utc);

export const tournamentSchema: Schema = object({
    teamTourney: boolean(),
    restrictRank: boolean(),
    regOpen: boolean(),
    applicationOpen: boolean(),
    name: string()
        .required(REQUIRED)
        .max(64, 'Must be 64 characters or less'),
    code: string()
        .required(REQUIRED)
        .max(10, 'Must be 10 characters or less'),
    description: string()
        .required(REQUIRED),
    keys: number()
        .min(1, MIN1)
        .max(18, 'Must be 18 or less'),
    banner: string()
        .required(REQUIRED),
    minRank: number()
        .when('restrictRank', ([restrictRank], schema) => {
            return restrictRank 
                ? schema.required(REQUIRED).min(1, MIN1) 
                : schema.notRequired()
        }),
    maxRank: number()
        .when(['restrictRank', 'minRank'], ([restrictRank, minRank], schema) => {
            return restrictRank 
                ? schema.required(REQUIRED).min(minRank, 'Must be min rank or higher') 
                : schema.notRequired()
        }),
    minTeamSize: number()
        .when('teamTourney', ([teamTourney], schema) => {
            return teamTourney 
                ? schema.required(REQUIRED).min(2, 'Must be 2 or more') 
                : schema.notRequired()
        }),
    maxTeamSize: number()
        .when(['teamTourney', 'minTeamSize'], ([teamTourney, minTeamSize], schema) => {
            return teamTourney 
                ? schema.required(REQUIRED).min(minTeamSize, 'Must be min size or higher') 
                : schema.notRequired()
        }),
    regDeadline: date()
        .when('regOpen', ([regOpen], schema) => {
            return regOpen 
                ? schema.required(REQUIRED)
                : schema.notRequired()
        })
        .typeError('Invalid date format')
        .min(dayjs.utc(), 'Must be in the future'),
    applicationDeadline: date()
        .when('applicationOpen', ([applicationOpen], schema) => {
            return applicationOpen 
                ? schema.required(REQUIRED)
                : schema.notRequired()
        })
        .typeError('Invalid date format')
        .min(dayjs.utc(), 'Must be in the future'),
    links: array().of(
        object().shape({
            name: string()
                .required(REQUIRED),
            link: string()
                .required(REQUIRED)
                .matches(URL_REGEX, INVALID_URL)
        })
    )
});