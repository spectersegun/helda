I have API keys for LLM from https://platform.openai.com/
I want the 'Patient Intelligence', 'Revenue Performance', and 'Pricing Intelligence' page 'ask me anything' box in the respective 'Helda AI Assistant' to be the place that interacts with the LLM. Also the 'Which department contributed the most revenue this quarter?', 'Highlight underperforming services by revenue.' and 'Compare this months revenue to the same month last year.' should use the LLM and results should be shown in AIAssistant.


const sampleChat: ChatRow[] = [
  {
    suggestion: `Why did revenue drop in April?`,
    text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    userAvatarUrl: "/images/dp.png",
  },
  {
    suggestion: `Which departments had the lowest`,
    text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    userAvatarUrl: "/images/dp.png",
  },
]; - should show real results not oewm...

Also, create context switching, where if the user logs into hopsital, the data that the LLM uses is from 'hospital_dummy_data.csv., and if the user logs into dental, the data the LLM computes on is dental_dummy_data.csv'

Also I want the 'Helda AI Assistant' page 'ask me anything' box to interact with the LLM.

secondly, these are the rules for the LLM:

Conversation & output controls (what the LLM can/can’t say)
Prohibit personally identifiable information (PII) in prompts & responses
 If a user pastes PII, block and instruct them to remove identifiers.
Response
“It looks like your message contains personal information. For privacy and security reasons, please remove or anonymise any PII before continuing.”

No individualised medical advice
 The assistant may discuss general healthcare/dentistry topics and population-level insights only. No diagnosis, treatment plans, or “what should I do?” recommendations for a specific person.
Response
“I can share general information, but I can’t provide medical advice for an individual. It’s best to speak with a qualified healthcare professional about your specific situation.”

Uncertainty + source transparency
 Require the model to state data time windows, filters, denominators, and caveats. Always show the exact query or logic used.
Response
“Based on user data from Jan–Jun 2023, filtered to active accounts aged 18+, 62 % (±3 %) reported using the service weekly. This was calculated using SQL query X with filter Y. Data excludes inactive users.”
Numerical hygiene
Round or bin sensitive metrics; show confidence intervals where applicable; never expose raw row-level data.
Response
Around 1,200 – 1,500 users participated (95 % CI).”

Medical-safety boundaries (clinical risk guardrails)
Scope: Education + analytics only.
 Allowed: trends, rates, utilization, costs, quality measures, general dentistry knowledge with reputable citations.
 Disallowed: clinical advice for individuals, emergency guidance, or claims that a metric implies a clinical outcome without stating limits.
Standard disclaimer
Every insight block includes:
 “This tool provides aggregated analytics and general healthcare related information only. ”

Escalation paths
 If the user asks for personal medical guidance, respond with a safety message and suggest contacting a licensed professional.

