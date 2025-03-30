
import { MainLayout } from "@/components/layout/MainLayout";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading } from "@/components/ui/heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  Code,
  Mic,
  Award,
  BarChart,
  CheckCircle,
  Zap,
  Brain,
  Bot,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <SectionContainer className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Heading
            title="Features"
            description="Discover all the powerful features of Interview Express to boost your interview preparation"
            centered
            className="mb-8"
          />
        </div>
      </SectionContainer>

      {/* Core Features */}
      <SectionContainer background="light">
        <Heading
          title="Core Features"
          description="Everything you need to succeed in technical interviews"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Resume Builder"
            description="Create professional, ATS-optimized resumes with multiple templates and AI-powered feedback."
            icon={FileText}
          />
          <FeatureCard
            title="Aptitude Testing"
            description="Practice with quantitative, logical, verbal, and data interpretation questions."
            icon={BookOpen}
          />
          <FeatureCard
            title="DSA Practice"
            description="Solve coding challenges similar to those asked in technical interviews."
            icon={Code}
          />
          <FeatureCard
            title="AI Mock Interviews"
            description="Simulate real interview experiences with our AI interviewer."
            icon={Mic}
          />
          <FeatureCard
            title="Learning Resources"
            description="Access curated study materials based on your performance and needs."
            icon={Award}
          />
          <FeatureCard
            title="Performance Analytics"
            description="Track your progress and identify areas for improvement."
            icon={BarChart}
          />
        </div>
      </SectionContainer>

      {/* Advanced Features */}
      <SectionContainer>
        <Heading
          title="Advanced Features"
          description="Take your interview preparation to the next level"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="AI Assistant"
            description="Get instant help with technical concepts, interview strategies, and personalized advice."
            icon={Bot}
          />
          <FeatureCard
            title="Custom Study Plans"
            description="Get personalized study plans based on your target role and timeline."
            icon={Brain}
          />
          <FeatureCard
            title="Interview Recordings"
            description="Record and review your mock interviews to identify areas for improvement."
            icon={Mic}
          />
          <FeatureCard
            title="Company-Specific Preparation"
            description="Access company-specific interview questions and practice tests."
            icon={Zap}
          />
          <FeatureCard
            title="Expert Reviews"
            description="Get feedback from industry experts on your resume and interview performance."
            icon={CheckCircle}
          />
          <FeatureCard
            title="Community Forum"
            description="Connect with other job seekers and share experiences and tips."
            icon={Award}
          />
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="primary" className="text-center">
        <div className="max-w-3xl mx-auto">
          <Heading
            title="Ready to start your interview preparation?"
            description="Join thousands of job seekers who have successfully landed their dream jobs with Interview Express."
            centered
            className="text-white"
            descriptionClassName="text-white/80"
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Sign Up For Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
