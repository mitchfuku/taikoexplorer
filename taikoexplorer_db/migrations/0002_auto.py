# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Removing M2M table for field groups on 'Video'
        db.delete_table(db.shorten_name(u'taikoexplorer_db_video_groups'))

        # Removing M2M table for field songs on 'Video'
        db.delete_table(db.shorten_name(u'taikoexplorer_db_video_songs'))


    def backwards(self, orm):
        # Adding M2M table for field groups on 'Video'
        m2m_table_name = db.shorten_name(u'taikoexplorer_db_video_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('video', models.ForeignKey(orm[u'taikoexplorer_db.video'], null=False)),
            ('group', models.ForeignKey(orm[u'taikoexplorer_db.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['video_id', 'group_id'])

        # Adding M2M table for field songs on 'Video'
        m2m_table_name = db.shorten_name(u'taikoexplorer_db_video_songs')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('video', models.ForeignKey(orm[u'taikoexplorer_db.video'], null=False)),
            ('song', models.ForeignKey(orm[u'taikoexplorer_db.song'], null=False))
        ))
        db.create_unique(m2m_table_name, ['video_id', 'song_id'])


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
            'composer': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Composer']"}),
            'date_rearranged': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_original_composer': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'song': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['taikoexplorer_db.Song']"})
        },
        u'taikoexplorer_db.group': {
            'Meta': {'object_name': 'Group'},
            'date_founded': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            'has_nickname': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {})
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