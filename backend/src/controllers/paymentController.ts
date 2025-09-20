
import { Request, Response } from 'express'
import Stripe from 'stripe'
import prisma from '../utils/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2022-11-15' })

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'INR', studentId } = req.body
    if (!amount || !studentId) return res.status(400).json({ message: 'Missing fields' })
    const intent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency,
      metadata: { studentId: String(studentId) }
    })
    // create pending fee transaction in DB
    await prisma.feeTransaction.create({
      data: { studentId: Number(studentId), amount: Number(amount), currency, paid: false, meta: { stripeIntent: intent.id } }
    })
    res.json({ clientSecret: intent.client_secret })
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}

export const webhookHandler = async (req: Request, res: Response) => {
  // webhook processing: omitted detailed signature verification for brevity.
  res.json({ received: true })
}
