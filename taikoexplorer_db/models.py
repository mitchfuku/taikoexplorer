from django.db import models

class Tag(models.Model):
  YOUTUBE = 'YT'
  VIMEO = 'VM'
  VIDEO_TYPE_CHOICES = (
    (YOUTUBE, 'Youtube'),
    (VIMEO, 'Vimeo'),
  )
  type = models.CharField(max_length=2,
                          choices=VIDEO_TYPE_CHOICES)
  vid = models.CharField(max_length=20)
  composer = models.CharField(max_length=100)
  group = models.CharField(max_length=100)
  date_modified = models.DateField(auto_now=True)
  date_composed = models.DateField()
