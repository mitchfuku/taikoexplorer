from django import template
register = template.Library()

@register.filter(name='get_group')
def getGroup(dic, key) :
  tag = dic.get(key, None)
  if tag is not None :
    return tag.group
  return ""

@register.filter(name='get_song')
def getSong(dic, key) :
  tag = dic.get(key, None)
  if tag is not None :
    return tag.song_title
  return ""

@register.filter(name='get_composer')
def getComposer(dic, key) :
  tag = dic.get(key, None)
  if tag is not None :
    return tag.composer
  return ""
