# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Tag.group'
        db.alter_column(u'taikoexplorer_db_tag', 'group', self.gf('django.db.models.fields.CharField')(max_length=100, null=True))

        # Changing field 'Tag.is_open_source'
        db.alter_column(u'taikoexplorer_db_tag', 'is_open_source', self.gf('django.db.models.fields.NullBooleanField')(null=True))

        # Changing field 'Tag.date_composed'
        db.alter_column(u'taikoexplorer_db_tag', 'date_composed', self.gf('django.db.models.fields.DateField')(null=True))

        # Changing field 'Tag.composer'
        db.alter_column(u'taikoexplorer_db_tag', 'composer', self.gf('django.db.models.fields.CharField')(max_length=100, null=True))

        # Changing field 'Tag.type'
        db.alter_column(u'taikoexplorer_db_tag', 'type', self.gf('django.db.models.fields.CharField')(max_length=2, null=True))

    def backwards(self, orm):

        # Changing field 'Tag.group'
        db.alter_column(u'taikoexplorer_db_tag', 'group', self.gf('django.db.models.fields.CharField')(default='', max_length=100))

        # Changing field 'Tag.is_open_source'
        db.alter_column(u'taikoexplorer_db_tag', 'is_open_source', self.gf('django.db.models.fields.BooleanField')())

        # Changing field 'Tag.date_composed'
        db.alter_column(u'taikoexplorer_db_tag', 'date_composed', self.gf('django.db.models.fields.DateField')(default=None))

        # Changing field 'Tag.composer'
        db.alter_column(u'taikoexplorer_db_tag', 'composer', self.gf('django.db.models.fields.CharField')(default='', max_length=100))

        # Changing field 'Tag.type'
        db.alter_column(u'taikoexplorer_db_tag', 'type', self.gf('django.db.models.fields.CharField')(default='', max_length=2))

    models = {
        u'taikoexplorer_db.tag': {
            'Meta': {'object_name': 'Tag'},
            'composer': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'date_composed': ('django.db.models.fields.DateField', [], {'default': 'None', 'null': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'group': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_open_source': ('django.db.models.fields.NullBooleanField', [], {'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'vid': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        }
    }

    complete_apps = ['taikoexplorer_db']