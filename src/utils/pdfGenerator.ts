import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeFormData, resumeTemplates } from '@/data/resumeTemplates';

export const generateResumePDF = async (templateId: string, formData: ResumeFormData): Promise<Blob> => {
  const template = resumeTemplates.find(t => t.id === templateId);
  
  if (!template) {
    throw new Error('Template not found');
  }

  // Create a temporary div to render the resume
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.width = '210mm'; // A4 width
  tempDiv.style.minHeight = '297mm'; // A4 height
  tempDiv.style.padding = '20mm';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.fontSize = '12px';
  tempDiv.style.lineHeight = '1.4';
  
  // Generate the resume HTML based on template
  tempDiv.innerHTML = generateResumeHTML(formData, template);
  
  document.body.appendChild(tempDiv);

  try {
    // Create canvas from the HTML
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: tempDiv.offsetWidth,
      height: tempDiv.offsetHeight
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions to fit the page
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    
    let width = pdfWidth;
    let height = width / ratio;
    
    if (height > pdfHeight) {
      height = pdfHeight;
      width = height * ratio;
    }

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    // Return as blob
    return pdf.output('blob');
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
};

const generateResumeHTML = (formData: ResumeFormData, template: any): string => {
  const { personalInfo, education, experience, skills, projects, certifications } = formData;
  
  switch (template.id) {
    case 'modern':
      return generateModernTemplate(formData, template);
    case 'professional':
      return generateProfessionalTemplate(formData, template);
    case 'creative':
      return generateCreativeTemplate(formData, template);
    case 'minimalist':
      return generateMinimalistTemplate(formData, template);
    case 'executive':
      return generateExecutiveTemplate(formData, template);
    case 'tech':
      return generateTechTemplate(formData, template);
    case 'academic':
      return generateAcademicTemplate(formData, template);
    case 'startup':
      return generateStartupTemplate(formData, template);
    default:
      return generateModernTemplate(formData, template);
  }
};

const generateModernTemplate = (formData: ResumeFormData, template: any): string => {
  const { personalInfo, education, experience, skills, projects, certifications } = formData;
  
  return `
    <div style="display: flex; min-height: 100%; color: #333;">
      <!-- Sidebar -->
      <div style="width: 35%; background-color: ${template.colors.accent}; padding: 30px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: ${template.colors.primary}; margin: 0; font-size: 24px; font-weight: bold;">
            ${personalInfo.fullName}
          </h1>
          <div style="margin-top: 15px; font-size: 11px; line-height: 1.6;">
            ${personalInfo.email ? `<div>📧 ${personalInfo.email}</div>` : ''}
            ${personalInfo.phone ? `<div>📞 ${personalInfo.phone}</div>` : ''}
            ${personalInfo.address ? `<div>📍 ${personalInfo.address}</div>` : ''}
            ${personalInfo.linkedin ? `<div>🔗 LinkedIn</div>` : ''}
            ${personalInfo.github ? `<div>💻 GitHub</div>` : ''}
          </div>
        </div>

        ${skills.some(s => s.trim()) ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid ${template.colors.primary}; padding-bottom: 5px;">Skills</h3>
          <div style="font-size: 11px;">
            ${skills.filter(s => s.trim()).map(skill => 
              `<div style="margin-bottom: 5px; padding: 3px 8px; background-color: white; border-radius: 3px; display: inline-block; margin-right: 5px; margin-bottom: 8px;">${skill}</div>`
            ).join('')}
          </div>
        </div>
        ` : ''}

        ${certifications.some(c => c.name) ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid ${template.colors.primary}; padding-bottom: 5px;">Certifications</h3>
          <div style="font-size: 11px;">
            ${certifications.filter(c => c.name).map(cert => `
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold;">${cert.name}</div>
                <div style="color: ${template.colors.secondary};">${cert.issuer}</div>
                <div style="color: ${template.colors.secondary}; font-size: 10px;">${cert.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>

      <!-- Main Content -->
      <div style="width: 65%; padding: 30px;">
        ${personalInfo.summary ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 10px 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Professional Summary</h3>
          <p style="margin: 0; font-size: 11px; line-height: 1.5;">${personalInfo.summary}</p>
        </div>
        ` : ''}

        ${experience.some(e => e.company) ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Experience</h3>
          ${experience.filter(e => e.company).map(exp => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                <h4 style="margin: 0; font-size: 12px; font-weight: bold; color: ${template.colors.primary};">${exp.position}</h4>
                <span style="font-size: 10px; color: ${template.colors.secondary};">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style="font-size: 11px; color: ${template.colors.secondary}; margin-bottom: 8px;">
                ${exp.company} ${exp.location ? `• ${exp.location}` : ''}
              </div>
              ${exp.description ? `
                <div style="font-size: 10px; line-height: 1.4;">
                  ${exp.description.split('\n').filter(line => line.trim()).map(line => 
                    `<div style="margin-bottom: 3px;">• ${line.trim()}</div>`
                  ).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${education.some(e => e.institution) ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Education</h3>
          ${education.filter(e => e.institution).map(edu => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                <h4 style="margin: 0; font-size: 12px; font-weight: bold;">${edu.institution}</h4>
                <span style="font-size: 10px; color: ${template.colors.secondary};">${edu.startDate} - ${edu.endDate}</span>
              </div>
              <div style="font-size: 11px; color: ${template.colors.secondary};">
                ${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${projects.some(p => p.title) ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Projects</h3>
          ${projects.filter(p => p.title).map(project => `
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: ${template.colors.primary};">${project.title}</h4>
              ${project.description ? `<p style="margin: 0 0 5px 0; font-size: 10px; line-height: 1.4;">${project.description}</p>` : ''}
              ${project.technologies.some(t => t.trim()) ? `
                <div style="font-size: 10px; color: ${template.colors.secondary};">
                  <strong>Technologies:</strong> ${project.technologies.filter(t => t.trim()).join(', ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

const generateProfessionalTemplate = (formData: ResumeFormData, template: any): string => {
  const { personalInfo, education, experience, skills, projects, certifications } = formData;
  
  return `
    <div style="color: #333; line-height: 1.4;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 3px solid ${template.colors.primary}; padding-bottom: 20px; margin-bottom: 25px;">
        <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: bold; color: ${template.colors.primary};">
          ${personalInfo.fullName}
        </h1>
        <div style="font-size: 11px; color: ${template.colors.secondary};">
          ${[personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean).join(' • ')}
        </div>
        ${personalInfo.linkedin || personalInfo.github ? `
        <div style="font-size: 11px; color: ${template.colors.secondary}; margin-top: 5px;">
          ${[personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
        </div>
        ` : ''}
      </div>

      ${personalInfo.summary ? `
      <div style="margin-bottom: 25px;">
        <h3 style="color: ${template.colors.primary}; margin: 0 0 10px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid ${template.colors.primary}; padding-bottom: 3px;">Professional Summary</h3>
        <p style="margin: 0; font-size: 11px;">${personalInfo.summary}</p>
      </div>
      ` : ''}

      ${experience.some(e => e.company) ? `
      <div style="margin-bottom: 25px;">
        <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid ${template.colors.primary}; padding-bottom: 3px;">Professional Experience</h3>
        ${experience.filter(e => e.company).map(exp => `
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h4 style="margin: 0; font-size: 12px; font-weight: bold;">${exp.position} - ${exp.company}</h4>
              <span style="font-size: 10px; color: ${template.colors.secondary};">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
            </div>
            ${exp.location ? `<div style="font-size: 10px; color: ${template.colors.secondary}; margin-bottom: 8px;">${exp.location}</div>` : ''}
            ${exp.description ? `
              <div style="font-size: 10px;">
                ${exp.description.split('\n').filter(line => line.trim()).map(line => 
                  `<div style="margin-bottom: 3px;">• ${line.trim()}</div>`
                ).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${education.some(e => e.institution) ? `
      <div style="margin-bottom: 25px;">
        <h3 style="color: ${template.colors.primary}; margin: 0 0 15px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid ${template.colors.primary}; padding-bottom: 3px;">Education</h3>
        ${education.filter(e => e.institution).map(edu => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h4 style="margin: 0; font-size: 12px; font-weight: bold;">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
              <span style="font-size: 10px; color: ${template.colors.secondary};">${edu.startDate} - ${edu.endDate}</span>
            </div>
            <div style="font-size: 11px; color: ${template.colors.secondary};">
              ${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div style="display: flex; gap: 30px;">
        ${skills.some(s => s.trim()) ? `
        <div style="flex: 1;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 10px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid ${template.colors.primary}; padding-bottom: 3px;">Skills</h3>
          <div style="font-size: 10px;">
            ${skills.filter(s => s.trim()).join(' • ')}
          </div>
        </div>
        ` : ''}

        ${projects.some(p => p.title) ? `
        <div style="flex: 1;">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 10px 0; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid ${template.colors.primary}; padding-bottom: 3px;">Key Projects</h3>
          ${projects.filter(p => p.title).slice(0, 2).map(project => `
            <div style="margin-bottom: 10px; font-size: 10px;">
              <strong>${project.title}</strong>
              ${project.description ? `<br>${project.description.substring(0, 100)}...` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

// Placeholder functions for other templates - simplified versions
const generateCreativeTemplate = (formData: ResumeFormData, template: any): string => {
  return generateModernTemplate(formData, template); // Use modern as base for now
};

const generateMinimalistTemplate = (formData: ResumeFormData, template: any): string => {
  return generateProfessionalTemplate(formData, template); // Use professional as base
};

const generateExecutiveTemplate = (formData: ResumeFormData, template: any): string => {
  return generateProfessionalTemplate(formData, template); // Use professional as base
};

const generateTechTemplate = (formData: ResumeFormData, template: any): string => {
  return generateModernTemplate(formData, template); // Use modern as base
};

const generateAcademicTemplate = (formData: ResumeFormData, template: any): string => {
  return generateProfessionalTemplate(formData, template); // Use professional as base
};

const generateStartupTemplate = (formData: ResumeFormData, template: any): string => {
  return generateModernTemplate(formData, template); // Use modern as base
};
