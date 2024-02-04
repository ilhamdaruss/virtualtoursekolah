(function(){
    var script = {
 "start": "this.playAudioList([this.audio_4706781A_73F8_7CF1_41C8_3653D770CBE9]); this.init(); this.set('mute', true); this.syncPlaylists([this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_435114B8_73E8_D531_41D6_A952886C12B6].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.88,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_4320E82A_73D8_5CD1_41C8_F4AD64DE0CCD",
  "this.Container_43A3A827_73E8_3CDF_41D8_4E60233B1985"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_435114B8_73E8_D531_41D6_A952886C12B6",
 "scripts": {
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "registerKey": function(key, value){  window[key] = value; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "existsKey": function(key){  return key in window; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "unregisterKey": function(key){  delete window[key]; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_4320882A_73D8_5CD1_41D6_43016535EDCB",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Player",
 "data": {
  "name": "Player485"
 },
 "overflow": "visible",
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.36,
   "backwardYaw": 86.28,
   "distance": 1,
   "panorama": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 104.93,
   "backwardYaw": -51.41,
   "distance": 1,
   "panorama": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D"
  }
 ],
 "hfov": 360,
 "label": "Jalan1",
 "id": "panorama_781EBE24_726B_D53E_41CD_486B415D5768",
 "thumbnailUrl": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_58B91528_726B_D4D3_41BA_512A8A88E2FF",
  "this.overlay_584A1005_7268_2CD2_41B0_C59C013845A0",
  "this.overlay_594C1318_7268_2CF3_41DB_787BC3D030D0",
  "this.overlay_5E9A8735_7268_3332_41B0_D3A227AA9855",
  "this.overlay_59DC41EF_7268_2F2E_41D9_F0E80956B454"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -133.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C79D111_733A_3C71_41D5_1074F84EF9CD"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79485657_7268_351B_41D9_530D1F1D69C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_79485657_7268_351B_41D9_530D1F1D69C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781C22C5_7268_2D79_41B5_391056519E75_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_781C22C5_7268_2D79_41B5_391056519E75",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78120F49_7268_5309_41DC_17785FB64710_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_78120F49_7268_5309_41DC_17785FB64710",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 0)",
   "media": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 86.28,
   "backwardYaw": 89.36,
   "distance": 1,
   "panorama": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 177.56,
   "backwardYaw": -14.41,
   "distance": 1,
   "panorama": "this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -82.57,
   "backwardYaw": 79.19,
   "distance": 1,
   "panorama": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.85,
   "backwardYaw": 8.94,
   "distance": 1,
   "panorama": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1"
  }
 ],
 "hfov": 360,
 "label": "Jalan_Tengah",
 "id": "panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72",
 "thumbnailUrl": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_66C03E16_72B8_34E0_41AC_90D0321F04FA",
  "this.overlay_67DA1BFF_72BF_F320_41C4_6F68334187FA",
  "this.overlay_6735C154_72B8_2F60_41D8_9AA92EE99C3C",
  "this.overlay_6499110C_72B8_2CE0_41C0_3D709CB15572"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7CEFD17C_733A_3CB0_41BD_E2DAEC9F64F2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -142.76,
   "backwardYaw": -61.44,
   "distance": 1,
   "panorama": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B"
  }
 ],
 "hfov": 360,
 "label": "Ruang_perpus",
 "audios": [
  "this.audio_6BA88A7A_72E8_FD29_41B8_E41407C87CF2"
 ],
 "id": "panorama_781C22C5_7268_2D79_41B5_391056519E75",
 "thumbnailUrl": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6BAF5945_72E8_5F5B_41D1_F224AD99FCF2",
  "this.overlay_6A691FC8_72E8_F369_41A3_99C9A3AE3970"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FE531EB_733A_3FD1_41D1_E7F226DFC4C1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -10.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D96836B_733A_3CD1_41D7_B9F313729A70"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C74811D_733A_3C71_41D6_5E6595E132B2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -14.24,
   "backwardYaw": 54.81,
   "distance": 1,
   "panorama": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3"
  }
 ],
 "hfov": 360,
 "label": "Ruang_Mipa",
 "audios": [
  "this.audio_680F1F34_72E8_D338_41B4_E3805CD799B1"
 ],
 "id": "panorama_781E9C36_7268_351B_41CE_40CAF2E9901A",
 "thumbnailUrl": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6823D529_72E8_5729_41D6_27EAEB3E2F7E",
  "this.overlay_6997725B_72E8_2D69_4199_FAF6F76FF9BC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7EAB428E_733A_3C50_41C3_D80178B86C08"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 46.94,
   "backwardYaw": -43.08,
   "distance": 1,
   "panorama": "this.panorama_79485657_7268_351B_41D9_530D1F1D69C9"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 8.94,
   "backwardYaw": 1.85,
   "distance": 1,
   "panorama": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -177.75,
   "backwardYaw": -177.35,
   "distance": 1,
   "panorama": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -25.16,
   "backwardYaw": 170.92,
   "distance": 1,
   "panorama": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_78C3144E_7268_550A_41DA_88FCB640ACA1",
 "thumbnailUrl": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_t.jpg",
 "label": "Lorong_Sekolah",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_t.jpg"
  }
 ],
 "vfov": 175.17,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_635F53CA_72A8_3364_41C2_108A626AE244",
  "this.overlay_608DC3F1_72A8_7324_41B0_BE9A42D15928",
  "this.overlay_60E44EB5_72A8_352C_41B6_C1C0AC396349",
  "this.overlay_637FE08E_72A8_2DFC_41D5_17000A5E7BCC",
  "this.overlay_636388C8_72A8_5D63_41D1_21C077255D95",
  "this.overlay_63C86C04_72A8_D4E3_41D0_6F8A4FFAC44E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -55.57,
   "backwardYaw": -173.94,
   "distance": 1,
   "panorama": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2"
  }
 ],
 "hfov": 360,
 "label": "Ruang_kelas7",
 "audios": [
  "this.audio_5AF9F08F_7268_2DED_41B7_B894A507C559"
 ],
 "id": "panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2",
 "thumbnailUrl": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_55CE603C_7268_2D2C_41D3_04D6AFD8BD01",
  "this.overlay_552A0454_7268_5573_41D4_4B21FFC0C2BE"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7DAB134C_733A_3CD7_41D3_9949AC393EE6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C90915B_733A_3CF0_41C9_2780DA882374"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_78120F49_7268_5309_41DC_17785FB64710_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E05D246_733A_3CD3_41CB_9E202BE450EA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E3C7214_733A_3C77_41CA_6BFEA12BFF15"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.44,
   "backwardYaw": -2.49,
   "distance": 1,
   "panorama": "this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.59,
   "backwardYaw": 50.97,
   "distance": 1,
   "panorama": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -179.61,
   "backwardYaw": -83.18,
   "distance": 1,
   "panorama": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050",
 "thumbnailUrl": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_t.jpg",
 "label": "Jalan3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_t.jpg"
  }
 ],
 "vfov": 175.09,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_62D3CC14_7268_D4EB_41CE_4C6681187549",
  "this.overlay_62D30BDD_7269_D315_41D0_EF595F9EF886",
  "this.overlay_6294F8A2_7269_DD2F_41DA_527A02370DC1",
  "this.overlay_62EF983D_726F_FD1A_41D6_8233EB995583",
  "this.overlay_62A27A5A_7268_DD1E_41A4_CF003E2FE8DD",
  "this.overlay_62DAFEF5_7268_352A_41C7_8CF5B702878A",
  "this.overlay_623D3BBC_7268_5319_41DB_F1963FCCEE2C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 154.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E09D23C_733A_3CB7_41CE_020FA1A8CBFF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7DC2D3BA_733A_23B3_41C7_59392FEAFF48"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.59,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E7E0250_733A_3CCF_41D5_D40C6C660762"
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_5AF9F08F_7268_2DED_41B7_B894A507C559.mp3",
  "oggUrl": "media/audio_5AF9F08F_7268_2DED_41B7_B894A507C559.ogg"
 },
 "autoplay": true,
 "id": "audio_5AF9F08F_7268_2DED_41B7_B894A507C559",
 "data": {
  "label": "ruang kelas 7"
 }
},
{
 "class": "PanoramaPlayer",
 "buttonRestart": "this.IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22",
 "buttonZoomOut": "this.IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonMoveUp": "this.IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C",
 "buttonPlayLeft": "this.IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E",
 "buttonMoveRight": "this.IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81",
 "buttonPlayRight": "this.IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57",
 "buttonMoveLeft": "this.IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA",
 "viewerArea": "this.MainViewer",
 "buttonMoveDown": "this.IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD",
 "buttonPause": "this.IconButton_4320482A_73D8_5CD1_41BC_6C6262F9A4C1",
 "displayPlaybackBar": true,
 "buttonZoomIn": "this.IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.61,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E1C8232_733A_3CB3_41D8_B6E525E9010A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D1C52F6_733A_3DB3_41C5_5914896E8BCD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -129.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FC3620A_733A_3C53_41C4_A1B3C9812327"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 120.82,
   "backwardYaw": 134.27,
   "distance": 1,
   "panorama": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270"
  }
 ],
 "hfov": 360,
 "label": "Ruang_kelas8",
 "audios": [
  "this.audio_404F333D_73F8_5333_41CB_70C519CDCEA9"
 ],
 "id": "panorama_781FD794_726B_D31E_41C3_3008E7B033BE",
 "thumbnailUrl": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_55CB5FA0_7278_53D3_41DA_9E51AC1408D5",
  "this.overlay_552A8B6D_7278_D352_41A4_2E6D75F60F50"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.1,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7F8C91B8_733A_3FBF_41CF_F64308FC3FA0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -83.18,
   "backwardYaw": -179.61,
   "distance": 1,
   "panorama": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 98.33,
   "backwardYaw": 91.26,
   "distance": 1,
   "panorama": "this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A",
 "thumbnailUrl": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_t.jpg",
 "label": "Jalan 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_t.jpg"
  }
 ],
 "vfov": 174.59,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_62ABB372_7278_5313_41D6_717825754754",
  "this.overlay_6217D1FA_7278_2F1D_41D7_1348FD69A710"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D68E31A_733A_3C73_41CF_EB8D14F7156D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 95.05,
   "backwardYaw": 46.69,
   "distance": 1,
   "panorama": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2"
  }
 ],
 "hfov": 360,
 "label": "Mushola",
 "audios": [
  "this.audio_509F38E0_72B8_3D54_41D9_0FD44C83F0C4"
 ],
 "id": "panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE",
 "thumbnailUrl": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_t.jpg"
  }
 ],
 "vfov": 174.76,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_50A3FBC3_72B8_335B_41D9_F9B01D7F75FD",
  "this.overlay_51C66294_72B8_2DFD_41D9_CF44152B4310"
 ]
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_5E6A09A0_7269_DFD2_41D5_25B790A75618.mp3",
  "oggUrl": "media/audio_5E6A09A0_7269_DFD2_41D5_25B790A75618.ogg"
 },
 "autoplay": true,
 "id": "audio_5E6A09A0_7269_DFD2_41D5_25B790A75618",
 "data": {
  "label": "ruang guru"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E4EF27A_733A_3CB3_41D2_E032E5B47957"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -14.41,
   "backwardYaw": 177.56,
   "distance": 1,
   "panorama": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E",
 "thumbnailUrl": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_t.jpg",
 "label": "Lapangan",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_t.jpg"
  }
 ],
 "vfov": 174.84,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_5C115CD0_73A8_5571_41B3_972E37AAF8EC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E29521E_733A_3C73_41DB_DA09F368CB3B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D0A3302_733A_3C53_41A7_F8E10C5D608F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E94A2A2_733A_3C50_41B8_775EF2028BD8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.49,
   "backwardYaw": -62.44,
   "distance": 1,
   "panorama": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050"
  }
 ],
 "hfov": 360,
 "label": "Lapangan 2",
 "audios": [
  "this.audio_6323DB79_7258_5318_41B8_3975EE26DF75"
 ],
 "id": "panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C",
 "thumbnailUrl": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_t.jpg"
  }
 ],
 "vfov": 173.18,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_63F5C435_7258_552B_41DB_586AAA296DC9"
 ]
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_5ED24B73_7257_D336_41D4_19491298FC0B.mp3",
  "oggUrl": "media/audio_5ED24B73_7257_D336_41D4_19491298FC0B.ogg"
 },
 "autoplay": true,
 "id": "audio_5ED24B73_7257_D336_41D4_19491298FC0B",
 "data": {
  "label": "ruang kepsek"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 79.19,
   "backwardYaw": -82.57,
   "distance": 1,
   "panorama": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 57.02,
   "backwardYaw": -140.28,
   "distance": 1,
   "panorama": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 57.02,
   "backwardYaw": -140.28,
   "distance": 1,
   "panorama": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -61.44,
   "backwardYaw": -142.76,
   "distance": 1,
   "panorama": "this.panorama_781C22C5_7268_2D79_41B5_391056519E75"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 158.66,
   "backwardYaw": 85.28,
   "distance": 1,
   "panorama": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213"
  }
 ],
 "hfov": 360,
 "label": "Jalan2",
 "id": "panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B",
 "thumbnailUrl": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_t.jpg"
  }
 ],
 "vfov": 174.11,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_69020901_72D8_DCD6_41CA_B47667E85391",
  "this.overlay_6EC6D058_72D8_6D76_41B9_DED5166C7958",
  "this.overlay_6963069D_72D8_F5EE_419B_D9E7B7FD1FAF",
  "this.overlay_69CC9683_72DF_D5DA_41D6_0939D7F9822A",
  "this.overlay_69045537_72D8_F73A_41BA_AC84E134BB9F",
  "this.overlay_69C8A4F4_72D8_553E_41CC_96FDA0803BD8",
  "this.overlay_69291864_72D9_FD5E_41CE_77C9FB9BDBAD",
  "this.overlay_6905FFE5_72D8_535E_41CF_6DD9EE68BDF6",
  "this.overlay_6E974A78_72D8_DD36_41DB_5512C437C229"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -81.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D3FD2DF_733A_3DF1_41C1_D4DB9D8227B8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781FD794_726B_D31E_41C3_3008E7B033BE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7CFEB171_733A_3CB0_41D8_0B07870C12DE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.23,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E20A227_733A_3C51_41DC_CC50AC85767C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 147.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7EE372C1_733A_3DD0_41CD_238B5C216C48"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 30.49,
   "backwardYaw": 70.24,
   "distance": 1,
   "panorama": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -51.41,
   "backwardYaw": 104.93,
   "distance": 1,
   "panorama": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768"
  }
 ],
 "hfov": 360,
 "label": "Ruang_Guru",
 "audios": [
  "this.audio_5E6A09A0_7269_DFD2_41D5_25B790A75618"
 ],
 "id": "panorama_781D44BD_7268_350E_41DB_85E3AB667C2D",
 "thumbnailUrl": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_59EF2BFE_7268_532E_41D6_75919C44302F",
  "this.overlay_597A6FD5_7268_3372_41C5_5F937D2B380A",
  "this.overlay_59D0088F_726B_FDEE_41B7_835464604C10",
  "this.overlay_59273A7C_7268_5D32_41D5_37E1217E9715"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D99035B_733A_3CF1_41C0_E20D24D60B19"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FDCE1F6_733A_3FB3_41B4_6569AB8907FE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -140.28,
   "backwardYaw": 57.02,
   "distance": 1,
   "panorama": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B"
  }
 ],
 "hfov": 360,
 "label": "Ruang_Uks",
 "audios": [
  "this.audio_6AA3D17A_72E8_6F2E_41CF_ECB2AFF6BC69"
 ],
 "id": "panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6",
 "thumbnailUrl": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6B423EFB_72D8_752D_4188_61D09A4C2FA9",
  "this.overlay_6827371F_72D8_F4E5_41CC_F491966BB619",
  "this.overlay_6AF6129A_72D8_2DEF_41D0_D75E1D1949B7",
  "this.overlay_6B89F9E3_72D8_3F5E_41D2_FA6BF031F93B",
  "this.overlay_6BB73F07_72D8_34E5_41D1_A4E9D9F46FF9",
  "this.overlay_6A24368D_72D8_35E5_41A0_C586993E7CCD",
  "this.overlay_6A170D6E_72E8_5726_41B8_DC09C86A1F2A",
  "this.overlay_6A5157E5_72E8_7325_41C2_CFC29B2854CA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E53726F_733A_3CD1_41B5_E599290018D9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7CA0A151_733A_3CF1_41BC_249F4A4CCBE9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C8EA166_733A_3CD0_41D1_466C4E1C6D56"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 8.11,
   "backwardYaw": 169.32,
   "distance": 1,
   "panorama": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 134.27,
   "backwardYaw": 120.82,
   "distance": 1,
   "panorama": "this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE"
  }
 ],
 "hfov": 360,
 "label": "lt2_Jalan1",
 "id": "panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270",
 "thumbnailUrl": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_5792EE8D_72AB_D5EC_41CA_B9C0E148FA43",
  "this.overlay_5671DCAD_72A8_352C_41DB_C4C1D89C26A5",
  "this.overlay_566C2FB0_72A8_3334_41BD_F45803259814",
  "this.overlay_5634CD6A_72A8_3754_41DA_5771CC050257",
  "this.overlay_575DDFB1_72A8_7334_41D5_73FBF4CBBD59",
  "this.overlay_572FE322_72A8_2CD4_41D5_1C5093854F6E",
  "this.overlay_5605B10D_72A8_2CEC_41D5_9B8749A317CF",
  "this.overlay_5653964F_72A8_D56D_41C2_D31CD662752B",
  "this.overlay_5136260C_72A8_34EC_41A7_B91BC4BE4FE7",
  "this.overlay_57CB764C_72A8_3553_41D6_A5DE48B2EE09",
  "this.overlay_561B0097_72A8_6DFC_41BC_AFE8FBF6BB20",
  "this.overlay_57186C12_72A8_D4F4_41B1_291D3198B769",
  "this.overlay_54DF784F_7259_DD6C_41DB_CA474274BBC6",
  "this.overlay_5BE6C8DC_7278_3D73_41C4_8106AE5E8199",
  "this.overlay_5B35B877_7268_5D3E_41C6_0484D1E5D30E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781C22C5_7268_2D79_41B5_391056519E75_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7DD233AA_733A_3C53_41D0_7F549A370346"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7ECE02D5_733A_3DF1_41A3_4D7A110BF13A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781D3B70_7268_3317_416E_630C2D28B648_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C42913C_733A_3CB7_41BD_7C5DFAC98DDA"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 73.12,
   "backwardYaw": 78.81,
   "distance": 1,
   "panorama": "this.panorama_78120F49_7268_5309_41DC_17785FB64710"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 90.07,
   "backwardYaw": -77.9,
   "distance": 1,
   "panorama": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -64.53,
   "backwardYaw": -176.33,
   "distance": 1,
   "panorama": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C"
  }
 ],
 "hfov": 360,
 "label": "Jalan5",
 "id": "panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928",
 "thumbnailUrl": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_t.jpg"
  }
 ],
 "vfov": 170.72,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_500C9B0D_72B8_7CEF_4192_E1391A07239F",
  "this.overlay_50702AAD_72B8_3D2F_41D3_2456ECB43562",
  "this.overlay_519C4B95_72B9_F3FC_41C1_A9ED414FEEF1",
  "this.overlay_56B8D4F8_72B8_D534_41D0_2B2E468AB734",
  "this.overlay_56CF54A6_72A8_35DC_41D8_66DAE448AE74",
  "this.overlay_566F1F5D_72A8_D36C_419D_700F1C035DA6"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 37.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D7AD30E_733A_3C53_41C3_2B9E48145ECA"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 0, 1)",
   "media": "this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 1, 2)",
   "media": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 2, 3)",
   "media": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 3, 4)",
   "media": "this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 4, 5)",
   "media": "this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 5, 6)",
   "media": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 6, 7)",
   "media": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79485657_7268_351B_41D9_530D1F1D69C9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 7, 8)",
   "media": "this.panorama_79485657_7268_351B_41D9_530D1F1D69C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 8, 9)",
   "media": "this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 9, 10)",
   "media": "this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 10, 11)",
   "media": "this.panorama_781EBE24_726B_D53E_41CD_486B415D5768",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 11, 12)",
   "media": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 12, 13)",
   "media": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 13, 14)",
   "media": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 14, 15)",
   "media": "this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781C22C5_7268_2D79_41B5_391056519E75_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 15, 16)",
   "media": "this.panorama_781C22C5_7268_2D79_41B5_391056519E75",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 16, 17)",
   "media": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 17, 18)",
   "media": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 18, 19)",
   "media": "this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 19, 20)",
   "media": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 20, 21)",
   "media": "this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 21, 22)",
   "media": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_78120F49_7268_5309_41DC_17785FB64710_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 22, 23)",
   "media": "this.panorama_78120F49_7268_5309_41DC_17785FB64710",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 23, 24)",
   "media": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 24, 25)",
   "media": "this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 25, 26)",
   "media": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 26, 27)",
   "media": "this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist, 27, 0)",
   "media": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E66D265_733A_3CD1_41D8_01740239ED13"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E8462AC_733A_3C50_41CC_69CD0F12D5DA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_79D78B56_7268_531C_41CA_1056EBBD7213_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 136.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D589324_733A_3C57_41D6_041407144565"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D2DE2EA_733A_3DD3_41A5_0E7703351CAF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -133.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7EDE82CB_733A_3DD0_41D6_713EF4207159"
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_6AA3D17A_72E8_6F2E_41CF_ECB2AFF6BC69.mp3",
  "oggUrl": "media/audio_6AA3D17A_72E8_6F2E_41CF_ECB2AFF6BC69.ogg"
 },
 "autoplay": true,
 "id": "audio_6AA3D17A_72E8_6F2E_41CF_ECB2AFF6BC69",
 "data": {
  "label": "ruang uks"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 81.59,
   "backwardYaw": -81.5,
   "distance": 1,
   "panorama": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 46.69,
   "backwardYaw": 95.05,
   "distance": 1,
   "panorama": "this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -77.9,
   "backwardYaw": 90.07,
   "distance": 1,
   "panorama": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2",
 "thumbnailUrl": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_t.jpg",
 "label": "Jalan4",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_5330E8AD_72A8_3D2F_41B2_9E5A4FAEA761",
  "this.overlay_501B6B1C_72A8_3CED_41DB_96A93746CCB1",
  "this.overlay_50D6BD26_72AB_F4DD_41AB_D8FAF3B3FB6C",
  "this.overlay_50B89217_72A8_2CFB_41D6_99709BA56DAF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_camera"
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_61C14439_72B8_3520_41D8_F3A1FFDF3060.mp3",
  "oggUrl": "media/audio_61C14439_72B8_3520_41D8_F3A1FFDF3060.ogg"
 },
 "autoplay": true,
 "id": "audio_61C14439_72B8_3520_41D8_F3A1FFDF3060",
 "data": {
  "label": "Tu"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -142.39,
   "backwardYaw": -125.59,
   "distance": 1,
   "panorama": "this.panorama_781D3B70_7268_3317_416E_630C2D28B648"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 70.24,
   "backwardYaw": 30.49,
   "distance": 1,
   "panorama": "this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D"
  }
 ],
 "hfov": 360,
 "label": "Ruang_kepsek",
 "audios": [
  "this.audio_5ED24B73_7257_D336_41D4_19491298FC0B"
 ],
 "id": "panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8",
 "thumbnailUrl": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_t.jpg"
  }
 ],
 "vfov": 170.39,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_5EF604CF_7258_556F_41DC_97FEC69AB71F",
  "this.overlay_5E9098F4_7258_5D32_41C4_B80881051DE8",
  "this.overlay_5905A9FF_7258_5F2E_41D2_009E26D0379E",
  "this.overlay_5E666765_7258_3352_4199_A6D374ED459C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781EBE24_726B_D53E_41CD_486B415D5768_camera"
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_6BA88A7A_72E8_FD29_41B8_E41407C87CF2.mp3",
  "oggUrl": "media/audio_6BA88A7A_72E8_FD29_41B8_E41407C87CF2.ogg"
 },
 "autoplay": true,
 "id": "audio_6BA88A7A_72E8_FD29_41B8_E41407C87CF2",
 "data": {
  "label": "ruang perpus"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_79485657_7268_351B_41D9_530D1F1D69C9_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -100.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E6A625B_733A_3CF1_41D7_7E127D764094"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -75.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C642127_733A_3C51_41C2_2F7C5C8F83CE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 91.26,
   "backwardYaw": 98.33,
   "distance": 1,
   "panorama": "this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82",
 "thumbnailUrl": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_t.jpg",
 "label": "bagian utama",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_t.jpg"
  }
 ],
 "vfov": 172.77,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_7C44BCC3_7278_5571_41B1_3E6B019A4DFE"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 78.81,
   "backwardYaw": 73.12,
   "distance": 1,
   "panorama": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928"
  }
 ],
 "hfov": 360,
 "label": "Lab.komputer",
 "audios": [
  "this.audio_574E3B00_72B9_FCD4_41D9_88078159818A"
 ],
 "id": "panorama_78120F49_7268_5309_41DC_17785FB64710",
 "thumbnailUrl": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_t.jpg"
  }
 ],
 "vfov": 174.98,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_56C7C298_72B8_2DF4_41D1_0428C2AA2794",
  "this.overlay_56AC5CC4_72BB_D55C_41D6_0DA102037357"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -32.6,
   "backwardYaw": -7.71,
   "distance": 1,
   "panorama": "this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.33,
   "backwardYaw": -64.53,
   "distance": 1,
   "panorama": "this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928"
  }
 ],
 "hfov": 360,
 "label": "lt2_Jalan3",
 "id": "panorama_6809A933_72D8_FF3A_41BE_5A83D775831C",
 "thumbnailUrl": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_5B8699E1_7278_5F52_41AC_1C643FD7338A",
  "this.overlay_5A8639C0_7278_5F52_41D3_80F5409CFFD7",
  "this.overlay_58EE717E_7278_2F2E_41B3_D079BBD1BA80",
  "this.overlay_5A6DF3EB_7278_D356_41D3_6A9212373550"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7EF3F2B6_733A_3DB0_41D6_ACE272E399DF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FE8D1E1_733A_3FD1_41B3_B4AAAA22234B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -125.59,
   "backwardYaw": -142.39,
   "distance": 1,
   "panorama": "this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 170.92,
   "backwardYaw": -25.16,
   "distance": 1,
   "panorama": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1"
  }
 ],
 "hfov": 360,
 "label": "Ruang_Tamu",
 "audios": [
  "this.audio_604B22D6_72B8_6D61_41B9_82405A549FF1"
 ],
 "id": "panorama_781D3B70_7268_3317_416E_630C2D28B648",
 "thumbnailUrl": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_t.jpg"
  }
 ],
 "vfov": 174.11,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_61CCE2CE_72A8_2D7F_41BF_B6B826A2BFAB",
  "this.overlay_61BDE882_72A8_DDE6_41D5_DA89EBC8AC92",
  "this.overlay_661474B9_72AB_F525_41C0_FC48928C22C7",
  "this.overlay_66E5D098_72A8_2DE2_41DB_345074D549F2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7F80F1C3_733A_3FD1_41D0_DD217B04983E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 128.59,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7CB22147_733A_3CD1_41BD_436D03ADB573"
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_6323DB79_7258_5318_41B8_3975EE26DF75.mp3",
  "oggUrl": "media/audio_6323DB79_7258_5318_41B8_3975EE26DF75.ogg"
 },
 "autoplay": true,
 "id": "audio_6323DB79_7258_5318_41B8_3975EE26DF75",
 "data": {
  "label": "lapangan"
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 85.28,
   "backwardYaw": 158.66,
   "distance": 1,
   "panorama": "this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -100.95,
   "backwardYaw": -166.77,
   "distance": 1,
   "panorama": "this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_79D78B56_7268_531C_41CA_1056EBBD7213",
 "thumbnailUrl": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_t.jpg",
 "label": "Panggung",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_t.jpg"
  }
 ],
 "vfov": 170.64,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6A443338_72F8_5329_41CB_EEA53983BA5E",
  "this.overlay_6BD5B9A0_72F8_5FD8_41C6_15F5C85CBA3A",
  "this.overlay_6BBC02B1_72F8_2D3B_41DB_FC318ED235A2",
  "this.overlay_6B84007A_72F8_2D29_41C1_5AF45697DEC4"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 54.81,
   "backwardYaw": -14.24,
   "distance": 1,
   "panorama": "this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -81.5,
   "backwardYaw": 81.59,
   "distance": 1,
   "panorama": "this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -166.77,
   "backwardYaw": -100.95,
   "distance": 1,
   "panorama": "this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213"
  }
 ],
 "hfov": 360,
 "label": "jalan3",
 "id": "panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3",
 "thumbnailUrl": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6DBD97C3_72A8_F35A_41D2_6CB32C4815B7",
  "this.overlay_6C3A824C_72A8_6D6E_41B0_E845DB31B0B5",
  "this.overlay_6DB3A0E9_72A8_2D56_41D2_3B4EF14E0001",
  "this.overlay_52ACBCBD_72A8_552F_41A8_C8237AAA51E7",
  "this.overlay_6D16C94C_72A9_FF6D_41C9_517696FBDE3C",
  "this.overlay_53CF555E_72A8_776A_41A5_97940AAB5876"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7F86C1CD_733A_3FD1_41D8_E9EEEBF2D35F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7DF4D38A_733A_3C53_41CF_6ACC56C0329A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -59.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D87637B_733A_3CB1_4194_25319983136B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FC9A200_733A_3C4F_4191_8964F50315D0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7EBD6284_733A_3C57_41B3_4799166A0FF7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -122.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7C528131_733A_3CB1_41C0_1F9939D94A76"
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_604B22D6_72B8_6D61_41B9_82405A549FF1.mp3",
  "oggUrl": "media/audio_604B22D6_72B8_6D61_41B9_82405A549FF1.ogg"
 },
 "autoplay": true,
 "id": "audio_604B22D6_72B8_6D61_41B9_82405A549FF1",
 "data": {
  "label": "tamu"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7E992298_733A_3C70_41D4_21E1EF771E82"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7DE4239A_733A_3C73_41D2_6E738951EFD6"
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_680F1F34_72E8_D338_41B4_E3805CD799B1.mp3",
  "oggUrl": "media/audio_680F1F34_72E8_D338_41B4_E3805CD799B1.ogg"
 },
 "autoplay": true,
 "id": "audio_680F1F34_72E8_D338_41B4_E3805CD799B1",
 "data": {
  "label": "lab.mipa"
 }
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_4706781A_73F8_7CF1_41C8_3653D770CBE9.mp3",
  "oggUrl": "media/audio_4706781A_73F8_7CF1_41C8_3653D770CBE9.ogg"
 },
 "autoplay": true,
 "id": "audio_4706781A_73F8_7CF1_41C8_3653D770CBE9",
 "data": {
  "label": "audio_6F0FE6BC_7AF9_2C77_41DA_81668AD0538A"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_camera"
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_404F333D_73F8_5333_41CB_70C519CDCEA9.mp3",
  "oggUrl": "media/audio_404F333D_73F8_5333_41CB_70C519CDCEA9.ogg"
 },
 "autoplay": true,
 "id": "audio_404F333D_73F8_5333_41CB_70C519CDCEA9",
 "data": {
  "label": "ruang kelas 8"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7FF111D7_733A_3FF1_41D7_A0B8462A40C2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 50.97,
   "backwardYaw": -1.59,
   "distance": 1,
   "panorama": "this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -177.35,
   "backwardYaw": -177.75,
   "distance": 1,
   "panorama": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C",
 "thumbnailUrl": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_t.jpg",
 "label": "Depan_gedung_sekolah",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_t.jpg"
  }
 ],
 "vfov": 174.76,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_6356750C_7258_D4FF_41DA_700B71DC173C",
  "this.overlay_629377A5_7258_332E_41C5_4EE7A2672FFA",
  "this.overlay_633F5AF7_7258_7D29_41C3_0ADDDB39A406",
  "this.overlay_63A00BD5_7258_336F_41D5_888567AF3D99"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -43.08,
   "backwardYaw": 46.94,
   "distance": 1,
   "panorama": "this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1"
  }
 ],
 "hfov": 360,
 "label": "Ruang_TU",
 "audios": [
  "this.audio_61C14439_72B8_3520_41D8_F3A1FFDF3060"
 ],
 "id": "panorama_79485657_7268_351B_41D9_530D1F1D69C9",
 "thumbnailUrl": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_t.jpg"
  }
 ],
 "vfov": 174.76,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_61610E26_72B8_5520_41D0_1B4961F0EF62",
  "this.overlay_6121B8FB_72B8_3D27_41D7_53D3783562D2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -173.94,
   "backwardYaw": -55.57,
   "distance": 1,
   "panorama": "this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 169.32,
   "backwardYaw": 8.11,
   "distance": 1,
   "panorama": "this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -7.71,
   "backwardYaw": -32.6,
   "distance": 1,
   "panorama": "this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C"
  }
 ],
 "hfov": 360,
 "label": "lt2_Jalan2",
 "id": "panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2",
 "thumbnailUrl": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_t.jpg"
  }
 ],
 "vfov": 174.04,
 "hfovMin": "150%",
 "overlays": [
  "this.overlay_54BECA2E_725B_DD2F_4189_C2EC74C6FA42",
  "this.overlay_5703EE1A_7258_54F7_41D0_597D8269933B",
  "this.overlay_545719A1_7258_5FD5_41CE_E66DC8C81318",
  "this.overlay_543B3AAE_7258_7D2F_41D1_4A234221022B",
  "this.overlay_5BCD4EBF_7268_752D_41C6_E3FBEAE16BEC",
  "this.overlay_5FD59107_726B_ECDD_41DA_9320BDA56C5E"
 ]
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_509F38E0_72B8_3D54_41D9_0FD44C83F0C4.mp3",
  "oggUrl": "media/audio_509F38E0_72B8_3D54_41D9_0FD44C83F0C4.ogg"
 },
 "autoplay": true,
 "id": "audio_509F38E0_72B8_3D54_41D9_0FD44C83F0C4",
 "data": {
  "label": "mushola"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D46F339_733A_3CB1_41D2_27C5F9AFE55F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7D48D32F_733A_3C51_41DC_247858AE3767"
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_574E3B00_72B9_FCD4_41D9_88078159818A.mp3",
  "oggUrl": "media/audio_574E3B00_72B9_FCD4_41D9_88078159818A.ogg"
 },
 "autoplay": true,
 "id": "audio_574E3B00_72B9_FCD4_41D9_88078159818A",
 "data": {
  "label": "lab.komputer"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": "3vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 50,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#000000",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_4320E82A_73D8_5CD1_41C8_F4AD64DE0CCD",
 "width": 500.35,
 "scrollBarColor": "#000000",
 "right": "29.36%",
 "layout": "horizontal",
 "children": [
  "this.IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63",
  "this.IconButton_435114B8_73E8_D531_41D6_A952886C12B6",
  "this.IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22",
  "this.IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E",
  "this.IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA",
  "this.Container_4320682A_73D8_5CD1_4192_7B6A69F0682D",
  "this.IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81",
  "this.IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57",
  "this.IconButton_4320882A_73D8_5CD1_41D6_43016535EDCB",
  "this.IconButton_5CE5EA26_73D9_FCD1_41D1_11CB8D890FD4",
  "this.IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 20,
 "height": 137.05,
 "bottom": "15.31%",
 "gap": 4,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "Container31983"
 },
 "overflow": "hidden",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_43A3A827_73E8_3CDF_41D8_4E60233B1985",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_43A35827_73E8_3CDF_41DA_CD1F4742061C"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_43A3A827_73E8_3CDF_41D8_4E60233B1985, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "toolTipShadowOpacity": 1,
 "transparencyActive": true,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "maxHeight": 128,
 "maxWidth": 128,
 "id": "IconButton_435114B8_73E8_D531_41D6_A952886C12B6",
 "toolTipShadowSpread": 0,
 "toolTipBorderColor": "#767676",
 "width": 33,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "minHeight": 1,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_435114B8_73E8_D531_41D6_A952886C12B6.png",
 "toolTip": "Fullscreen",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "mode": "toggle",
 "height": 43.2,
 "toolTipFontWeight": "normal",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipFontStyle": "normal",
 "class": "IconButton",
 "data": {
  "name": "IconButton1493"
 },
 "shadow": false,
 "cursor": "hand",
 "toolTipShadowHorizontalLength": 0,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320882A_73D8_5CD1_41D6_43016535EDCB",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320882A_73D8_5CD1_41D6_43016535EDCB.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320882A_73D8_5CD1_41D6_43016535EDCB_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31994"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D, this.camera_7CB22147_733A_3CD1_41BD_436D03ADB573); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.63,
   "pitch": -6.84,
   "yaw": 104.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_419E9C65_7258_D552_41CB_A57BDC68CE3B",
   "distance": 100
  }
 ],
 "id": "overlay_58B91528_726B_D4D3_41BA_512A8A88E2FF",
 "maps": [
  {
   "hfov": 5.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 104.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 9.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 143,
      "height": 203
     }
    ]
   },
   "pitch": -3.67,
   "yaw": 105.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_584A1005_7268_2CD2_41B0_C59C013845A0",
 "data": {
  "label": "Ruang\u000d Guru"
 },
 "maps": [
  {
   "hfov": 9.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 105.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 22
     }
    ]
   },
   "pitch": -3.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.1,
   "pitch": -5.92,
   "yaw": -89.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_419D0C66_7258_D55E_41C7_49527E3AAD67",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_594C1318_7268_2CF3_41DB_787BC3D030D0",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 4.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -89.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 14.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 219,
      "height": 206
     }
    ]
   },
   "pitch": -2.78,
   "yaw": -88.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5E9A8735_7268_3332_41B0_D3A227AA9855",
 "data": {
  "label": "    Tempat\u000dPenyimpanan"
 },
 "maps": [
  {
   "hfov": 14.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 15
     }
    ]
   },
   "pitch": -2.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72, this.camera_7C42913C_733A_3CB7_41BD_7C5DFAC98DDA); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.22,
   "pitch": -24.42,
   "yaw": 89.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_419DFC66_7258_D55E_41D8_0C6802395B30",
   "distance": 100
  }
 ],
 "id": "overlay_59DC41EF_7268_2F2E_41D9_F0E80956B454",
 "maps": [
  {
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -24.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1, this.camera_7E66D265_733A_3CD1_41D8_01740239ED13); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "toolTip": "EXIT"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.22,
   "pitch": -21.95,
   "yaw": 1.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A3BA568_72D8_772C_41AF_D0AC4648A170",
   "distance": 100
  }
 ],
 "id": "overlay_66C03E16_72B8_34E0_41AC_90D0321F04FA",
 "maps": [
  {
   "hfov": 15.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_781EBE24_726B_D53E_41CD_486B415D5768, this.camera_7E05D246_733A_3CD3_41CB_9E202BE450EA); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan Menuju Ruang Guru"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.49,
   "pitch": -19.2,
   "yaw": 86.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A3BF568_72D8_772C_41D1_D400E0A2C720",
   "distance": 100
  }
 ],
 "id": "overlay_67DA1BFF_72BF_F320_41C4_6F68334187FA",
 "maps": [
  {
   "hfov": 15.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -19.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B, this.camera_7E6A625B_733A_3CF1_41D7_7E127D764094); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.36,
   "pitch": -20.57,
   "yaw": -82.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A3B3568_72D8_772C_41D3_47A3B519EA37",
   "distance": 100
  }
 ],
 "id": "overlay_6735C154_72B8_2F60_41D8_9AA92EE99C3C",
 "maps": [
  {
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -20.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E, this.camera_7E7E0250_733A_3CCF_41D5_D40C6C660762); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Lapangan Dalam"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.68,
   "pitch": -44.6,
   "yaw": 177.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A38A568_72D8_772C_41D5_C9D6C3A1727B",
   "distance": 100
  }
 ],
 "id": "overlay_6499110C_72B8_2CE0_41C0_3D709CB15572",
 "maps": [
  {
   "hfov": 11.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -44.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B, this.camera_7DC2D3BA_733A_23B3_41C7_59392FEAFF48); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.71,
   "pitch": -10.23,
   "yaw": -142.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68198662_72E8_555B_41B5_FCA5F870C551",
   "distance": 100
  }
 ],
 "id": "overlay_6BAF5945_72E8_5F5B_41D1_F224AD99FCF2",
 "maps": [
  {
   "hfov": 10.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 19.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 286,
      "height": 487
     }
    ]
   },
   "pitch": -7.48,
   "yaw": -141.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6A691FC8_72E8_F369_41A3_99C9A3AE3970",
 "data": {
  "label": "  Keluar \u000dRuangan "
 },
 "maps": [
  {
   "hfov": 19.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 27
     }
    ]
   },
   "pitch": -7.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3, this.camera_7EBD6284_733A_3C57_41B3_4799166A0FF7); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.82,
   "pitch": -6.18,
   "yaw": -14.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68187664_72E8_555F_41D7_13815714DB2A",
   "distance": 100
  }
 ],
 "id": "overlay_6823D529_72E8_5729_41D6_27EAEB3E2F7E",
 "maps": [
  {
   "hfov": 10.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 21.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 326,
      "height": 434
     }
    ]
   },
   "pitch": -1.73,
   "yaw": -11.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6997725B_72E8_2D69_4199_FAF6F76FF9BC",
 "data": {
  "label": "  Keluar\u000dRuangan"
 },
 "maps": [
  {
   "hfov": 21.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -1.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781D3B70_7268_3317_416E_630C2D28B648, this.camera_7DAB134C_733A_3CD7_41D3_9949AC393EE6); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.32,
   "pitch": -3.54,
   "yaw": -25.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A04A566_72D8_7724_41DC_0CCC51A7CC19",
   "distance": 100
  }
 ],
 "id": "overlay_635F53CA_72A8_3364_41C2_108A626AE244",
 "maps": [
  {
   "hfov": 7.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -25.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79485657_7268_351B_41D9_530D1F1D69C9, this.camera_7D589324_733A_3C57_41D6_041407144565); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.31,
   "pitch": -4.38,
   "yaw": 46.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A04F566_72D8_7724_41C5_D238DA41EE8E",
   "distance": 100
  }
 ],
 "id": "overlay_608DC3F1_72A8_7324_41B0_BE9A42D15928",
 "maps": [
  {
   "hfov": 7.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 14.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 85,
      "height": 116
     }
    ]
   },
   "pitch": -0.78,
   "yaw": 47.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_60E44EB5_72A8_352C_41B6_C1C0AC396349",
 "data": {
  "label": "     Ruang\u000d Tata Usaha\u000d       (TU)"
 },
 "maps": [
  {
   "hfov": 14.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_2_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -0.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 9.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 56,
      "height": 116
     }
    ]
   },
   "pitch": -1.28,
   "yaw": -25.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_637FE08E_72A8_2DFC_41D5_17000A5E7BCC",
 "data": {
  "label": " Ruang\u000d Tamu"
 },
 "maps": [
  {
   "hfov": 9.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -25.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 33
     }
    ]
   },
   "pitch": -1.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C, this.camera_7D46F339_733A_3CB1_41D2_27C5F9AFE55F); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "toolTip": "EXIT"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.88,
   "pitch": -28.75,
   "yaw": -177.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A046567_72D8_7724_41B8_A9ED77CCC43F",
   "distance": 100
  }
 ],
 "id": "overlay_636388C8_72A8_5D63_41D1_21C077255D95",
 "maps": [
  {
   "hfov": 11.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -28.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72, this.camera_7D48D32F_733A_3C51_41DC_247858AE3767); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.45,
   "pitch": -23.26,
   "yaw": 8.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A059567_72D8_7724_4175_0D04F0397059",
   "distance": 100
  }
 ],
 "id": "overlay_63C86C04_72A8_D4E3_41D0_6F8A4FFAC44E",
 "maps": [
  {
   "hfov": 12.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -23.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2, this.camera_7F86C1CD_733A_3FD1_41D8_E9EEEBF2D35F); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.32,
   "pitch": -8.11,
   "yaw": -55.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418A2C74_7258_D532_41B0_535CC1EB3C5E",
   "distance": 100
  }
 ],
 "id": "overlay_55CE603C_7268_2D2C_41D3_04D6AFD8BD01",
 "maps": [
  {
   "hfov": 13.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 360,
      "height": 457
     }
    ]
   },
   "pitch": -4.07,
   "yaw": -53.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_552A0454_7268_5573_41D4_4B21FFC0C2BE",
 "data": {
  "label": "  Keluar \u000dRuangan"
 },
 "maps": [
  {
   "hfov": 24.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -53.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ]
   },
   "pitch": -4.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A, this.camera_7E3C7214_733A_3C77_41CA_6BFEA12BFF15); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Keluar "
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.09,
   "pitch": -11.97,
   "yaw": -179.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB57F1E_7258_D4EE_41BC_679838DE0388",
   "distance": 100
  }
 ],
 "id": "overlay_62D3CC14_7268_D4EB_41CE_4C6681187549",
 "maps": [
  {
   "hfov": 11.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -11.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C, this.camera_7FC3620A_733A_3C53_41C4_A1B3C9812327); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Gedung Sekolah"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.89,
   "pitch": -6.73,
   "yaw": -1.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB52F1E_7258_D4EE_41C3_614AF84B7AAA",
   "distance": 100
  }
 ],
 "id": "overlay_62D30BDD_7269_D315_41D0_EF595F9EF886",
 "maps": [
  {
   "hfov": 10.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -6.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C, this.camera_7FC9A200_733A_3C4F_4191_8964F50315D0); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Lapangan Luar"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.77,
   "pitch": -7.7,
   "yaw": -62.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB5DF1F_7258_D4EE_41D5_0887E352DCA9",
   "distance": 100
  }
 ],
 "id": "overlay_6294F8A2_7269_DD2F_41DA_527A02370DC1",
 "maps": [
  {
   "hfov": 9.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -7.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.41,
   "pitch": 4.42,
   "yaw": -104.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB27F1F_7258_D4EE_41B1_80BD93CE56D2",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_62EF983D_726F_FD1A_41D6_8233EB995583",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 6.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 12.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 72,
      "height": 113
     }
    ]
   },
   "pitch": 3.68,
   "yaw": 47.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_62A27A5A_7268_DD1E_41A4_CF003E2FE8DD",
 "data": {
  "label": "   Parkiran\u000d     Motor"
 },
 "maps": [
  {
   "hfov": 12.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_4_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 25
     }
    ]
   },
   "pitch": 3.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.75,
   "pitch": 2.94,
   "yaw": 46.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB21F1F_7258_D4EE_41D7_2BE80B35C4E0",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_62DAFEF5_7268_352A_41C7_8CF5B702878A",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 6.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 13.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 82,
      "height": 110
     }
    ]
   },
   "pitch": 5.85,
   "yaw": -104.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_623D3BBC_7268_5319_41DB_F1963FCCEE2C",
 "data": {
  "label": "    Parkiran\u000d      Mobil"
 },
 "maps": [
  {
   "hfov": 13.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_6_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 5.85
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320182A_73D8_5CD1_41DB_38D7EC339F22_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31985"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320282A_73D8_5CD1_41A9_71E35F02BE63_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31984"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31989"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320082A_73D8_5CD1_41DC_85AEB710D95E_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31986"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320A82A_73D8_5CD1_41BE_A5AB20B06A81_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31992"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320982A_73D8_5CD1_41CC_F425F0869E57_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31993"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320782A_73D8_5CD1_41CA_3394E527D9AA_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31987"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31991"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320482A_73D8_5CD1_41BC_6C6262F9A4C1",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320482A_73D8_5CD1_41BC_6C6262F9A4C1.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320482A_73D8_5CD1_41BC_6C6262F9A4C1_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31990"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3",
 "width": 32,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_4320F82A_73D8_5CD1_41D0_663C1EC342E3_pressed.png",
 "class": "IconButton",
 "data": {
  "name": "Button31995"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270, this.camera_7E94A2A2_733A_3C50_41B8_775EF2028BD8); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.77,
   "pitch": -11.8,
   "yaw": 120.82,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418B8C74_7258_D532_41CA_C23CD828E9D7",
   "distance": 100
  }
 ],
 "id": "overlay_55CB5FA0_7278_53D3_41DA_9E51AC1408D5",
 "maps": [
  {
   "hfov": 7.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 120.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 364,
      "height": 394
     }
    ]
   },
   "pitch": -6.35,
   "yaw": 122.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_552A8B6D_7278_D352_41A4_2E6D75F60F50",
 "data": {
  "label": "  Keluar\u000aRuangan"
 },
 "maps": [
  {
   "hfov": 24.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 122.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -6.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82, this.camera_7E992298_733A_3C70_41D4_21E1EF771E82); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "toolTip": "Keluar Area Sekolah"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.3,
   "pitch": -10.66,
   "yaw": 98.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6284C6CC_7259_F57E_419D_EFF162E93E98",
   "distance": 100
  }
 ],
 "id": "overlay_62ABB372_7278_5313_41D6_717825754754",
 "maps": [
  {
   "hfov": 13.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 98.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -10.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050, this.camera_7EAB428E_733A_3C50_41C3_D80178B86C08); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju SMPIT BIS"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.43,
   "pitch": -7.19,
   "yaw": -83.18,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6284A6CC_7259_F57E_41CB_44B98E5ECDC7",
   "distance": 100
  }
 ],
 "id": "overlay_6217D1FA_7278_2F1D_41D7_1348FD69A710",
 "maps": [
  {
   "hfov": 13.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -7.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2, this.camera_7EDE82CB_733A_3DD0_41D6_713EF4207159); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.08,
   "pitch": -7.07,
   "yaw": 95.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4196AC6C_7258_D552_41A3_BE55EF3CAAD5",
   "distance": 100
  }
 ],
 "id": "overlay_50A3FBC3_72B8_335B_41D9_F9B01D7F75FD",
 "maps": [
  {
   "hfov": 13.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 95.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 21.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 128,
      "height": 221
     }
    ]
   },
   "pitch": -3.91,
   "yaw": 96.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_51C66294_72B8_2DFD_41D9_CF44152B4310",
 "data": {
  "label": "  Keluar\u000dRuangan"
 },
 "maps": [
  {
   "hfov": 21.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 27
     }
    ]
   },
   "pitch": -3.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72, this.camera_7ECE02D5_733A_3DF1_41A3_4D7A110BF13A); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan Keluar"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.72,
   "pitch": -12.58,
   "yaw": -14.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_42ED95AF_73E8_372F_41C6_3568DD390A2D",
   "distance": 100
  }
 ],
 "id": "overlay_5C115CD0_73A8_5571_41B3_972E37AAF8EC",
 "maps": [
  {
   "hfov": 11.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -12.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050, this.camera_7FF111D7_733A_3FF1_41D7_A0B8462A40C2); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "toolTip": "Keluar Lapangan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.41,
   "pitch": -5.62,
   "yaw": -2.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6285D6CD_7259_F57E_41DB_82EC611CF31B",
   "distance": 100
  }
 ],
 "id": "overlay_63F5C435_7258_552B_41DB_586AAA296DC9",
 "maps": [
  {
   "hfov": 13.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -5.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.14,
   "pitch": -15.68,
   "yaw": 10.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418C0C7F_7258_D52E_41D3_F44134DE46EE",
   "distance": 100
  }
 ],
 "id": "overlay_69020901_72D8_DCD6_41CA_B47667E85391",
 "maps": [
  {
   "hfov": 11.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 10.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -15.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72, this.camera_7D2DE2EA_733A_3DD3_41A5_0E7703351CAF); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.85,
   "pitch": -22.85,
   "yaw": 79.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418CEC7F_7258_D52E_41D5_61A91D55D927",
   "distance": 100
  }
 ],
 "id": "overlay_6EC6D058_72D8_6D76_41B9_DED5166C7958",
 "maps": [
  {
   "hfov": 13.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213, this.camera_7D68E31A_733A_3C73_41CF_EB8D14F7156D); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.66,
   "pitch": -34.1,
   "yaw": 158.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41835C80_7258_D5D2_41DC_7B2E09F13A5F",
   "distance": 100
  }
 ],
 "id": "overlay_6963069D_72D8_F5EE_419B_D9E7B7FD1FAF",
 "maps": [
  {
   "hfov": 13.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -34.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 20.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 312,
      "height": 438
     }
    ]
   },
   "pitch": -1.19,
   "yaw": 55.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69CC9683_72DF_D5DA_41D6_0939D7F9822A",
 "data": {
  "label": "  Ruang \u000d    UKS"
 },
 "maps": [
  {
   "hfov": 20.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 22
     }
    ]
   },
   "pitch": -1.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781C22C5_7268_2D79_41B5_391056519E75, this.camera_7D7AD30E_733A_3C53_41C3_2B9E48145ECA); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.7,
   "pitch": -7.81,
   "yaw": -61.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4183CC81_7258_D5D2_41D6_30C4FC10CEC4",
   "distance": 100
  }
 ],
 "id": "overlay_69045537_72D8_F73A_41BA_AC84E134BB9F",
 "maps": [
  {
   "hfov": 13.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 36.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 546,
      "height": 568
     }
    ]
   },
   "pitch": -3.71,
   "yaw": -56.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69C8A4F4_72D8_553E_41CC_96FDA0803BD8",
 "data": {
  "label": "     Ruang \u000dPerpustakaan"
 },
 "maps": [
  {
   "hfov": 36.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_5_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6, this.camera_7D0A3302_733A_3C53_41A7_F8E10C5D608F); this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.73,
   "pitch": -6.89,
   "yaw": 57.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4183AC81_7258_D5D2_41CE_AA2CF15E9D33",
   "distance": 100
  }
 ],
 "id": "overlay_69291864_72D9_FD5E_41CE_77C9FB9BDBAD",
 "maps": [
  {
   "hfov": 13.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 57.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.63,
   "pitch": -5.36,
   "yaw": -112.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41822C81_7258_D5D2_41DC_2099DD4A335A",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6905FFE5_72D8_535E_41CF_6DD9EE68BDF6",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 3.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 15.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_8_0.png",
      "class": "ImageResourceLevel",
      "width": 224,
      "height": 212
     }
    ]
   },
   "pitch": -2.8,
   "yaw": -109.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6E974A78_72D8_DD36_41DB_5512C437C229",
 "data": {
  "label": "Toilet\u000dIkhwan"
 },
 "maps": [
  {
   "hfov": 15.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_8_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781EBE24_726B_D53E_41CD_486B415D5768, this.camera_7C642127_733A_3C51_41C2_2F7C5C8F83CE); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.72,
   "pitch": -5.02,
   "yaw": -51.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7DD390B9_733A_3DB1_41B2_773E905F47AA",
   "distance": 100
  }
 ],
 "id": "overlay_59EF2BFE_7268_532E_41D6_75919C44302F",
 "maps": [
  {
   "hfov": 9.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -51.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 16.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 245,
      "height": 305
     }
    ]
   },
   "pitch": -1.24,
   "yaw": -50.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_597A6FD5_7268_3372_41C5_5F937D2B380A",
 "data": {
  "label": "  Keluar\u000dRuangan"
 },
 "maps": [
  {
   "hfov": 16.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": -1.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8, this.camera_7C74811D_733A_3C71_41D6_5E6595E132B2); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Circle Generic 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10,
   "pitch": -7.31,
   "yaw": 30.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7DD210BA_733A_3DB3_41D9_498F6296F5EA",
   "distance": 100
  }
 ],
 "id": "overlay_59D0088F_726B_FDEE_41B7_835464604C10",
 "maps": [
  {
   "hfov": 10,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 32.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 480,
      "height": 461
     }
    ]
   },
   "pitch": -3.87,
   "yaw": 31.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_59273A7C_7268_5D32_41D5_37E1217E9715",
 "data": {
  "label": "       Ruang\u000aKepala Sekolah"
 },
 "maps": [
  {
   "hfov": 32.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.87
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_78185388_7268_73F7_41C4_D9452858EBEF, this.camera_69BB76C1_72E8_5559_41D0_309A7EA91752)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.85,
   "pitch": -21.66,
   "yaw": -140.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6816E660_72E8_5558_41DB_A479A7D4D2A5",
   "distance": 100
  }
 ],
 "id": "overlay_6B423EFB_72D8_752D_4188_61D09A4C2FA9",
 "maps": [
  {
   "hfov": 12.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -21.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B, this.camera_7C528131_733A_3CB1_41C0_1F9939D94A76); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "  Keluar\u000dRuangan"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 415,
      "height": 548
     }
    ]
   },
   "pitch": -15.52,
   "yaw": -140.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6827371F_72D8_F4E5_41CC_F491966BB619",
 "maps": [
  {
   "hfov": 26.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -15.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.88,
   "pitch": 2.29,
   "yaw": -52.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68163662_72E8_555B_41DA_A7991A6E8FF9",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6AF6129A_72D8_2DEF_41D0_D75E1D1949B7",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 9.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.57,
   "pitch": 0.35,
   "yaw": 33.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68160662_72E8_555B_41A8_2069951F6388",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B89F9E3_72D8_3F5E_41D2_FA6BF031F93B",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 10.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.02,
   "pitch": 1.76,
   "yaw": -3.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68166662_72E8_555B_41DC_62C936E1A508",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6BB73F07_72D8_34E5_41D1_A4E9D9F46FF9",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 11.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 17.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 255,
      "height": 320
     }
    ]
   },
   "pitch": 1.29,
   "yaw": 34.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6A24368D_72D8_35E5_41A0_C586993E7CCD",
 "data": {
  "label": "Kamar 2"
 },
 "maps": [
  {
   "hfov": 17.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_5_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ]
   },
   "pitch": 1.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 13.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 208,
      "height": 323
     }
    ]
   },
   "pitch": 4.43,
   "yaw": -2.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6A170D6E_72E8_5726_41B8_DC09C86A1F2A",
 "data": {
  "label": "  Ruang\u000dkonseling"
 },
 "maps": [
  {
   "hfov": 13.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_6_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 24
     }
    ]
   },
   "pitch": 4.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 18.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_7_0.png",
      "class": "ImageResourceLevel",
      "width": 276,
      "height": 323
     }
    ]
   },
   "pitch": 2.81,
   "yaw": -50.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6A5157E5_72E8_7325_41C2_CFC29B2854CA",
 "data": {
  "label": "Kamar 1"
 },
 "maps": [
  {
   "hfov": 18.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_7_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": 2.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.39,
   "pitch": -21.11,
   "yaw": -84.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418AAC75_7258_D532_41D3_B9337582DE03",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5792EE8D_72AB_D5EC_41CA_B9C0E148FA43",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 15.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.39,
   "pitch": -21.11,
   "yaw": -84.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41890C75_7258_D532_41CD_E8D476123978",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5671DCAD_72A8_352C_41DB_C4C1D89C26A5",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 15.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2, this.camera_7D96836B_733A_3CD1_41D7_B9F313729A70); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.2,
   "pitch": -22.95,
   "yaw": 8.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4189DC75_7258_D532_41D8_AEB2237A08A5",
   "distance": 100
  }
 ],
 "id": "overlay_566C2FB0_72A8_3334_41BD_F45803259814",
 "maps": [
  {
   "hfov": 15.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8,
   "pitch": -7.69,
   "yaw": -15.21,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4189BC75_7258_D532_41C8_D767C6D9700F",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5634CD6A_72A8_3754_41DA_5771CC050257",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.91,
   "pitch": -11.38,
   "yaw": -114.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41886C75_7258_D532_41C3_9765822B2149",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_575DDFB1_72A8_7334_41D5_73FBF4CBBD59",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 7.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.9,
   "pitch": -11.84,
   "yaw": -167.32,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41895C76_7258_D53E_41D8_8913C18F1B55",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_572FE322_72A8_2CD4_41D5_1C5093854F6E",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 7.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.07,
   "pitch": -1.7,
   "yaw": -67.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41896C76_7258_D53E_41DA_20617A8547FD",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5605B10D_72A8_2CEC_41D5_9B8749A317CF",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 8.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 26.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_7_0.png",
      "class": "ImageResourceLevel",
      "width": 399,
      "height": 467
     }
    ]
   },
   "pitch": -8.56,
   "yaw": -163.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5653964F_72A8_D56D_41C2_D31CD662752B",
 "data": {
  "label": "Tempat \u000aIsi Minum"
 },
 "maps": [
  {
   "hfov": 26.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_7_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -8.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 18.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_8_0.png",
      "class": "ImageResourceLevel",
      "width": 281,
      "height": 445
     }
    ]
   },
   "pitch": -7.84,
   "yaw": -14.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5136260C_72A8_34EC_41A7_B91BC4BE4FE7",
 "data": {
  "label": "  Ruang\u000dKelas VII A"
 },
 "maps": [
  {
   "hfov": 18.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_8_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 25
     }
    ]
   },
   "pitch": -7.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 23.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_9_0.png",
      "class": "ImageResourceLevel",
      "width": 349,
      "height": 331
     }
    ]
   },
   "pitch": 0.81,
   "yaw": -65.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_57CB764C_72A8_3553_41D6_A5DE48B2EE09",
 "data": {
  "label": "      Proses Pembangunan"
 },
 "maps": [
  {
   "hfov": 23.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_9_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781FD794_726B_D31E_41C3_3008E7B033BE, this.camera_7D87637B_733A_3CB1_4194_25319983136B); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.56,
   "pitch": -13.92,
   "yaw": 134.27,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41885C76_7258_D53E_41C3_C1F8F5C5A1A1",
   "distance": 100
  }
 ],
 "id": "overlay_561B0097_72A8_6DFC_41BC_AFE8FBF6BB20",
 "maps": [
  {
   "hfov": 10.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 20.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_11_0.png",
      "class": "ImageResourceLevel",
      "width": 310,
      "height": 376
     }
    ]
   },
   "pitch": -10.71,
   "yaw": 136.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_57186C12_72A8_D4F4_41B1_291D3198B769",
 "data": {
  "label": "    Ruang\u000dKelas VIII B"
 },
 "maps": [
  {
   "hfov": 20.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_11_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": -10.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 21.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_12_0.png",
      "class": "ImageResourceLevel",
      "width": 320,
      "height": 467
     }
    ]
   },
   "pitch": -10.73,
   "yaw": -111.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_54DF784F_7259_DD6C_41DB_CA474274BBC6",
 "data": {
  "label": "  Ruang\u000dKelas VIII A"
 },
 "maps": [
  {
   "hfov": 21.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_0_HS_12_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 23
     }
    ]
   },
   "pitch": -10.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 8.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_13_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 223
     }
    ]
   },
   "pitch": -6.64,
   "yaw": 102.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5BE6C8DC_7278_3D73_41C4_8106AE5E8199",
 "data": {
  "label": " Toilet\u000dAkhwat"
 },
 "maps": [
  {
   "hfov": 8.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 102.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_13_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 29
     }
    ]
   },
   "pitch": -6.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.07,
   "pitch": -7.17,
   "yaw": 102.48,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41888C77_7258_D53E_41A6_FF28A9FE377F",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5B35B877_7268_5D3E_41C6_0484D1E5D30E",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 5.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 102.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_14_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2, this.camera_7F8C91B8_733A_3FBF_41CF_F64308FC3FA0); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.77,
   "pitch": -18.21,
   "yaw": 90.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4195DC72_7258_D536_41D0_EB8A98B59165",
   "distance": 100
  }
 ],
 "id": "overlay_500C9B0D_72B8_7CEF_4192_E1391A07239F",
 "maps": [
  {
   "hfov": 9.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -18.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_78120F49_7268_5309_41DC_17785FB64710, this.camera_7CEFD17C_733A_3CB0_41BD_E2DAEC9F64F2); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.34,
   "pitch": -9.14,
   "yaw": 73.12,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41958C72_7258_D536_41DA_B53217A6018C",
   "distance": 100
  }
 ],
 "id": "overlay_50702AAD_72B8_3D2F_41D3_2456ECB43562",
 "maps": [
  {
   "hfov": 6.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 148,
      "height": 164
     }
    ]
   },
   "pitch": -3.31,
   "yaw": 71.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_519C4B95_72B9_F3FC_41C1_A9ED414FEEF1",
 "data": {
  "label": "      Ruang\u000dLab.Komputer \u000d    BAHASA"
 },
 "maps": [
  {
   "hfov": 24.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_2_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -3.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C, this.camera_7F80F1C3_733A_3FD1_41D0_DD217B04983E); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Lantai 2"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.63,
   "pitch": -35.18,
   "yaw": -64.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41940C73_7258_D536_41B1_694C4B1EB927",
   "distance": 100
  }
 ],
 "id": "overlay_56B8D4F8_72B8_D534_41D0_2B2E468AB734",
 "maps": [
  {
   "hfov": 12.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -35.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.17,
   "pitch": -0.59,
   "yaw": -92.21,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41948C73_7258_D536_41C0_30494D231B14",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_56CF54A6_72A8_35DC_41D8_66DAE448AE74",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 8.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 18.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 110,
      "height": 149
     }
    ]
   },
   "pitch": 1.46,
   "yaw": -90.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_566F1F5D_72A8_D36C_419D_700F1C035DA6",
 "data": {
  "label": "Kantin"
 },
 "maps": [
  {
   "hfov": 18.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_5_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 1.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3, this.camera_7DF4D38A_733A_3C53_41CF_6ACC56C0329A); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.03,
   "pitch": -26.83,
   "yaw": 81.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4197FC6B_7258_D556_41BB_2C448AE2E9C6",
   "distance": 100
  }
 ],
 "id": "overlay_5330E8AD_72A8_3D2F_41B2_9E5A4FAEA761",
 "maps": [
  {
   "hfov": 17.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -26.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928, this.camera_7DD233AA_733A_3C53_41D0_7F549A370346); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.23,
   "pitch": -25.44,
   "yaw": -77.9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41967C6B_7258_D556_41BD_5581C0ABD8C9",
   "distance": 100
  }
 ],
 "id": "overlay_501B6B1C_72A8_3CED_41DB_96A93746CCB1",
 "maps": [
  {
   "hfov": 17.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE, this.camera_7DE4239A_733A_3C73_41D2_6E738951EFD6); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.56,
   "pitch": -11.25,
   "yaw": 46.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41962C6C_7258_D552_41B1_05647320B59A",
   "distance": 100
  }
 ],
 "id": "overlay_50D6BD26_72AB_F4DD_41AB_D8FAF3B3FB6C",
 "maps": [
  {
   "hfov": 13.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 23.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 356,
      "height": 603
     }
    ]
   },
   "pitch": -3.38,
   "yaw": 51.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_50B89217_72A8_2CFB_41D6_99709BA56DAF",
 "data": {
  "label": "  Ruang\u000dMusholla    \u000d & Aula"
 },
 "maps": [
  {
   "hfov": 23.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 51.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 27
     }
    ]
   },
   "pitch": -3.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781D44BD_7268_350E_41DB_85E3AB667C2D, this.camera_7E4EF27A_733A_3CB3_41D2_E032E5B47957); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle Generic 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.06,
   "pitch": -10.06,
   "yaw": 70.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_7DD2B0BA_733A_3DB3_41D8_2DBD6512E9BB",
   "distance": 100
  }
 ],
 "id": "overlay_5EF604CF_7258_556F_41DC_97FEC69AB71F",
 "maps": [
  {
   "hfov": 11.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 17.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 107,
      "height": 212
     }
    ]
   },
   "pitch": -5.9,
   "yaw": 70.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5E9098F4_7258_5D32_41C4_B80881051DE8",
 "data": {
  "label": "Ruang\u000d Guru"
 },
 "maps": [
  {
   "hfov": 17.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 31
     }
    ]
   },
   "pitch": -5.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781D3B70_7268_3317_416E_630C2D28B648, this.camera_7E53726F_733A_3CD1_41B5_E599290018D9); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.55,
   "pitch": -18.42,
   "yaw": -142.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4193DC67_7258_D55E_41C0_4E5A8378601B",
   "distance": 100
  }
 ],
 "id": "overlay_5905A9FF_7258_5F2E_41D2_009E26D0379E",
 "maps": [
  {
   "hfov": 12.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -18.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 22.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 139,
      "height": 202
     }
    ]
   },
   "pitch": -11.78,
   "yaw": -142.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5E666765_7258_3352_4199_A6D374ED459C",
 "data": {
  "label": " Keluar \u000dRuangan"
 },
 "maps": [
  {
   "hfov": 22.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 23
     }
    ]
   },
   "pitch": -11.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A, this.camera_7D3FD2DF_733A_3DF1_41C1_D4DB9D8227B8); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan Masuk"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.9,
   "pitch": -16.61,
   "yaw": 91.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_628B96CB_7259_F57A_41C5_93BC80CDA12A",
   "distance": 100
  }
 ],
 "id": "overlay_7C44BCC3_7278_5571_41B1_3E6B019A4DFE",
 "maps": [
  {
   "hfov": 12.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -16.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928, this.camera_7D99035B_733A_3CF1_41C0_E20D24D60B19); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.59,
   "pitch": -10.41,
   "yaw": 78.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418B0C73_7258_D536_41D5_F5252CDA0597",
   "distance": 100
  }
 ],
 "id": "overlay_56C7C298_72B8_2DF4_41D1_0428C2AA2794",
 "maps": [
  {
   "hfov": 13.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 21.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 322,
      "height": 485
     }
    ]
   },
   "pitch": -5.65,
   "yaw": 80.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_56AC5CC4_72BB_D55C_41D6_0DA102037357",
 "data": {
  "label": "  Keluar \u000dRuangan"
 },
 "maps": [
  {
   "hfov": 21.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 24
     }
    ]
   },
   "pitch": -5.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2, this.camera_7CA0A151_733A_3CF1_41BC_249F4A4CCBE9); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.08,
   "pitch": -23.27,
   "yaw": -32.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418EAC79_7258_D532_41C8_94BB330C272D",
   "distance": 50
  }
 ],
 "id": "overlay_5B8699E1_7278_5F52_41AC_1C643FD7338A",
 "maps": [
  {
   "hfov": 11.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -23.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.08,
   "pitch": -3.89,
   "yaw": 15.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418D3C79_7258_D532_41CE_F0E98557D11A",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5A8639C0_7278_5F52_41D3_80F5409CFFD7",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 6.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 14.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 211,
      "height": 368
     }
    ]
   },
   "pitch": -0.6,
   "yaw": 15.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_58EE717E_7278_2F2E_41B3_D079BBD1BA80",
 "data": {
  "label": "Toilet\u000dIkhwan"
 },
 "maps": [
  {
   "hfov": 14.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_2_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 27
     }
    ]
   },
   "pitch": -0.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928, this.camera_7C90915B_733A_3CF0_41C9_2780DA882374); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Lantai 1"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.67,
   "pitch": -21.62,
   "yaw": -176.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418DBC7F_7258_D52E_41C3_4C2780B088D8",
   "distance": 100
  }
 ],
 "id": "overlay_5A6DF3EB_7278_D356_41D3_6A9212373550",
 "maps": [
  {
   "hfov": 14.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1, this.camera_7E09D23C_733A_3CB7_41CE_020FA1A8CBFF); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.16,
   "pitch": -19.57,
   "yaw": 170.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A05D567_72D8_7724_41C3_BDD455D940E8",
   "distance": 100
  }
 ],
 "id": "overlay_61CCE2CE_72A8_2D7F_41BF_B6B826A2BFAB",
 "maps": [
  {
   "hfov": 16.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -19.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8, this.camera_7E1C8232_733A_3CB3_41D8_B6E525E9010A); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.3,
   "pitch": -18.2,
   "yaw": -125.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A057567_72D8_7724_41AA_44C055B921DF",
   "distance": 100
  }
 ],
 "id": "overlay_61BDE882_72A8_DDE6_41D5_DA89EBC8AC92",
 "maps": [
  {
   "hfov": 16.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -18.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 18.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 289,
      "height": 472
     }
    ]
   },
   "pitch": -15.25,
   "yaw": 169.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_661474B9_72AB_F525_41C0_FC48928C22C7",
 "data": {
  "label": "  Keluar\u000dRuangan "
 },
 "maps": [
  {
   "hfov": 18.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_2_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 26
     }
    ]
   },
   "pitch": -15.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 23.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 366,
      "height": 468
     }
    ]
   },
   "pitch": -16.83,
   "yaw": -125.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_66E5D098_72A8_2DE2_41DB_345074D549F2",
 "data": {
  "label": "      Ruang \u000dKepala Sekolah"
 },
 "maps": [
  {
   "hfov": 23.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ]
   },
   "pitch": -16.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B, this.camera_7E29521E_733A_3C73_41DB_DA09F368CB3B); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.98,
   "pitch": -27.24,
   "yaw": 85.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6819C662_72E8_555B_41B9_183FE2BF7EC6",
   "distance": 100
  }
 ],
 "id": "overlay_6A443338_72F8_5329_41CB_EEA53983BA5E",
 "maps": [
  {
   "hfov": 15.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -27.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3, this.camera_7E20A227_733A_3C51_41DC_CC50AC85767C); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.98,
   "pitch": -27.24,
   "yaw": -100.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68192663_72E8_5559_41D3_17849201B90F",
   "distance": 100
  }
 ],
 "id": "overlay_6BD5B9A0_72F8_5FD8_41C6_15F5C85CBA3A",
 "maps": [
  {
   "hfov": 15.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -27.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.4,
   "pitch": -3.61,
   "yaw": -4.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68190663_72E8_5559_41C8_1092A4EE8C3D",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6BBC02B1_72F8_2D3B_41DB_FC318ED235A2",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 26.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 160,
      "height": 263
     }
    ]
   },
   "pitch": -4.76,
   "yaw": -1.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B84007A_72F8_2D29_41C1_5AF45697DEC4",
 "data": {
  "label": "    Area\u000dPanggung"
 },
 "maps": [
  {
   "hfov": 26.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 26
     }
    ]
   },
   "pitch": -4.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 373,
      "height": 521
     }
    ]
   },
   "pitch": -6.18,
   "yaw": 54.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6DBD97C3_72A8_F35A_41D2_6CB32C4815B7",
 "data": {
  "label": "  Ruang\u000dLab. MIPA"
 },
 "maps": [
  {
   "hfov": 24.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 22
     }
    ]
   },
   "pitch": -6.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781E9C36_7268_351B_41CE_40CAF2E9901A, this.camera_7FE8D1E1_733A_3FD1_41B3_B4AAAA22234B); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.35,
   "pitch": -11.59,
   "yaw": 54.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41817C82_7258_D5D6_41DC_12D02107B15B",
   "distance": 100
  }
 ],
 "id": "overlay_6C3A824C_72A8_6D6E_41B0_E845DB31B0B5",
 "maps": [
  {
   "hfov": 15.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_79D78B56_7268_531C_41CA_1056EBBD7213, this.camera_7FDCE1F6_733A_3FB3_41B4_6569AB8907FE); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.78,
   "pitch": -33.81,
   "yaw": -166.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4181DC82_7258_D5D6_41B3_8B19F720FA86",
   "distance": 100
  }
 ],
 "id": "overlay_6DB3A0E9_72A8_2D56_41D2_3B4EF14E0001",
 "maps": [
  {
   "hfov": 16.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -33.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 12.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 187,
      "height": 256
     }
    ]
   },
   "pitch": -3.82,
   "yaw": 116.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_52ACBCBD_72A8_552F_41A8_C8237AAA51E7",
 "data": {
  "label": "Toilet\u000dAkhwat"
 },
 "maps": [
  {
   "hfov": 12.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_3_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 21
     }
    ]
   },
   "pitch": -3.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.45,
   "pitch": -7.35,
   "yaw": 118.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41804C83_7258_D5D6_41C5_D5359E21D430",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6D16C94C_72A9_FF6D_41C9_517696FBDE3C",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 6.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 118.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2, this.camera_7FE531EB_733A_3FD1_41D1_E7F226DFC4C1); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.54,
   "pitch": -29.66,
   "yaw": -81.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_41802C83_7258_D5D6_41DA_0D818FC0C36E",
   "distance": 100
  }
 ],
 "id": "overlay_53CF555E_72A8_776A_41A5_97940AAB5876",
 "maps": [
  {
   "hfov": 17.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -29.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050, this.camera_7C8EA166_733A_3CD0_41D1_466C4E1C6D56); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "toolTip": "Menuju Keluar"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.56,
   "pitch": -8.48,
   "yaw": 50.97,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB36F1F_7258_D4EE_41B9_CAB6AA2C61D9",
   "distance": 100
  }
 ],
 "id": "overlay_6356750C_7258_D4FF_41DA_700B71DC173C",
 "maps": [
  {
   "hfov": 11.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 50.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.6,
   "pitch": 0.18,
   "yaw": -103.87,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_628566CE_7259_F57A_41D7_CB9857CD9E53",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_629377A5_7258_332E_41C5_4EE7A2672FFA",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 6.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 11.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 67,
      "height": 90
     }
    ]
   },
   "pitch": 0.2,
   "yaw": -102.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_633F5AF7_7258_7D29_41C3_0ADDDB39A406",
 "data": {
  "label": "Parkiran"
 },
 "maps": [
  {
   "hfov": 11.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -102.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_2_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 0.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1, this.camera_7CFEB171_733A_3CB0_41D8_0B07870C12DE); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "toolTip": "Masuk Gedung Sekolah"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.18,
   "pitch": -13.18,
   "yaw": -177.35,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A076566_72D8_7724_41D3_292A8B774C6F",
   "distance": 100
  }
 ],
 "id": "overlay_63A00BD5_7258_336F_41D5_888567AF3D99",
 "maps": [
  {
   "hfov": 13.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.52,
   "pitch": -6.62,
   "yaw": -44.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6A3A3567_72D8_7724_41B5_0C419D07693C",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_61610E26_72B8_5520_41D0_1B4961F0EF62",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 17.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -44.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_78C3144E_7268_550A_41DA_88FCB640ACA1, this.camera_7C79D111_733A_3C71_41D5_1074F84EF9CD); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "   Keluar \u000d Ruangan "
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 133,
      "height": 193
     }
    ]
   },
   "pitch": -0.97,
   "yaw": -43.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6121B8FB_72B8_3D27_41D7_53D3783562D2",
 "maps": [
  {
   "hfov": 22.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0_HS_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 23
     }
    ]
   },
   "pitch": -0.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6809A933_72D8_FF3A_41BE_5A83D775831C, this.camera_7EE372C1_733A_3DD0_41CD_238B5C216C48); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.8,
   "pitch": -12.89,
   "yaw": -7.71,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418F1C77_7258_D53E_41D6_8EEB403D7B99",
   "distance": 100
  }
 ],
 "id": "overlay_54BECA2E_725B_DD2F_4189_C2EC74C6FA42",
 "maps": [
  {
   "hfov": 11.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -12.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270, this.camera_7EF3F2B6_733A_3DB0_41D6_ACE272E399DF); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "toolTip": "Jalan"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.61,
   "pitch": -25.33,
   "yaw": 169.32,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418FCC78_7258_D532_41D1_BCBC8C1F2CE7",
   "distance": 100
  }
 ],
 "id": "overlay_5703EE1A_7258_54F7_41D0_597D8269933B",
 "maps": [
  {
   "hfov": 14.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2, this.camera_7E8462AC_733A_3C50_41CC_69CD0F12D5DA); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.14,
   "pitch": -13.32,
   "yaw": -173.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418FAC78_7258_D532_41D3_CBF4271C2106",
   "distance": 100
  }
 ],
 "id": "overlay_545719A1_7258_5FD5_41CE_E66DC8C81318",
 "maps": [
  {
   "hfov": 8.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 3.89,
   "pitch": -3.18,
   "yaw": -24.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_418E2C78_7258_D532_41D7_63DE3CEE306E",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_543B3AAE_7258_7D2F_41D1_4A234221022B",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 3.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 364,
      "height": 394
     }
    ]
   },
   "pitch": -2.78,
   "yaw": -22.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5BCD4EBF_7268_752D_41C6_E3FBEAE16BEC",
 "data": {
  "label": "   Ruang\u000dKelas VII C"
 },
 "maps": [
  {
   "hfov": 24.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_4_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -2.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "items": [
  {
   "hfov": 24.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 364,
      "height": 394
     }
    ]
   },
   "pitch": -8.31,
   "yaw": -170.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_5FD59107_726B_ECDD_41DA_9320BDA56C5E",
 "data": {
  "label": "   Ruang\u000dKelas VII B"
 },
 "maps": [
  {
   "hfov": 24.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_5_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -8.31
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "children": [
  "this.IconButton_4320582A_73D8_5CD1_41C4_C58D8ED3564C",
  "this.IconButton_4320482A_73D8_5CD1_41BC_6C6262F9A4C1",
  "this.IconButton_4320B82A_73D8_5CD1_41A8_55230370EBBD"
 ],
 "id": "Container_4320682A_73D8_5CD1_4192_7B6A69F0682D",
 "width": 40,
 "scrollBarColor": "#000000",
 "layout": "vertical",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "minHeight": 20,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "middle",
 "height": "100%",
 "gap": 4,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "Container31988"
 },
 "overflow": "hidden",
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 512,
 "maxWidth": 512,
 "id": "IconButton_5CE5EA26_73D9_FCD1_41D1_11CB8D890FD4",
 "width": 44.2,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5CE5EA26_73D9_FCD1_41D1_11CB8D890FD4.png",
 "minWidth": 1,
 "mode": "push",
 "height": 98.6,
 "click": "this.setComponentVisibility(this.Container_43A3A827_73E8_3CDF_41D8_4E60233B1985, true, 0, null, null, false)",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "data": {
  "name": "IconButton101658"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_43A35827_73E8_3CDF_41DA_CD1F4742061C",
 "left": "15%",
 "shadowHorizontalLength": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_43A36827_73E8_3CDF_41CB_2936BD233EF6",
  "this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadow": true,
 "class": "Container",
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_419E9C65_7258_D552_41CB_A57BDC68CE3B",
 "levels": [
  {
   "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_419D0C66_7258_D55E_41C7_49527E3AAD67",
 "levels": [
  {
   "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_419DFC66_7258_D55E_41D8_0C6802395B30",
 "levels": [
  {
   "url": "media/panorama_781EBE24_726B_D53E_41CD_486B415D5768_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A3BA568_72D8_772C_41AF_D0AC4648A170",
 "levels": [
  {
   "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A3BF568_72D8_772C_41D1_D400E0A2C720",
 "levels": [
  {
   "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A3B3568_72D8_772C_41D3_47A3B519EA37",
 "levels": [
  {
   "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A38A568_72D8_772C_41D5_C9D6C3A1727B",
 "levels": [
  {
   "url": "media/panorama_798B03E7_7268_5339_41C1_E7AB4CD22E72_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68198662_72E8_555B_41B5_FCA5F870C551",
 "levels": [
  {
   "url": "media/panorama_781C22C5_7268_2D79_41B5_391056519E75_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68187664_72E8_555F_41D7_13815714DB2A",
 "levels": [
  {
   "url": "media/panorama_781E9C36_7268_351B_41CE_40CAF2E9901A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6A04A566_72D8_7724_41DC_0CCC51A7CC19",
 "levels": [
  {
   "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6A04F566_72D8_7724_41C5_D238DA41EE8E",
 "levels": [
  {
   "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A046567_72D8_7724_41B8_A9ED77CCC43F",
 "levels": [
  {
   "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A059567_72D8_7724_4175_0D04F0397059",
 "levels": [
  {
   "url": "media/panorama_78C3144E_7268_550A_41DA_88FCB640ACA1_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418A2C74_7258_D532_41B0_535CC1EB3C5E",
 "levels": [
  {
   "url": "media/panorama_781CC099_726B_ED16_41D0_A0AE1CF178E2_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_5CB57F1E_7258_D4EE_41BC_679838DE0388",
 "levels": [
  {
   "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_5CB52F1E_7258_D4EE_41C3_614AF84B7AAA",
 "levels": [
  {
   "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_5CB5DF1F_7258_D4EE_41D5_0887E352DCA9",
 "levels": [
  {
   "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_5CB27F1F_7258_D4EE_41B1_80BD93CE56D2",
 "levels": [
  {
   "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_5CB21F1F_7258_D4EE_41D7_2BE80B35C4E0",
 "levels": [
  {
   "url": "media/panorama_78FCF0BD_7268_6D0F_41D4_808CD675C050_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418B8C74_7258_D532_41CA_C23CD828E9D7",
 "levels": [
  {
   "url": "media/panorama_781FD794_726B_D31E_41C3_3008E7B033BE_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6284C6CC_7259_F57E_419D_EFF162E93E98",
 "levels": [
  {
   "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6284A6CC_7259_F57E_41CB_44B98E5ECDC7",
 "levels": [
  {
   "url": "media/panorama_78C26D3F_7268_770B_41AF_AEFEFE79CB5A_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_4196AC6C_7258_D552_41A3_BE55EF3CAAD5",
 "levels": [
  {
   "url": "media/panorama_79F7A1BE_7268_2F0F_419E_6C16C6D0BADE_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_42ED95AF_73E8_372F_41C6_3568DD390A2D",
 "levels": [
  {
   "url": "media/panorama_45CC8A14_73A8_5CF1_419A_87346ACBD93E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6285D6CD_7259_F57E_41DB_82EC611CF31B",
 "levels": [
  {
   "url": "media/panorama_792B78BE_7268_7D0D_41D8_93CDC70F638C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418C0C7F_7258_D52E_41D3_F44134DE46EE",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_418CEC7F_7258_D52E_41D5_61A91D55D927",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_41835C80_7258_D5D2_41DC_7B2E09F13A5F",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_4183CC81_7258_D5D2_41D6_30C4FC10CEC4",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_4183AC81_7258_D5D2_41CE_AA2CF15E9D33",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41822C81_7258_D5D2_41DC_2099DD4A335A",
 "levels": [
  {
   "url": "media/panorama_6E8949BB_72D8_DF29_41DC_10AB7C3A1B3B_1_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7DD390B9_733A_3DB1_41B2_773E905F47AA",
 "levels": [
  {
   "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7DD210BA_733A_3DB3_41D9_498F6296F5EA",
 "levels": [
  {
   "url": "media/panorama_781D44BD_7268_350E_41DB_85E3AB667C2D_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 1350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6816E660_72E8_5558_41DB_A479A7D4D2A5",
 "levels": [
  {
   "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68163662_72E8_555B_41DA_A7991A6E8FF9",
 "levels": [
  {
   "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68160662_72E8_555B_41A8_2069951F6388",
 "levels": [
  {
   "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68166662_72E8_555B_41DC_62C936E1A508",
 "levels": [
  {
   "url": "media/panorama_7812F1C7_7268_6F79_41C1_0DC9440655E6_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_418AAC75_7258_D532_41D3_B9337582DE03",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_41890C75_7258_D532_41CD_E8D476123978",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_4189DC75_7258_D532_41D8_AEB2237A08A5",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_4189BC75_7258_D532_41C8_D767C6D9700F",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41886C75_7258_D532_41C3_9765822B2149",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41895C76_7258_D53E_41D8_8913C18F1B55",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41896C76_7258_D53E_41DA_20617A8547FD",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41885C76_7258_D53E_41C3_C1F8F5C5A1A1",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41888C77_7258_D53E_41A6_FF28A9FE377F",
 "levels": [
  {
   "url": "media/panorama_6EA48A8A_72D8_DDEB_41D1_8024462A0270_1_HS_14_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_4195DC72_7258_D536_41D0_EB8A98B59165",
 "levels": [
  {
   "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41958C72_7258_D536_41DA_B53217A6018C",
 "levels": [
  {
   "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_41940C73_7258_D536_41B1_694C4B1EB927",
 "levels": [
  {
   "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41948C73_7258_D536_41C0_30494D231B14",
 "levels": [
  {
   "url": "media/panorama_7E6C31EE_7268_2F0E_41B5_F02D34CA9928_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_4197FC6B_7258_D556_41BB_2C448AE2E9C6",
 "levels": [
  {
   "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_41967C6B_7258_D556_41BD_5581C0ABD8C9",
 "levels": [
  {
   "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41962C6C_7258_D552_41B1_05647320B59A",
 "levels": [
  {
   "url": "media/panorama_781AB5B0_7268_3716_41DB_9BF0A06737D2_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_7DD2B0BA_733A_3DB3_41D8_2DBD6512E9BB",
 "levels": [
  {
   "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 1350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_4193DC67_7258_D55E_41C0_4E5A8378601B",
 "levels": [
  {
   "url": "media/panorama_795DF314_7268_F31C_41D4_D9D752C9EDD8_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_628B96CB_7259_F57A_41C5_93BC80CDA12A",
 "levels": [
  {
   "url": "media/panorama_79E735F8_7268_7715_41D2_9BC7AFD5EF82_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418B0C73_7258_D536_41D5_F5252CDA0597",
 "levels": [
  {
   "url": "media/panorama_78120F49_7268_5309_41DC_17785FB64710_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418EAC79_7258_D532_41C8_94BB330C272D",
 "levels": [
  {
   "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418D3C79_7258_D532_41CE_F0E98557D11A",
 "levels": [
  {
   "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_418DBC7F_7258_D52E_41C3_4C2780B088D8",
 "levels": [
  {
   "url": "media/panorama_6809A933_72D8_FF3A_41BE_5A83D775831C_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6A05D567_72D8_7724_41C3_BDD455D940E8",
 "levels": [
  {
   "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6A057567_72D8_7724_41AA_44C055B921DF",
 "levels": [
  {
   "url": "media/panorama_781D3B70_7268_3317_416E_630C2D28B648_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6819C662_72E8_555B_41B9_183FE2BF7EC6",
 "levels": [
  {
   "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_68192663_72E8_5559_41D3_17849201B90F",
 "levels": [
  {
   "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_68190663_72E8_5559_41C8_1092A4EE8C3D",
 "levels": [
  {
   "url": "media/panorama_79D78B56_7268_531C_41CA_1056EBBD7213_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41817C82_7258_D5D6_41DC_12D02107B15B",
 "levels": [
  {
   "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_4181DC82_7258_D5D6_41B3_8B19F720FA86",
 "levels": [
  {
   "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_41804C83_7258_D5D6_41C5_D5359E21D430",
 "levels": [
  {
   "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_41802C83_7258_D5D6_41DA_0D818FC0C36E",
 "levels": [
  {
   "url": "media/panorama_6872426C_72D8_2D2E_41D0_0B6A1BD161C3_1_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_5CB36F1F_7258_D4EE_41B9_CAB6AA2C61D9",
 "levels": [
  {
   "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_628566CE_7259_F57A_41D7_CB9857CD9E53",
 "levels": [
  {
   "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_6A076566_72D8_7724_41D3_292A8B774C6F",
 "levels": [
  {
   "url": "media/panorama_78C2C9C3_7268_7F7B_41CF_5BB67D0FEF8C_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6A3A3567_72D8_7724_41B5_0C419D07693C",
 "levels": [
  {
   "url": "media/panorama_79485657_7268_351B_41D9_530D1F1D69C9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_418F1C77_7258_D53E_41D6_8EEB403D7B99",
 "levels": [
  {
   "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_418FCC78_7258_D532_41D1_BCBC8C1F2CE7",
 "levels": [
  {
   "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418FAC78_7258_D532_41D3_CBF4271C2106",
 "levels": [
  {
   "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_418E2C78_7258_D532_41D7_63DE3CEE306E",
 "levels": [
  {
   "url": "media/panorama_68092232_72D8_ED3A_41D0_DAD640C08FA2_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_43A36827_73E8_3CDF_41CB_2936BD233EF6",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_43A37827_73E8_3CDF_41D1_5B078CFBA98C",
  "this.IconButton_43A38827_73E8_3CDF_419F_55B3859410E9"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": 140,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "class": "Container",
 "data": {
  "name": "header"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "horizontalAlign": "center",
 "width": "100%",
 "paddingLeft": 70,
 "itemThumbnailOpacity": 1,
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "itemLabelFontFamily": "Montserrat",
 "minWidth": 1,
 "itemBorderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "itemOpacity": 1,
 "selectedItemLabelFontColor": "#04A3E1",
 "height": "100%",
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0.05,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "class": "ThumbnailGrid",
 "itemPaddingTop": 3,
 "itemThumbnailBorderRadius": 0,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "shadow": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "borderSize": 0,
 "paddingRight": 70,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_43A39827_73E8_3CDF_41CD_EDCBD213CD31_playlist",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_43A37827_73E8_3CDF_41D1_5B078CFBA98C",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 80,
 "minHeight": 100,
 "top": "0%",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText54192"
 },
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.33vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.43vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_43A38827_73E8_3CDF_419F_55B3859410E9",
 "right": 20,
 "iconURL": "skin/IconButton_43A38827_73E8_3CDF_419F_55B3859410E9.jpg",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "minHeight": 50,
 "top": 20,
 "width": "100%",
 "verticalAlign": "top",
 "pressedRollOverIconURL": "skin/IconButton_43A38827_73E8_3CDF_419F_55B3859410E9_pressed_rollover.jpg",
 "minWidth": 50,
 "mode": "push",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_43A3A827_73E8_3CDF_41D8_4E60233B1985, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_43A38827_73E8_3CDF_419F_55B3859410E9_rollover.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_43A38827_73E8_3CDF_419F_55B3859410E9_pressed.jpg",
 "class": "IconButton",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
