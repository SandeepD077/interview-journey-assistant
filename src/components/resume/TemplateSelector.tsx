import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeTemplates, ResumeTemplate } from "@/data/resumeTemplates";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Choose Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a professional template for your resume
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {resumeTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onTemplateSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-105",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="relative">
          <img
            src={template.previewImage}
            alt={`${template.name} template preview`}
            className="w-full h-32 object-cover rounded-md bg-muted"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className = 'w-full h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-md flex items-center justify-center';
                placeholder.innerHTML = `<div class="text-center"><div class="text-2xl font-bold text-primary">${template.name[0]}</div><div class="text-xs text-muted-foreground">${template.name}</div></div>`;
                parent.appendChild(placeholder);
              }
            }}
          />
          
          {isSelected && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{template.name}</h4>
            {isSelected && (
              <Badge variant="default" className="text-xs">
                Selected
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}