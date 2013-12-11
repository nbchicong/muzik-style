/**
 * Created by nbchicong@gmail.com<Purple Sky>
 *         on 09/12/2013.
 */
$(function(){
  PlayerUI.player = function(config){
    var _cog = config || {};
    PlayerUI.apply(this, _cog);
    this.id = this.id || 'mstyle-player';
    this.list = this.list || 'playplist';
    this.srcPlayer = this.srcPlayer || 'mstyle-source-player';
    this.wrapper = this.wrapper || 'wrap-content';
    this.$player = $getId(this.id);
    this.$wrap = $getId(this.wrapper);
    this.$list = $getId(this.list);
    this.$srcPlayer = $getId(this.srcPlayer);
    this.$ctrl = {
      play: $getId('player-ctrl-play'),
      pause: $getId('player-ctrl-pause'),
      stop: $getId('player-ctrl-stop'),
      volMin: $getId('player-ctrl-min-vol'),
      volMax: $getId('player-ctrl-max-vol'),
      prev: $getId('player-ctrl-previous'),
      next: $getId('player-ctrl-next')
    };
    var player = this;
    var cssSelector = {
      videoPlay: ".jp-video-play",
      play: '#player-ctrl-play',
      pause: '#player-ctrl-pause',
      stop: '#player-ctrl-stop',
      seekBar: '#player-play-bar',
      playBar: '#player-progress-bar',
      mute: ".jp-mute",
      unmute: ".jp-unmute",
      volumeBar: '#player-vol-bar',
      volumeBarValue: '#player-vol-bar-value',
      volumeMax: '#player-ctrl-max-vol',
      playbackRateBar: ".jp-playback-rate-bar",
      playbackRateBarValue: ".jp-playback-rate-bar-value",
      currentTime: '#player-play-time',
      duration: '#player-total-time',
      fullScreen: ".jp-full-screen",
      restoreScreen: ".jp-restore-screen",
      repeat: ".jp-repeat",
      repeatOff: ".jp-repeat-off",
      gui: ".jp-gui",
      noSolution: ".jp-no-solution"
    };
    var numSong = player.$list.children().length;
    var playSong = function(i){
      var $song = player.$list.find('li').eq(i);
      var src = $song.find('audio').attr('src');
      player.$list.find('.current-song').removeClass('current-song');
      $song.find('a').addClass('current-song');
      player._ready(src);
    };
    var nextSong = function(){
      var $currentSong = player.$list.find('.current-song');
      var curIdx = $currentSong.parent().index();
      var songIdx = (curIdx<numSong-1)?(curIdx+1):0;
      playSong(songIdx);
    };
    var prevSong = function(){
      var $currentSong = player.$list.find('.current-song');
      var curIdx = $currentSong.parent().index();
      var songIdx = (curIdx-1>=0)?(curIdx-1):(numSong-1);
      playSong(songIdx);
    };
    var clickSong = function(){
      var i = $(this).parent().index();
      playSong(i+1);
      return false;
    };
    var removeSong = function(){
      var $this = $(this);
      var current = $this.parent().find('.current-song').length;
      $this.parent().remove();
      if(numSong>0 && current){
        nextSong();
      }else if(numSong==0){
        player._clearPlayer();
      }
      return false;
    };
    var addOne = function(songId, name, source){
      player.$list.empty();
      var html = '<a href="javascript:;" class="current-song" tabindex="1">'+name+'</a>';
      html += '<span class="remove-song"></span>';
      html += '<audio src="'+source+'"></audio>';
      var $item = $('<li id="'+songId+'" class="current-song">'+html+'</li>');
      player.$list.append($item);
      $item.find('a').bind('click', clickSong);
      $item.find('.remove-song').bind('click', removeSong);
      player._ready(source);
    };
    var addToPlaylist = function(songId, name, source){
      if(player.$list.find('#'+songId).length){
        return;
      }
      var cls = (numSong==0)?'current-song':'';
      var html = '<a href="javascript:;" class="'+cls+'" tabindex="1">'+name+'</a>';
      html += '<span class="remove-song"></span>';
      html += '<audio src="'+source+'"></audio>';
      var $item = $('<li id="'+songId+'" class="current-song">'+html+'</li>');
      player.$list.append($item);
      if(numSong==0){
        player._ready(source);
      }
      $item.find('a').bind('click', clickSong);
      $item.find('.remove-song').bind('click', removeSong);
    };
    player._clearPlayer = function(){
      player.$srcPlayer.jPlayer('clearMedia');
    };
    player._ready = function(songSrc){
      player.$srcPlayer.jPlayer({
        ready: function(){
          $(this).jPlayer('setMedia', {
            mp3: songSrc
          });
        },
        swfPath: 'flash/src',
        supplied: 'mp3'
      });
    };
    player.$ctrl.next.bind('click', function(){
      nextSong();
      $(this).blur();
      return;
    });
    player.$ctrl.prev.bind('click', function(){
      prevSong();
      $(this).blur();
      return;
    });
    player.$wrap.find('.play-song').bind('click', function(){
      var $this = $(this);
      var $item = $this.parent().parent();
      var $info = $this.parent().sibling('.song-info');
      var songId = $item.prop('id');
      var name = $info.find('song-title').html();
      var source = $info.find('audio').prop('src');
      addOne(songId, name, source);
    });
    player.$wrap.find('.add-list-song').bind('click', function(){
      var $this = $(this);
      var $item = $this.parent().parent();
      var $info = $this.parent().sibling('.song-info');
      var songId = $item.prop('id');
      var name = $info.find('song-title').html();
      var source = $info.find('audio').prop('src');
      addToPlaylist(songId, name, source);
    });
    /**
     * Innitialize the Player
     * (see jPlayer documentation for other options)
     */
    player._init = function(){
      player.$srcPlayer.jPlayer({
        cssSelector: cssSelector,
        idPrefix: 'mz-player'
      });
      player.$srcPlayer.jPlayer('onSoundComplete', function(){
        nextSong();
      });
    };
    player._init();
  };
});