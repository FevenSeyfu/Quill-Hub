import express from 'express';
import {getAllSprints,getSprintById,createSprint,updateSprint,deleteSprint} from '../controllers/sprintController.js';

const router = express.Router();


router.get('/sprints', getAllSprints);
router.get('/sprints/:id', getSprintById);
router.post('/sprints', createSprint);
router.put('/sprints/:id', updateSprint);
router.delete('/sprints/:id', deleteSprint);

export default router;