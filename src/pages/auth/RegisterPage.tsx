
import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users
    if (currentUser && !isLoading) {
      if (currentUser.role === "organization") {
        navigate("/organization-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [currentUser, isLoading, navigate]);

  return (
    <MainLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] py-12">
        <div className="container max-w-5xl mx-auto px-4 flex-1 flex items-center justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  Join Interview Express
                </h2>
                <p className="text-gray-600">
                  Create an account to start preparing for your next interview and boost your chances of success.
                </p>
                <div className="border rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-medium mb-4">What you'll get:</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Access to all practice tests and coding challenges
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">
                        AI-powered resume builder with multiple templates
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Simulated interview sessions with real-time feedback
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Personalized study resources and learning paths
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
