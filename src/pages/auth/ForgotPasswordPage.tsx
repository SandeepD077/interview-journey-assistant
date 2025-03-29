
import { MainLayout } from "@/components/layout/MainLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
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
                  Reset Your Password
                </h2>
                <p className="text-gray-600">
                  Forgot your password? No problem. Enter your email address and we'll send you a password reset link.
                </p>
                <div className="border rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-medium mb-4">Need help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you're having trouble accessing your account, here are some tips:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Check your spam folder for the reset email
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Make sure you're using the email address you registered with
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        Contact support if you continue having issues
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
