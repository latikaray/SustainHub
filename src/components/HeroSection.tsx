import { WorkflowAnimation } from "@/components/WorkflowAnimation";
import logo from "../assets/logo.png"; 

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div id="hero">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/10 px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
          <img 
            src={logo} 
            alt="SustainHub Logo" 
            className="h-32 mx-auto mb-6"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-foreground">SUSTAIN</span>
          <span className="text-primary">HUB</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Where Waste Becomes Wealth
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your industrial waste into valuable resources. Connect with buyers, 
          optimize trade value, and boost your environmental impact through our smart trading platform.
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-waste rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏭</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Production</h3>
            <p className="text-muted-foreground">Track and categorize your industrial waste</p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Trade</h3>
            <p className="text-muted-foreground">Connect with verified buyers and partners</p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 bg-wealth rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Impact</h3>
            <p className="text-muted-foreground">Generate revenue while helping the environment</p>
          </div>
        </div>
      </div>
      </section>
      
      <WorkflowAnimation onGetStarted={onGetStarted} />
    </div>
  );
};