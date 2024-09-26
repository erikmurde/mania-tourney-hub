import { ICountryDto } from '../dto/ICountryDto';
import { ApiEntityService } from './base/apiEntityService';

export class CountryService extends ApiEntityService<ICountryDto, ICountryDto, ICountryDto> {
    constructor() {
        super('countries');
    }
}