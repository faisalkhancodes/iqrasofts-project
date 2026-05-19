"""
Test script to verify Gemini API key and connectivity (using new google-genai)
"""
import google.genai as genai
from google.genai.types import GenerateContentConfig
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')

print("=" * 60)
print("GEMINI API KEY TEST (google-genai)")
print("=" * 60)

# Check if API key exists
if not api_key:
    print("❌ ERROR: No API key found in .env file")
    exit(1)

print(f"✓ API Key loaded: {api_key[:15]}...{api_key[-5:]}")

# Initialize client
try:
    client = genai.Client(api_key=api_key)
    print("✓ Gemini client initialized successfully")
except Exception as e:
    print(f"❌ Client Error: {str(e)}")
    exit(1)

# Test the API connection
print("\nTesting API connection...")
try:
    # Send a test request
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Say 'Hello from Gemini API' and nothing else.",
        config=GenerateContentConfig(
            temperature=0.7,
            max_output_tokens=100,
        ),
    )
    
    print("✓ API Response received!")
    print(f"\nResponse:\n{response.text}")
    print("\n" + "=" * 60)
    print("✅ ALL TESTS PASSED - API KEY WORKS!")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ API Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
    exit(1)
