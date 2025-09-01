import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gccnahrbwsznusprpjdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjY25haHJ3YnN6bnVzcHJtamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDQ3NDUsImV4cCI6MjA3MTk4MDc0NX0.y9KaXXmNUrxsdTMCXeLYLOT0eDwCgPY5jmT3KJW4xok';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('certifications').select('*').limit(1);
    if (error) {
      console.error('Supabase Error:', error);
    } else {
      console.log('Connection successful. Sample data:', data);
    }
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

testConnection();