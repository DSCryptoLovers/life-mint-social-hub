
import React, { useState, useEffect } from 'react';
import { Fingerprint, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type OnboardingStep = 'auth' | 'display-name' | 'complete';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('auth');
  const [displayName, setDisplayName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setAuthError('');
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error('Biometric authentication not supported on this device');
      }

      // Create a simple credential request for local authentication
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "Omni-Life" },
          user: {
            id: new Uint8Array(16),
            name: "user@omni-life.app",
            displayName: "Omni-Life User",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential) {
        // Simulate wallet creation
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep('display-name');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError('Authentication failed. Please try again.');
    }
    
    setIsAuthenticating(false);
  };

  const handleDisplayNameSubmit = () => {
    if (displayName.trim()) {
      setCurrentStep('complete');
      
      // Auto-enter app after a brief moment
      setTimeout(() => {
        console.log('Entering app for user:', displayName);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && displayName.trim()) {
      handleDisplayNameSubmit();
    }
  };

  // Auth screen - minimal biometric prompt
  if (currentStep === 'auth') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="fade-in text-center">
          <div 
            className={`w-24 h-24 mx-auto mb-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isAuthenticating 
                ? 'border-black pulse-auth' 
                : 'border-gray-300 hover:border-black active:scale-95'
            }`}
            onClick={!isAuthenticating ? handleBiometricAuth : undefined}
          >
            <Fingerprint 
              className={`w-12 h-12 transition-colors ${
                isAuthenticating ? 'text-black' : 'text-gray-400'
              }`} 
            />
          </div>
          
          <p className="text-gray-600 text-sm">
            {isAuthenticating ? 'Creating wallet...' : 'Tap to authenticate'}
          </p>
          
          {authError && (
            <p className="text-red-500 text-xs mt-2">{authError}</p>
          )}
        </div>
      </div>
    );
  }

  // Display name screen
  if (currentStep === 'display-name') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm slide-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-medium text-black mb-2">Choose your name</h2>
            <p className="text-gray-500 text-sm">This is how others will see you</p>
          </div>
          
          <div className="space-y-4">
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Display name"
              className="h-12 text-center border-gray-200 focus:border-black focus:ring-0 rounded-lg"
              maxLength={20}
              autoFocus
            />
            
            <Button 
              onClick={handleDisplayNameSubmit}
              disabled={!displayName.trim()}
              className="w-full h-12 bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 rounded-lg font-medium"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success screen
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="fade-in text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600">Welcome, {displayName}</p>
      </div>
    </div>
  );
};

export default OnboardingFlow;
