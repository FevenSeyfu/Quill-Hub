import express from 'express';
import {getAllSprints,getSprintById,createSprint,updateSprint,deleteSprint} from '../controllers/sprintController.js';

const router = express.Router();


router.get('/', getAllSprints);
router.get('/:id', getSprintById);
router.post('/', createSprint);
router.put('/:id', updateSprint);
router.delete('/:id', deleteSprint);

export default router;