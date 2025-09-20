
import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const createExam = async (req: Request, res: Response) => {
  try {
    const { courseId, title, date } = req.body
    const exam = await prisma.exam.create({ data: { courseId: Number(courseId), title, date: new Date(date) } })
    res.json(exam)
  } catch (err:any) { res.status(500).json({ error: err.message }) }
}

export const addResult = async (req: Request, res: Response) => {
  try {
    const examId = Number(req.params.examId)
    const { studentId, marks, grade } = req.body
    const r = await prisma.result.create({
      data: { examId, studentId: Number(studentId), marks: Number(marks), grade }
    })
    res.json(r)
  } catch (err:any) { res.status(500).json({ error: err.message }) }
}

export const getResults = async (_req: Request, res: Response) => {
  const rows = await prisma.result.findMany({
    include: {
      exam: true,
      student: { include: { user: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
  res.json(rows)
}
