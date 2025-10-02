import { NextRequest, NextResponse } from 'next/server'
import { getReport } from '@/server/services/reports'
import { generateReportPDF } from '@/lib/pdf'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const report = await getReport(id)
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    const pdfBuffer = await generateReportPDF({
      projectTitle: report.project.title,
      validated: report.validated,
      overview: report.overview,
      keyFindings: report.keyFindings as any,
      projectId: report.projectId,
    })

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${report.project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_report.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
