from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import NewsletterSubscriber
from .forms import NewsletterForm


def home(request):
    """Home page with all content"""
    if request.method == 'POST':
        form = NewsletterForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                NewsletterSubscriber.objects.create(email=email)
                messages.success(request, 'Successfully subscribed to our newsletter!')
                # Send confirmation email
                send_mail(
                    'Welcome to Schizoid Lloyd Newsletter',
                    'Thank you for subscribing to Schizoid Lloyd news!',
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=True,
                )
                return redirect('home')
            except Exception as e:
                messages.error(request, 'This email is already subscribed.')
    else:
        form = NewsletterForm()
    
    return render(request, 'website/home.html', {'form': form})
