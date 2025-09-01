import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdebhghtygwciywgcfii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZWJoZ2h0eWd3Y2l5d2djZmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MDkyNDMsImV4cCI6MjA3MDk4NTI0M30.W8Bp1quDHdxs7-MoLvxxl6dMdyPSJLPB4vRciorv35c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);