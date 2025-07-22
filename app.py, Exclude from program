import streamlit as st
import openai

st.title("Mixify: AI DJ Set Arranger")

st.markdown("""
**Input your music and the description of your DJ set and Mixify will do the rest. We take your songs and make a full DJ set.**
""")

st.markdown("""
#### How to get your OpenAI API key:
1. Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys)
2. Log in or sign up
3. Click "Create new secret key"
4. Copy the key and paste it below
""")

api_key = st.text_input("Enter your OpenAI API key:", type="password")

songs = st.text_area("Paste your list of songs (one per line):")
description = st.text_area("Describe your DJ set (e.g., 'energetic house party, smooth transitions, start mellow, end hype'):")

if st.button("Generate DJ Set"):
    if not api_key:
        st.error("Please enter your OpenAI API key.")
    elif not songs.strip() or not description.strip():
        st.error("Please enter both a list of songs and a description.")
    else:
        client = openai.OpenAI(api_key=api_key)
        prompt = f"""
You are a DJ setlist arranger. Given a list of songs and a description of the desired DJ set, reorder the songs for the best flow. 

**It is VERY IMPORTANT that:**
- From song to song, the musical keys are not more than one key apart.
- The BPM (beats per minute) of each song is within 10 BPM of the next song.
- Double check that these two rules are followed strictly.

Only return the reordered list, nothing else.

Songs:
{songs}

Description:
{description}
"""
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.7,
            )
            result = response.choices[0].message.content.strip()
            st.markdown("### Your DJ Set Order:")
            st.text(result)
        except Exception as e:
            st.error(f"Error: {e}") 
