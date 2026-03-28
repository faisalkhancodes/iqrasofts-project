import os
import json
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

# We will initialize the client dynamically inside the request handle
# to prevent load-time crashes if the API key is missing.

SYSTEM_PROMPT = """Identity: You are the official AI Assistant for IqraSofts, a professional software house and digital services venture. Your goal is to be helpful, professional, and technically savvy.

Core Services to Mention:
- Web Development: Frontend (React, HTML, CSS), WordPress, and full CMS solutions.
- Cybersecurity: Security monitoring, phishing prevention, and web application security.
- UI/UX Design: Professional designs using Figma and Canva.
- Digital Solutions: Custom software, SQL databases, and Arduino-based projects.

Tone & Personality:
- Be professional yet approachable.
- Act as a knowledgeable consultant for potential clients.
- If a user asks about a project, highlight that IqraSofts delivers "premium, high-quality digital experiences."

Behavioral Rules:
- Lead Generation: If a user shows interest in a service, politely ask for their name and what kind of project they are looking for.
- Professionalism: Do not answer questions unrelated to software, technology, or business.
- Call to Action: Encourage users to "Get a Quote" or "Book a Consultation."
- Language: Respond in a clear and concise manner. Use bullet points for services to make them easy to read.
- Fallback: If you don't know an answer, say: "That’s a great question! For specific technical details, I recommend speaking with our lead engineers directly. Would you like me to guide you to our contact page?"
"""

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        # We don't check for self.path = '/api/chat' because Vercel handles routing, 
        # and self.path might evaluate differently in its serverless environment.

        # Set common headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Check API Key
        if not os.environ.get("OPENAI_API_KEY"):
            error_response = {"error": "API Key not configured. Please contact the administrator."}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
            return

        try:
            # Read and parse the request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            if not post_data:
                raise ValueError("Empty request body")
                
            data = json.loads(post_data.decode('utf-8'))
            user_messages = data.get("messages", [])

            if not user_messages:
                 # Default greeting if no messages provided
                 response_text = "Hello! I am the IqraSofts AI Assistant. How can I help you today?"
                 self.wfile.write(json.dumps({"reply": response_text}).encode('utf-8'))
                 return

            # Construct the full message history for OpenAI
            openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            openai_messages.extend(user_messages)

            # Initialize client dynamically here to avoid crash-on-load
            client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

            # Call OpenAI API
            completion = client.chat.completions.create(
                model="gpt-4o-mini", # Using mini for speed and cost-efficiency
                messages=openai_messages,
                temperature=0.7,
                max_tokens=500
            )

            bot_reply = completion.choices[0].message.content

            # Send back the response
            response = {"reply": bot_reply}
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            # Handle any errors gracefully
            error_response = {"error": f"An error occurred: {str(e)}"}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

if __name__ == "__main__":
    from http.server import HTTPServer
    import sys

    # Check if API key is set
    if not os.environ.get("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable not set.")
        print("Please set it with: export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)

    # Run the server on port 8000
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, handler)
    print("Starting AI Chat Server on port 8000...")
    print("Access the chat at http://localhost:8000/api/chat")
    httpd.serve_forever()
