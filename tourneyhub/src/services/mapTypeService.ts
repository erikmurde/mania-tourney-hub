import { MapTypeDto } from '../dto/mapType/MapTypeDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapTypeService extends BaseEntityService<MapTypeDto> {
    constructor() {
        super('mapTypes');
    }
}