import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WorkflowAnimationProps {
  onGetStarted: () => void;
}

export const WorkflowAnimation = ({ onGetStarted }: WorkflowAnimationProps) => {
  return (
    <section id="workflow" className="py-16 px-4 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-primary">SustainHub</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your industrial waste challenges into profitable opportunities while making a positive environmental impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Problem */}
          <Card className="text-center p-6 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🗑️</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-destructive">The Problem</h3>
              <p className="text-muted-foreground mb-4">
                Industries generate millions of tons of waste annually, often disposing it in landfills or sewage systems, causing environmental damage and missing revenue opportunities.
              </p>
              <div className="bg-destructive/10 p-3 rounded-lg">
                <span className="text-destructive font-semibold">❌ Wasted Resources = Lost Money</span>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="text-center p-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">♻️</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">Our Solution</h3>
              <p className="text-muted-foreground mb-4">
                SustainHub connects waste producers with verified buyers, creating a circular economy where one industry's waste becomes another's raw material.
              </p>
              <div className="bg-primary/10 p-3 rounded-lg">
                <span className="text-primary font-semibold">✅ Smart Waste Trading Platform</span>
              </div>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card className="text-center p-6 border-wealth/20 bg-wealth/5">
            <CardContent className="pt-6">
              <div className="w-20 h-20 bg-wealth/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-wealth">The Impact</h3>
              <p className="text-muted-foreground mb-4">
                Generate additional revenue streams, reduce disposal costs, and significantly lower your environmental footprint through sustainable waste management.
              </p>
              <div className="bg-wealth/10 p-3 rounded-lg">
                <span className="text-wealth font-semibold">🌱 Profit + Planet = Win-Win</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="font-semibold mb-2">Verified Network</h4>
            <p className="text-sm text-muted-foreground">Connect with trusted buyers and partners</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="font-semibold mb-2">Smart Analytics</h4>
            <p className="text-sm text-muted-foreground">AI-powered trade recommendations</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="font-semibold mb-2">Global Reach</h4>
            <p className="text-sm text-muted-foreground">Access international markets</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-wealth rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold mb-2">Quick Results</h4>
            <p className="text-sm text-muted-foreground">Start trading within days</p>
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500K+</div>
              <p className="text-muted-foreground">Tons of Waste Traded</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-wealth mb-2">$2.5M+</div>
              <p className="text-muted-foreground">Revenue Generated</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">85%</div>
              <p className="text-muted-foreground">Reduction in Waste to Landfill</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Waste into Wealth?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join hundreds of industries already benefiting from sustainable waste trading.
            </p>
          </div>
          
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-8 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span className="mr-2">🚀</span>
            Register Your Industry Now!
            <span className="ml-2">✨</span>
          </Button>
        </div>
      </div>
    </section>
  );
};