from django.conf.urls import patterns, include, url
import views, data, settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^songs', views.songs, name='songs'),
    url(r'^composers', views.composers, name='composers'),
    url(r'^groups', views.groups, name='groups'),
    url(r'^admin', views.admin, name='admin'),
    url(r'^advanced-search', views.advancedSearch, name='advancedSearch'),
    url(r'^yts/', data.youtubeSearch, name='yts'),
    url(r'^add-video-data/', data.editVideoData, name='editVideoData'),
    url(r'^delete-video-data/', data.deleteVideoData, name='deleteVideoData'),
    url(r'^confirm-video-data/', data.confirmVideoData, name='confirmVideoData'),
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
