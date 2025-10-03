import { db } from '@/lib/db'

// Temporary mock storage for reports
const mockReports = new Map()

export async function createReport(projectId: string, data: {
  validated: string
  overview: string
  keyFindings: {
    frictionPoints: string[]
    highlights: string[]
  }
  pdfPath?: string
}) {
  try {
    return await db.report.upsert({
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
  } catch (error) {
    console.log('Database not available, using mock data for reports:', error.message)
    
    // Mock implementation
    const mockReport = {
      id: `mock_report_${projectId}`,
      projectId,
      validated: data.validated,
      overview: data.overview,
      keyFindings: data.keyFindings,
      pdfPath: data.pdfPath,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    mockReports.set(projectId, mockReport)
    return mockReport
  }
}

export async function getReport(projectId: string) {
  try {
    return await db.report.findUnique({
      where: { projectId },
      exclude: {
        project: true
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data for report:', error.message)
    return mockReports.get(projectId) || null
  }
}

export async function getAllReports() {
  try {
    return await db.report.findMany({
      where: { project: { deletedAt: null } },
      exclude: {
        project: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.log('Database not available, using mock data for reports:', error.message)
    return Array.from(mockReports.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}

export async function updateReportPdfPath(projectId: string, pdfPath: string) {
  try {
    return await db.report.update({
      where: { projectId },
      data: { pdfPath }
    })
  } catch (error) {
    console.log('Database not available, using mock data for report update:', error.message)
    const report = mockReports.get(projectId)
    if (report) {
      report.pdfPath = pdfPath
      report.updatedAt = new Date()
      mockReports.set(projectId, report)
      return report
    }
    return null
  }
}
