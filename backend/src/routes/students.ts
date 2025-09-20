
import { Router } from 'express'
import { requireAuth, requireRole } from '../middlewares/auth'
import { createStudent, listStudents, getStudent, updateStudent, deleteStudent, uploadAvatar } from '../controllers/studentController'
import { upload } from '../middlewares/upload'

const r = Router()
r.post('/', requireAuth, requireRole('ADMIN'), createStudent)
r.get('/', requireAuth, requireRole('ADMIN', 'FACULTY'), listStudents)
r.get('/:id', requireAuth, getStudent)
r.put('/:id', requireAuth, requireRole('ADMIN'), updateStudent)
r.delete('/:id', requireAuth, requireRole('ADMIN'), deleteStudent)
r.post('/upload/:userId', requireAuth, upload.single('avatar'), uploadAvatar)
export default r
