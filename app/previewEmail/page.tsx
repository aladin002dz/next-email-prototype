"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import WelcomeEmail from "../emails/welcome-email";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [emailContent, setEmailContent] = useState<React.ReactNode | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"preview" | "html">("preview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get parameters without modifying the URL
    const username = searchParams.get("username") || "User";

    // Set React component preview
    setEmailContent(<WelcomeEmail username={username} />);

    // Create params for API call without modifying the browser URL
    const apiParams = new URLSearchParams();
    apiParams.set("username", username);

    // Fetch HTML content
    const fetchHtmlContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/preview?${apiParams.toString()}`);
        if (response.ok) {
          const html = await response.text();
          setHtmlContent(html);
        } else {
          setHtmlContent("<p>Error loading HTML preview</p>");
        }
      } catch (error) {
        console.error("Error fetching HTML:", error);
        setHtmlContent("<p>Error loading HTML preview</p>");
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlContent();
  }, [searchParams]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h1 className="text-2xl font-bold mb-6">Email Preview</h1>

          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("preview")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "preview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Component Preview
              </button>
              <button
                onClick={() => setActiveTab("html")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "html"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                HTML View
              </button>
            </nav>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              {activeTab === "preview" ? (
                <div className="p-4">{emailContent}</div>
              ) : (
                <div className="relative">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(htmlContent);
                        alert("HTML copied to clipboard!");
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm"
                    >
                      Copy HTML
                    </button>
                  </div>
                  <pre className="bg-gray-50 p-4 overflow-x-auto text-sm text-gray-800 max-h-[500px] overflow-y-auto">
                    {htmlContent}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => window.close()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Close Preview
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <p className="font-medium mb-2">Preview Notes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Component Preview shows how the email looks rendered as a React component</li>
            <li>HTML View shows the actual HTML that would be sent in the email</li>
            <li>Email clients may render the email differently than shown here</li>
            <li>Use the Copy HTML button to copy the HTML for testing in email clients</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
