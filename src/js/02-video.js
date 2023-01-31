import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const paused = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(paused, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem(paused);
if(savedTime){
  player.setCurrentTime(savedTime);
}