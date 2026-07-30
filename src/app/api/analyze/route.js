import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileBase64, mediaType } = body;

    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: mediaType === 'application/pdf' ? 'document' : 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: fileBase64,
              },
            },
            {
              type: 'text',
              text: `You are reviewing a health insurance denial letter or EOB.
Extract the following as JSON only, no other text, no markdown formatting:
{
  "insurer_name": "",
  "denial_reason_raw": "",
  "denial_reason_category": "one of: medical_necessity, out_of_network, prior_authorization, experimental_investigational, coding_billing_error, coverage_exclusion, other",
  "procedure_or_service": "",
  "date_of_service": "",
  "appeal_deadline": "",
  "plan_type": ""
}
If a field isn't found, use null.`,
            },
          ],
        },
      ],
    });

    const extractedText = extraction.content[0].text;
    const cleanJson = extractedText.replace(/```json|```/g, '').trim();
    const extracted = JSON.parse(cleanJson);

    const letter = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `Draft a formal insurance appeal letter using these details.
Tone: firm, factual, professional. Include: header, statement of what's
being appealed, point-by-point rebuttal of the denial reason, reference to
appeal rights, requested outcome, and a list of documents to attach.
Leave placeholders like [insert physician letter reference] where the user
needs to add specifics. Do not invent medical facts or legal citations.

Denial details: ${JSON.stringify(extracted)}`,
        },
      ],
    });

    return Response.json({
      extracted,
      letter: letter.content[0].text,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}