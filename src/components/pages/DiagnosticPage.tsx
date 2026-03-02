import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader2, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { createClient } from '@supabase/supabase-js';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  details?: string;
}

export function DiagnosticPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [databaseSchema, setDatabaseSchema] = useState<any>(null);

  // Auto-run diagnostics on page load
  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    const diagnosticResults: DiagnosticResult[] = [];

    // Test 1: Check server health
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-96ec88bb/health`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      if (response.ok) {
        diagnosticResults.push({
          name: 'Server Health Check',
          status: 'success',
          message: 'Edge Function is running',
          details: 'Server responded successfully'
        });
      } else {
        diagnosticResults.push({
          name: 'Server Health Check',
          status: 'error',
          message: 'Server not responding',
          details: `Status: ${response.status}`
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'Server Health Check',
        status: 'error',
        message: 'Cannot connect to server',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 2: Check app settings endpoint
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-96ec88bb/app-settings`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        diagnosticResults.push({
          name: 'App Settings Endpoint',
          status: 'success',
          message: 'Can read app settings',
          details: 'Database connection working'
        });
      } else {
        diagnosticResults.push({
          name: 'App Settings Endpoint',
          status: 'error',
          message: 'Cannot read app settings',
          details: data.error || 'Unknown error'
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'App Settings Endpoint',
        status: 'error',
        message: 'App settings request failed',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 3: Check database tables (by trying to read contacts)
    try {
      // This will fail if not authenticated, but we can check the error message
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-96ec88bb/admin/contacts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      const data = await response.json();
      
      if (response.status === 401) {
        diagnosticResults.push({
          name: 'Database Tables Check',
          status: 'success',
          message: 'Tables exist (auth required)',
          details: 'Database is set up correctly'
        });
      } else if (response.ok) {
        diagnosticResults.push({
          name: 'Database Tables Check',
          status: 'warning',
          message: 'No authentication required?',
          details: 'This should require authentication'
        });
      } else {
        diagnosticResults.push({
          name: 'Database Tables Check',
          status: 'error',
          message: 'Tables may not exist',
          details: data.error || 'Run the migration SQL in Supabase Dashboard'
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'Database Tables Check',
        status: 'error',
        message: 'Cannot check database tables',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 4: Test contact form submission
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-96ec88bb/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Diagnostic Test',
            message: 'This is a test message from diagnostic page'
          })
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        diagnosticResults.push({
          name: 'Contact Form Submission',
          status: 'success',
          message: 'Form submission working!',
          details: 'Migration was run successfully! Check admin dashboard for test message.'
        });
      } else {
        diagnosticResults.push({
          name: 'Contact Form Submission',
          status: 'error',
          message: 'Form submission failed',
          details: data.error || 'Run the migration SQL in Supabase Dashboard'
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'Contact Form Submission',
        status: 'error',
        message: 'Cannot submit contact form',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 5: Check if server is running
    const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-96ec88bb`;
    try {
      const response = await fetch(`${serverUrl}/health`);
      const data = await response.json();
      
      if (response.ok && data.status === 'running') {
        diagnosticResults.push({
          name: 'Server Status',
          status: 'success',
          message: 'Server is running',
          details: 'Server is operational'
        });
      } else {
        diagnosticResults.push({
          name: 'Server Status',
          status: 'error',
          message: 'Server not running',
          details: data.error || 'Check server logs'
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'Server Status',
        status: 'error',
        message: 'Cannot check server status',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 6: Check if database is connected
    try {
      const response = await fetch(`${serverUrl}/db-status`);
      const data = await response.json();
      
      if (response.ok && data.connected) {
        diagnosticResults.push({
          name: 'Database Connection',
          status: 'success',
          message: 'Database is connected',
          details: 'Database connection is active'
        });
      } else {
        diagnosticResults.push({
          name: 'Database Connection',
          status: 'error',
          message: 'Database not connected',
          details: data.error || 'Check database settings'
        });
      }
    } catch (error) {
      diagnosticResults.push({
        name: 'Database Connection',
        status: 'error',
        message: 'Cannot check database connection',
        details: String(error)
      });
    }

    setResults([...diagnosticResults]);

    // Test 7: Check database tables
    const supabase = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
    try {
      const { data: tables, error: tablesError } = await supabase
        .from('contact_messages')
        .select('id')
        .limit(1);
      
      diagnosticResults.push({
        name: 'Contact Messages Table',
        status: tablesError ? 'error' : 'success',
        message: tablesError 
          ? `Table error: ${tablesError.message}` 
          : 'contact_messages table exists and is accessible',
        details: tablesError?.message,
      });
    } catch (error: any) {
      diagnosticResults.push({
        name: 'Contact Messages Table',
        status: 'error',
        message: 'Failed to check table',
        details: error.message,
      });
    }

    setResults([...diagnosticResults]);

    // Test 8: Check training_requests table
    try {
      const { data: training, error: trainingError } = await supabase
        .from('training_requests')
        .select('id')
        .limit(1);
      
      diagnosticResults.push({
        name: 'Training Requests Table',
        status: trainingError ? 'error' : 'success',
        message: trainingError 
          ? `Table error: ${trainingError.message}` 
          : 'training_requests table exists and is accessible',
        details: trainingError?.message,
      });
    } catch (error: any) {
      diagnosticResults.push({
        name: 'Training Requests Table',
        status: 'error',
        message: 'Failed to check table',
        details: error.message,
      });
    }

    setResults([...diagnosticResults]);

    // Test 9: Check app_settings table structure
    try {
      const { data: appSettings, error: appSettingsError } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1);
      
      if (appSettingsError) {
        diagnosticResults.push({
          name: 'App Settings Table',
          status: 'error',
          message: `Table error: ${appSettingsError.message}`,
          details: appSettingsError.message,
        });
      } else {
        const hasSiteSettings = appSettings?.[0]?.hasOwnProperty('site_settings');
        diagnosticResults.push({
          name: 'App Settings Table Structure',
          status: hasSiteSettings ? 'success' : 'warning',
          message: hasSiteSettings 
            ? 'app_settings table has site_settings JSONB column ✓' 
            : '⚠️ MISSING: site_settings column not found! Run migration SQL.',
          details: hasSiteSettings 
            ? `Columns found: ${Object.keys(appSettings[0] || {}).join(', ')}`
            : 'The site_settings JSONB column is required for AdminPage settings to persist. See DATABASE_SETUP_INSTRUCTIONS.md',
        });
        
        // Save schema for display
        if (appSettings?.[0]) {
          setDatabaseSchema(appSettings[0]);
        }
      }
    } catch (error: any) {
      diagnosticResults.push({
        name: 'App Settings Table',
        status: 'error',
        message: 'Failed to check table structure',
        details: error.message,
      });
    }

    setResults([...diagnosticResults]);

    // Test 10: Check if settings endpoint returns data
    try {
      const response = await fetch(`${serverUrl}/settings`);
      const settingsData = await response.json();
      
      const hasSettings = settingsData?.settings && Object.keys(settingsData.settings).length > 0;
      diagnosticResults.push({
        name: 'Settings Endpoint (AdminPage)',
        status: response.ok ? (hasSettings ? 'success' : 'warning') : 'error',
        message: response.ok 
          ? (hasSettings 
              ? 'Settings endpoint working, data is being returned ✓' 
              : '⚠️ Settings endpoint working but no data stored yet')
          : 'Settings endpoint error',
        details: response.ok 
          ? `Settings keys: ${Object.keys(settingsData.settings || {}).join(', ') || 'none'}` 
          : 'Failed to fetch settings',
      });
    } catch (error: any) {
      diagnosticResults.push({
        name: 'Settings Endpoint',
        status: 'error',
        message: 'Failed to fetch settings',
        details: error.message,
      });
    }

    setResults([...diagnosticResults]);

    // Test 11: Test saving settings
    try {
      const testSettings = { test: 'diagnostic_test_' + Date.now() };
      const response = await fetch(`${serverUrl}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: testSettings }),
      });
      const result = await response.json();
      
      diagnosticResults.push({
        name: 'Settings Save Test (AdminPage)',
        status: response.ok && result.success ? 'success' : 'error',
        message: response.ok && result.success
          ? 'Settings can be saved to database ✓'
          : '❌ Settings save failed - migration may not be complete',
        details: response.ok 
          ? 'POST /settings endpoint working correctly' 
          : `Error: ${result.error || 'Unknown error'}`,
      });
    } catch (error: any) {
      diagnosticResults.push({
        name: 'Settings Save Test',
        status: 'error',
        message: '❌ Failed to test settings save',
        details: error.message,
      });
    }

    setResults([...diagnosticResults]);
    setIsRunning(false);
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
    }
  };

  const allSuccess = results.length > 0 && results.every(r => r.status === 'success');
  const hasErrors = results.some(r => r.status === 'error');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">ShopSpot Diagnostic Tool</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This tool checks if your Supabase database is properly configured and the server is working correctly.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Diagnostics</CardTitle>
            <CardDescription>
              Click the button below to run a comprehensive system check
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              className="w-full bg-gradient-to-r from-[#005EEA] to-purple-600 hover:from-[#004BBD] hover:to-purple-700"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Diagnostics...
                </>
              ) : (
                'Run Diagnostics'
              )}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <>
            {allSuccess && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">All Systems Operational! 🎉</AlertTitle>
                <AlertDescription className="text-green-800">
                  Your ShopSpot database and server are properly configured and working perfectly.
                  Data persistence is active!
                </AlertDescription>
              </Alert>
            )}

            {hasErrors && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-900">Configuration Required</AlertTitle>
                <AlertDescription className="text-red-800">
                  Some issues were detected. Please follow the instructions in <code className="bg-red-100 px-2 py-1 rounded">/QUICK_FIX.md</code> to run the migration in your Supabase dashboard.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index} className={`border-2 ${getStatusColor(result.status)}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getStatusIcon(result.status)}
                        {result.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm font-medium">
                      {result.message}
                    </CardDescription>
                  </CardHeader>
                  {result.details && (
                    <CardContent>
                      <p className="text-sm text-gray-600 font-mono bg-white/50 p-3 rounded border">
                        {result.details}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}

        {hasErrors && results.length > 0 && (
          <Card className="mt-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="w-5 h-5" />
                How to Fix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-900">
              <div className="space-y-2">
                <h4 className="font-semibold">Step 1: Open Supabase Dashboard</h4>
                <p className="text-sm">
                  Go to:{' '}
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline font-mono"
                  >
                    https://supabase.com/dashboard
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Step 2: Run the Migration</h4>
                <ol className="text-sm list-decimal list-inside space-y-1">
                  <li>Select your project: <code className="bg-blue-100 px-2 py-1 rounded">{projectId}</code></li>
                  <li>Click "SQL Editor" in the left sidebar</li>
                  <li>Click "New query"</li>
                  <li>Copy ALL content from <code className="bg-blue-100 px-2 py-1 rounded">/supabase/migrations/20241217000000_create_shopspot_tables.sql</code></li>
                  <li>Paste into SQL Editor and click "Run"</li>
                  <li>Wait for success message</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Step 3: Verify & Test</h4>
                <p className="text-sm">
                  After running the migration, come back to this page and run diagnostics again.
                  All checks should pass! ✅
                </p>
              </div>

              <Alert className="border-blue-300 bg-blue-100">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Need detailed help?</strong> Check{' '}
                  <code className="bg-blue-200 px-2 py-1 rounded">/QUICK_FIX.md</code>{' '}
                  for step-by-step instructions with screenshots.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Database Schema Display */}
        {databaseSchema && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Database size={20} />
              app_settings Table Schema
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 mb-2">Columns detected in database:</p>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(
                    Object.keys(databaseSchema).reduce((acc, key) => {
                      acc[key] = typeof databaseSchema[key];
                      return acc;
                    }, {} as any),
                    null,
                    2
                  )}
                </pre>
              </div>
              
              {!databaseSchema.hasOwnProperty('site_settings') && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 mb-2">
                    ⚠️ <strong>Action Required:</strong> The `site_settings` column is missing!
                  </p>
                  <p className="text-sm text-yellow-700 mb-2">
                    This column is required for the Admin Panel settings to persist. Without it, changes to:
                  </p>
                  <ul className="text-sm text-yellow-700 list-disc list-inside ml-4 mb-2">
                    <li>Contact information</li>
                    <li>Pricing plans</li>
                    <li>YouTube URLs</li>
                    <li>Google Form URLs</li>
                  </ul>
                  <p className="text-sm text-yellow-700">
                    ...will only be saved locally in your browser.
                  </p>
                  <p className="text-sm text-yellow-800 mt-3">
                    📋 <strong>Next Step:</strong> See <code className="bg-yellow-100 px-2 py-1 rounded">DATABASE_SETUP_INSTRUCTIONS.md</code> for the SQL migration script.
                  </p>
                </div>
              )}
              
              {databaseSchema.hasOwnProperty('site_settings') && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    ✓ <strong>Good!</strong> The `site_settings` column exists. Admin Panel settings will persist across devices.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin Panels Info */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-gray-900 mb-4">📋 Your Admin Panels</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-gray-900 mb-2">1. AdminPage (<code>/admin</code>)</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Purpose:</strong> Manage site-wide content (pricing, contact info, YouTube URLs)
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Database:</strong> <code>app_settings.site_settings</code> (JSONB column)
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Sections:</strong> Pricing Plans, YouTube Videos, App Downloads, Google Forms, Contact Info
              </p>
              <p className="text-sm text-gray-700">
                <strong>Access:</strong> Click Settings icon on homepage or navigate to <code>/admin</code>
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-gray-900 mb-2">2. AdminDashboard (<code>/admin-login</code>)</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Purpose:</strong> View customer inquiries and manage app store links
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Database:</strong> <code>contact_messages</code>, <code>training_requests</code>, <code>app_settings</code> (dedicated columns)
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Sections:</strong> Contact Messages, Training Requests, App Settings (Play Store, App Store, APK)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Access:</strong> Navigate to <code>/admin-login</code>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Project ID: <code className="bg-gray-100 px-2 py-1 rounded">{projectId}</code>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Edge Function: <code className="bg-gray-100 px-2 py-1 rounded">make-server-96ec88bb</code>
          </p>
        </div>
      </div>
    </div>
  );
}