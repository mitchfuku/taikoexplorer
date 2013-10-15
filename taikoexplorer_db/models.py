from django.db import models

class Composer(models.Model):
  full_name = models.TextField()
  @property
  def videos(self):
    return Video.objects.filter(songs__composers=self)

class SongStyle(models.Model):
  name = models.TextField()
  description = models.TextField(blank=True)
  @property
  def videos(self):
    return Video.objects.filter(songs__styles=self)

# Create a new song for every arrangement of a song
class Song(models.Model):
  title = models.TextField()
  description = models.TextField(blank=True)
  date_composed = models.DateField(blank=True, null=True)
  is_open_source = models.BooleanField(blank=True, default = False)
  is_drill = models.BooleanField(blank=True, default = False)
  is_original_arrangement = models.BooleanField(blank=True, default = True)
  composers = models.ManyToManyField(Composer, related_name='songs', through='ComposerSong')
  styles = models.ManyToManyField(SongStyle, related_name='songs')

class Group(models.Model):
  name = models.TextField()
  date_founded = models.DateField(blank=True, null=True)
  has_nickname = models.BooleanField(blank=True, default = False)

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
  channelID = models.TextField()
  channelTitle = models.TextField(blank=True)
  default_thumb_url = models.CharField(max_length=100, blank=True)
  medium_thumb_url = models.CharField(max_length=100, blank=True)
  high_thumb_url = models.CharField(max_length=100, blank=True)
  songs = models.ManyToManyField(Song, related_name="videos")
  groups = models.ManyToManyField(Group, related_name="videos")
  @property
  def composers(self):
    return Composer.objects.filter(songs__videos=self)

# Songs written by composer and composers of a song
class ComposerSong(models.Model):
  composer = models.ForeignKey(Composer)
  song = models.ForeignKey(Song)
  is_original_composer = models.BooleanField(blank=True, default=True)
  date_rearranged = models.DateField(blank=True, null=True)
  
# Group nicknames
#class AKA(models.Model):
  #group_id = models.ForeignKey(Group)
  #name = models.TextField()

## Songs in the video and videos this song is in
#class SongVideo(models.Model):
  #song_id = models.ForeignKey(Song)
  #video_id = models.ForeignKey(Video)
  #video_vid = models.CharField(max_length=20)

## Groups in the video and videos this group is in
#class GroupVideo(models.Model):
  #group_id = models.ForeignKey(Group)
  #video_id = models.ForeignKey(Video)
  #video_vid = models.CharField(max_length=20)
