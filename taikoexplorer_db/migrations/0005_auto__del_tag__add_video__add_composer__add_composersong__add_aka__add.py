# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Tag'
        db.delete_table(u'taikoexplorer_db_tag')

        # Adding model 'Video'
        db.create_table(u'taikoexplorer_db_video', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=2, null=True, blank=True)),
            ('vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('title', self.gf('django.db.models.fields.TextField')()),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('default_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('medium_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('high_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Video'])

        # Adding model 'Composer'
        db.create_table(u'taikoexplorer_db_composer', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('full_name', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Composer'])

        # Adding model 'ComposerSong'
        db.create_table(u'taikoexplorer_db_composersong', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('composer_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Composer'])),
            ('song_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Song'])),
            ('is_original_composer', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_rearranged', self.gf('django.db.models.fields.DateField')(blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['ComposerSong'])

        # Adding model 'AKA'
        db.create_table(u'taikoexplorer_db_aka', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('group_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Group'])),
            ('name', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['AKA'])

        # Adding model 'GroupVideo'
        db.create_table(u'taikoexplorer_db_groupvideo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('group_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Group'])),
            ('video_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Video'])),
            ('video_vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['GroupVideo'])

        # Adding model 'SongVideo'
        db.create_table(u'taikoexplorer_db_songvideo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('song_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Song'])),
            ('video_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Video'])),
            ('video_vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['SongVideo'])

        # Adding model 'Song'
        db.create_table(u'taikoexplorer_db_song', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.TextField')()),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('date_composed', self.gf('django.db.models.fields.DateField')(blank=True)),
            ('is_open_source', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('is_drill', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('is_original_arrangement', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Song'])

        # Adding model 'Group'
        db.create_table(u'taikoexplorer_db_group', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.TextField')()),
            ('date_founded', self.gf('django.db.models.fields.DateField')(blank=True)),
            ('has_nickname', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Group'])


    def backwards(self, orm):
        # Adding model 'Tag'
        db.create_table(u'taikoexplorer_db_tag', (
            ('vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('group', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('song_title', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('composer', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateField')(auto_now=True, blank=True)),
            ('is_open_source', self.gf('django.db.models.fields.NullBooleanField')(null=True, blank=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=2, null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_composed', self.gf('django.db.models.fields.DateField')(default=None, null=True, blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Tag'])

        # Deleting model 'Video'
        db.delete_table(u'taikoexplorer_db_video')

        # Deleting model 'Composer'
        db.delete_table(u'taikoexplorer_db_composer')

        # Deleting model 'ComposerSong'
        db.delete_table(u'taikoexplorer_db_composersong')

        # Deleting model 'AKA'
        db.delete_table(u'taikoexplorer_db_aka')

        # Deleting model 'GroupVideo'
        db.delete_table(u'taikoexplorer_db_groupvideo')

        # Deleting model 'SongVideo'
        db.delete_table(u'taikoexplorer_db_songvideo')

        # Deleting model 'Song'
        db.delete_table(u'taikoexplorer_db_song')

        # Deleting model 'Group'
        db.delete_table(u'taikoexplorer_db_group')


    models = {
        u'taikoexplorer_db.aka': {
            'Meta': {'object_name': 'AKA'},
            'group_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.composer': {
            'Meta': {'object_name': 'Composer'},
            'full_name': ('django.db.models.fields.TextField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'taikoexplorer_db.composersong': {
            'Meta': {'object_name': 'ComposerSong'},
            'composer_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Composer']"}),
            'date_rearranged': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_original_composer': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'song_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Song']"})
        },
        u'taikoexplorer_db.group': {
            'Meta': {'object_name': 'Group'},
            'date_founded': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            'has_nickname': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.groupvideo': {
            'Meta': {'object_name': 'GroupVideo'},
            'group_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'video_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Video']"}),
            'video_vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        u'taikoexplorer_db.song': {
            'Meta': {'object_name': 'Song'},
            'date_composed': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_drill': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_open_source': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_original_arrangement': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'name': ('django.db.models.fields.TextField', [], {})
        },
        u'taikoexplorer_db.songvideo': {
            'Meta': {'object_name': 'SongVideo'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'song_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Song']"}),
            'video_id': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Video']"}),
            'video_vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        u'taikoexplorer_db.video': {
            'Meta': {'object_name': 'Video'},
            'default_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'high_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'medium_thumb_url': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'title': ('django.db.models.fields.TextField', [], {}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']