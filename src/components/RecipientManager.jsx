import React, { useState } from 'react';
import { Plus, X, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import { validateEmailList } from '../utils/validation';

const RecipientManager = ({ recipients = [], onRecipientsChange }) => {
  const [newRecipients, setNewRecipients] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleAddRecipients = () => {
    if (!newRecipients.trim()) return;

    const validation = validateEmailList(newRecipients);
    setValidationResult(validation);

    if (validation.valid.length > 0) {
      // Add new valid emails that aren't already in the list
      const uniqueEmails = validation.valid.filter(email => !recipients.includes(email));
      if (uniqueEmails.length > 0) {
        onRecipientsChange([...recipients, ...uniqueEmails]);
        setNewRecipients('');
        // Clear validation after successful add
        setTimeout(() => setValidationResult(null), 3000);
      }
    }
  };

  const handleRemoveRecipient = (emailToRemove) => {
    onRecipientsChange(recipients.filter(email => email !== emailToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddRecipients();
    }
  };

  const handleClearAll = () => {
    onRecipientsChange([]);
    setValidationResult(null);
  };

  return (
    <Card 
      title="Email Recipients"
      subtitle={`${recipients.length} recipient${recipients.length !== 1 ? 's' : ''} added`}
    >
      <div className="space-y-4">
        {/* Add Recipients Input */}
        <div className="space-y-2">
          <Input
            label="Add Recipients"
            placeholder="Enter email addresses separated by commas, semicolons, or new lines..."
            value={newRecipients}
            onChange={(e) => setNewRecipients(e.target.value)}
            onKeyPress={handleKeyPress}
            icon={Mail}
            helper="Press Enter or click Add to include these recipients"
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleAddRecipients}
              disabled={!newRecipients.trim()}
              icon={Plus}
              size="sm"
            >
              Add Recipients
            </Button>
            
            {recipients.length > 0 && (
              <Button
                variant="secondary"
                onClick={handleClearAll}
                size="sm"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Validation Results */}
        {validationResult && (
          <div className="space-y-2">
            {validationResult.valid.length > 0 && (
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">
                  {validationResult.valid.length} valid email{validationResult.valid.length !== 1 ? 's' : ''} found
                </span>
              </div>
            )}
            
            {validationResult.errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">
                      Invalid email addresses:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1">
                      {validationResult.errors.slice(0, 3).map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                      {validationResult.errors.length > 3 && (
                        <li>• ... and {validationResult.errors.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recipients List */}
        {recipients.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Recipients List:
            </h4>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {recipients.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border group hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {email}
                    </span>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemoveRecipient(email)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
                    icon={X}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No recipients added yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Add email addresses above to get started
            </p>
          </div>
        )}

        {/* Summary */}
        {recipients.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">
                Ready to send to {recipients.length} recipient{recipients.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipientManager;