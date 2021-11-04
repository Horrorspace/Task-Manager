import {config} from '@config/config'


type restProtocol = 'http' | 'https';

const protocol: restProtocol = config.encryption ? 'https' : 'http';
const defaultPort: number = protocol === 'http' ? 80 : 443;
const portStr: string = config.port === defaultPort ? '' : `${config.port}`;
export const apiUrl: string = `${protocol}://${config.ip}/api${portStr}`;