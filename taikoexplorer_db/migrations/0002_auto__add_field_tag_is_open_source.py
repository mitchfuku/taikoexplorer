# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Tag.is_open_source'
        db.add_column(u'taikoexplorer_db_tag', 'is_open_source',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Tag.is_open_source'
        db.delete_column(u'taikoexplorer_db_tag', 'is_open_source')


    models = {
        u'taikoexplorer_db.tag': {
            'Meta': {'object_name': 'Tag'},
            'composer': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'date_composed': ('django.db.models.fields.DateField', [], {'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'group': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_open_source': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']