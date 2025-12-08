# ⚡ Email Auth Quick Fix Card

## 🚨 Problem
```
Error: "Invalid login credentials" when signing in
POST https://ftipuyjcqmdyiocxjfht.supabase.co/auth/v1/token 400 (Bad Request)
```

## ✅ Solution in 3 Steps

### Step 1: Check Supabase
```
Supabase Dashboard → Authentication → Providers → Email
Make sure toggle is: [ON - blue]
```

### Step 2: Sign Up & Confirm Email
```
1. Click "Sign up"
2. Enter email & password
3. Click "Sign up"
4. Check email inbox for confirmation link
5. Click confirmation link
```

### Step 3: Try Sign In
```
1. Click "Sign in"
2. Enter same email & password
3. Click "Sign in"
4. Should work! ✅
```

## 🆘 Still Not Working?

On login page, click **"🔍 Troubleshoot Auth Issues"**
- Opens diagnostic guide
- Shows what's wrong
- Follow step-by-step fix

## 📚 Full Guides

| Document | Read If... |
|----------|-----------|
| **AUTH_TROUBLESHOOTING.md** | You need step-by-step help |
| **SUPABASE_EMAIL_SETUP.md** | You need Supabase config guide |
| **EMAIL_AUTH_FIX_SUMMARY.md** | You want technical details |
| **AUTH_FIX_COMPLETE.md** | You want full explanation |

## 🎯 Most Common Issue

**User hasn't confirmed email yet**

→ Check email inbox
→ Click confirmation link
→ Try signing in again

## 💡 Pro Tips

- Use **real email** (gmail, outlook, etc.)
- Check **spam folder** for email
- **Password minimum 6 chars**
- **Email must be confirmed** before sign-in
- Try **Google OAuth** as workaround if email not working

## ✨ What We Fixed

- ✅ Better error messages
- ✅ "Troubleshoot" button
- ✅ Helpful guidance
- ✅ Built-in diagnostics
- ✅ Complete documentation

## 🚀 Now It Works!

Email/password authentication should now work with:
- Clear error messages
- Self-diagnostics
- Complete documentation
