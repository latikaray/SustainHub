import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FormData } from "./RegistrationForm";

interface AIRecommendations {
  potentialBuyers: Array<{
    name: string;
    industry: string;
    matchScore: number;
    estimatedValue: string;
  }>;
  tradeValue: {
    current: string;
    potential: string;
    increase: string;
  };
  greenScore: {
    score: number;
    impact: string;
    co2Saved: string;
  };
}

interface IndustryDashboardProps {
  formData: FormData;
  recommendations: AIRecommendations;
}

export const IndustryDashboard = ({ formData, recommendations }: IndustryDashboardProps) => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Welcome to your Dashboard, {formData.industryName}!
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's your personalized waste-to-wealth transformation overview
          </p>
        </div>

        {/* Waste Production Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Waste Production</CardTitle>
              <CardDescription>Monthly {formData.wasteType} output</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-waste mb-2">{formData.wasteVolume} tons</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-waste rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Active production</span>
              </div>
              <div className="mt-4">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">75% utilization this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Trade Value</CardTitle>
              <CardDescription>Revenue potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {recommendations.tradeValue.potential}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  +{recommendations.tradeValue.increase}
                </Badge>
                <span className="text-sm text-muted-foreground">vs current</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Current: {recommendations.tradeValue.current}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Green Score</CardTitle>
              <CardDescription>Environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {recommendations.greenScore.score}/100
              </div>
              <div className="space-y-2">
                <Progress value={recommendations.greenScore.score} className="h-2" />
                <p className="text-sm font-medium text-success">
                  {recommendations.greenScore.co2Saved} CO₂ saved annually
                </p>
                <p className="text-xs text-muted-foreground">
                  {recommendations.greenScore.impact}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Potential Buyers */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>AI-Matched Potential Buyers</CardTitle>
            <CardDescription>
              Based on your {formData.wasteType} and location in {formData.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.potentialBuyers.map((buyer, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{buyer.name}</h4>
                      <Badge variant="outline" className="bg-primary/10">
                        {buyer.matchScore}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{buyer.industry}</p>
                    <p className="text-lg font-bold text-primary">{buyer.estimatedValue}</p>
                    <Button size="sm" className="w-full mt-3" variant="outline">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trade Flow Animation */}
        <Card className="shadow-lg bg-gradient-to-r from-waste/10 via-primary/10 to-wealth/10">
          <CardHeader>
            <CardTitle>Your Waste-to-Wealth Journey</CardTitle>
            <CardDescription>Visual representation of your circular economy impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-waste rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <span className="text-2xl">🏭</span>
                </div>
                <p className="font-semibold">Production</p>
                <p className="text-sm text-muted-foreground">{formData.wasteVolume} tons/month</p>
              </div>
              
              <div className="flex-1 mx-8 relative">
                <div className="h-1 bg-gradient-to-r from-waste via-primary to-wealth rounded-full"></div>
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-waste via-primary to-wealth rounded-full animate-pulse opacity-50"></div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔄</span>
                </div>
                <p className="font-semibold">Trade Network</p>
                <p className="text-sm text-muted-foreground">{recommendations.potentialBuyers.length} buyers</p>
              </div>
              
              <div className="flex-1 mx-8 relative">
                <div className="h-1 bg-gradient-to-r from-primary to-wealth rounded-full"></div>
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-primary to-wealth rounded-full animate-pulse opacity-50"></div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-wealth rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <p className="font-semibold">Wealth Created</p>
                <p className="text-sm text-muted-foreground">{recommendations.tradeValue.potential}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};