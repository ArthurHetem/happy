import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// List Orphanages
routes.get('/orphanages', OrphanagesController.index);
// Show Orphanage
routes.get('/orphanages/:id', OrphanagesController.show);
// Create Orphanage
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;
