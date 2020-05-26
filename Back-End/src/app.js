import express from 'express';
import './database';
import route from './routes';
import { resolve } from 'path';

class App {
    constructor() {
        this.server = express();

        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
        );
    }

    routes() {
        this.server.use(route);
    }
}

export default new App().server;
