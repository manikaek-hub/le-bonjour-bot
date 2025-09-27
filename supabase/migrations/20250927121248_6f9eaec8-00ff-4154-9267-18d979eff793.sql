-- Create events table for storing scraped events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  dates TEXT,
  location TEXT,
  price TEXT,
  image_url TEXT,
  external_link TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  event_start_date DATE,
  event_end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public information)
CREATE POLICY "Events are publicly readable" 
ON public.events 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_events_active_start_date ON public.events(is_active, event_start_date);
CREATE INDEX idx_events_scraped_at ON public.events(scraped_at);