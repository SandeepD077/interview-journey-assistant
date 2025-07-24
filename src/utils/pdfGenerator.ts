
import jsPDF from 'jspdf';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  experience: Array<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
}

export const generateResumePDF = (templateId: string, formData: any): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let currentY = margin;

    // Helper function to add text with word wrapping
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Header with name and contact info
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.personalInfo.fullName, margin, currentY);
    currentY += 12;

    // Contact information
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contactInfo = [
      formData.personalInfo.email,
      formData.personalInfo.phone,
      formData.personalInfo.address,
      formData.personalInfo.website,
      formData.personalInfo.linkedin,
      formData.personalInfo.github
    ].filter(Boolean).join(' | ');
    
    currentY = addText(contactInfo, margin, currentY, pageWidth - 2 * margin);
    currentY += 10;

    // Summary Section
    if (formData.personalInfo.summary) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('SUMMARY', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      currentY = addText(formData.personalInfo.summary, margin, currentY, pageWidth - 2 * margin);
      currentY += 10;
    }

    // Experience Section
    if (formData.experience && formData.experience.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EXPERIENCE', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      formData.experience.forEach((exp: any) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.position, margin, currentY);
        
        doc.setFont('helvetica', 'normal');
        const dateRange = exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`;
        const dateWidth = doc.getTextWidth(dateRange);
        doc.text(dateRange, pageWidth - margin - dateWidth, currentY);
        currentY += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(`${exp.company}, ${exp.location}`, margin, currentY);
        currentY += 8;

        doc.setFont('helvetica', 'normal');
        currentY = addText(exp.description, margin, currentY, pageWidth - 2 * margin);
        currentY += 10;
      });
    }

    // Education Section
    if (formData.education && formData.education.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      formData.education.forEach((edu: any) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, margin, currentY);
        
        doc.setFont('helvetica', 'normal');
        const dateRange = `${edu.startDate} - ${edu.endDate}`;
        const dateWidth = doc.getTextWidth(dateRange);
        doc.text(dateRange, pageWidth - margin - dateWidth, currentY);
        currentY += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        let schoolText = edu.institution;
        if (edu.gpa) {
          schoolText += ` | GPA: ${edu.gpa}`;
        }
        doc.text(schoolText, margin, currentY);
        currentY += 6;

        if (edu.description) {
          doc.setFont('helvetica', 'normal');
          currentY = addText(edu.description, margin, currentY, pageWidth - 2 * margin);
        }
        currentY += 10;
      });
    }

    // Skills Section
    if (formData.skills && formData.skills.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const skillsText = formData.skills.join(', ');
      currentY = addText(skillsText, margin, currentY, pageWidth - 2 * margin);
      currentY += 10;
    }

    // Projects Section
    if (formData.projects && formData.projects.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJECTS', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      formData.projects.forEach((project: any) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(project.title, margin, currentY);
        currentY += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        currentY = addText(project.description, margin, currentY, pageWidth - 2 * margin);
        currentY += 4;

        doc.setFont('helvetica', 'italic');
        currentY = addText(`Technologies: ${project.technologies.join(', ')}`, margin, currentY, pageWidth - 2 * margin);
        
        if (project.link) {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 255);
          currentY = addText(`Link: ${project.link}`, margin, currentY, pageWidth - 2 * margin);
          doc.setTextColor(0, 0, 0);
        }
        currentY += 10;
      });
    }

    // Certifications Section
    if (formData.certifications && formData.certifications.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICATIONS', margin, currentY);
      currentY += 8;
      
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      formData.certifications.forEach((cert: any) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(cert.name, margin, currentY);
        
        doc.setFont('helvetica', 'normal');
        const dateWidth = doc.getTextWidth(cert.date);
        doc.text(cert.date, pageWidth - margin - dateWidth, currentY);
        currentY += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        let certText = cert.issuer;
        if (cert.credentialId) {
          certText += ` | ID: ${cert.credentialId}`;
        }
        if (cert.expiryDate) {
          certText += ` | Expires: ${cert.expiryDate}`;
        }
        doc.text(certText, margin, currentY);
        currentY += 10;
      });
    }

    // Convert to blob
    const pdfBlob = doc.output('blob');
    resolve(pdfBlob);
  });
};
