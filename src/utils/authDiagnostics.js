/**
 * Authentication Diagnostics
 * Helps identify email/password auth issues
 */
import { supabase } from '../conf/supabaseClient';

export const authDiagnostics = {
  /**
   * Test if Supabase client is properly initialized
   */
  testConnection: async () => {
    try {
      console.log('🔍 Testing Supabase connection...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('✅ Supabase connected');
      console.log('Current session:', session ? '✅ Active' : '❌ None');
      return true;
    } catch (error) {
      console.error('❌ Connection failed:', error);
      return false;
    }
  },

  /**
   * Test email/password signup
   */
  testSignUp: async (email, password) => {
    try {
      console.log('🔍 Testing sign up with:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        console.error('❌ Sign up error:', error.message);
        console.error('Error code:', error.status);
        return { success: false, error: error.message };
      }

      console.log('✅ Sign up successful');
      console.log('User created:', data.user?.id);
      console.log('Session:', data.session ? 'Auto-confirmed' : 'Email confirmation required');
      
      return { success: true, data };
    } catch (error) {
      console.error('❌ Sign up exception:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Test email/password login
   */
  testSignIn: async (email, password) => {
    try {
      console.log('🔍 Testing sign in with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Sign in error:', error.message);
        console.error('Error code:', error.status);
        
        // Detailed error diagnostics
        if (error.message.includes('Invalid login credentials')) {
          console.log('\n💡 Possible causes:');
          console.log('1. User account does not exist');
          console.log('2. Email not confirmed (check email for confirmation link)');
          console.log('3. Wrong password');
          console.log('4. Account disabled in Supabase');
          console.log('5. Email/Password provider not enabled in Supabase');
        }
        
        return { success: false, error: error.message };
      }

      console.log('✅ Sign in successful');
      console.log('User ID:', data.user?.id);
      console.log('Email:', data.user?.email);
      
      return { success: true, data };
    } catch (error) {
      console.error('❌ Sign in exception:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Check email confirmation status
   */
  checkEmailConfirmation: async (email) => {
    try {
      console.log('🔍 Checking email confirmation status...');
      const { data, error } = await supabase
        .from('auth.users')
        .select('email_confirmed_at')
        .eq('email', email)
        .single();

      if (error) {
        console.error('❌ Could not check confirmation status');
        console.log('Note: This requires admin access to auth.users table');
        return null;
      }

      const isConfirmed = data?.email_confirmed_at !== null;
      console.log(isConfirmed ? '✅ Email confirmed' : '❌ Email NOT confirmed');
      
      return isConfirmed;
    } catch (error) {
      console.error('Error checking confirmation:', error);
      return null;
    }
  },

  /**
   * Get current user info
   */
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.log('❌ No user logged in');
        return null;
      }

      console.log('✅ Current user:', user?.email);
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  /**
   * Run all diagnostics
   */
  runAll: async () => {
    console.log('\n========== AUTH DIAGNOSTICS ==========\n');
    
    // Test connection
    const connected = await authDiagnostics.testConnection();
    
    if (connected) {
      // Get current user
      await authDiagnostics.getCurrentUser();
      
      console.log('\n✅ Diagnostics complete!');
      console.log('\nNext steps:');
      console.log('1. Check Supabase Dashboard → Authentication → Providers');
      console.log('   → Ensure "Email" provider is enabled');
      console.log('2. If sign up works but sign in fails:');
      console.log('   → Check your email for confirmation link');
      console.log('   → Confirm your email by clicking the link');
      console.log('3. Try signing up with a test account');
      console.log('4. Then attempt to sign in');
    }
  }
};

export default authDiagnostics;
