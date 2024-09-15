import { number, string } from 'yup';
import { INTEGER, INVALID_URL, MIN1, NOT_NEGATIVE, REQUIRED, URL_REGEX } from '../../constants';
import { baseMapSchema } from './baseMapSchema';

export const MAX_10 = 'Must be 10 or less';
export const POSITIVE = 'Must be above 0';

export const unsubmittedMapSchema = (hasTb: boolean) => baseMapSchema(hasTb).shape({
    title: string()
        .required(REQUIRED),
    diff: string()
        .required(REQUIRED),
    artist: string()
        .required(REQUIRED),
    mapper: string()
        .required(REQUIRED),
    cover: string()
        .required(REQUIRED)
        .matches(URL_REGEX, INVALID_URL),
    download: string()
        .required(REQUIRED)
        .matches(URL_REGEX, INVALID_URL),
    sr: number()
        .moreThan(0, POSITIVE),
    bpm: number()
        .moreThan(0, POSITIVE),
    drainTime: number()
        .integer(INTEGER)
        .min(1, MIN1),
    hp: number()
        .min(0, NOT_NEGATIVE)
        .max(10, MAX_10),
    od: number()
        .min(0, NOT_NEGATIVE)
        .max(10, MAX_10)
});