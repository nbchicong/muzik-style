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
    this.$player = $getId(this.id);
    this.$list = $getId(this.list);
    this.$srcPlayer = $getId(this.srcPlayer);
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
    /**
     * Innitialize the Player
     * (see jPlayer documentation for other options)
     */
    player._init = function(){
      player.$srcPlayer.jPlayer({
        cssSelector: cssSelector
      });
      player.$srcPlayer.jPlayer('onSoundComplete', function(){
        nextSong();
      });
    };
  };
});