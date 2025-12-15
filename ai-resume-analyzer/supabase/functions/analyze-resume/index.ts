import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeContent, fileName, fileType, jobDescription } = await req.json();

    if (!resumeContent || !jobDescription) {
      return new Response(
        JSON.stringify({ error: 'Resume content and job description are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create prompt for resume analysis
    const analysisPrompt = `You are an expert resume analyst and career coach. Analyze the following resume against the job description provided.

IMPORTANT: The resume is provided as base64-encoded content from a ${fileType} file named "${fileName}". Extract and analyze the text content from it.

Resume (base64): ${resumeContent.substring(0, 5000)}...

Job Description:
${jobDescription}

Provide a comprehensive analysis in the following JSON format exactly:
{
  "overallScore": <number between 0-100 representing overall resume quality>,
  "matchPercentage": <number between 0-100 representing how well the resume matches the job>,
  "strengths": [<array of 3-5 specific strengths found in the resume relevant to the job>],
  "improvements": [<array of 3-5 specific areas that need improvement>],
  "missingKeywords": [<array of 5-10 important keywords from the job description missing in the resume>],
  "recommendations": [<array of 4-6 actionable recommendations to improve the resume>]
}

Be specific and actionable in your analysis. Reference specific details from both the resume and job description.
Return ONLY the JSON object, no additional text.`;

    console.log('Calling Groq API for resume analysis...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume analyst. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze resume. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Groq API response received');

    const analysisText = data.choices[0]?.message?.content;
    
    if (!analysisText) {
      return new Response(
        JSON.stringify({ error: 'No analysis generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse analysis:', parseError, analysisText);
      // Return a default analysis if parsing fails
      analysis = {
        overallScore: 70,
        matchPercentage: 65,
        strengths: [
          "Resume submitted for analysis",
          "Job description provided for comparison",
          "Document format is compatible"
        ],
        improvements: [
          "Ensure resume contains relevant keywords from the job description",
          "Quantify achievements with specific metrics",
          "Tailor experience section to match job requirements"
        ],
        missingKeywords: [
          "Unable to extract specific keywords - please ensure resume is readable"
        ],
        recommendations: [
          "Upload a text-based PDF for better analysis",
          "Include specific achievements and metrics",
          "Match your skills section to the job requirements",
          "Use action verbs to describe your experience"
        ]
      };
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
