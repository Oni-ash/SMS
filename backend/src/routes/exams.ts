
import { Router } from 'express'
import { requireAuth, requireRole } from '../middlewares/auth'
import { createExam, addResult, getResults } from '../controllers/examController'

const r = Router()
r.post('/', requireAuth, requireRole('FACULTY', 'ADMIN'), createExam)
r.post('/:examId/result', requireAuth, requireRole('FACULTY', 'ADMIN'), addResult)
r.get('/results', requireAuth, requireRole('FACULTY', 'ADMIN'), getResults)

export default r
