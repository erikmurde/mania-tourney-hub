import { MapTypeDto } from '../dto/map/MapTypeDto';
import { ApiEntityService } from './base/apiEntityService';

export class MapTypeService extends ApiEntityService<MapTypeDto, MapTypeDto, MapTypeDto> {
    constructor() {
        super('mapTypes');
    }
}