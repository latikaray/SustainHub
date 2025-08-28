import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface FormData {
  industryName: string;
  location: string;
  wasteType: string;
  wasteVolume: string;
  pricingPlan: 'free' | 'standard' | 'premium';
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
}

const PRICING_PLANS = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0/month',
    features: ['Basic waste tracking', 'Up to 5 listings', 'Community support'],
    color: 'bg-muted'
  },
  {
    id: 'standard' as const,
    name: 'Standard',
    price: '$99/month',
    features: ['Advanced analytics', 'Up to 50 listings', 'AI recommendations', 'Priority support'],
    color: 'bg-primary'
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    price: '$299/month',
    features: ['Unlimited listings', 'Custom integrations', 'Dedicated account manager', 'White-label options'],
    color: 'bg-wealth'
  }
];

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    industryName: '',
    location: '',
    wasteType: '',
    wasteVolume: '',
    pricingPlan: 'free'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join the Circular Economy</h2>
          <p className="text-muted-foreground text-lg">
            Register your industry and start transforming waste into wealth today
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Industry Details</CardTitle>
              <CardDescription>Tell us about your business and waste streams</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="industryName">Industry Name</Label>
                  <Input
                    id="industryName"
                    value={formData.industryName}
                    onChange={(e) => updateFormData('industryName', e.target.value)}
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="City, State/Country"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="wasteType">Type of Waste</Label>
                  <Select value={formData.wasteType} onValueChange={(value) => updateFormData('wasteType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastic Waste</SelectItem>
                      <SelectItem value="metal">Metal Scraps</SelectItem>
                      <SelectItem value="organic">Organic Waste</SelectItem>
                      <SelectItem value="textile">Textile Waste</SelectItem>
                      <SelectItem value="electronic">Electronic Waste</SelectItem>
                      <SelectItem value="chemical">Chemical Byproducts</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="wasteVolume">Monthly Waste Volume</Label>
                  <Select value={formData.wasteVolume} onValueChange={(value) => updateFormData('wasteVolume', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volume range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10">0-10 tons</SelectItem>
                      <SelectItem value="10-50">10-50 tons</SelectItem>
                      <SelectItem value="50-100">50-100 tons</SelectItem>
                      <SelectItem value="100-500">100-500 tons</SelectItem>
                      <SelectItem value="500+">500+ tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Create Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
            {PRICING_PLANS.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 ${
                  formData.pricingPlan === plan.id 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-md hover:scale-102'
                }`}
                onClick={() => updateFormData('pricingPlan', plan.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{plan.name}</h4>
                      <p className="text-2xl font-bold text-primary">{plan.price}</p>
                    </div>
                    {formData.pricingPlan === plan.id && (
                      <Badge className="bg-primary text-white">Selected</Badge>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};