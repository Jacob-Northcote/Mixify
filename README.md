# Mixify
Mixify – AI-Powered DJ Setlist Generator
Mixify is an AI-powered tool that helps DJs and music lovers create seamless DJ setlists. All you need to do is enter your list of songs and describe the vibe or flow you want for your set. Mixify uses advanced AI to reorder your tracks for the best possible transitions, paying special attention to musical key and BPM, so each song flows smoothly into the next.

This is a prototype designed to show how AI can help DJs plan their sets, saving time and making mixes sound more professional.

Key Features
Quickly generate DJ setlists tailored to your event or mood

Ensure smooth transitions by matching song keys and BPMs

Experiment with different set flows in seconds

Useful for both beginner and experienced DJs

Ideal for inspiration or efficient set planning

How to Use Mixify (Requires OpenAI API Key)
Get your OpenAI API key:

Visit: https://platform.openai.com/account/api-keys

Log in or sign up

Click “Create new secret key”

Copy the generated key (it will start with sk- or sk-proj-)

Note: If you run out of free credits, you may need to add a payment method at the billing page

Set up Mixify:

Download or clone the Mixify repository and open the Mixify folder

Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Start the app:

bash
Copy
Edit
streamlit run app.py
Open your browser to the local URL (usually http://localhost:8501)

Generate a Setlist:

Enter your OpenAI API key

Paste your list of songs (include key and BPM for best results)

Describe your desired set vibe (e.g., “energetic, start mellow, end hype”)

Click “Generate DJ Set”

⚙️ How It Works
Mixify uses OpenAI’s GPT models (by default, gpt-4o-mini) to reorder your songs. It ensures:

Song keys are no more than one step apart

BPMs are within ±10 BPM between songs

This guarantees smooth and professional transitions. The app returns only the reordered setlist for easy copy-paste.

Notes
Mixify is a prototype — results may vary based on song info and AI performance

Your API key is only used locally and is not stored

You must have an OpenAI account with available quota

License
Mixify is released under the MIT License.
