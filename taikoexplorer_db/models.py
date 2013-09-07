from django.db import models

class Tag(models.Model):
  YOUTUBE = 'YT'
  VIMEO = 'VM'
  VIDEO_TYPE_CHOICES = (
    (YOUTUBE, 'Youtube'),
    (VIMEO, 'Vimeo'),
  )
  type = models.CharField(max_length=2,
                          choices=VIDEO_TYPE_CHOICES,
                          blank=True,
                          null=True)
  vid = models.CharField(max_length=20)
  composer = models.CharField(max_length=100, blank=True, null=True)
  group = models.CharField(max_length=100, blank=True, null=True)
  song_title = models.CharField(max_length=100, blank=True, null=True)
  date_modified = models.DateField(auto_now=True)
  date_composed = models.DateField(blank=True, null=True, default=None)
  is_open_source = models.NullBooleanField(blank=True)
