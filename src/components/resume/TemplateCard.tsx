import { ResumeTemplate } from '@/data/resumeTemplates';
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface TemplateCardProps {
  template: ResumeTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden card-hover transition-all duration-300 group h-full flex flex-col">
      <div className="aspect-[4/5] relative">
        <img 
          src={template.previewImage} 
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{template.name}</h3>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: template.colors.primary, color: 'white' }}
              >
                {template.category}
              </Badge>
            </div>
            <p className="text-sm text-white/80 mb-3">{template.description}</p>
            
            {/* Color Preview */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-white/70">Colors:</span>
              <div className="flex gap-1">
                <div 
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: template.colors.primary }}
                  title="Primary color"
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: template.colors.secondary }}
                  title="Secondary color"
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: template.colors.accent }}
                  title="Accent color"
                />
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-1">
              {template.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-white/80">
                  <CheckCircle className="h-3 w-3" />
                  <span>{feature}</span>
                </div>
              ))}
              {template.features.length > 2 && (
                <div className="text-xs text-white/60">
                  +{template.features.length - 2} more features
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CardFooter className="p-4 mt-auto">
        <Link to={`/resume-builder/${template.id}`} className="w-full">
          <Button className="w-full" style={{ backgroundColor: template.colors.primary }}>
            Select Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
