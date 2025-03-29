
// This is a simplified mock PDF generator
// In a real application, you would use libraries like jsPDF or pdfmake

export const generateResumePDF = (templateId: string, formData: any) => {
  return new Promise<Blob>((resolve) => {
    // In a real application, this would generate a proper PDF
    // For this demo, we'll create a text representation
    
    const content = `
RESUME - ${templateId.toUpperCase()} TEMPLATE
----------------------------------------------

PERSONAL INFORMATION
-------------------
Name: ${formData.personalInfo.fullName}
Email: ${formData.personalInfo.email}
Phone: ${formData.personalInfo.phone}
Location: ${formData.personalInfo.address}
${formData.personalInfo.linkedin ? `LinkedIn: ${formData.personalInfo.linkedin}` : ''}
${formData.personalInfo.github ? `GitHub: ${formData.personalInfo.github}` : ''}
${formData.personalInfo.website ? `Website: ${formData.personalInfo.website}` : ''}

PROFESSIONAL SUMMARY
-------------------
${formData.personalInfo.summary}

EDUCATION
---------
${formData.education.map((edu: any) => `
${edu.institution}
${edu.degree} in ${edu.fieldOfStudy}
${edu.startDate} - ${edu.endDate}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
${edu.description || ''}
`).join('\n')}

PROFESSIONAL EXPERIENCE
----------------------
${formData.experience.map((exp: any) => `
${exp.company} - ${exp.position}
${exp.location}
${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.description}
`).join('\n')}

SKILLS
------
${formData.skills.join(', ')}

PROJECTS
--------
${formData.projects.map((proj: any) => `
${proj.title}
${proj.description}
Technologies: ${proj.technologies.join(', ')}
${proj.link ? `Link: ${proj.link}` : ''}
`).join('\n')}

CERTIFICATIONS
-------------
${formData.certifications.map((cert: any) => `
${cert.name} - ${cert.issuer}
Date: ${cert.date}
${cert.expiration ? `Expires: ${cert.expiration}` : ''}
`).join('\n')}
`;

    // Create a blob that represents a text file with PDF mime type for better user experience
    const blob = new Blob([content], { type: 'application/pdf' });
    resolve(blob);
  });
};
