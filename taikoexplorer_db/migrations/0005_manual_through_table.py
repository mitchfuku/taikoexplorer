# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
      db.add_column('taikoexplorer_db_video_groups', 'is_confirmed', self.gf('django.db.models.fields.BooleanField')(default=False),keep_default=False)

    def backwards(self, orm):
      db.delete_column('taikoexplorer_db_video_groups', 'is_confirmed')

    models = {
        'taikoexplorer_db.composer': {
            'Meta': {'object_name': 'Composer'},
            'full_name': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'taikoexplorer_db.composersong': {
            'Meta': {'object_name': 'ComposerSong'},
            'composer': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Composer']"}),
            'date_rearranged': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_confirmed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_original_composer': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'song': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Song']"})
        },
        'taikoexplorer_db.group': {
            'Meta': {'object_name': 'Group'},
            'date_founded': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'has_nickname': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        'taikoexplorer_db.song': {
            'Meta': {'object_name': 'Song'},
            'composers': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'songs'", 'symmetrical': 'False', 'through': "orm['taikoexplorer_db.ComposerSong']", 'to': "orm['taikoexplorer_db.Composer']"}),
            'date_composed': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_confirmed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_drill': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_open_source': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_original_arrangement': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'styles': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'songs'", 'symmetrical': 'False', 'to': "orm['taikoexplorer_db.SongStyle']"}),
            'title': ('django.db.models.fields.TextField', [], {})
        },
        'taikoexplorer_db.songstyle': {
            'Meta': {'object_name': 'SongStyle'},
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        'taikoexplorer_db.video': {
            'Meta': {'object_name': 'Video'},
            'channelID': ('django.db.models.fields.TextField', [], {}),
            'channelTitle': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'default_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'videos'", 'symmetrical': 'False', 'to': "orm['taikoexplorer_db.Group']"}),
            'high_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'medium_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'songs': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'videos'", 'symmetrical': 'False', 'through': "orm['taikoexplorer_db.VideoSong']", 'to': "orm['taikoexplorer_db.Song']"}),
            'title': ('django.db.models.fields.TextField', [], {}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        'taikoexplorer_db.videogroup': {
            'Meta': {'object_name': 'VideoGroup', 'db_table': "'taikoexplorer_db_video_groups'"},
            'group': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Group']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_confirmed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'video': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Video']"})
        },
        'taikoexplorer_db.videosong': {
            'Meta': {'object_name': 'VideoSong', 'db_table': "'taikoexplorer_db_video_songs'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_confirmed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'song': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Song']"}),
            'video': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['taikoexplorer_db.Video']"})
        }
    }

    complete_apps = ['taikoexplorer_db']
