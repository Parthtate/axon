// src/conf/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase configuration!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Log successful initialization (only once)
if (!window._supabaseInitialized) {
  console.log('✅ Supabase client initialized');
  console.log('📍 Project URL:', supabaseUrl);
  window._supabaseInitialized = true;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
