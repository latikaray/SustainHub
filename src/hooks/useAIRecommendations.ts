import { useState, useEffect } from 'react';
import type { FormData } from '@/components/RegistrationForm';

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

const generateRecommendations = (formData: FormData): AIRecommendations => {
  // AI-powered recommendations based on waste type and volume
  const wasteTypeMultipliers = {
    plastic: { base: 150, buyers: ['RecycleTech Corp', 'EcoPlastic Solutions', 'GreenPoly Industries'] },
    metal: { base: 300, buyers: ['MetalForge Ltd', 'SteelCycle Pro', 'AlloyCraft Industries'] },
    organic: { base: 50, buyers: ['BioEnergy Systems', 'CompostTech', 'Organic Fuels Inc'] },
    textile: { base: 80, buyers: ['FiberRenew Co', 'TextileCycle', 'FashionGreen Ltd'] },
    electronic: { base: 500, buyers: ['E-RecycleTech', 'ComponentHarvest', 'DigitalGreen Solutions'] },
    chemical: { base: 400, buyers: ['ChemReprocess Ltd', 'Industrial Solutions', 'SafeChem Recovery'] },
    other: { base: 100, buyers: ['Universal Recycling', 'GeneralWaste Pro', 'Multi-Material Solutions'] }
  };

  const volumeMultipliers = {
    '0-10': 1,
    '10-50': 2.5,
    '50-100': 4,
    '100-500': 6,
    '500+': 10
  };

  const planMultipliers = {
    free: 1,
    standard: 1.5,
    premium: 2.2
  };

  const wasteConfig = wasteTypeMultipliers[formData.wasteType as keyof typeof wasteTypeMultipliers] || wasteTypeMultipliers.other;
  const volumeMultiplier = volumeMultipliers[formData.wasteVolume as keyof typeof volumeMultipliers] || 1;
  const planMultiplier = planMultipliers[formData.pricingPlan];

  const baseValue = wasteConfig.base * volumeMultiplier * planMultiplier;
  const currentValue = baseValue * 0.6;
  const potentialValue = baseValue;
  const increase = Math.round(((potentialValue - currentValue) / currentValue) * 100);

  const potentialBuyers = wasteConfig.buyers.map((name, index) => ({
    name,
    industry: getIndustryForBuyer(name),
    matchScore: Math.round(85 + Math.random() * 15),
    estimatedValue: `$${Math.round((baseValue * (0.8 + index * 0.1)) / 12).toLocaleString()}/month`
  }));

  const greenScore = Math.min(95, Math.round(60 + (volumeMultiplier * 5) + (planMultiplier * 10)));
  const co2Saved = Math.round(volumeMultiplier * 15 * planMultiplier);

  return {
    potentialBuyers,
    tradeValue: {
      current: `$${Math.round(currentValue / 12).toLocaleString()}`,
      potential: `$${Math.round(potentialValue / 12).toLocaleString()}`,
      increase: `${increase}%`
    },
    greenScore: {
      score: greenScore,
      impact: getImpactMessage(greenScore),
      co2Saved: `${co2Saved} tons`
    }
  };
};

const getIndustryForBuyer = (buyerName: string): string => {
  const industryMap: Record<string, string> = {
    'RecycleTech Corp': 'Plastic Recycling',
    'EcoPlastic Solutions': 'Sustainable Manufacturing',
    'GreenPoly Industries': 'Polymer Processing',
    'MetalForge Ltd': 'Metal Fabrication',
    'SteelCycle Pro': 'Steel Production',
    'AlloyCraft Industries': 'Alloy Manufacturing',
    'BioEnergy Systems': 'Renewable Energy',
    'CompostTech': 'Soil Enhancement',
    'Organic Fuels Inc': 'Biofuel Production',
    'FiberRenew Co': 'Textile Manufacturing',
    'TextileCycle': 'Fashion Industry',
    'FashionGreen Ltd': 'Sustainable Apparel',
    'E-RecycleTech': 'Electronics Recycling',
    'ComponentHarvest': 'Component Recovery',
    'DigitalGreen Solutions': 'Tech Refurbishment',
    'ChemReprocess Ltd': 'Chemical Processing',
    'Industrial Solutions': 'Industrial Chemistry',
    'SafeChem Recovery': 'Hazmat Processing'
  };
  
  return industryMap[buyerName] || 'General Recycling';
};

const getImpactMessage = (score: number): string => {
  if (score >= 90) return 'Exceptional environmental impact - leading the industry';
  if (score >= 80) return 'High positive impact - well above average';
  if (score >= 70) return 'Good environmental contribution';
  return 'Growing positive impact - room for improvement';
};

export const useAIRecommendations = (formData: FormData | null) => {
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      setRecommendations(null);
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing time
    const timer = setTimeout(() => {
      const newRecommendations = generateRecommendations(formData);
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData]);

  return { recommendations, isLoading };
};