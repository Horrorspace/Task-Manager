import {Pool} from 'pg'
import {IPostgreSQLConf} from 'interfaces/config'


export default abstract class PG {
    protected readonly pool: Pool;

    constructor(config: IPostgreSQLConf) {
        this.pool = new Pool(config)
    }
}