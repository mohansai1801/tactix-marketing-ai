import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const allowedOrigins = [
  'https://nhniqkmyliwfqtowivsq.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (allowedOrigins.includes(origin) || origin.endsWith('.lovableproject.com') || origin.endsWith('.lovable.app'));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      console.error('OpenAI API key not configured');
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
- tips: Array of 2-3 tips for maximizing engagement with this post
- imagePrompt: A detailed prompt for generating an image that would accompany this post (describe the visual style, colors, elements)`;

    const userPrompt = `Create a ${platform} post based on this marketing idea:

Title: ${ideaTitle}
Concept: ${ideaContent}

Generate engaging, ready-to-publish content optimized for ${platform}. Also provide an image prompt that would create a visually stunning image to accompany this post.`;

    console.log('Calling OpenAI for text generation...');

    // Generate post content
    const textResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

    if (!textResponse.ok) {
      const errorText = await textResponse.text();
      console.error('OpenAI API error:', textResponse.status, errorText);
      throw new Error(`OpenAI API error: ${textResponse.status}`);
    }

    const textData = await textResponse.json();
    const textContent = textData.choices[0].message.content;

    console.log('Raw OpenAI text response:', textContent);

    let post;
    try {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        post = JSON.parse(jsonMatch[0]);
      } else {
        post = {
          headline: ideaTitle,
          content: textContent,
          hashtags: [],
          callToAction: 'Learn more',
          tips: ['Engage with comments', 'Post at optimal times'],
          imagePrompt: `Marketing visual for ${ideaTitle}: modern, professional, engaging design with vibrant colors`,
        };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      post = {
        headline: ideaTitle,
        content: textContent,
        hashtags: [],
        callToAction: 'Learn more',
        tips: ['Engage with comments'],
        imagePrompt: `Marketing visual for ${ideaTitle}: modern, professional, engaging design`,
      };
    }

    // Generate image using DALL-E
    let imageUrl = null;
    const imagePrompt = post.imagePrompt || `Professional marketing visual for: ${ideaTitle}. Modern, clean design with vibrant colors, suitable for ${platform}.`;
    
    console.log('Generating image with prompt:', imagePrompt);

    try {
      const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `Create a visually stunning, professional marketing image: ${imagePrompt}. Style: Clean, modern, high-quality, suitable for social media. No text or words in the image.`,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.data?.[0]?.url;
        console.log('Image generated successfully');
      } else {
        const imageError = await imageResponse.text();
        console.error('Image generation error:', imageResponse.status, imageError);
      }
    } catch (imageError) {
      console.error('Failed to generate image:', imageError);
    }

    return new Response(JSON.stringify({ 
      success: true,
      platform,
      post: {
        ...post,
        imageUrl,
      },
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
