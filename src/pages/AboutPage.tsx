
import { MainLayout } from "@/components/layout/MainLayout";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading } from "@/components/ui/heading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <SectionContainer className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Heading
            title="About Interview Express"
            description="Your all-in-one platform for interview preparation and career advancement"
            centered
            className="mb-8"
          />
        </div>
      </SectionContainer>

      {/* Our Mission */}
      <SectionContainer background="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Heading
              title="Our Mission"
              description="We're on a mission to democratize access to quality interview preparation tools and help job seekers land their dream jobs."
            />
            <div className="mt-6 space-y-4">
              <p className="text-gray-600">
                Interview Express was founded in 2023 by a team of tech industry veterans who recognized the challenges that candidates face when preparing for technical interviews.
              </p>
              <p className="text-gray-600">
                Our goal is to provide a comprehensive platform that addresses every aspect of interview preparation, from resume creation to technical practice and mock interviews.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center h-full">
              <Target className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* What We Offer */}
      <SectionContainer>
        <Heading
          title="What We Offer"
          description="A comprehensive suite of tools to boost your interview performance"
          centered
          className="mb-12"
        />

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Professional Resume Builder</p>
                  <p className="text-gray-600">Multiple templates with AI-powered feedback</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprehensive Practice Tests</p>
                  <p className="text-gray-600">Aptitude tests and DSA challenges tailored to your target roles</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">AI Mock Interviews</p>
                  <p className="text-gray-600">Realistic interview simulations with instant feedback</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">AI Assistant</p>
                  <p className="text-gray-600">Get instant help with concepts and personalized advice</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">For Organizations</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Candidate Management</p>
                  <p className="text-gray-600">Track and manage your candidate pipeline</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Custom Assessment Creation</p>
                  <p className="text-gray-600">Create tailored assessments for your hiring needs</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Advanced Analytics</p>
                  <p className="text-gray-600">Gain insights into candidate performance and skills</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Why Choose Us */}
      <SectionContainer background="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Heading
              title="Why Choose Interview Express?"
              description="What sets us apart from other interview preparation platforms"
            />
            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Comprehensive Suite</strong>: All your interview preparation tools in one platform
                </p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>AI-Powered</strong>: Advanced AI for personalized feedback and guidance
                </p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Industry-Relevant</strong>: Content created by industry experts
                </p>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Continuous Updates</strong>: Regular updates to reflect the latest interview trends
                </p>
              </li>
            </ul>
          </div>
          <div>
            <Heading
              title="Our Impact"
              description="How we're helping job seekers succeed in their interviews"
            />
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-3xl font-bold text-primary">90%</p>
                  <p className="text-sm text-gray-600">Increased confidence</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-3xl font-bold text-primary">75%</p>
                  <p className="text-sm text-gray-600">Improved technical skills</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-3xl font-bold text-primary">40%</p>
                  <p className="text-sm text-gray-600">Higher offer rate</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-gray-600">Users worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="primary" className="text-center">
        <div className="max-w-3xl mx-auto">
          <Heading
            title="Ready to start your journey with us?"
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
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
