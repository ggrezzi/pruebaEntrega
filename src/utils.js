import {fileURLToPath} from 'url';
import {dirname} from 'path';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
const logger = winston.createLogger({
    level:'verbose',
    transports:[
        new winston.transports.Console({
            level:'info',
        }),
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            ),
            filename:'./logWarnError.log',
            level:'warn',

        })
    ]
})

export const middLog = (req,res,next)=>{
    req.logger=logger
    next()
}