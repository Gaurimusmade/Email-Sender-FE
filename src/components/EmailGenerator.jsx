import React, { useState } from 'react';
import { Sparkles, Mail, Users } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import Card from './Card';
import { validatePrompt, validateEmailList } from '../utils/validation';

const EmailGenerator = ({ onGenerate, isGenerating = false }) => {
  const [prompt, setPrompt] = useState('');
  const [recipients, setRecipients] = useState('');
  const [tone, setTone] = useState('professional');
  const [emailType, setEmailType] = useState('general');
  const [errors, setErrors] = useState({});

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' }
  ];

  const typeOptions = [
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'invitation', label: 'Invitation' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    const promptValidation = validatePrompt(prompt);
    if (!promptValidation.isValid) {
      newErrors.prompt = promptValidation.errors[0];
    }

    if (recipients.trim()) {
      const emailValidation = validateEmailList(recipients);
      if (emailValidation.errors.length > 0) {
        newErrors.recipients = emailValidation.errors[0];
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const recipientList = recipients.trim() 
        ? recipients.split(/[,;\n]/).map(email => email.trim()).filter(email => email)
        : [];

      onGenerate({
        prompt: prompt.trim(),
        recipients: recipientList,
        tone,
        emailType
      });
    }
  };

  const handleClearForm = () => {
    setPrompt('');
    setRecipients('');
    setTone('professional');
    setEmailType('general');
    setErrors({});
  };

  return (
    <Card 
      title="AI Email Generator"
      subtitle="Describe what you want to communicate and let AI craft the perfect email"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Textarea
          label="Email Context/Prompt"
          placeholder="Describe the purpose of your email... (e.g., 'Follow up with potential clients after yesterday's product demo, emphasize key benefits and schedule next steps')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          required
          error={errors.prompt}
          helper="Be specific about the context, purpose, and key points you want to include"
        />

        <Textarea
          label="Recipients (Optional)"
          placeholder="Enter email addresses separated by commas, semicolons, or new lines..."
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          rows={3}
          error={errors.recipients}
          helper="You can add recipients now or later before sending"
          icon={Users}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Email Tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            options={toneOptions}
            helper="Choose the appropriate tone for your audience"
          />

          <Select
            label="Email Type"
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            options={typeOptions}
            helper="Select the category that best fits your email"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="submit"
            loading={isGenerating}
            disabled={!prompt.trim()}
            icon={Sparkles}
            className="flex-1 md:flex-none"
          >
            Generate Email
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClearForm}
            disabled={isGenerating}
          >
            Clear
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Pro Tips for Better Results
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about the context and purpose</li>
                <li>• Mention key points you want to include</li>
                <li>• Specify your relationship with recipients</li>
                <li>• Include any deadlines or next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default EmailGenerator;