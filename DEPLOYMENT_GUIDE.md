# 🚀 Deployment Guide: Render (Backend) + Vercel (Frontend)

This guide will walk you through deploying your AI Interview Platform with the backend on Render and frontend on Vercel.

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ GitHub account
- ✅ Render account ([render.com](https://render.com))
- ✅ Vercel account ([vercel.com](https://vercel.com))
- ✅ MongoDB Atlas database set up
- ✅ Groq API key
- ✅ Your code pushed to a GitHub repository

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Push Your Code to GitHub

```bash
# If not already done
cd c:\iqup\iqup
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository from the list

### Step 3: Configure the Web Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `iqup-backend` (or your preferred name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `backend` ⚠️ **IMPORTANT** |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (or paid plan) |

> [!IMPORTANT]
> The **Root Directory** must be set to `backend` - this is crucial because your `package.json` is in the backend folder, not the root.

### Step 4: Add Environment Variables

In the **Environment Variables** section, add the following:

| Key | Value | Example |
|-----|-------|---------|
| `PORT` | `5000` | `5000` |
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `GROQ_API_KEY` | Your Groq API key | `gsk_...` |
| `JWT_SECRET` | Random secure string | `your-super-secret-jwt-key-12345` |
| `NODE_ENV` | `production` | `production` |
| `FRONTEND_URL` | Your Vercel URL (add later) | `https://your-app.vercel.app` |

> [!TIP]
> For `JWT_SECRET`, generate a random string using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait for the deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll get a URL like: `https://iqup-backend.onrender.com`

### Step 6: Test Your Backend

Open your backend URL in a browser or use curl:

```bash
curl https://iqup-backend.onrender.com
```

You should see a response from your server.

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Before deploying, you need to configure your frontend to use the Render backend URL.

1. Check if you have an API configuration file in your frontend
2. Look for files like `config.js`, `constants.js`, or API calls in components
3. Update the base URL to your Render backend URL

**Example:** If you have API calls like this:
```javascript
// Before
const API_URL = 'http://localhost:5000';

// After
const API_URL = import.meta.env.VITE_API_URL || 'https://iqup-backend.onrender.com';
```

### Step 2: Create Environment Variable File

Create a `.env.production` file in your frontend directory:

```env
VITE_API_URL=https://iqup-backend.onrender.com
```

> [!NOTE]
> Replace `https://iqup-backend.onrender.com` with your actual Render backend URL.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → `iqup-frontend` (or your choice)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` (or auto-detect) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

5. Add Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://iqup-backend.onrender.com` (your Render URL)

6. Click **"Deploy"**

### Step 4: Get Your Vercel URL

After deployment completes, Vercel will provide a URL like:
- `https://iqup-frontend.vercel.app`
- Or your custom domain if configured

### Step 5: Update Backend CORS Settings

Now that you have your Vercel URL, you need to update the backend to allow requests from it.

1. Go back to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Update the `FRONTEND_URL` variable to your Vercel URL
5. Save changes (this will trigger a redeploy)

---

## ✅ Part 3: Verification & Testing

### Test Backend Endpoints

```bash
# Health check
curl https://iqup-backend.onrender.com

# Test API endpoint (example)
curl https://iqup-backend.onrender.com/api/blogs
```

### Test Frontend

1. Open your Vercel URL in a browser
2. Navigate through the application
3. Test key features:
   - ✅ Login/Register
   - ✅ Upload resume
   - ✅ Start interview
   - ✅ View blogs
   - ✅ Practice coding

### Check Browser Console

Open Developer Tools (F12) and check:
- ✅ No CORS errors
- ✅ API calls are successful
- ✅ No 404 errors for routes

---

## 🔄 Part 4: Continuous Deployment

Both Render and Vercel support automatic deployments:

### Render Auto-Deploy
- Automatically deploys when you push to your GitHub branch
- Configure in: Service Settings → Build & Deploy

### Vercel Auto-Deploy
- Automatically deploys on every push to main branch
- Preview deployments for pull requests
- Configure in: Project Settings → Git

---

## 🐛 Troubleshooting

### Backend Issues

#### "Couldn't find package.json"
- ✅ **Solution**: Ensure Root Directory is set to `backend` in Render settings

#### "MongooseServerSelectionError"
- ✅ **Solution**: Whitelist Render's IP (0.0.0.0/0) in MongoDB Atlas Network Access

#### "Port already in use"
- ✅ **Solution**: Ensure your server uses `process.env.PORT` not hardcoded port

### Frontend Issues

#### "Failed to fetch" or CORS errors
- ✅ **Solution**: Check `FRONTEND_URL` is set correctly in Render
- ✅ **Solution**: Verify CORS configuration in backend allows your Vercel domain

#### "404 on page refresh"
- ✅ **Solution**: Ensure `vercel.json` has rewrites configuration (already set up)

#### API calls to localhost
- ✅ **Solution**: Check all API URLs use environment variable, not hardcoded localhost

### Free Tier Limitations

#### Render Free Tier
- ⚠️ Service spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- 💡 **Solution**: Consider upgrading or using a cron job to keep it alive

#### Vercel Free Tier
- ✅ Unlimited bandwidth
- ✅ 100 GB-hours of serverless function execution

---

## 🔐 Security Checklist

Before going live, ensure:

- [ ] All sensitive data is in environment variables (not hardcoded)
- [ ] `.env` files are in `.gitignore`
- [ ] MongoDB Atlas has proper network access rules
- [ ] JWT_SECRET is strong and unique
- [ ] CORS is configured to only allow your frontend domain
- [ ] API rate limiting is enabled
- [ ] Input validation is implemented

---

## 📊 Monitoring

### Render Monitoring
- View logs: Service → Logs tab
- Monitor metrics: Service → Metrics tab
- Set up alerts for downtime

### Vercel Monitoring
- View deployment logs: Project → Deployments
- Analytics: Project → Analytics
- Real-time logs: `vercel logs`

---

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Vercel and Render settings
2. **SSL Certificate**: Both platforms provide free SSL automatically
3. **Database Backups**: Set up automated backups in MongoDB Atlas
4. **Monitoring**: Set up uptime monitoring (UptimeRobot, Pingdom)
5. **CI/CD**: Configure automated testing before deployment

---

## 📞 Support

If you encounter issues:
- 📖 [Render Documentation](https://render.com/docs)
- 📖 [Vercel Documentation](https://vercel.com/docs)
- 💬 Check the error logs in respective dashboards
- 🐛 Review the troubleshooting section above

---

**🎉 Congratulations!** Your application is now live and accessible to users worldwide!
