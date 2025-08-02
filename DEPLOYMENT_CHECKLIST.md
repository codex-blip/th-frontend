# 🎯 TREASURE HUNT DEPLOYMENT CHECKLIST
## For 500+ Freshers Event

### ✅ PRE-DEPLOYMENT (1 Week Before Event)

#### 1. Backend Deployment (Railway)
- [ ] Create Railway account at [railway.app](https://railway.app)
- [ ] Connect GitHub repository
- [ ] Deploy backend from `backend` folder
- [ ] Set environment variables:
  ```
  SECRET_KEY=treasure-hunt-2025-secure-key-change-this
  CORS_ORIGINS=["https://your-app.vercel.app"]
  PORT=8000
  ```
- [ ] Test backend: `https://your-app.railway.app/health`
- [ ] Test API docs: `https://your-app.railway.app/docs`

#### 2. Frontend Deployment (Vercel)
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Connect GitHub repository
- [ ] Deploy frontend from `frontend` folder
- [ ] Set environment variable:
  ```
  NEXT_PUBLIC_API_URL=https://your-backend.railway.app
  ```
- [ ] Test frontend: `https://your-app.vercel.app`

#### 3. Configuration Updates
- [ ] Update CORS in Railway with Vercel URL
- [ ] Test login functionality end-to-end
- [ ] Verify admin panel works
- [ ] Check mobile responsiveness

### ✅ PERFORMANCE OPTIMIZATION (3 Days Before)

#### Railway Backend Settings
- [ ] Upgrade to Railway Pro Plan ($20/month) for event
- [ ] Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT --workers 4`
- [ ] Monitor resource usage in Railway dashboard

#### Load Testing
- [ ] Install Apache Bench: `sudo apt install apache2-utils` (Linux) or download for Windows
- [ ] Test backend load:
  ```bash
  ab -n 1000 -c 50 https://your-backend.railway.app/health
  ```
- [ ] Test login endpoint:
  ```bash
  ab -n 500 -c 25 -p login_data.json -T application/json https://your-backend.railway.app/api/login
  ```
- [ ] Verify response times < 500ms

### ✅ EVENT DAY PREPARATION (Day Before)

#### Monitoring Setup
- [ ] Bookmark Railway dashboard for monitoring
- [ ] Bookmark Vercel dashboard for analytics  
- [ ] Set up alerts for high CPU/memory usage
- [ ] Prepare backup local servers (if needed)

#### Final Testing
- [ ] Test with 10+ people simultaneously
- [ ] Verify database saves all logins correctly
- [ ] Check admin panel shows real-time data
- [ ] Test on different devices (mobile, tablet, laptop)
- [ ] Verify treasure hunt logic works correctly

#### Communication Plan
- [ ] Share links with organizing team
- [ ] Prepare backup plan communication
- [ ] Test notification systems

### ✅ EVENT DAY CHECKLIST

#### 30 Minutes Before Event
- [ ] Check both platforms are running
- [ ] Verify latest deployments are live
- [ ] Test login with all credential types
- [ ] Monitor resource usage baseline

#### During Event
- [ ] Monitor Railway dashboard every 15 minutes
- [ ] Check Vercel analytics for traffic patterns
- [ ] Watch for error alerts
- [ ] Keep local backup servers ready

#### Real-time Monitoring URLs
- Backend Health: `https://your-backend.railway.app/health`
- Backend Metrics: Railway Dashboard
- Frontend Analytics: Vercel Dashboard
- API Documentation: `https://your-backend.railway.app/docs`

### 🚨 EMERGENCY PROCEDURES

#### If Backend Goes Down
1. Check Railway dashboard for errors
2. Restart service in Railway
3. If persistent, deploy backup locally:
   ```bash
   cd backend
   .venv\Scripts\activate
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```
4. Update frontend environment variable to local backend

#### If Frontend Goes Down
1. Check Vercel dashboard for errors
2. Trigger redeployment in Vercel
3. If persistent, run local frontend:
   ```bash
   cd frontend
   npm start
   ```

#### Database Issues
1. Download current database from Railway
2. Check for corruption: `sqlite3 treasure_hunt.db ".check"`
3. Restore from backup if needed

### 📊 EXPECTED PERFORMANCE METRICS

#### Healthy Metrics
- Response time: < 500ms
- CPU usage: < 70%
- Memory usage: < 80%
- Error rate: < 1%

#### Traffic Expectations for 500 Users
- Peak concurrent users: ~200-300
- Total requests: ~2000-3000
- Database entries: 500+ login records

### 📞 EMERGENCY CONTACTS

#### Platform Support
- Railway: help@railway.app
- Vercel: support@vercel.com

#### Team Contacts
- Lead Developer: [Your Contact]
- Event Coordinator: [Coordinator Contact]
- Technical Support: [Support Contact]

### 💰 COST SUMMARY

#### Railway Pro (Event Month Only)
- Cost: $20/month
- Resources: 8GB RAM, 100GB storage
- Cancel after event

#### Vercel
- Free tier (sufficient)
- No additional cost

**Total Event Cost: $20**

---

## 🎉 POST-EVENT CLEANUP

#### After Event (Next Day)
- [ ] Download final database with all participants
- [ ] Export participant list for certificates
- [ ] Downgrade Railway plan to free tier
- [ ] Archive deployment for future reference
- [ ] Document lessons learned

---

**Your treasure hunt is ready for 500+ participants! 🏆**

### Final URLs to Share:
- **Participants**: `https://your-app.vercel.app`
- **Admin Panel**: Same URL (use admin credentials)
- **Monitoring**: Railway + Vercel dashboards
