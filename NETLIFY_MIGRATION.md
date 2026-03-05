# Netlify Migration Guide

This project has been configured for deployment on **Netlify** instead of Vercel.

## What Changed

### New Files Created

1. **`netlify.toml`** - Netlify configuration file with:
   - Next.js Runtime plugin configuration
   - Build settings optimized for Netlify
   - Environment variable placeholders
   - Headers for security and caching
   - Redirects for client-side routing

### Files Updated

1. **`DEPLOYMENT.md`** - Complete rewrite with Netlify deployment instructions
2. **`README.md`** - Updated deployment section to reference Netlify
3. **`FILE_INVENTORY.md`** - Updated to reference netlify.toml
4. **`PROJECT_SUMMARY.md`** - Updated deployment steps for Netlify
5. **`SUBMISSION.md`** - Updated deployment checklist for Netlify
6. **`.gitignore`** - Added Netlify-specific directories

### Files That Can Be Removed (Optional)

- **`vercel.json`** - No longer needed for Netlify deployment (but won't cause issues if kept)

## Deployment Differences

### Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| **CLI Install** | `npm install -g vercel` | `npm install -g netlify-cli` |
| **Login** | `vercel login` | `netlify login` |
| **Deploy** | `vercel --prod` | `netlify deploy --prod` |
| **Env Vars** | `vercel env add KEY` | `netlify env:set KEY "value"` |
| **Live URL** | `*.vercel.app` | `*.netlify.app` |
| **Config File** | `vercel.json` | `netlify.toml` |
| **API Routes** | Native support | Converted to Netlify Functions |

## Quick Start with Netlify

### Option 1: Deploy via Dashboard

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Add environment variables
6. Deploy!

### Option 2: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Option 3: Deploy Button

Use the one-click deploy button in README or DEPLOYMENT.md

## Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

```
OMDB_API_KEY=your_omdb_api_key
OPENAI_API_KEY=your_openai_api_key
```

**Important**: Don't wrap values in quotes in the Netlify dashboard!

## Netlify Advantages

1. **Generous Free Tier**
   - 300 build minutes/month
   - 100GB bandwidth
   - Unlimited sites

2. **Next.js Support**
   - Official Next.js Runtime plugin
   - API routes converted to Netlify Functions
   - Automatic ISR and SSR support

3. **Great DX**
   - Deploy previews for every PR
   - Instant rollbacks
   - Split testing built-in
   - Form handling included

4. **Performance**
   - Global CDN
   - Automatic image optimization
   - Edge handlers for dynamic content

## Troubleshooting

### Build Fails

Check:
- Build command is `npm run build`
- Publish directory is `.next`
- Node version is set to 18 or 20
- All dependencies are in package.json

### Environment Variables Not Working

- Add them in Site Settings → Environment Variables
- Trigger a new deploy after adding
- Don't include quotes in Netlify dashboard
- Variable names are case-sensitive

### API Routes Return 404

- Ensure `netlify.toml` has `@netlify/plugin-nextjs` plugin
- Check Functions log in Netlify dashboard
- Verify API routes are in `app/api/` directory

### Slow Builds

- Netlify caches `node_modules` between builds
- Clear cache in Deploy Settings if needed
- Consider using `npm ci` instead of `npm install`

## Support

- **Documentation**: https://docs.netlify.com
- **Community Forums**: https://answers.netlify.com/
- **Status Page**: https://netlifystatus.com/
- **Blog**: https://www.netlify.com/blog/

## Next Steps

1. ✅ Review `netlify.toml` configuration
2. ✅ Read `DEPLOYMENT.md` for detailed instructions
3. ✅ Push code to GitHub
4. ✅ Deploy to Netlify
5. ✅ Add environment variables
6. ✅ Test your deployment
7. ✅ Celebrate! 🎉

---

*Last Updated: March 5, 2026*
