/*
  YOUTUBE GAMEPLAY TOGGLE
  =========================
  On a project page, find the line:
    <div class="case-banner" data-youtube="">
  Paste a YouTube link between the quotes (or just the video ID), e.g:
    data-youtube="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  or simply:
    data-youtube="dQw4w9WgXcQ"

  If data-youtube is left blank, no "Watch gameplay" button appears and
  the banner just shows the image, same as before.

  The video only loads once someone clicks "Watch gameplay", so it
  doesn't slow down the page on first load, and it's pulled back out
  when they switch back to the screenshot so it stops playing.
*/
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.case-banner').forEach(function (banner) {
    var raw = banner.getAttribute('data-youtube');
    var frame = banner.querySelector('.banner-video');
    var toggle = banner.querySelector('.media-toggle');
    if (!raw || !frame || !toggle) return;

    var videoId = getYouTubeId(raw);
    if (!videoId) return;

    toggle.hidden = false;

    toggle.addEventListener('click', function () {
      var showingVideo = banner.classList.toggle('show-video');
      toggle.textContent = showingVideo ? 'Show screenshot' : 'Watch gameplay';

      if (showingVideo) {
        frame.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0&autoplay=1';
      } else {
        frame.src = '';
      }
    });
  });

  function getYouTubeId(url) {
    url = url.trim();
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (match) return match[1];
    if (/^[\w-]{11}$/.test(url)) return url;
    return null;
  }
});
