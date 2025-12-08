# 🔐 Supabase Email Authentication Setup Guide

## Root Cause: Most Likely Issue

Your error "Invalid login credentials" with 400 Bad Request typically means:

### 🎯 **#1 Most Likely: Email Not Confirmed**
- User signs up → Supabase sends confirmation email
- User doesn't click confirmation link in email
- User tries to sign in → Gets "Invalid login credentials"
- **Solution:** User must confirm email first

### 🎯 **#2 Email Provider Not Enabled**
- Email/Password authentication provider is disabled in Supabase
- **Solution:** Enable it in Supabase Dashboard

### 🎯 **#3 Auto-confirm is OFF but Emails Not Sending**
- Email provider disabled in settings
- **Solution:** Enable email sending in Supabase

---

## ✅ Complete Checklist to Fix Email Auth

### Step 1: Verify Supabase Configuration

Open [Supabase Dashboard](https://app.supabase.com) → Select Your Project

#### 1.1 Check Email Provider
1. Go to **Authentication → Providers**
2. Find **"Email"** in the list
3. Click to expand it
4. Verify the toggle is **ON** (blue)

```
✅ CORRECT:
- Email [ENABLED toggle - blue]
  ├─ Autoconfirm user: [toggle - your choice]
  └─ (other settings)

❌ INCORRECT:
- Email [DISABLED toggle - gray]
```

#### 1.2 Check Autoconfirm Setting
- **If toggle is OFF** (recommended):
  - Users get confirmation email
  - Must click link to activate account
  - More secure for production
  
- **If toggle is ON**:
  - Users can sign in immediately
  - No confirmation email needed
  - Only for development

**Choose based on your needs:**
- Production: OFF (require email confirmation)
- Development: ON (instant sign-up)

#### 1.3 Verify Email Configuration
1. Still in **Authentication** section
2. Click **"Email" → Email Templates**
3. Make sure these templates exist:
   - ✅ "Confirm signup"
   - ✅ "Magic Link" (if needed)
4. Templates should be **Enabled** (toggle ON)

```
Expected Templates:
- Confirm signup .......... [ENABLED]
- Invite user ............. [ENABLED]
- Magic Link .............. [ENABLED or DISABLED]
- Change Email ............ [ENABLED or DISABLED]
- Reset Password .......... [ENABLED or DISABLED]
```

---

### Step 2: Test the Authentication Flow

#### 2.1 Try Signing Up
1. Go to your app's login page
2. Click "Don't have an account? Sign up"
3. Enter:
   - Email: `test@gmail.com` (use your real email)
   - Password: `TestPassword123` (minimum 6 chars)
4. Click "Sign up"

**What should happen:**
- See message: "Check your email to confirm your account"
- Check your email inbox (and spam folder)
- Look for email from "noreply@mail.supabase.io"

#### 2.2 If No Email Arrives
**Cause:** Email provider not enabled OR SMTP not configured
**Fix:** 
1. Go to Supabase **Settings → Email**
2. Look for "SMTP Configuration"
3. If empty, Supabase can't send emails
4. Enable Supabase built-in email sender OR configure SMTP
5. Try signing up again

#### 2.3 If Email Arrives
1. Open the email from Supabase
2. Click the "Confirm Email Address" button/link
3. You should be logged in automatically
4. Or return to app and sign in with that email

#### 2.4 Try Signing In
1. On login page, enter:
   - Email: same as step 2.1
   - Password: same as step 2.1
2. Click "Sign in"
3. Should redirect to home page ✅

---

### Step 3: Check User in Supabase

#### 3.1 View All Users
1. Go to **Authentication → Users**
2. Look for the email you signed up with
3. Click on the user to see details

#### 3.2 Check User Status
```
User Details Should Show:
├─ Email: test@gmail.com ................... ✅
├─ Email Confirmed At: [timestamp] ........ ✅ (if confirmed)
├─ Last Sign In: [timestamp] .............. ✅ (if signed in)
├─ User ID: [uuid] ........................ ✅
└─ Status: Confirmed ...................... ✅ (not disabled)
```

**If Email Confirmed At is empty:**
- Email hasn't been confirmed yet
- User must click confirmation link in email
- Or admin must manually confirm in dashboard

#### 3.3 Manually Confirm User (Emergency Only)
If email not arriving:
1. Find user in Authentication → Users
2. Click the user
3. Look for "Email Confirmed At" field
4. Edit and set to current timestamp
5. Click "Update"
6. User can now sign in

---

### Step 4: Verify .env Variables

Your `.env` should have:
```env
VITE_SUPABASE_URL=https://ftipuyjcqmdyiocxjfht.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (long string)
```

**How to find correct values:**
1. Supabase Dashboard → Project Settings → API
2. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - Anon (public) Key → `VITE_SUPABASE_ANON_KEY`

**After updating .env:**
```bash
npm run dev  # Restart dev server
```

---

## 🧪 Testing Scenarios

### Scenario 1: New User Sign-Up
```
User Action              | Expected Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Click Sign Up            | Form appears
Enter email & password   | Form validates
Click Sign Up button     | Loading spinner
                         | Message: "Check email..."
                         | 
Check email inbox        | Email from Supabase
Click confirm link       | Auto-login OR redirect
                         | 
Try signing in           | Works! ✅
```

### Scenario 2: Email Not Confirmed
```
User Action              | Expected Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sign up with email       | Email sent
Don't confirm email      | -
Try signing in           | Error: "Email not confirmed"
                         | OR: "Invalid login credentials"
Confirm email            | -
Try signing in again     | Works! ✅
```

### Scenario 3: Wrong Password
```
User Action              | Expected Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email confirmed ✅       | -
Try with wrong password  | Error: "Invalid login credentials"
Use correct password     | Works! ✅
```

---

## 🚨 Troubleshooting Checklist

| Issue | Check This |
|-------|-----------|
| "Invalid login credentials" | Email confirmed? Try Google OAuth? |
| No email received | Email provider enabled? SMTP configured? |
| User can't sign in | Email confirmed? Password correct? User disabled? |
| Sign up doesn't work | Email provider enabled? Autoconfirm setting? |
| Error 400 from Supabase | Check browser console for full error message |

---

## 🎯 Quickest Fix

If email/password isn't working:

1. **Enable Email Provider** (if not already)
   - Authentication → Providers → Email → ON

2. **Test with Google OAuth** (as workaround)
   - Should work immediately
   - Proves Supabase is working

3. **Sign up with test email**
   - Confirm email immediately
   - Then try to sign in

4. **Run diagnostics**
   - On login page: "🔍 Troubleshoot Auth Issues"
   - Check browser console for details

5. **Still broken?**
   - Check AUTH_TROUBLESHOOTING.md in repo
   - Check EMAIL_AUTH_FIX_SUMMARY.md in repo

---

## 📞 If Issue Persists

1. **Check Supabase Status**
   - https://status.supabase.com

2. **Review Your Setup:**
   - Email provider: ON ✅
   - Email templates: Enabled ✅
   - .env variables: Correct ✅
   - Dev server: Restarted ✅

3. **Try These Steps:**
   - Sign up with DIFFERENT email
   - Use strong password (8+ chars)
   - Check spam folder for email
   - Wait 30 seconds for email to arrive

4. **Check Console Logs:**
   - F12 → Console tab
   - Look for error details
   - Send full error message to support

---

## ✅ Success Indicators

When everything is working correctly:
- ✅ Sign up button works
- ✅ Confirmation email arrives within 30 seconds
- ✅ Confirmation link in email works
- ✅ User appears in Supabase Users list
- ✅ Email Confirmed At field is populated
- ✅ Can sign in with email and password
- ✅ Redirected to home page after login
