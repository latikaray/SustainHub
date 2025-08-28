-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  industry_type TEXT NOT NULL,
  location TEXT NOT NULL,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create industries table for storing industry data
CREATE TABLE public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  waste_type TEXT NOT NULL,
  waste_volume TEXT NOT NULL,
  pricing_plan TEXT NOT NULL DEFAULT 'free',
  monthly_volume_kg NUMERIC DEFAULT 0,
  estimated_value NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recommendations table
CREATE TABLE public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  industry_id UUID REFERENCES public.industries(id) ON DELETE CASCADE NOT NULL,
  potential_buyers JSONB NOT NULL,
  trade_value JSONB NOT NULL,
  green_score JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create potential buyers table for matching
CREATE TABLE public.potential_buyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  waste_types TEXT[] NOT NULL,
  location TEXT,
  contact_email TEXT,
  base_price_per_kg NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.potential_buyers ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for industries
CREATE POLICY "Users can view their own industries" 
ON public.industries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own industries" 
ON public.industries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own industries" 
ON public.industries 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recommendations" 
ON public.recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for potential buyers (viewable by all authenticated users)
CREATE POLICY "Authenticated users can view potential buyers" 
ON public.potential_buyers 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_industries_updated_at
  BEFORE UPDATE ON public.industries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, company_name, industry_type, location, contact_email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'company_name', 'New Company'),
    COALESCE(NEW.raw_user_meta_data->>'industry_type', 'General'),
    COALESCE(NEW.raw_user_meta_data->>'location', 'Not specified'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert dummy potential buyers data
INSERT INTO public.potential_buyers (name, industry, waste_types, location, contact_email, base_price_per_kg) VALUES
('RecycleTech Corp', 'Plastic Recycling', '{"plastic"}', 'PUNE, MAHARASHTRA', 'contact@recycletech.com', 150.00),
('EcoPlastic Solutions', 'Sustainable Manufacturing', '{"plastic"}', 'PUNE, MAHARASHTRA', 'info@ecoplastic.com', 140.00),
('GreenPoly Industries', 'Polymer Processing', '{"plastic"}', 'PUNE, MAHARASHTRA', 'sales@greenpoly.com', 160.00),
('MetalForge Ltd', 'Metal Fabrication', '{"metal"}', 'MUMBAI, MAHARASHTRA', 'orders@metalforge.com', 300.00),
('SteelCycle Pro', 'Steel Production', '{"metal"}', 'SATARA, MAHARASHTRA', 'procurement@steelcycle.com', 320.00),
('AlloyCraft Industries', 'Alloy Manufacturing', '{"metal"}', 'MUMBAI, MAHARASHTRA', 'buying@alloycraft.com', 290.00),
('BioEnergy Systems', 'Renewable Energy', '{"organic"}', 'PUNE, MAHARASHTRA', 'biomass@bioenergy.com', 50.00),
('CompostTech', 'Soil Enhancement', '{"organic"}', 'MUMBAI, MAHARASHTRA', 'supply@composttech.com', 45.00),
('Organic Fuels Inc', 'Biofuel Production', '{"organic"}', 'MUMBAI, MAHARASHTRA', 'materials@organicfuels.com', 55.00),
('FiberRenew Co', 'Textile Manufacturing', '{"textile"}', 'PUNE, MAHARASHTRA', 'fiber@fiberrenew.com', 80.00),
('TextileCycle', 'Fashion Industry', '{"textile"}', 'PUNE, MAHARASHTRA', 'recycle@textilecycle.com', 75.00),
('FashionGreen Ltd', 'Sustainable Apparel', '{"textile"}', 'SATARA, MAHARASHTRA', 'green@fashiongreen.com', 85.00),
('E-RecycleTech', 'Electronics Recycling', '{"electronic"}', 'MUMBAI, MAHARASHTRA', 'ewaste@erecycletech.com', 500.00),
('ComponentHarvest', 'Component Recovery', '{"electronic"}', 'PUNE, MAHARASHTRA', 'components@harvest.com', 520.00),
('DigitalGreen Solutions', 'Tech Refurbishment', '{"electronic"}', 'MUMBAI, MAHARASHTRA', 'digital@greentech.com', 480.00),
('ChemReprocess Ltd', 'Chemical Processing', '{"chemical"}', 'MUMBAI, MAHARASHTRA', 'safety@chemreprocess.com', 400.00),
('Industrial Solutions', 'Industrial Chemistry', '{"chemical"}', 'PUNE, MAHARASHTRA', 'industrial@solutions.com', 420.00),
('SafeChem Recovery', 'Hazmat Processing', '{"chemical"}', 'SATARA, MAHARASHTRA', 'hazmat@safechem.com', 450.00),
('Universal Recycling', 'General Recycling', '{"other","plastic","metal","textile"}', 'MUMBAI, MAHARASHTRA', 'universal@recycling.com', 100.00),
('GeneralWaste Pro', 'Waste Management', '{"other","organic"}', 'PUNE, MAHARASHTRA', 'waste@generalpro.com', 90.00);

-- Enable realtime for all tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.industries REPLICA IDENTITY FULL;
ALTER TABLE public.recommendations REPLICA IDENTITY FULL;
ALTER TABLE public.potential_buyers REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.industries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.potential_buyers;