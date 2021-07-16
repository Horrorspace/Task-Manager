import express from 'express'
import path from 'path'
import {IConf} from './interfaces/config'
import config from './config/default.json'

config as IConf;

const PORT: number = config.port || 4220;
const app = express();
const __dirname: string = path.dirname(__filename);

app.get('/', (req, res) => {
    console.log(req);
    res.sendFile(path.resolve(__dirname, 'client', 'static', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
});