import { RoleDto } from '../dto/RoleDto';
import { ApiEntityService } from './base/apiEntityService';

export class RoleService extends ApiEntityService<RoleDto, RoleDto, RoleDto> {
    constructor() {
        super('roles');
    }
}