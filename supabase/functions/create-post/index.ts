import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const allowedOrigins = [
  'https://nhniqkmyliwfqtowivsq.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (allowedOrigins.includes(origin) || origin.endsWith('.lovableproject.com'));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

interface CreatePostRequest {
  ideaTitle: string;
  ideaContent: string;
  platform: string;
  tone: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Reject requests from non-allowed origins
  const isAllowedOrigin = origin && (allowedOrigins.includes(origin) || origin.endsWith('.lovableproject.com'));
  if (!isAllowedOrigin) {
    console.log('Rejected request from unauthorized origin:', origin);
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { ideaTitle, ideaContent, platform, tone } = await req.json() as CreatePostRequest;

    // Validate required input
    if (!ideaTitle?.trim() || !ideaContent?.trim() || !platform) {
      return new Response(JSON.stringify({ error: 'Invalid request: missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Creating post for:', { ideaTitle, platform, tone });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const platformGuides: Record<string, string> = {
      instagram: 'Instagram post with engaging caption, relevant hashtags (5-10), and emoji usage. Keep caption under 2200 characters.',
      linkedin: 'LinkedIn post that is professional yet engaging. Use line breaks for readability. Include a call-to-action.',
      twitter: 'Twitter/X post under 280 characters. Punchy, memorable, with 1-2 relevant hashtags.',
      facebook: 'Facebook post that encourages engagement and sharing. Can be longer form with storytelling.',
      email: 'Email marketing copy with a compelling subject line, preview text, body content, and clear CTA.',
      blog: 'Blog post outline with headline, subheadings, key points, and SEO considerations.',
    };

    const toneGuides: Record<string, string> = {
      professional: 'Maintain a professional, authoritative tone. Use industry terminology appropriately.',
      casual: 'Keep it friendly and conversational. Use contractions and relatable language.',
      witty: 'Add humor and cleverness. Use wordplay and pop culture references where appropriate.',
      inspirational: 'Be motivational and uplifting. Use powerful, emotive language.',
      educational: 'Focus on teaching and informing. Be clear and structured.',
    };

    const systemPrompt = `You are an expert social media and content marketing specialist. Create compelling, platform-optimized content that drives engagement.

Platform guidelines: ${platformGuides[platform] || platformGuides.instagram}
Tone: ${toneGuides[tone] || toneGuides.professional}

Return your response as JSON with:
- headline: The main headline or hook (if applicable)
- content: The full post content
- hashtags: Array of relevant hashtags (without #)
- callToAction: A suggested call-to-action
- tips: Array of 2-3 tips for maximizing engagement with this post`;

    const userPrompt = `Create a ${platform} post based on this marketing idea:

Title: ${ideaTitle}
Concept: ${ideaContent}

Generate engaging, ready-to-publish content optimized for ${platform}.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('Raw OpenAI response:', content);

    let post;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        post = JSON.parse(jsonMatch[0]);
      } else {
        post = {
          headline: ideaTitle,
          content: content,
          hashtags: [],
          callToAction: 'Learn more',
          tips: ['Engage with comments', 'Post at optimal times'],
        };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      post = {
        headline: ideaTitle,
        content: content,
        hashtags: [],
        callToAction: 'Learn more',
        tips: ['Engage with comments'],
      };
    }

    return new Response(JSON.stringify({ 
      success: true,
      platform,
      post,
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in create-post function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
