
import { Router } from 'express'
import { requireAuth, requireRole } from '../middlewares/auth'
import { takeAttendance, getAttendanceByCourse } from '../controllers/attendanceController'

const r = Router()
r.post('/take', requireAuth, requireRole('FACULTY'), takeAttendance)
r.get('/course/:courseId', requireAuth, requireRole('FACULTY', 'ADMIN'), getAttendanceByCourse)
export default r
