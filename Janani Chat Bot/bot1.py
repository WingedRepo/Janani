import openai
import gradio

openai.api_key = "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"

messages = [{"role": "system", "content" : "You are a Gynecologist"}]

def CustomChatGPT(Enter_query):
    messages.append({"role" : "user", "content" : Enter_query})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages.append({"role" : "assistant", "content" : ChatGPT_reply})
    return ChatGPT_reply

demo = gradio.Interface(fn = CustomChatGPT, inputs = "text", outputs = "text", title = "StrI - Your Pregnancy Assitant!")
demo.launch(share=True)
