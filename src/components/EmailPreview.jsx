import React, { useState, useEffect } from 'react';
import { Edit3, Copy, Check, Eye } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import Card from './Card';

const EmailPreview = ({ 
  email, 
  onUpdate, 
  onSend, 
  recipients = [],
  isEditing = false,
  onToggleEdit,
  isSending = false 
}) => {
  const [editedSubject, setEditedSubject] = useState(email?.subject || '');
  const [editedBody, setEditedBody] = useState(email?.body || '');
  const [copied, setCopied] = useState(false);

  // Update edited content when email prop changes
  useEffect(() => {
    if (email) {
      setEditedSubject(email.subject || '');
      setEditedBody(email.body || '');
    }
  }, [email]);

  const handleSave = () => {
    onUpdate({
      subject: editedSubject,
      body: editedBody
    });
    onToggleEdit();
  };

  const handleCancel = () => {
    setEditedSubject(email?.subject || '');
    setEditedBody(email?.body || '');
    onToggleEdit();
  };

  const handleCopy = async () => {
    try {
      const emailContent = `Subject: ${email.subject}\n\n${email.body}`;
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!email) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Eye className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-600">
          Generate an email to see the preview here
        </p>
      </Card>
    );
  }

  return (
    <Card 
      title="Email Preview"
      subtitle={`Recipients: ${recipients.length > 0 ? recipients.join(', ') : 'None specified'}`}
    >
      <div className="space-y-4">
        {isEditing ? (
          <>
            <Input
              label="Subject"
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              placeholder="Enter email subject..."
              required
            />
            
            <Textarea
              label="Email Body"
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              placeholder="Enter email content..."
              rows={12}
              required
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={handleSave}
                disabled={!editedSubject.trim() || !editedBody.trim()}
              >
                Save Changes
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-medium text-gray-900">{email.subject}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Body
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border min-h-[300px]">
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {email.body}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={onToggleEdit}
                variant="secondary"
                icon={Edit3}
              >
                Edit Email
              </Button>
              
              <Button 
                onClick={handleCopy}
                variant="secondary"
                icon={copied ? Check : Copy}
                className={copied ? 'text-green-600' : ''}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button 
                onClick={onSend}
                loading={isSending}
                disabled={recipients.length === 0}
                className="ml-auto"
              >
                Send Email
              </Button>
            </div>
            
            {recipients.length === 0 && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                Please add recipients before sending the email
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default EmailPreview;