
import { Router } from 'express'
import { requireAuth, requireRole } from '../middlewares/auth'
import { createPaymentIntent, webhookHandler } from '../controllers/paymentController'
import express from 'express'
const r = Router()

r.post('/create-intent', requireAuth, requireRole('STUDENT', 'ADMIN'), createPaymentIntent)
// webhook endpoint (if using stripe) - make public and configure on stripe dashboard
r.post('/webhook', express.raw({ type: 'application/json' }) as any, webhookHandler)

export default r
