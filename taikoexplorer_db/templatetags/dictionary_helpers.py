from django import template
register = template.Library()

@register.filter(name='get_metadata')
def getMetadata(dic, key) :
  if key in dic :
    return dic[key]
  return None

@register.filter(name='get_group')
def getGroup(dic, key) :
  #tag = dic.groups.all()
  #if tag :
    #return tag.name
  return ""

@register.filter(name='get_song')
def getSong(dic, key) :
  #tag = dic.songs.all()
  #if tag :
    #return tag.title
  return ""

@register.filter(name='get_composer')
def getComposer(dic, key) :
  #tag = songs.all().composers.all()
  #if tag :
    #return tag.full_name
  return ""
