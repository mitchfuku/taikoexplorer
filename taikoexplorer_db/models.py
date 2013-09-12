from django.db import models

class Video(models.Model):
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
  title = models.TextField()
  description = models.TextField(blank=True)
  default_thumb_url = models.CharField(max_length=100, blank=True)
  medium_thumb_url = models.CharField(max_length=100, blank=True)
  high_thumb_url = models.CharField(max_length=100, blank=True)
  
class Composer(models.Model):
  full_name = models.TextField()

# Create a new song for every arrangement of a song
class Song(models.Model):
  name = models.TextField()
  description = models.TextField(blank=True)
  date_composed = models.DateField(blank=True)
  is_open_source = models.BooleanField(blank=True)
  is_drill = models.BooleanField(blank=True)
  is_original_arrangement = models.BooleanField(blank=True)

class Group(models.Model):
  name = models.TextField()
  date_founded = models.DateField(blank=True)
  has_nickname = models.BooleanField(blank=True)

# Group nicknames
class AKA(models.Model):
  group_id = models.ForeignKey(Group)
  name = models.TextField()

# Songs written by composer and composers of a song
class ComposerSong(models.Model):
  composer_id = models.ForeignKey(Composer)
  song_id = models.ForeignKey(Song)
  is_original_composer = models.BooleanField(blank=True)
  date_rearranged = models.DateField(blank=True)

# Songs in the video and videos this song is in
class SongVideo(models.Model):
  song_id = models.ForeignKey(Song)
  video_id = models.ForeignKey(Video)
  video_vid = models.CharField(max_length=20)

# Groups in the video and videos this group is in
class GroupVideo(models.Model):
  group_id = models.ForeignKey(Group)
  video_id = models.ForeignKey(Video)
  video_vid = models.CharField(max_length=20)
