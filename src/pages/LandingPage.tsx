
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/hero-section";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading } from "@/components/ui/heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Code,
  Mic,
  Award,
  BarChart,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="Land Your Dream Job with Interview Express"
        subtitle="The all-in-one platform to prepare and ace your technical interviews"
        primaryButtonText="Get Started"
        primaryButtonLink="/register"
        secondaryButtonText="Learn More"
        secondaryButtonLink="#features"
        className="py-20 bg-gradient-to-br from-primary/10 to-white"
      />

      {/* Features Section */}
      <SectionContainer id="features" background="light">
        <Heading
          title="Prepare for interviews with confidence"
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

      {/* How It Works Section */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading
              title="How Interview Express Works"
              description="A streamlined process to help you prepare for your next interview"
            />
            
            <div className="space-y-4 mt-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Create your resume</h3>
                  <p className="text-gray-600 mt-1">
                    Build a professional resume with our templates and get AI-powered feedback.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Practice with tests</h3>
                  <p className="text-gray-600 mt-1">
                    Take aptitude tests and solve coding challenges to strengthen your skills.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Simulate interviews</h3>
                  <p className="text-gray-600 mt-1">
                    Participate in AI-powered mock interviews with real-time feedback.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Improve and succeed</h3>
                  <p className="text-gray-600 mt-1">
                    Use analytics and learning resources to continuously improve your skills.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/register">
                <Button size="lg">Start Your Journey</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=1974&auto=format&fit=crop" 
              alt="Person in interview"
              className="w-full rounded-lg shadow-md"
            />
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>90%</strong> of users report increased interview confidence
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>75%</strong> of users improve their technical interview skills within 2 weeks
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>40%</strong> higher job offer rate compared to unprepared candidates
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="primary" className="text-center">
        <div className="max-w-3xl mx-auto">
          <Heading
            title="Ready to ace your next interview?"
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
