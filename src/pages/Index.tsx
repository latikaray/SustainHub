import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RegistrationForm, type FormData } from "@/components/RegistrationForm";
import { IndustryDashboard } from "@/components/IndustryDashboard";
import { Footer } from "@/components/Footer";
import { useSupabaseRecommendations } from '@/hooks/useSupabaseRecommendations';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'registration' | 'dashboard'>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);
  const { user, session, loading } = useAuth();
  const { recommendations, isLoading } = useSupabaseRecommendations(formData, user?.id || null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setCurrentStep('registration');
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (data: FormData) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setFormData(data);
    setCurrentStep('dashboard');
    setTimeout(() => {
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
  <Navbar />
  <HeroSection onGetStarted={handleGetStarted} />

  {user && (
    <section id="registration" className="py-16 px-4">
      <div className="container mx-auto">
        <RegistrationForm onSubmit={handleFormSubmit} />
      </div>
    </section>
  )}

  {user && currentStep === 'dashboard' && (
    <section id="dashboard" className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        {isLoading ? (
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-8">
              <CardContent>
                <div className="space-y-4">
                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <h3 className="text-xl font-semibold">Generating AI Recommendations...</h3>
                  <p className="text-muted-foreground">
                    Analyzing your waste data and finding optimal trading opportunities
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          recommendations && formData && (
            <IndustryDashboard formData={formData} recommendations={recommendations} />
          )
        )}
      </div>
    </section>
  )}

  <Footer />
</div>

  );
};

export default Index;


