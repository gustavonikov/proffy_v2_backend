/* eslint-disable import/no-unresolved */
import express from 'express';
import ClassController from './controllers/classController';
import ConnectionsController from './controllers/connectionsController';

const routes = express.Router();
const classController = new ClassController();
const connectionsController = new ConnectionsController();

routes
    .get('/classes', classController.index)
    .post('/classes', classController.create)
    .get('/connections', connectionsController.index)
    .post('/connections', connectionsController.create);

export default routes;
