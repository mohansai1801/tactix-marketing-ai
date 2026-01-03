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

interface OnboardingData {
  businessType: string;
  goals: string[];
  channels: string[];
  budget: string;
  timeline: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
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
    const { onboardingData, category } = await req.json() as { 
      onboardingData: OnboardingData; 
      category?: string;
    };

    // Validate required input
    if (!onboardingData || !onboardingData.businessType) {
      return new Response(JSON.stringify({ error: 'Invalid request: missing onboarding data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating ideas for:', onboardingData, 'Category:', category);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const businessTypeLabels: Record<string, string> = {
      'startup': 'Tech Startup',
      'ecommerce': 'E-Commerce Business',
      'agency': 'Marketing Agency',
      'saas': 'SaaS Company',
      'local': 'Local Business',
      'creator': 'Content Creator',
    };

    const businessLabel = businessTypeLabels[onboardingData.businessType] || onboardingData.businessType;
    const categoryFilter = category && category !== 'all' ? `Focus specifically on ${category} strategies.` : '';

    const systemPrompt = `You are TACTIX, an elite AI marketing strategist. Generate creative, actionable marketing ideas tailored to the user's business profile. Each idea should be specific, implementable, and include engagement predictions.

Return your response as a JSON array with exactly 6 marketing ideas. Each idea must have:
- id: unique string identifier
- title: catchy, action-oriented title (max 8 words)
- content: detailed explanation of the strategy (2-3 sentences)
- hook: a compelling opening line or hook to grab attention
- category: one of "content", "social", "email", "paid", "seo", "partnership"
- engagement: predicted engagement level as percentage string (e.g., "+45%")
- difficulty: one of "Easy", "Medium", "Hard"
- timeframe: estimated time to implement (e.g., "2-3 days", "1 week")

Be creative, specific to their business type, and focus on modern marketing trends.`;

    const userPrompt = `Generate marketing ideas for:
- Business Type: ${businessLabel}
- Goals: ${onboardingData.goals.join(', ')}
- Preferred Channels: ${onboardingData.channels.join(', ')}
- Budget: ${onboardingData.budget}
- Timeline: ${onboardingData.timeline}

${categoryFilter}

Generate 6 unique, creative marketing ideas that align with their goals and budget.`;

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
        max_tokens: 2000,
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

    // Parse JSON from response (handle markdown code blocks)
    let ideas;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        ideas = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON array found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Failed to parse AI response');
    }

    console.log('Generated ideas:', ideas);

    return new Response(JSON.stringify({ ideas }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ideas function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
