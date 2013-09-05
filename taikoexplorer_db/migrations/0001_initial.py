# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Tag'
        db.create_table(u'taikoexplorer_db_tag', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=2)),
            ('vid', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('composer', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('group', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('date_modified', self.gf('django.db.models.fields.DateField')(auto_now=True, blank=True)),
            ('date_composed', self.gf('django.db.models.fields.DateField')()),
        ))
        db.send_create_signal(u'taikoexplorer_db', ['Tag'])


    def backwards(self, orm):
        # Deleting model 'Tag'
        db.delete_table(u'taikoexplorer_db_tag')


    models = {
        u'taikoexplorer_db.tag': {
            'Meta': {'object_name': 'Tag'},
            'composer': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'date_composed': ('django.db.models.fields.DateField', [], {}),
            'date_modified': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'group': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']