import { data } from 'wp';

var dispatch = data.dispatch; // prettier-ignore

var YT_LONG_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:[^\s&?]*)*(?:&?v=([^&?\s]*))(?:&[^\s&?]*)*/;
var YT_SHORT_REGEX = /https?:\/\/youtu\.be\/([^\s&?]*)/; // prettier-ignore

var YT_EMBED_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/embed\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var VIMEO_REGEX = /https?:\/\/(?:www\.)?vimeo\.com\/(\d*)(?:(?:&|\?|\/)?.*)*/; // prettier-ignore

var VIMEO_EMBED_REGEX = /https?:\/\/(?:www\.)?player\.vimeo\.com\/video\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var IFRAME_REGEX = /<iframe.*src="([^"]*)".*><\/iframe>/;
var getYoutubeEmbedUrlFromVideoId = function getYoutubeEmbedUrlFromVideoId(videoId) {
  return "https://www.youtube.com/embed/".concat(videoId);
};
var getVimeoEmbedUrlFromVideoId = function getVimeoEmbedUrlFromVideoId(videoId) {
  return "https://player.vimeo.com/video/".concat(videoId);
};

var isLongYoutubeUrl = function isLongYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_LONG_REGEX);
};

var isShortYoutubeUrl = function isShortYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_SHORT_REGEX);
};

var isEmbedYoutubeUrl = function isEmbedYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_EMBED_REGEX);
};

var isDefaultVimeoUrl = function isDefaultVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_REGEX);
};

var isEmbedVimeoUrl = function isEmbedVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_EMBED_REGEX);
};

var isIframeString = function isIframeString(videoUrl) {
  return videoUrl.match(IFRAME_REGEX);
};
/*
 ******************************************************************************
 *   Test URLs                                                                *
 ******************************************************************************/


var isYoutubeUrl = function isYoutubeUrl(videoUrl) {
  return !!(isLongYoutubeUrl(videoUrl) || isShortYoutubeUrl(videoUrl) || isEmbedYoutubeUrl(videoUrl));
};
var isVimeoUrl = function isVimeoUrl(videoUrl) {
  return !!(isDefaultVimeoUrl(videoUrl) || isEmbedVimeoUrl(videoUrl));
};
/*
 ******************************************************************************
 *   IDs from URLs                                                            *
 ******************************************************************************/

var getYoutubeVideoIdFromUrl = function getYoutubeVideoIdFromUrl(videoUrl) {
  var isYT = isLongYoutubeUrl(videoUrl);
  var isShortYT = isShortYoutubeUrl(videoUrl);
  var isEmbedYT = isEmbedYoutubeUrl(videoUrl);

  if (isYT && isYT[1]) {
    return isYT[1];
  } else if (isShortYT && isShortYT[1]) {
    return isShortYT[1];
  } else if (isEmbedYT && isEmbedYT[1]) {
    return isEmbedYT[1];
  } else {
    return null;
  }
};
var getVimeoVideoIdFromUrl = function getVimeoVideoIdFromUrl(videoUrl) {
  var isVimeo = isDefaultVimeoUrl(videoUrl);
  var isEmbedVimeo = isEmbedVimeoUrl(videoUrl);

  if (isVimeo && isVimeo[1]) {
    return isVimeo[1];
  } else if (isEmbedVimeo && isEmbedVimeo[1]) {
    return isEmbedVimeo[1];
  } else {
    return null;
  }
};
/*
 ******************************************************************************
 *   Prêt-a-manger embed urls                                                 *
 ******************************************************************************/

var getYoutubeEmbedByUrl = function getYoutubeEmbedByUrl(videoUrl) {
  if (!isYoutubeUrl(videoUrl)) return null;else if (isEmbedYoutubeUrl(videoUrl)) return videoUrl;
  var videoId = getYoutubeVideoIdFromUrl(videoUrl);
  return getYoutubeEmbedUrlFromVideoId(videoId);
};
var getVimeoEmbedByUrl = function getVimeoEmbedByUrl(videoUrl) {
  if (!isVimeoUrl(videoUrl)) return null;else if (isEmbedVimeoUrl(videoUrl)) return videoUrl;
  var videoId = getVimeoVideoIdFromUrl(videoUrl);
  return getVimeoEmbedUrlFromVideoId(videoId);
};
/*
 ******************************************************************************
 *   Full service embed URL generator                                         *
 ******************************************************************************/

var getVideoEmbed = function getVideoEmbed(videoUrl) {
  var isIframe = isIframeString(videoUrl);

  if (isIframe && isIframe[1]) {
    return isIframe[1];
  }

  if (isYoutubeUrl(videoUrl)) return getYoutubeEmbedByUrl(videoUrl);
  if (isVimeoUrl(videoUrl)) return getVimeoEmbedByUrl(videoUrl);
  return videoUrl;
};
/*
 ******************************************************************************
 *   Bonus: Thumbnails                                                        *
 ******************************************************************************/

var getYoutubeThumbnailUrlByVideoId = function getYoutubeThumbnailUrlByVideoId(videoId) {
  dispatch('core/notices').createSuccessNotice('Found Youtube video thumbnail.', {
    id: 'videoThumbGetterSuccess',
    isDismissible: true
  });
  return "https://img.youtube.com/vi/".concat(videoId, "/hqdefault.jpg");
};
/**
 * @param {string} videoId
 * @return {Promise<any>}
 */

var getVimeoThumbnailUrlByVideoId = function getVimeoThumbnailUrlByVideoId(videoId) {
  return fetch("https://vimeo.com/api/v2/video/".concat(videoId, ".json")).then(function (response) {
    return response.json();
  }).then(function (result) {
    return result[0];
  }).then(function (result) {
    if (result && result['thumbnail_large']) {
      dispatch('core/notices').createSuccessNotice('Found Vimeo thumbnail.', {
        id: 'vimeoThumbGetterSuccess',
        isDismissible: true
      });
      return result['thumbnail_large'];
    } else {
      throw new Error('No matching thumbnail received');
    }
  })["catch"](function (err) {
    dispatch('core/notices').createWarningNotice('Fetching Vimeo thumbnail failed: ' + err, {
      id: 'vimeoThumbGetterFailed',
      isDismissible: true
    });
    return '';
  });
};

export { getVideoEmbed, getVimeoEmbedByUrl, getVimeoEmbedUrlFromVideoId, getVimeoThumbnailUrlByVideoId, getVimeoVideoIdFromUrl, getYoutubeEmbedByUrl, getYoutubeEmbedUrlFromVideoId, getYoutubeThumbnailUrlByVideoId, getYoutubeVideoIdFromUrl, isVimeoUrl, isYoutubeUrl };
//# sourceMappingURL=index.js.map
