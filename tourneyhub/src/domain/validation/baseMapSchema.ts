import { number, object, string } from 'yup';
import { MIN1, REQUIRED, TB } from '../../constants';

export const baseMapSchema = (hasTb: boolean) => object({
    index: number()
        .when('mapType', ([mapType], schema) => {
            return mapType !== TB 
                ? schema.integer().min(1, MIN1).max(99, 'Must be under 100')
                : schema.notRequired()
        }),
    mapType: string()
        .required(REQUIRED)
        .test(
            'duplicateTb', 
            'TB already in pool', 
            mapType => mapType !== TB || !hasTb
        )
});