from django import forms

class AdminLoginForm(forms.Form):
  password = forms.CharField(widget=forms.PasswordInput())
