import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, BarChart, Settings as SettingsIcon, Check } from 'lucide-react';

export function CookieSettingsPage() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always enabled
    functional: true,
    analytics: true,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Can't disable essential cookies
    
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSavePreferences = () => {
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const cookieCategories = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.',
      icon: Shield,
      required: true,
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.',
      icon: SettingsIcon,
      required: false,
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
      icon: BarChart,
      required: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
      icon: Cookie,
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Cookie Settings</h1>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. You can customize your preferences below.
          </p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Your cookie preferences have been saved successfully!</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleAcceptAll}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Accept All Cookies
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
            >
              Reject All (Essential Only)
            </Button>
            <Button
              onClick={handleSavePreferences}
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            >
              Save My Preferences
            </Button>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-4">
          {cookieCategories.map((category) => {
            const Icon = category.icon;
            const isEnabled = preferences[category.id as keyof typeof preferences];

            return (
              <div key={category.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                        {category.required && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                            Always Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => handleToggle(category.id as keyof typeof preferences)}
                      disabled={category.required}
                      className={category.required ? 'opacity-50 cursor-not-allowed' : ''}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">More Information</h3>
          <p className="text-blue-800 text-sm leading-relaxed mb-3">
            For more details about how we use cookies and process your data, please read our Privacy Policy. 
            You can change your cookie preferences at any time by returning to this page.
          </p>
          <a
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
          >
            Read our Privacy Policy →
          </a>
        </div>

        {/* Save Button (Bottom) */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSavePreferences}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8"
          >
            Save Cookie Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
