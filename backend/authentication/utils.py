from django.core.mail import EmailMessage

def send_activation_email(email_data):
    email = EmailMessage(to=[email_data["address"]],subject=email_data["subject"], body=email_data["body"])
    email.send()