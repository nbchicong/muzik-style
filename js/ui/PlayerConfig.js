/**
 * Created by nbchicong@gmail.com<Purple Sky>
 *         on 09/12/2013.
 */
$(function(){
  PlayerUI.UIplayer = function(config){
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
    var pplayer = this;
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
    var numSong = pplayer.$list.children().length;
    var playSong = function(i){
      console.log('play song', i);
      var $song = pplayer.$list.find('li').eq(i);
      var src = $song.find('audio').attr('src');
      pplayer.$list.find('.current-song').removeClass('current-song');
      $song.find('a').addClass('current-song');
      pplayer._ready(src);
    };
    var nextSong = function(){
      log('next song');
      var $currentSong = pplayer.$list.find('.current-song');
      var curIdx = $currentSong.parent().index();
      log(numSong);
      log(curIdx);
      var songIdx = (curIdx<numSong-1)?(curIdx+1):0;
      playSong(songIdx);
    };
    var prevSong = function(){
      log('prev song');
      var $currentSong = pplayer.$list.find('.current-song');
      var curIdx = $currentSong.parent().index();
      var songIdx = (curIdx-1>=0)?(curIdx-1):(numSong-1);
      playSong(songIdx);
    };
    var clickSong = function(){
      log('remove song');
      var i = $(this).parent().index();
      playSong(i+1);
      return false;
    };
    var removeSong = function(){
      log('remove song');
      var $this = $(this);
      var current = $this.parent().find('.current-song').length;
      $this.parent().remove();
      if(numSong>0 && current){
        nextSong();
      }else if(numSong==0){
        pplayer._clearPlayer();
      }
      return false;
    };
    var addOne = function(songId, name, source){
      pplayer.$list.empty();
      var html = '<a href="javascript:;" class="current-song" tabindex="1">'+name+'</a>';
      html += '<span class="remove-song"></span>';
      html += '<audio src="'+source+'"></audio>';
      var $item = $('<li id="'+songId+'" class="current-song">'+html+'</li>');
      pplayer.$list.append($item);
      $item.find('a').bind('click', clickSong);
      $item.find('.remove-song').bind('click', removeSong);
      pplayer._ready(source);
    };
    var addToPlaylist = function(songId, name, source){
      if(pplayer.$list.find('#'+songId).length){
        return;
      }
      var cls = (numSong==0)?'current-song':'';
      var html = '<a href="javascript:;" class="'+cls+'" tabindex="1">'+name+'</a>';
      html += '<span class="remove-song"></span>';
      html += '<audio src="'+source+'"></audio>';
      var $item = $('<li id="'+songId+'" class="current-song">'+html+'</li>');
      pplayer.$list.append($item);
      if(numSong==0){
        pplayer._ready(source);
      }
      $item.find('a').bind('click', clickSong);
      $item.find('.remove-song').bind('click', removeSong);
    };
    var getSong = function(idx){
      var $song = null;
      if(!!idx){
        $song = pplayer.$list.find('li').eq(idx);
      }else{
        $song = pplayer.$list.find('li').eq(0);
      }
      var src = $song.find('audio').attr('src');
      return src;
    };
    pplayer._clearPlayer = function(){
      pplayer.$srcPlayer.jPlayer('clearMedia');
    };
    pplayer._ready = function(){
      var songSrc = getSong();
      log(songSrc);
      pplayer.$srcPlayer.jPlayer({
        ready: function(){
          log($(this));
          $(this).jPlayer('setMedia', {
            mp3: songSrc
          });
        },
        swfPath: 'js',
        supplied: 'mp3',
        wmode: "window",
        smoothPlayBar: true
      });
    };
    pplayer.$ctrl.next.bind('click', function(){
      nextSong();
      $(this).blur();
      return;
    });
    pplayer.$ctrl.prev.bind('click', function(){
      prevSong();
      $(this).blur();
      return;
    });
    pplayer.$wrap.find('.play-song').bind('click', function(){
      var $this = $(this);
      var $item = $this.parent().parent();
      var $info = $this.parent().sibling('.song-info');
      var songId = $item.prop('id');
      var name = $info.find('song-title').html();
      var source = $info.find('audio').prop('src');
      addOne(songId, name, source);
    });
    pplayer.$wrap.find('.add-list-song').bind('click', function(){
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
    pplayer._init = function(){
      log('init');
      pplayer.$srcPlayer.jPlayer({
        cssSelector: cssSelector,
        idPrefix: 'mz-player'
      });
      pplayer._ready();
      pplayer.$srcPlayer.jPlayer('onSoundComplete', function(){
        nextSong();
      });

    };
  };

  var Cplayer = new PlayerUI.UIplayer();
  Cplayer._init();
});