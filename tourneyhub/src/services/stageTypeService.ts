import { ApiErrorResponse } from '../dto/ApiErrorResponse';
import { IStageTypeDto } from '../dto/stageType/IStageTypeDto';
import { ApiEntityService } from './base/apiEntityService';

export class StageTypeService extends ApiEntityService<IStageTypeDto, IStageTypeDto, IStageTypeDto> {
    constructor() {
        super('stageTypes');
    }

    async getByName(name: string): Promise<IStageTypeDto | ApiErrorResponse> {
        try {
            const response = await this.axios.get(`${this.baseUrl}/name/${name}`);
            console.log('getByName response: ', response);

            return response.data;
        } catch (error) {
            return this.getError(error);
        }
    }
}