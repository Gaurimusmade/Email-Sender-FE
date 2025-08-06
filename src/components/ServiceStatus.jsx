import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Server, Bot, Mail } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import StatusIndicator from './StatusIndicator';
import apiService from '../services/apiService';

const ServiceStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await apiService.getServiceStatus();
      setStatus(response.data);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Failed to check service status:', error);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getStatusIcon = (configured) => {
    return configured ? CheckCircle : XCircle;
  };

  const getStatusColor = (configured) => {
    return configured ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card 
      title="Service Status"
      subtitle={lastChecked ? `Last checked: ${lastChecked.toLocaleTimeString()}` : 'Checking services...'}
    >
      <div className="space-y-4">
        {/* Refresh Button */}
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">
            System Health
          </h4>
          <Button
            variant="secondary"
            size="sm"
            onClick={checkStatus}
            loading={loading}
            icon={RefreshCw}
          >
            Refresh
          </Button>
        </div>

        {status ? (
          <div className="space-y-3">
            {/* Email Service Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Service
                  </p>
                  <p className="text-xs text-gray-500">
                    {status.emailService.configured 
                      ? `${status.emailService.host} (${status.emailService.user})`
                      : 'Not configured'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {React.createElement(
                  getStatusIcon(status.emailService.configured),
                  { className: `h-5 w-5 ${getStatusColor(status.emailService.configured)}` }
                )}
              </div>
            </div>

            {/* AI Service Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    AI Service
                  </p>
                  <p className="text-xs text-gray-500">
                    {status.aiService.configured 
                      ? `${status.aiService.provider} API`
                      : 'Not configured'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {React.createElement(
                  getStatusIcon(status.aiService.configured),
                  { className: `h-5 w-5 ${getStatusColor(status.aiService.configured)}` }
                )}
              </div>
            </div>

            {/* Server Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Server
                  </p>
                  <p className="text-xs text-gray-500">
                    Environment: {status.server.environment}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>

            {/* Overall Status */}
            <div className="pt-3 border-t">
              {status.emailService.configured && status.aiService.configured ? (
                <StatusIndicator 
                  status="success" 
                  message="All services are configured and ready" 
                />
              ) : (
                <StatusIndicator 
                  status="warning" 
                  message="Some services need configuration. Check environment variables." 
                />
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <StatusIndicator 
                status="pending" 
                message="Checking service status..." 
              />
            ) : (
              <StatusIndicator 
                status="error" 
                message="Failed to check service status. Make sure the backend is running." 
              />
            )}
          </div>
        )}

        {/* Configuration Help */}
        {status && (!status.emailService.configured || !status.aiService.configured) && (
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-900 mb-2">
                  Configuration Required
                </h4>
                <div className="text-sm text-amber-800 space-y-1">
                  {!status.emailService.configured && (
                    <p>• Configure email settings in backend environment variables</p>
                  )}
                  {!status.aiService.configured && (
                    <p>• Add OpenAI API key to backend environment variables</p>
                  )}
                  <p className="mt-2 text-xs">
                    See the backend README for detailed setup instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ServiceStatus;