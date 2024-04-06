from dotenv import dotenv_values
from hugchat import hugchat
from hugchat.login import Login

secrets = dotenv_values("hf.env")
# print(secrets)

hf_email = secrets["EMAIL"]
hf_pass = secrets["PASS"]


# Function for generating LLM response
def generate_response(prompt_input, email, passwd):
    # Hugging Face Login
    sign = Login(email, passwd)
    cookies = sign.login()

    # Create ChatBot
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())

    return chatbot.chat(prompt_input)


def plantsimulation(plant, stage, temperature, watering, soil, fertilizer, light):

    prompt = f"Describe a condition of a {plant} plant/tree where it's growth stage is {stage} under a growing condition where temperature is {temperature} celcius, {watering}ml watering daily, planted in {soil}, using {fertilizer} and under {light}. Describe the growing condition of the {plant} plant/tree under these growing factor in terms of bad and good effect within 30 words. Provide also a guidance for bad effect."
    response = generate_response(prompt, hf_email, hf_pass)

    return response


def growbot(question):
    response = generate_response(question, hf_email, hf_pass)
    
    print(response)
    
    return response
