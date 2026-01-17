# to test api key
# make a .env.local file at the same level as this script
# copy paste with your key
# GEMINI_API_KEY=<your key>

# RUN to test gemini

# python scriptToTestGemini.py


from google import genai
from dotenv import load_dotenv

load_dotenv('.env.local')

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

response = client.models.generate_content(
    model="gemini-3-flash-preview", contents="Explain how AI works in a few words"
)
print(response.text)


