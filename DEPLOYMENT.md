# AI Movie Insight Builder - Deployment Guide

## Quick Deployment to Netlify

### Option 1: Deploy via Netlify CLI (Fastest)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   ```
   
   Follow the prompts:
   - Choose "Create & configure a new site"
   - Select your team
   - Enter a site name (or leave blank for random name)
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variables**
   ```bash
   netlify env:set OMDB_API_KEY "your-omdb-api-key"
   netlify env:set OPENAI_API_KEY "your-openai-api-key"
   ```

5. **Deploy to Production**
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Movie Insight Builder"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-movie-insight.git
   git push -u origin main
   ```

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository

3. **Configure Build Settings**
   Netlify will auto-detect Next.js. Verify these settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: `netlify/functions` (auto-created)

4. **Configure Environment Variables**
   In "Site configuration" → "Environment variables", add:
   - `OMDB_API_KEY`: Your OMDB API key
   - `OPENAI_API_KEY`: Your OpenAI API key

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (usually 2-5 minutes)
   - Your app will be live at `https://your-site-name.netlify.app`

### Option 3: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/ai-movie-insight)

**Note**: You'll need to add environment variables after deployment in Site Settings.

## Configuration Files

The project includes a `netlify.toml` file with optimized settings for Next.js:
- Next.js Runtime plugin enabled
- Automatic redirects and headers
- Optimized build settings

## Post-Deployment Checklist

- [ ] App is accessible at the Netlify URL
- [ ] Environment variables are set correctly
- [ ] Movie search works with IMDb IDs
- [ ] Reviews are being fetched
- [ ] AI sentiment analysis is working
- [ ] Responsive design works on mobile
- [ ] No console errors in browser
- [ ] Server-side API routes are working
- [ ] Check Netlify Functions logs for any errors

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (recommended: 18.x or 20.x)
- Check build logs in Netlify dashboard for specific errors
- Ensure `netlify.toml` is properly configured

### Environment Variables Not Working
- Ensure they're added in Netlify dashboard under Site Settings → Environment Variables
- Trigger a new deploy after adding variables (they don't auto-redeploy)
- Check variable names match exactly (case-sensitive)
- Variables should NOT have quotes in the Netlify dashboard

### API Routes Not Working
- Next.js API routes are converted to Netlify Functions automatically
- Check Netlify Functions logs: Site Overview → Functions
- Ensure `netlify.toml` has the Next.js Runtime plugin enabled
- Verify that API routes are in the `app/api/` directory

### API Errors
- Verify API keys are valid and active
- Check API rate limits for OMDB and OpenAI
- Review function logs in Netlify dashboard
- Test API endpoints individually

### 404 Errors on Refresh
- The `netlify.toml` should handle this with redirects
- If issues persist, check that `_redirects` or `netlify.toml` rewrites are configured

## Custom Domain (Optional)

1. Go to Netlify site dashboard
2. Navigate to "Domain management" → "Add a domain"
3. Enter your custom domain
4. Follow DNS configuration instructions:
   - **Option A**: Add Netlify nameservers to your domain registrar
   - **Option B**: Add A/CNAME records as instructed
5. SSL certificate will be provisioned automatically (usually within minutes)

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Your site will automatically rebuild and deploy!

### Deploy Previews

- Every pull request gets its own preview URL
- Test changes before merging to production
- Preview URLs are automatically generated and displayed in PR

## Monitoring & Analytics

- **View Logs**: Site Dashboard → Deploys → Deploy log
- **Function Logs**: Site Dashboard → Functions → Function name → Logs
- **Analytics**: Site Dashboard → Analytics (Netlify Analytics subscription required)
- **Performance**: Site Dashboard → Speed tab

## Rollback Deployment

If something goes wrong:

1. Go to Site Dashboard → Deploys
2. Find a previous successful deploy
3. Click "..." → "Publish deploy"
4. Site instantly rolls back to that version

## Advanced Configuration

### Netlify Functions (Serverless Functions)

API routes are automatically converted to Netlify Functions. To add custom functions:

1. Create `netlify/functions/` directory
2. Add your function files
3. Deploy - they'll be available at `/.netlify/functions/function-name`

### Build Plugins

Add plugins in `netlify.toml`:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Redirects & Rewrites

Configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

## Performance Optimization

Netlify automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic image optimization (with Netlify Image CDN)
- ✅ Brotli compression
- ✅ HTTP/2 server push
- ✅ Edge handlers for dynamic content

## Support

For deployment issues:
- **Netlify Documentation**: https://docs.netlify.com
- **Netlify Support**: https://www.netlify.com/support/
- **Community Forums**: https://answers.netlify.com/
- **GitHub Issues**: https://github.com/yourusername/ai-movie-insight/issues

## Useful Commands

```bash
# Check deployment status
netlify status

# Open site in browser
netlify open:site

# Open Netlify dashboard
netlify open:admin

# View live logs
netlify watch

# List environment variables
netlify env:list
```
