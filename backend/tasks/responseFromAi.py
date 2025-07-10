import google.generativeai as genai
import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-pro")
genai.configure(api_key=GEMINI_API_KEY)

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

            return "Medium"

        return priority_output

    except Exception as e:
        print("Gemini error:", e)
        return "Medium"


PREDEFINED_TAGS = [
    "Work",
    "Personal",
    "Health",
    "Finance",
    "Learning",
    "Urgent",
    "Shopping",
]

import json
import re


def get_tags_from_gemini(title, description):
    prompt = (
        "Based on the following task, generate up to 3 relevant one-word tags "
        "from the following list: [Work, Personal, Health, Finance, Learning, Urgent, Shopping]. "
        'Return them as a JSON array of strings. For example: ["Work", "Urgent"]\n'
        f"Task Title: {title}\n"
        f"Description: {description}"
    )

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()

        print(raw, "rawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        json_match = re.search(r"\[.*?\]", raw, re.DOTALL)
        if not json_match:
            print("No valid JSON array found in Gemini response.")
            return []

        cleaned_json = json_match.group(0)
        tags = json.loads(cleaned_json)
        return [tag for tag in tags if tag in PREDEFINED_TAGS]

    except Exception as e:
        print("Gemini Tagging Error:", e)
        return []
