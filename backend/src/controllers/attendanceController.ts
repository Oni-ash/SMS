
import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const takeAttendance = async (req: Request, res: Response) => {
  try {
    const { courseId, date, records } = req.body
    if (!courseId || !date || !Array.isArray(records)) return res.status(400).json({ message: 'Invalid payload' })

    const d = new Date(date)
    // delete existing records for course+date
    await prisma.attendance.deleteMany({ where: { courseId: Number(courseId), date: d } })

    const creates = records.map((r: any) => ({
      studentId: Number(r.studentId),
      courseId: Number(courseId),
      date: d,
      present: Boolean(r.present)
    }))

    await prisma.attendance.createMany({ data: creates })
    res.json({ ok: true })
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}

export const getAttendanceByCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId)
  const rows = await prisma.attendance.findMany({
    where: { courseId },
    include: { student: { include: { user: true } } },
    orderBy: { date: 'desc' }
  })
  res.json(rows)
}
