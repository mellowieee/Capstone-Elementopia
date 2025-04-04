export async function askAI(elements, apiKey) {
  const prompt = `
You are a chemistry assistant. Given the following list of elements: ${JSON.stringify(elements)}, determine the molecule they form.

### Format the response as follows:
Output Element: [Molecule] ( [Common Name] )
ShortDescription: [A short description of the molecule]
Uses: [A brief mention of common uses]
Important: [Any key facts]

ONLY return text in this format. Do not add any extra information or explanations.
  `;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      messages: [{ role: "system", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No valid molecule found";
}
