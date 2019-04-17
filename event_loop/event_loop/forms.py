from django.forms import CharField, PasswordInput, Form, EmailField, ModelForm
from event_loop.models import Profile

class LoginForm(Form):
    username = CharField(label="User Name", max_length=64)
    password = CharField(widget=PasswordInput())

class ProfileForm(ModelForm):
    first_name = CharField()
    last_name = CharField()
    email = EmailField()

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email']