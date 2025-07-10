import google.generativeai as genai
import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-pro")
genai.configure(api_key=GEMINI_API_KEY)
print(GEMINI_API_KEY)
try:
    model = genai.GenerativeModel("gemini-2.0-flash")  # <--- POTENTIAL FIX HERE
    print("Gemini model loaded successfully.")
except Exception as e:
    print(f"Error loading Gemini model: {e}")
    print("Please check your API key and model availability.")
    exit()


def classify_priority(title, description):
    prompt = (
        f"Classify the priority of the following task as 'Low', 'Medium', 'High', or 'Critical'.\n"
        f"Your response MUST be ONLY one of these four words, with no additional text or punctuation.\n\n"
        f"Task Title: {title}\n"
        f"Description: {description}\n"
        f"Priority:"
    )

    try:
        response = model.generate_content(prompt)
        priority_output = response.text.strip()
        valid_priorities = {"Low", "Medium", "High", "Critical"}
        if priority_output not in valid_priorities:
            print(
                f"Warning: Unexpected priority output from Gemini: '{priority_output}'. Returning 'Medium'."
            )
            return "Medium"

        return priority_output

    except Exception as e:
        print("Gemini error:", e)
        return "Medium"
