// src/pages/Auth.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoLogoGoogle } from 'react-icons/io5';
import authDiagnostics from '../utils/authDiagnostics';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  
  const { signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        console.log('🔐 Attempting sign in...');
        const { data, error } = await signIn(email, password);
        
        if (error) {
          console.error('❌ Sign in error:', error);
          throw error;
        }
        
        console.log('✅ Sign in successful:', data);
        navigate('/');
      } else {
        console.log('📝 Attempting sign up...');
        const { error, data } = await signUp(email, password);
        
        if (error) {
          console.error('❌ Sign up error:', error);
          throw error;
        }
        
        console.log('✅ Sign up response:', data);
        
        if (data?.user && !data?.session) {
          setMessage('✅ Account created! Check your email to confirm your account before signing in.');
          setIsLogin(true);
          setEmail('');
          setPassword('');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('❌ Full error object:', err);
      
      // More detailed error messages
      const errorMessages = {
        'Invalid login credentials': 'Email not found or incorrect password. Make sure:\n1. You have already signed up\n2. You confirmed your email\n3. Password is correct',
        'Email not confirmed': '📧 Please confirm your email before logging in.\nCheck your inbox for the confirmation link.',
        'User already registered': '👤 An account with this email already exists.\nTry signing in instead.',
        'Invalid email or password': '❌ The email or password you entered is incorrect.',
        'Signups not allowed for this instance': '🚫 Sign ups are currently disabled. Please contact support.',
        'Email provider is not enabled': '⚠️ Email authentication is not enabled. Please try Google sign-in instead.',
      };
      
      const errorMsg = errorMessages[err.message] || err.message || 'An unexpected error occurred';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    console.log(`🔌 Initiating social login with ${provider}...`);
    
    try {
      const { data, error } = await signInWithProvider(provider);
      
      if (error) {
        console.error(`❌ ${provider} login error:`, error);
        throw error;
      }
      
      console.log(`✅ ${provider} login initiated`, data);
      // Note: Redirect happens automatically
    } catch (err) {
      console.error(`❌ Social login caught error:`, err);
      setError(`Failed to sign in with ${provider}: ${err.message}`);
    } finally {
      // Note: If redirect happens, this might not run or be visible
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm px-6">
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-900/20 border border-red-500/30 rounded p-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-4 bg-green-900/20 border border-green-500/30 rounded p-3 text-green-200 text-sm">
            {message}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoLogoGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Work email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors disabled:opacity-50"
              placeholder="Your email address"
              required
              disabled={loading}
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Your Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors disabled:opacity-50"
              placeholder="Your password"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <button className="block w-full text-gray-400 hover:text-gray-300 text-sm transition-colors">
            Forgot your password?
          </button>
          
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setMessage('');
              setEmail('');
              setPassword('');
            }}
            className="block w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>

          {/* Diagnostics Button */}
          <button
            onClick={() => {
              setShowDiagnostics(!showDiagnostics);
              if (!showDiagnostics) {
                authDiagnostics.runAll();
              }
            }}
            className="block w-full text-yellow-500 hover:text-yellow-400 text-xs transition-colors mt-4"
            title="Run authentication diagnostics to help troubleshoot issues"
          >
            {showDiagnostics ? '❌ Close Diagnostics' : '🔍 Troubleshoot Auth Issues'}
          </button>
        </div>

        {/* Diagnostics Info */}
        {showDiagnostics && (
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded text-yellow-200 text-xs space-y-2">
            <p className="font-semibold">📋 Authentication Troubleshooting:</p>
            <ul className="space-y-1 text-yellow-100">
              <li>✓ Open Developer Console (F12) to see diagnostics</li>
              <li>✓ Check if Supabase connection is working</li>
              <li>✓ Verify Email provider is enabled in Supabase Dashboard</li>
              <li>✓ Make sure email is confirmed before signing in</li>
              <li>✓ If stuck, try signing up with a new test email</li>
            </ul>
            <p className="text-yellow-300 mt-3">
              <strong>Common Issue:</strong> "Invalid login credentials" usually means:
            </p>
            <ul className="space-y-1">
              <li>→ User account doesn't exist yet (sign up first)</li>
              <li>→ Email hasn't been confirmed (check email for link)</li>
              <li>→ Password is incorrect</li>
              <li>→ Email provider disabled in Supabase</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
