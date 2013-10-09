# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Composer'
        db.create_table(u'taikoexplorer_db_composer', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('full_name', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Composer'])

        # Adding model 'SongStyle'
        db.create_table(u'taikoexplorer_db_songstyle', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.TextField')()),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['SongStyle'])

        # Adding model 'Song'
        db.create_table(u'taikoexplorer_db_song', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.TextField')()),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('date_composed', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('is_open_source', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('is_drill', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('is_original_arrangement', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Song'])

        # Adding M2M table for field styles on 'Song'
        m2m_table_name = db.shorten_name(u'taikoexplorer_db_song_styles')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('song', models.ForeignKey(orm[u'taikoexplorer_db.song'], null=False)),
            ('songstyle', models.ForeignKey(orm[u'taikoexplorer_db.songstyle'], null=False))
        ))
        db.create_unique(m2m_table_name, ['song_id', 'songstyle_id'])

        # Adding model 'Group'
        db.create_table(u'taikoexplorer_db_group', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.TextField')()),
            ('date_founded', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('has_nickname', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Group'])

        # Adding model 'Video'
        db.create_table(u'taikoexplorer_db_video', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=2, null=True, blank=True)),
            ('vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('title', self.gf('django.db.models.fields.TextField')()),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('channelID', self.gf('django.db.models.fields.TextField')()),
            ('channelTitle', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('default_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('medium_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('high_thumb_url', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Video'])

        # Adding M2M table for field songs on 'Video'
        m2m_table_name = db.shorten_name(u'taikoexplorer_db_video_songs')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('video', models.ForeignKey(orm[u'taikoexplorer_db.video'], null=False)),
            ('song', models.ForeignKey(orm[u'taikoexplorer_db.song'], null=False))
        ))
        db.create_unique(m2m_table_name, ['video_id', 'song_id'])

        # Adding M2M table for field groups on 'Video'
        m2m_table_name = db.shorten_name(u'taikoexplorer_db_video_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('video', models.ForeignKey(orm[u'taikoexplorer_db.video'], null=False)),
            ('group', models.ForeignKey(orm[u'taikoexplorer_db.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['video_id', 'group_id'])

        # Adding model 'ComposerSong'
        db.create_table(u'taikoexplorer_db_composersong', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('composer', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Composer'])),
            ('song', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['taikoexplorer_db.Song'])),
            ('is_original_composer', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('date_rearranged', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['ComposerSong'])


    def backwards(self, orm):
        # Deleting model 'Composer'
        db.delete_table(u'taikoexplorer_db_composer')

        # Deleting model 'SongStyle'
        db.delete_table(u'taikoexplorer_db_songstyle')

        # Deleting model 'Song'
        db.delete_table(u'taikoexplorer_db_song')

        # Removing M2M table for field styles on 'Song'
        db.delete_table(db.shorten_name(u'taikoexplorer_db_song_styles'))

        # Deleting model 'Group'
        db.delete_table(u'taikoexplorer_db_group')

        # Deleting model 'Video'
        db.delete_table(u'taikoexplorer_db_video')

        # Removing M2M table for field songs on 'Video'
        db.delete_table(db.shorten_name(u'taikoexplorer_db_video_songs'))

        # Removing M2M table for field groups on 'Video'
        db.delete_table(db.shorten_name(u'taikoexplorer_db_video_groups'))

        # Deleting model 'ComposerSong'
        db.delete_table(u'taikoexplorer_db_composersong')


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
            'channelID': ('django.db.models.fields.TextField', [], {}),
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