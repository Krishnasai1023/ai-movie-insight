/**
 * API Route: AI Sentiment Analysis
 * Endpoint: POST /api/sentiment
 * Description: Analyzes movie reviews using Google Gemini to generate sentiment summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Review, SentimentAnalysis } from '@/types';

export async function POST(request: NextRequest) {
  let reviews: Review[] = [];
  let movieTitle = '';
  
  try {
    const body = await request.json();
    reviews = body.reviews;
    movieTitle = body.movieTitle;

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return NextResponse.json(
        { error: 'Reviews array is required and must not be empty' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key not configured, using mock sentiment analysis');
      return NextResponse.json(generateMockSentiment(reviews), { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare reviews text for analysis
    const reviewsText = reviews
      .map((review: Review, index: number) => 
        `Review ${index + 1} (Rating: ${review.rating || 'N/A'}/10):\n${review.content}\n`
      )
      .join('\n---\n\n');

    // Create the prompt for Gemini
    const prompt = `You are a movie review analysis expert. Analyze the provided movie reviews and generate a comprehensive sentiment analysis report.

Provide your response in valid JSON format with this exact structure:
{
  "overallSentiment": "Positive" | "Mixed" | "Negative",
  "summary": "A 2-3 sentence summary of the overall audience sentiment",
  "positivePercentage": number (0-100),
  "negativePercentage": number (0-100),
  "neutralPercentage": number (0-100),
  "keyThemes": ["theme1", "theme2", "theme3"],
  "pros": ["pro1", "pro2", "pro3"],
  "cons": ["con1", "con2", "con3"]
}

Ensure percentages add up to 100. Determine overall sentiment based on the dominant sentiment in the reviews.

Analyze these reviews for the movie "${movieTitle}":

${reviewsText}

Return ONLY the JSON object, no additional text.`;

    // Call Gemini API for sentiment analysis
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    if (!analysisText) {
      throw new Error('No response from Gemini');
    }

    // Extract JSON from response (Gemini might wrap it in markdown)
    let jsonText = analysisText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').trim();
    }

    const sentiment: SentimentAnalysis = JSON.parse(jsonText);

    return NextResponse.json(sentiment, { status: 200 });
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    
    // Fallback to mock sentiment on error
    if (reviews && Array.isArray(reviews)) {
      return NextResponse.json(generateMockSentiment(reviews), { status: 200 });
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze sentiment' },
      { status: 500 }
    );
  }
}

/**
 * Generate mock sentiment analysis based on review ratings
 * Used as fallback when Gemini API is not available
 */
function generateMockSentiment(reviews: Review[]): SentimentAnalysis {
  const ratingsWithValue = reviews.filter(r => r.rating !== undefined) as (Review & { rating: number })[];
  
  if (ratingsWithValue.length === 0) {
    return {
      overallSentiment: 'Mixed',
      summary: 'The movie receives mixed reviews from audiences. While some appreciate certain aspects of the film, others have reservations about various elements of the production.',
      positivePercentage: 50,
      negativePercentage: 30,
      neutralPercentage: 20,
      keyThemes: ['Cinematography', 'Acting', 'Story', 'Pacing'],
      pros: ['Visual presentation', 'Cast performance', 'Production quality'],
      cons: ['Pacing issues', 'Predictable plot', 'Character development'],
    };
  }

  const avgRating = ratingsWithValue.reduce((sum, r) => sum + r.rating, 0) / ratingsWithValue.length;
  
  const positive = ratingsWithValue.filter(r => r.rating >= 8).length;
  const negative = ratingsWithValue.filter(r => r.rating <= 5).length;
  
  const total = ratingsWithValue.length;
  const positivePercentage = Math.round((positive / total) * 100);
  const negativePercentage = Math.round((negative / total) * 100);
  const neutralPercentage = 100 - positivePercentage - negativePercentage;
  
  let overallSentiment: 'Positive' | 'Mixed' | 'Negative';
  let summary: string;
  
  if (avgRating >= 7.5) {
    overallSentiment = 'Positive';
    summary = `The movie has been very well-received by audiences, with an average rating of ${avgRating.toFixed(1)}/10. Viewers praise the film's strong performances, engaging storytelling, and high production values. Most reviewers recommend it as a must-watch.`;
  } else if (avgRating >= 5.5) {
    overallSentiment = 'Mixed';
    summary = `The movie receives mixed reviews from audiences, with an average rating of ${avgRating.toFixed(1)}/10. While some viewers appreciate certain aspects like visuals and performances, others feel the story or pacing could have been better. Opinions are divided on its overall quality.`;
  } else {
    overallSentiment = 'Negative';
    summary = `The movie has received mostly negative feedback from audiences, with an average rating of ${avgRating.toFixed(1)}/10. Common criticisms include weak storytelling, poor pacing, and underdeveloped characters. Most reviewers express disappointment with the final product.`;
  }
  
  return {
    overallSentiment,
    summary,
    positivePercentage,
    negativePercentage,
    neutralPercentage,
    keyThemes: ['Cinematography', 'Acting Performance', 'Story & Plot', 'Pacing & Direction'],
    pros: [
      'Strong visual presentation and cinematography',
      'Solid performances from the cast',
      'High production quality and attention to detail',
    ],
    cons: [
      'Some pacing issues in the middle section',
      'Certain plot elements feel predictable',
      'Character development could be deeper',
    ],
  };
}
