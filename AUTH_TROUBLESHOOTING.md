# 🔐 Email/Password Authentication Troubleshooting Guide

## Problem: "Invalid login credentials" Error

This error typically means one of the following issues:

### 1. **User Account Doesn't Exist** ❌
**Solution:**
- First time? **Sign up** before trying to sign in
- After signing up, you'll be asked to confirm your email
- Check your email inbox (and spam folder) for confirmation link
- Click the link to confirm your account
- Then try signing in

### 2. **Email Not Confirmed** 📧
**Solution:**
- Check your email inbox for a confirmation email from Supabase
- Look in spam/junk folder
- Click the "Confirm Email" link in the email
- Wait a few moments for confirmation to process
- Try signing in again

**If you don't receive email:**
- Check if email provider is enabled in Supabase Dashboard
- Sign up again with a different email (might be an issue with that specific email)

### 3. **Wrong Password** 🔑
**Solution:**
- Double-check your password (case-sensitive)
- Ensure Caps Lock is OFF
- Try signing up again with a new account if you forgot the password
- (Password reset feature not yet implemented)

### 4. **Email/Password Provider Not Enabled** ⚠️
**Solution:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication → Providers**
4. Find **Email** in the list
5. Click to expand it
6. Make sure **Enable Email** is toggled ON
7. Check that **Autoconfirm user** is:
   - **OFF** if you want email confirmation (recommended for production)
   - **ON** if you want instant sign-ups (development only)

### 5. **Supabase Configuration Issues** ⚙️
**Solution:**
1. Verify `.env` file has correct values:
   ```
   VITE_SUPABASE_URL=https://yourproject.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Check Supabase URL and Key in your Dashboard:
   - Project Settings → API
   - Copy correct values to `.env`

3. Restart dev server after changing `.env`:
   ```bash
   npm run dev
   ```

### 6. **Account Disabled in Supabase** 🚫
**Solution:**
1. Go to Supabase Dashboard → Authentication → Users
2. Find your email in the users list
3. Check if the user is marked as "disabled"
4. If disabled, click on the user and enable it
5. Try signing in again

---

## 🧪 How to Test Auth

### Step 1: Sign Up
1. Click "Don't have an account? Sign up"
2. Enter a valid email (e.g., `test@example.com`)
3. Enter a password (minimum 6 characters)
4. Click "Sign up"
5. Check your email for confirmation link

### Step 2: Confirm Email
1. Open the email from Supabase
2. Click the confirmation link
3. You should be redirected and confirmed

### Step 3: Sign In
1. Back on login page, click "Already have an account? Sign in"
2. Enter the same email
3. Enter the same password
4. Click "Sign in"
5. Should redirect to home page

---

## 🔍 Using Diagnostics

The app includes built-in diagnostics to help troubleshoot:

1. On the login page, scroll to bottom
2. Click **"🔍 Troubleshoot Auth Issues"**
3. Open Developer Console (F12 or Ctrl+Shift+K)
4. Look for diagnostic messages showing:
   - ✅ Supabase connection status
   - ✅ Current user (if logged in)
   - ✅ Specific error codes

---

## 🛠️ Quick Fixes Checklist

- [ ] I signed up first before trying to sign in
- [ ] I confirmed my email (clicked link in email)
- [ ] Email provider is **enabled** in Supabase Dashboard
- [ ] I restarted the dev server after updating `.env`
- [ ] My password has at least 6 characters
- [ ] I'm entering the correct email and password
- [ ] My account is not disabled in Supabase

---

## 🚀 Production Deployment

For deployed apps, also check:

1. **Environment Variables** are set in deployment platform (Vercel, etc.)
2. **Email Provider** is enabled in Supabase Dashboard
3. **CORS Settings** in Supabase if needed
4. **Redirect URL** for OAuth is correct

---

## 📞 Still Having Issues?

1. Check console logs (F12) for detailed error messages
2. Visit [Supabase Docs](https://supabase.com/docs/guides/auth/auth-email)
3. Check [GitHub Issues](https://github.com/Parthtate/axon/issues)
4. Compare your setup with the working Google OAuth flow

---

## ✅ What Should Work

After fixing these issues, you should be able to:
- ✓ Sign up with email and password
- ✓ Receive confirmation email
- ✓ Confirm email by clicking link
- ✓ Sign in with that email and password
- ✓ Be redirected to home page
- ✓ Browse and play music
