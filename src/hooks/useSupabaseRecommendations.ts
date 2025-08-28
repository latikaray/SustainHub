import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

interface PotentialBuyer {
  id: string;
  name: string;
  industry: string;
  waste_types: string[];
  location: string;
  base_price_per_kg: number;
}

const generateAIRecommendations = async (formData: FormData): Promise<AIRecommendations> => {
  // Fetch potential buyers from Supabase
  const { data: buyers, error } = await supabase
    .from('potential_buyers')
    .select('*')
    .contains('waste_types', [formData.wasteType]);

  if (error) {
    console.error('Error fetching buyers:', error);
    // Fallback to empty array if error
  }

  const relevantBuyers = (buyers || []) as PotentialBuyer[];
  
  const volumeMultipliers = {
    '0-10': { kg: 5, multiplier: 1 },
    '10-50': { kg: 30, multiplier: 2.5 },
    '50-100': { kg: 75, multiplier: 4 },
    '100-500': { kg: 300, multiplier: 6 },
    '500+': { kg: 1000, multiplier: 10 }
  };

  const planMultipliers = {
    free: 1,
    standard: 1.5,
    premium: 2.2
  };

  const volumeData = volumeMultipliers[formData.wasteVolume as keyof typeof volumeMultipliers] || volumeMultipliers['0-10'];
  const planMultiplier = planMultipliers[formData.pricingPlan];

  // Generate potential buyers with realistic data
  const potentialBuyers = relevantBuyers.slice(0, 3).map((buyer, index) => {
    const basePrice = buyer.base_price_per_kg;
    const monthlyValue = Math.round((basePrice * volumeData.kg * planMultiplier) / 12);
    
    return {
      name: buyer.name,
      industry: buyer.industry,
      matchScore: Math.round(85 + Math.random() * 15),
      estimatedValue: `$${monthlyValue.toLocaleString()}/month`
    };
  });

  // Calculate trade values
  const averagePrice = relevantBuyers.reduce((sum, buyer) => sum + buyer.base_price_per_kg, 0) / relevantBuyers.length || 100;
  const currentValue = Math.round((averagePrice * volumeData.kg * planMultiplier * 0.6) / 12);
  const potentialValue = Math.round((averagePrice * volumeData.kg * planMultiplier) / 12);
  const increase = Math.round(((potentialValue - currentValue) / currentValue) * 100);

  // Calculate green score
  const greenScore = Math.min(95, Math.round(60 + (volumeData.multiplier * 5) + (planMultiplier * 10)));
  const co2Saved = Math.round(volumeData.multiplier * 15 * planMultiplier);

  const getImpactMessage = (score: number): string => {
    if (score >= 90) return 'Exceptional environmental impact - leading the industry';
    if (score >= 80) return 'High positive impact - well above average';
    if (score >= 70) return 'Good environmental contribution';
    return 'Growing positive impact - room for improvement';
  };

  return {
    potentialBuyers,
    tradeValue: {
      current: `$${currentValue.toLocaleString()}`,
      potential: `$${potentialValue.toLocaleString()}`,
      increase: `${increase}%`
    },
    greenScore: {
      score: greenScore,
      impact: getImpactMessage(greenScore),
      co2Saved: `${co2Saved} tons`
    }
  };
};

export const useSupabaseRecommendations = (formData: FormData | null, userId: string | null) => {
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!formData || !userId) {
      setRecommendations(null);
      return;
    }

    const generateRecommendations = async () => {
      setIsLoading(true);
      
      try {
        // Save industry data to Supabase
        const { data: industryData, error: industryError } = await supabase
          .from('industries')
          .insert({
            user_id: userId,
            waste_type: formData.wasteType,
            waste_volume: formData.wasteVolume,
            pricing_plan: formData.pricingPlan,
            monthly_volume_kg: 0, // Can be calculated based on waste volume
            estimated_value: 0 // Will be updated with recommendations
          })
          .select()
          .single();

        if (industryError) {
          console.error('Error saving industry data:', industryError);
        }

        // Generate AI recommendations
        const newRecommendations = await generateAIRecommendations(formData);
        
        // Save recommendations to Supabase
        if (industryData && !industryError) {
          const { error: recError } = await supabase
            .from('recommendations')
            .insert({
              user_id: userId,
              industry_id: industryData.id,
              potential_buyers: newRecommendations.potentialBuyers,
              trade_value: newRecommendations.tradeValue,
              green_score: newRecommendations.greenScore
            });

          if (recError) {
            console.error('Error saving recommendations:', recError);
          }
        }

        setRecommendations(newRecommendations);
      } catch (error) {
        console.error('Error generating recommendations:', error);
        // Fallback to basic recommendations if Supabase fails
        const fallbackRecommendations = await generateAIRecommendations(formData);
        setRecommendations(fallbackRecommendations);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate AI processing time
    const timer = setTimeout(generateRecommendations, 1500);

    return () => clearTimeout(timer);
  }, [formData, userId]);

  return { recommendations, isLoading };
};