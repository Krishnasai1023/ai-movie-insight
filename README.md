# 🎬 AI Movie Insight Builder

A full-stack web application that analyzes movie reviews using AI to provide comprehensive sentiment analysis. Built with Next.js, TypeScript, Tailwind CSS, and OpenAI.

![AI Movie Insight Builder](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)

## 🌟 Features

### Core Functionalities

- **🔍 Movie Search**: Search movies by IMDb ID (e.g., tt0133093)
- **📊 Movie Metadata**: Displays title, poster, cast, release year, rating, plot, and more
- **💬 Review Retrieval**: Fetches audience reviews from IMDb
- **🤖 AI-Powered Analysis**: 
  - Analyzes reviews using OpenAI GPT-4
  - Generates comprehensive sentiment summary
  - Categorizes sentiment as Positive, Mixed, or Negative
  - Provides sentiment breakdown with percentages
  - Identifies key themes, pros, and cons

### UI/UX Features

- **🎨 Premium Design**: Modern, gradient-based UI with smooth animations
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **🌙 Dark Mode Support**: Automatic dark mode based on system preferences
- **✨ Smooth Animations**: Framer Motion animations for enhanced user experience
- **⚡ Real-time Loading States**: Visual feedback during data fetching
- **❌ Error Handling**: Graceful error messages with retry functionality

## 🚀 Live Demo

Visit the deployed application: [AI Movie Insight Builder](https://your-deployment-url.netlify.app)

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.6**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Node.js**: Runtime environment

### APIs & Data Sources
- **OMDB API**: Movie metadata
- **IMDb**: Review scraping (with fallback to mock data)
- **OpenAI GPT-4**: AI sentiment analysis

### Development Tools
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **ESLint**: Code linting
- **TypeScript**: Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.17.0 or higher
- **npm**: Version 11.0 or higher
- **Git**: For version control

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-movie-insight.git
cd ai-movie-insight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# OMDB API Key - Get from https://www.omdbapi.com/apikey.aspx
OMDB_API_KEY=your_omdb_api_key_here

# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here
```

#### Getting API Keys:

**OMDB API Key:**
1. Visit [OMDB API](https://www.omdbapi.com/apikey.aspx)
2. Choose the free tier (1,000 daily requests)
3. Enter your email and verify
4. Copy the API key from your email

**OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and store it securely

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Tests

```bash
npm test
```

For watch mode:
```bash
npm run test:watch
```

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ai-movie-insight/
├── app/
│   ├── api/
│   │   ├── movie/[imdbId]/
│   │   │   └── route.ts          # Movie metadata API
│   │   ├── reviews/[imdbId]/
│   │   │   └── route.ts          # Reviews retrieval API
│   │   └── sentiment/
│   │       └── route.ts          # AI sentiment analysis API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── ErrorDisplay.tsx          # Error message component
│   ├── LoadingSpinner.tsx        # Loading indicator
│   ├── MovieCard.tsx             # Movie metadata display
│   ├── ReviewsList.tsx           # Reviews list component
│   └── SentimentDisplay.tsx      # Sentiment analysis display
├── types/
│   └── index.ts                  # TypeScript type definitions
├── __tests__/
│   ├── components.test.tsx       # Component tests
│   └── utils.test.ts             # Utility function tests
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Environment variables template
├── jest.config.ts                # Jest configuration
├── jest.setup.ts                 # Jest setup file
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🎯 How It Works

### 1. User Input
- User enters an IMDb movie ID (format: `tt1234567`)
- Input validation ensures correct format
- Example movies provided for quick testing

### 2. Data Fetching Pipeline
```
User Input → Movie Metadata → Reviews Retrieval → AI Analysis → Results Display
```

### 3. Movie Metadata API
- Calls OMDB API with IMDb ID
- Fetches comprehensive movie information
- Returns structured data to frontend

### 4. Reviews Retrieval
- Attempts to scrape reviews from IMDb
- Falls back to mock data if scraping fails
- Includes author, content, rating, and helpful votes

### 5. AI Sentiment Analysis
- Sends reviews to OpenAI GPT-4
- Generates comprehensive sentiment report
- Includes:
  - Overall sentiment (Positive/Mixed/Negative)
  - Summary paragraph
  - Percentage breakdown
  - Key themes
  - Pros and cons list

### 6. Results Display
- Movie card with poster and details
- Animated sentiment analysis visualization
- Interactive reviews list with expand/collapse
- Responsive layout for all devices

## 🧪 Testing

The project includes comprehensive tests:

### Unit Tests
- IMDb ID validation
- Sentiment determination logic
- Percentage calculations

### Component Tests
- LoadingSpinner rendering
- Error display functionality
- Component props handling

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-movie-insight.git
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Visit [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub" and select your repository
   - Netlify auto-detects Next.js settings
   - Add environment variables in Site Settings:
     - `OMDB_API_KEY`
     - `OPENAI_API_KEY`
   - Click "Deploy site"

3. **Done!**
   Your app will be live at `https://your-app.netlify.app`

   The project includes a `netlify.toml` configuration file for optimal deployment.

### Quick Deploy via Netlify CLI

1. **Install and Login**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

3. **Add Environment Variables**
   ```bash
   netlify env:set OMDB_API_KEY "your-key"
   netlify env:set OPENAI_API_KEY "your-key"
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🎨 Design Decisions & Tech Stack Rationale

### Why Next.js?
- **Server-side rendering**: Better SEO and performance
- **API Routes**: Built-in backend without separate server
- **App Router**: Modern routing with layouts
- **Optimized Images**: Automatic image optimization
- **TypeScript Support**: First-class TypeScript integration

### Why Tailwind CSS?
- **Rapid Development**: Utility classes speed up styling
- **Consistency**: Design system built-in
- **Responsive**: Mobile-first approach
- **Dark Mode**: Easy theme switching
- **Small Bundle**: Only used utilities included

### Why Framer Motion?
- **Smooth Animations**: Production-ready animations
- **Declarative**: Easy to understand and maintain
- **Performance**: Hardware-accelerated
- **Gestures**: Built-in interaction support

### Why OpenAI?
- **Advanced NLP**: State-of-the-art language understanding
- **Structured Output**: JSON mode for reliable parsing
- **Context Awareness**: Understands nuance in reviews
- **Scalable**: Handles varying review counts

## 🔐 Security Considerations

- ✅ API keys stored in environment variables
- ✅ Server-side API calls (keys never exposed to client)
- ✅ Input validation on all user inputs
- ✅ Error handling prevents sensitive data leaks
- ✅ No direct database access (using public APIs)

## 🐛 Known Limitations & Assumptions

### Limitations
1. **Review Scraping**: IMDb may block automated scraping; fallback to mock data included
2. **API Rate Limits**: 
   - OMDB: 1,000 requests/day (free tier)
   - OpenAI: Based on your billing plan
3. **IMDb ID Only**: Only searches by IMDb ID, not movie title
4. **English Reviews**: AI analysis optimized for English text

### Assumptions
1. Users have valid IMDb IDs
2. Movies have reviews available
3. API keys are properly configured
4. Internet connection is stable
5. Modern browser with JavaScript enabled

## 🔮 Future Enhancements

- [ ] Search by movie title
- [ ] Save favorite analyses
- [ ] Compare multiple movies
- [ ] Export reports as PDF
- [ ] Support for multiple languages
- [ ] Review filtering by rating/date
- [ ] User authentication
- [ ] Historical sentiment tracking
- [ ] Integration with more review sources
- [ ] Advanced analytics dashboard

## 📚 API Documentation

### Movie Metadata Endpoint
```typescript
GET /api/movie/[imdbId]

Response: {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  imdbRating: string;
  // ... more fields
}
```

### Reviews Endpoint
```typescript
GET /api/reviews/[imdbId]

Response: Review[] {
  author: string;
  content: string;
  rating?: number;
  date?: string;
}
```

### Sentiment Analysis Endpoint
```typescript
POST /api/sentiment

Body: {
  reviews: Review[];
  movieTitle: string;
}

Response: {
  overallSentiment: 'Positive' | 'Mixed' | 'Negative';
  summary: string;
  positivePercentage: number;
  // ... more fields
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for movie data
- [OpenAI](https://openai.com/) for AI capabilities
- [Next.js](https://nextjs.org/) for the amazing framework
- [Netlify](https://netlify.com/) for hosting and serverless functions
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-movie-insight/issues) page
2. Create a new issue with detailed description
3. Contact via email: your.email@example.com

---

**Built with ❤️ for the AI Movie Insight Builder Challenge**

*Submission Date: March 5th, 2026*
*Deadline: 5th Mar 2026 @ 11:59 PM IST*
