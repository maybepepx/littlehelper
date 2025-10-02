export async function generateReportPDF(reportData: {
  projectTitle: string
  validated: string
  overview: string
  keyFindings: {
    frictionPoints: string[]
    highlights: string[]
  }
  projectId: string
}): Promise<Buffer> {
  // Create a simple text-based PDF for now
  const textContent = `
${reportData.projectTitle}

WHAT WAS VALIDATED
${reportData.validated}

OVERVIEW  
${reportData.overview}

FRICTION POINTS
${reportData.keyFindings.frictionPoints.map(point => `• ${point}`).join('\n')}

HIGHLIGHTS
${reportData.keyFindings.highlights.map(highlight => `• ${highlight}`).join('\n')}

Generated: ${new Date().toLocaleDateString()}
Project ID: ${reportData.projectId}
`
  return Buffer.from(textContent)
}