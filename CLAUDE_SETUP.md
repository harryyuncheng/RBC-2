# Curtis Voice Integration Setup

## Overview
This setup integrates Curtis API with your voice overlay component, allowing you to send voice input along with a context prompt to Curtis and display the response.

## Files Created/Modified

1. **`.env.local`** - Contains your Curtis API key
2. **`public/context-prompt.txt`** - Contains the context prompt that will be sent with each voice input
3. **`src/app/api/claude/route.ts`** - API route that handles communication with Curtis
4. **`src/components/CurtisOverlay.tsx`** - Updated to integrate with Curtis API

## Setup Steps

### 1. Add your Curtis API Key
Edit `.env.local` and replace `your_curtis_api_key_here` with your actual Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-...your-actual-key...
```

### 2. Customize the Context Prompt
Edit `public/context-prompt.txt` to include any specific instructions or context you want Curtis to have when responding to voice inputs.

### 3. How it Works
- When you speak and the speech recognition detects final text, it automatically sends the voice input to Curtis
- The voice input is combined with the context prompt from `context-prompt.txt`
- Curtis's response is displayed in a new section of the overlay
- You can also manually send the last recognized speech to Curtis using the "Send" button
- Clear Curtis's response using the "Clear" button

### 4. Features Added
- **Automatic sending**: Voice input is automatically sent to Claude when speech recognition completes
- **Manual sending**: "Send" button to re-send the last recognized speech
- **Response display**: Claude's response appears in a blue-tinted section
- **Loading indicator**: Shows when Claude is processing
- **Clear function**: Remove Claude's response when needed

### 5. API Usage
The integration uses Claude 3 Sonnet model with a 1000 token limit. You can modify these settings in `src/app/api/claude/route.ts` if needed.

## Security Notes
- Your API key is stored in `.env.local` which is already included in `.gitignore`
- The API key is only used server-side in the API route
- Never commit your actual API key to version control

## Troubleshooting
- If you get API errors, check that your API key is correct in `.env.local`
- Make sure you have sufficient credits in your Anthropic account
- Check the browser console for any error messages
- Ensure `public/context-prompt.txt` exists and is readable
