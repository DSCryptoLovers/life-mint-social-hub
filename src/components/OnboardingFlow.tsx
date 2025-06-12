
import React, { useState } from 'react';
import { Fingerprint, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type OnboardingStep = 'welcome' | 'biometric' | 'wallet-created' | 'display-name' | 'complete';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [displayName, setDisplayName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBiometricAuth = async () => {
    setIsProcessing(true);
    // Simulate biometric authentication and wallet creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStep('wallet-created');
    setIsProcessing(false);
    
    // Auto-advance to display name after showing success
    setTimeout(() => {
      setCurrentStep('display-name');
    }, 2000);
  };

  const handleDisplayNameSubmit = () => {
    if (displayName.trim()) {
      setCurrentStep('complete');
    }
  };

  const renderWelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="slide-up">
        <div className="w-20 h-20 mx-auto mb-8 gradient-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Welcome to Omni-Life
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-md">
          Your Web3 super-app for social, wallet, and NFT experiences
        </p>
        <Button 
          onClick={() => setCurrentStep('biometric')}
          size="lg"
          className="w-full max-w-sm h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-elevated"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderBiometricScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="slide-up">
        <h2 className="text-3xl font-bold mb-4">Secure Wallet Creation</h2>
        <p className="text-muted-foreground mb-12 max-w-md">
          Use your fingerprint to create a secure multi-chain wallet instantly
        </p>
        
        <div className="relative mb-12">
          <div 
            className={`w-32 h-32 mx-auto rounded-full border-4 border-primary/20 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isProcessing ? 'fingerprint-pulse border-primary' : 'hover:border-primary/40 hover:shadow-glow'
            }`}
            onClick={!isProcessing ? handleBiometricAuth : undefined}
          >
            <Fingerprint className={`w-16 h-16 ${isProcessing ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          {isProcessing ? 'Creating your wallet...' : 'Tap to authenticate with your fingerprint'}
        </p>
      </div>
    </div>
  );

  const renderWalletCreatedScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="slide-up">
        <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
          <Wallet className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-green-600">Wallet Created!</h2>
        <p className="text-muted-foreground mb-4 max-w-md">
          Your secure multi-chain wallet is ready
        </p>
        <div className="bg-muted rounded-lg p-4 max-w-sm mx-auto">
          <p className="text-xs text-muted-foreground mb-2">Wallet Address</p>
          <p className="font-mono text-sm break-all">0x742d...4f8c</p>
        </div>
      </div>
    </div>
  );

  const renderDisplayNameScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Identity</h2>
          <p className="text-muted-foreground">
            Pick a display name for your Omni-Life profile
          </p>
        </div>
        
        <Card className="p-6 shadow-elevated">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className="h-12 text-lg"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {displayName.length}/20 characters
              </p>
            </div>
            
            <Button 
              onClick={handleDisplayNameSubmit}
              disabled={!displayName.trim()}
              className="w-full h-12 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity"
            >
              Complete Setup
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCompleteScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="slide-up">
        <div className="w-24 h-24 mx-auto mb-8 gradient-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Welcome, {displayName}!</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          You're all set! Start exploring your Web3 social experience.
        </p>
        <Button 
          size="lg"
          className="w-full max-w-sm h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-elevated"
        >
          Enter Omni-Life
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  switch (currentStep) {
    case 'welcome':
      return renderWelcomeScreen();
    case 'biometric':
      return renderBiometricScreen();
    case 'wallet-created':
      return renderWalletCreatedScreen();
    case 'display-name':
      return renderDisplayNameScreen();
    case 'complete':
      return renderCompleteScreen();
    default:
      return renderWelcomeScreen();
  }
};

export default OnboardingFlow;
