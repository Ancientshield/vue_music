export default {
  formatTime(time){
    // 由下可知，time 的單位是 seconds (秒)
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.round((time - minutes * 60) || 0);

    // seconds 小於10秒，顯示0，否則顯示 seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}