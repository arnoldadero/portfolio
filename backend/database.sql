
-- Create user if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'aadero') THEN
    CREATE USER aadero WITH PASSWORD '09Octobe';
  END IF;
END
$$;

-- Create database if not exists
CREATE DATABASE blog_db WITH OWNER aadero;

-- Connect to the blog_db
\c blog_db;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE blog_db TO aadero;
GRANT ALL PRIVILEGES ON SCHEMA public TO aadero;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO aadero;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO aadero;