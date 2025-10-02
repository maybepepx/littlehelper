import { db } from '@/lib/db'

export async function createReport(projectId: string, data: {
  validated: string
  overview: string
  keyFindings: {
    frictionPoints: string[]
    highlights: string[]
  }
  pdfPath?: string
}) {
  return db.report.upsert({
    where: { projectId },
    create: {
      projectId,
      validated: data.validated,
      overview: data.overview,
      keyFindings: data.keyFindings,
      pdfPath: data.pdfPath
    },
    update: {
      validated: data.validated,
      overview: data.overview,
      keyFindings: data.keyFindings,
      pdfPath: data.pdfPath,
      updatedAt: new Date()
    }
  })
}

export async function getReport(projectId: string) {
  return db.report.findUnique({
    where: { projectId },
    include: {
      project: true
    }
  })
}

export async function getAllReports() {
  return db.report.findMany({
    where: { project: { deletedAt: null } },
    include: {
      project: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function updateReportPdfPath(projectId: string, pdfPath: string) {
  return db.report.update({
    where: { projectId },
    data: { pdfPath }
  })
}
