"use client";

import { useState } from "react";

export default function Home() {
  // Intentional error - referencing a non-existent variable
  //console.log(nonExistentVariable.property);

  const [recipient, setRecipient] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipient,
          data: {
            username,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true });
      } else {
        setResult({ error: data.error || "Failed to send email" });
      }
    } catch {
      setResult({ error: "An error occurred while sending the email" });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Build query params for the preview
    const params = new URLSearchParams();
    if (username) params.append("username", username);

    // Open preview in a new tab
    window.open(`/previewEmail?${params.toString()}`, "_blank");
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Email App</h1>
        <p className="text-gray-800">Create and send beautiful emails with React Email</p>
      </header>

      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-mediummb-1">Recipient Email *</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
              placeholder="recipient@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handlePreview}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Preview Email
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>

        {result && (
          <div className={`mt-4 p-3 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {result.success ? "Email sent successfully!" : result.error}
          </div>
        )}
      </div>
    </div>
  );
}
