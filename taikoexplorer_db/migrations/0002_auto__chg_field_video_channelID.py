# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Video.channelID'
        db.alter_column(u'taikoexplorer_db_video', 'channelID', self.gf('django.db.models.fields.CharField')(max_length=40))

    def backwards(self, orm):

        # Changing field 'Video.channelID'
        db.alter_column(u'taikoexplorer_db_video', 'channelID', self.gf('django.db.models.fields.TextField')())

    models = {
        u'taikoexplorer_db.composer': {
            'Meta': {'object_name': 'Composer'},
            'full_name': ('django.db.models.fields.TextField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'taikoexplorer_db.composersong': {
            'Meta': {'object_name': 'ComposerSong'},
            'composer': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Composer']"}),
            'date_rearranged': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_original_composer': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'song': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Song']"})
        },
        u'taikoexplorer_db.group': {
            'Meta': {'object_name': 'Group'},
            'date_founded': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'has_nickname': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.song': {
            'Meta': {'object_name': 'Song'},
            'composers': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'songs'", 'symmetrical': 'False', 'through': u"orm['taikoexplorer_db.ComposerSong']", 'to': u"orm['taikoexplorer_db.Composer']"}),
            'date_composed': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_drill': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_open_source': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_original_arrangement': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'styles': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'songs'", 'symmetrical': 'False', 'to': u"orm['taikoexplorer_db.SongStyle']"}),
            'title': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.songstyle': {
            'Meta': {'object_name': 'SongStyle'},
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.video': {
            'Meta': {'object_name': 'Video'},
            'channelID': ('django.db.models.fields.CharField', [], {'max_length': '40'}),
            'channelTitle': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'default_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'videos'", 'symmetrical': 'False', 'to': u"orm['taikoexplorer_db.Group']"}),
            'high_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'medium_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'songs': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'videos'", 'symmetrical': 'False', 'to': u"orm['taikoexplorer_db.Song']"}),
            'title': ('django.db.models.fields.TextField', [], {}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']