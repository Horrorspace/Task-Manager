export interface IPostgreSQLConf {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string
}

export interface IConf {
    port: number;
    jwtSecret: string,
    PostgreSQL: IPostgreSQLConf
}