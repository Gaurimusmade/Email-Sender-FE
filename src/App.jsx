import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Mail, Sparkles, Settings, Github } from 'lucide-react';

import EmailGenerator from './components/EmailGenerator';
import EmailPreview from './components/EmailPreview';
import RecipientManager from './components/RecipientManager';
import ServiceStatus from './components/ServiceStatus';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';

import apiService from './services/apiService';

function App() {
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isHealthy, setIsHealthy] = useState(null);

  // Check backend health on app load
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await apiService.healthCheck();
      setIsHealthy(true);
    } catch (error) {
      setIsHealthy(false);
      toast.error('Backend server is not responding. Please check if it\'s running.');
    }
  };

  const handleGenerateEmail = async (data) => {
    setIsGenerating(true);
    try {
      const response = await apiService.generateEmail(data);
      
      // Only extract subject and body, ignore metadata
      setGeneratedEmail({
        subject: response.data.subject,
        body: response.data.body
      });
      
      // Update recipients if provided in generation request
      if (data.recipients && data.recipients.length > 0) {
        const newRecipients = [...recipients];
        data.recipients.forEach(email => {
          if (!newRecipients.includes(email)) {
            newRecipients.push(email);
          }
        });
        setRecipients(newRecipients);
      }
      
      toast.success('Email generated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate email');
      console.error('Email generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateEmail = (updatedEmail) => {
    setGeneratedEmail(prev => ({
      ...prev,
      subject: updatedEmail.subject,
      body: updatedEmail.body
    }));
    toast.success('Email updated successfully!');
  };

  const handleSendEmail = async () => {
    if (!generatedEmail || recipients.length === 0) {
      toast.error('Please generate an email and add recipients before sending');
      return;
    }

    setIsSending(true);
    try {
      // Debug: log what we're sending
      console.log('Frontend sending email with:', {
        recipients: recipients.length,
        subject: generatedEmail.subject?.substring(0, 50) + '...',
        bodyType: typeof generatedEmail.body,
        bodyPreview: generatedEmail.body?.substring(0, 100) + '...',
        bodyContainsJSON: generatedEmail.body?.includes('{') || generatedEmail.body?.includes('}')
      });
      
      const response = await apiService.sendEmail({
        recipients,
        subject: generatedEmail.subject,
        body: generatedEmail.body,
        senderName: 'AI Email Sender'
      });

      if (response.data.successful > 0) {
        toast.success(
          `Email sent successfully to ${response.data.successful} out of ${response.data.totalRecipients} recipients!`
        );
        
        if (response.data.failures && response.data.failures.length > 0) {
          toast.error(
            `Failed to send to ${response.data.failures.length} recipients. Check console for details.`
          );
          console.error('Send failures:', response.data.failures);
        }
      } else {
        toast.error('Failed to send email to any recipients');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send email');
      console.error('Email sending error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleRecipientsChange = (newRecipients) => {
    setRecipients(newRecipients);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isHealthy === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-red-500 mb-4">
              <Mail className="h-16 w-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Backend Connection Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Unable to connect to the backend server. Please ensure the backend is running on port 5000.
            </p>
            <Button onClick={checkBackendHealth}>
              Retry Connection
            </Button>
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Quick Setup:</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Navigate to Email-Sender-BE folder</li>
                <li>2. Run: npm install</li>
                <li>3. Copy env.example to .env</li>
                <li>4. Configure your API keys</li>
                <li>5. Run: npm run dev</li>
              </ol>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  if (isHealthy === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Connecting to backend..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-primary-600 mr-3" />
                <h1 className="text-xl font-bold text-gray-900">
                  AI Email Sender
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                icon={Settings}
              >
                Settings
              </Button>
              
              <a
                href="https://github.com/Gaurimusmade/email-sender"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Email Generation */}
          <div className="lg:col-span-2 space-y-8">
            <EmailGenerator 
              onGenerate={handleGenerateEmail}
              isGenerating={isGenerating}
            />
            
            <EmailPreview
              email={generatedEmail}
              onUpdate={handleUpdateEmail}
              onSend={handleSendEmail}
              recipients={recipients}
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              isSending={isSending}
            />
          </div>

          {/* Right Column - Recipients & Status */}
          <div className="space-y-8">
            <RecipientManager
              recipients={recipients}
              onRecipientsChange={handleRecipientsChange}
            />
            
            {showSettings && (
              <ServiceStatus />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built with React, Node.js, and OpenAI • 
              <span className="ml-1">
                Generate professional emails with AI assistance
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;