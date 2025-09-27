-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create cron job to scrape events every day at 6 AM
SELECT cron.schedule(
  'scrape-cotentin-events',
  '0 6 * * *', -- Every day at 6 AM
  $$
  SELECT
    net.http_post(
        url:='https://iyaokqentmxroncepuww.supabase.co/functions/v1/scrape-events',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YW9rcWVudG14cm9uY2VwdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDYzMTIsImV4cCI6MjA3NDQ4MjMxMn0.KhAsrjFGGeDEVlNpCsNQw-_Z9LgVwDMryAjkvhZXmPM"}'::jsonb,
        body:='{"triggered_by": "cron"}'::jsonb
    ) as request_id;
  $$
);