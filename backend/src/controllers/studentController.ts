
import { Request, Response } from 'express'
import prisma from '../utils/prisma'
import bcrypt from 'bcryptjs'
import path from 'path'

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, rollNo } = req.body
    const hashed = await bcrypt.hash(password || 'welcome123', 10)
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: 'STUDENT' } })
    const student = await prisma.student.create({ data: { userId: user.id, rollNo } })
    res.json({ student })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const listStudents = async (_req: Request, res: Response) => {
  const students = await prisma.student.findMany({ include: { user: true } })
  res.json(students)
}

export const getStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const s = await prisma.student.findUnique({ where: { id }, include: { user: true } })
  if (!s) return res.status(404).json({ message: 'Not found' })
  res.json(s)
}

export const updateStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, email, rollNo } = req.body
  const stud = await prisma.student.update({
    where: { id },
    data: { rollNo, user: { update: { name, email } } },
    include: { user: true }
  })
  res.json(stud)
}

export const deleteStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const st = await prisma.student.delete({ where: { id } })
  res.json({ deleted: st })
}

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    if (!req.file) return res.status(400).json({ message: 'No file' })
    const filePath = path.join('uploads', req.file.filename)
    await prisma.user.update({ where: { id: userId }, data: { avatar: filePath } })
    res.json({ path: filePath })
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}
