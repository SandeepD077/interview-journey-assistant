import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResumeFormData } from "@/data/resumeTemplates";
import { Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  formData: ResumeFormData;
  templateId: string;
  onDownload: () => void;
  loading?: boolean;
}

export function ResumePreview({ formData, templateId, onDownload, loading }: ResumePreviewProps) {
  const getTemplateStyles = (template: string) => {
    switch (template) {
      case 'modern':
        return {
          primary: 'text-blue-600',
          secondary: 'text-blue-500',
          accent: 'border-blue-200',
          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50'
        };
      case 'creative':
        return {
          primary: 'text-purple-600',
          secondary: 'text-purple-500',
          accent: 'border-purple-200',
          bg: 'bg-gradient-to-br from-purple-50 to-pink-50'
        };
      case 'professional':
        return {
          primary: 'text-gray-800',
          secondary: 'text-gray-600',
          accent: 'border-gray-200',
          bg: 'bg-gray-50'
        };
      default:
        return {
          primary: 'text-gray-800',
          secondary: 'text-gray-600',
          accent: 'border-gray-200',
          bg: 'bg-gray-50'
        };
    }
  };

  const styles = getTemplateStyles(templateId);

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <Button onClick={onDownload} disabled={loading} size="sm">
            {loading ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("w-full h-96 overflow-auto border rounded-lg p-4 text-xs", styles.bg)}>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className={cn("text-lg font-bold", styles.primary)}>
              {formData.personalInfo.fullName || "Your Name"}
            </h1>
            <div className={cn("text-xs mt-1", styles.secondary)}>
              {[
                formData.personalInfo.email,
                formData.personalInfo.phone,
                formData.personalInfo.address
              ].filter(Boolean).join(" • ")}
            </div>
            {(formData.personalInfo.linkedin || formData.personalInfo.github || formData.personalInfo.website) && (
              <div className={cn("text-xs mt-1", styles.secondary)}>
                {[
                  formData.personalInfo.linkedin,
                  formData.personalInfo.github,
                  formData.personalInfo.website
                ].filter(Boolean).join(" • ")}
              </div>
            )}
          </div>

          {/* Summary */}
          {formData.personalInfo.summary && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                SUMMARY
              </h2>
              <p className="text-xs leading-relaxed">{formData.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {formData.experience.length > 0 && formData.experience[0].company && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                EXPERIENCE
              </h2>
              {formData.experience.map((exp, index) => (
                exp.company && (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={cn("font-medium", styles.primary)}>{exp.position}</h3>
                        <p className={cn("text-xs", styles.secondary)}>{exp.company}, {exp.location}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs mt-1 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && formData.education[0].institution && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                EDUCATION
              </h2>
              {formData.education.map((edu, index) => (
                edu.institution && (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={cn("font-medium", styles.primary)}>
                          {edu.degree} in {edu.fieldOfStudy}
                        </h3>
                        <p className={cn("text-xs", styles.secondary)}>
                          {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {formData.skills.length > 0 && formData.skills[0] && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                SKILLS
              </h2>
              <p className="text-xs leading-relaxed">
                {formData.skills.filter(Boolean).join(', ')}
              </p>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && formData.projects[0].title && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                PROJECTS
              </h2>
              {formData.projects.map((project, index) => (
                project.title && (
                  <div key={index} className="mb-3">
                    <h3 className={cn("font-medium", styles.primary)}>{project.title}</h3>
                    {project.description && (
                      <p className="text-xs mt-1 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && project.technologies[0] && (
                      <p className={cn("text-xs mt-1", styles.secondary)}>
                        Technologies: {project.technologies.filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Certifications */}
          {formData.certifications.length > 0 && formData.certifications[0].name && (
            <div className="mb-4">
              <h2 className={cn("text-sm font-semibold mb-2 pb-1 border-b", styles.primary, styles.accent)}>
                CERTIFICATIONS
              </h2>
              {formData.certifications.map((cert, index) => (
                cert.name && (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={cn("font-medium", styles.primary)}>{cert.name}</h3>
                        <p className={cn("text-xs", styles.secondary)}>{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}