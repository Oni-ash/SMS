
import { Router } from 'express'
import authRoutes from './auth'
import studentRoutes from './students'
import attendanceRoutes from './attendance'
import examRoutes from './exams'
import paymentRoutes from './payments'

const router = Router()
router.use('/auth', authRoutes)
router.use('/students', studentRoutes)
router.use('/attendance', attendanceRoutes)
router.use('/exams', examRoutes)
router.use('/payments', paymentRoutes)

export default router
