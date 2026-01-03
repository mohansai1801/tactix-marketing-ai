import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AgentRequest {
  agentType: string;
  action: string;
  context?: Record<string, unknown>;
}

const agentPrompts: Record<string, string> = {
  'market-intelligence': `You are a Market Intelligence Agent. Analyze market trends, identify competitor insights, and discover opportunities. Provide data-driven insights with actionable recommendations.`,
  'content-generation': `You are a Content Generation Agent. Create compelling marketing content tailored to the target audience. Focus on engagement, brand voice consistency, and conversion optimization.`,
  'lead-generation': `You are a Lead Generation Agent. Identify potential leads, create outreach strategies, and develop lead scoring criteria. Focus on quality over quantity.`,
  'social-automation': `You are a Social Media Automation Agent. Plan content calendars, suggest optimal posting times, and create engagement strategies across platforms.`,
  'analytics-optimization': `You are an Analytics & Optimization Agent. Analyze performance metrics, identify trends, and provide data-driven recommendations for improvement.`,
};

const actionPrompts: Record<string, string> = {
  'analyze': 'Perform a comprehensive analysis and provide detailed insights.',
  'generate': 'Generate content or strategies based on the provided context.',
  'optimize': 'Suggest optimizations and improvements based on current performance.',
  'predict': 'Provide predictions and forecasts based on available data.',
  'report': 'Create a summary report with key metrics and recommendations.',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentType, action, context } = await req.json() as AgentRequest;

    console.log('Agent workflow request:', { agentType, action, context });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = agentPrompts[agentType] || agentPrompts['market-intelligence'];
    const actionPrompt = actionPrompts[action] || actionPrompts['analyze'];

    const userPrompt = `${actionPrompt}

Context:
${JSON.stringify(context || {}, null, 2)}

Provide a structured response with:
1. Summary (2-3 sentences)
2. Key Insights (3-5 bullet points)
3. Recommendations (3 actionable items)
4. Next Steps (what to do immediately)

Format your response as JSON with keys: summary, insights (array), recommendations (array), nextSteps (array).`;

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
        temperature: 0.7,
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

    console.log('Raw agent response:', content);

    // Parse JSON from response
    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON, structure the text response
        result = {
          summary: content.substring(0, 200),
          insights: ['Analysis completed successfully'],
          recommendations: ['Review the detailed response'],
          nextSteps: ['Implement suggested changes'],
        };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      result = {
        summary: content.substring(0, 200),
        insights: ['Analysis completed'],
        recommendations: ['Review response'],
        nextSteps: ['Continue workflow'],
      };
    }

    return new Response(JSON.stringify({ 
      success: true,
      agentType,
      action,
      result,
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in agent-workflow function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
