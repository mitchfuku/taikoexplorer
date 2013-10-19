from django.conf.urls import patterns, include, url
import views, settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^advanced-search', views.advancedSearch, name='advancedSearch'),
    url(r'^yts/', views.youtubeSearch, name='yts'),
    url(r'^add-video-data/', views.editVideoData, name='editVideoData'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

# For static files - http://stackoverflow.com/questions/9047054/heroku-handling-static-files-in-django-app
if not settings.DEBUG:
      urlpatterns += patterns('',
                  (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                      )
