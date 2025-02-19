import Csrep from '../entities/csrep.entity';

export default class ValidCsRepDto {
    constructor(csRep: Csrep) {
        this.employeeId = csRep.employeeId;
        this.first_name = csRep.first_name;
        this.last_name = csRep.last_name;
        this.user_name = csRep.user_name;
    }
    employeeId: string;
    first_name: string;
    last_name: string;
    user_name: string;
}
