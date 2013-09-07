# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Tag.song_title'
        db.add_column(u'taikoexplorer_db_tag', 'song_title',
                      self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Tag.song_title'
        db.delete_column(u'taikoexplorer_db_tag', 'song_title')


    models = {
        u'taikoexplorer_db.tag': {
            'Meta': {'object_name': 'Tag'},
            'composer': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'date_composed': ('django.db.models.fields.DateField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'group': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_open_source': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'song_title': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']