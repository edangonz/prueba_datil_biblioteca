from django.urls import path, include

from django.contrib import admin

from django.views.generic import TemplateView
from django.conf.urls import url

from rest_framework.authtoken.views import obtain_auth_token

admin.autodiscover()

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path('auth/',obtain_auth_token),
    path('book/', include("books.urls")),
    path('user/', include("authuser.urls")),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^(?:.*)/?$',TemplateView.as_view(template_name='index.html')),
]
