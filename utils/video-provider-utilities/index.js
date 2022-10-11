import { data } from 'wp';

const { dispatch } = data;
// prettier-ignore
const YT_LONG_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:[^\s&?]*)*(?:&?v=([^&?\s]*))(?:&[^\s&?]*)*/;
const YT_SHORT_REGEX = /https?:\/\/youtu\.be\/([^\s&?]*)/;
// prettier-ignore
const YT_EMBED_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/embed\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
const YT_NOCOOKIE_REGEX =
    /https?:\/\/(?:www\.)?youtube-nocookie.com\/embed\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
const VIMEO_REGEX = /https?:\/\/(?:www\.)?vimeo\.com\/(\d*)(?:(?:&|\?|\/)?.*)*/;
// prettier-ignore
const VIMEO_EMBED_REGEX = /https?:\/\/(?:www\.)?player\.vimeo\.com\/video\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
const IFRAME_REGEX = /<iframe.*src="([^"]*)".*><\/iframe>/;

export const getYoutubeEmbedUrlFromVideoId = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
};

export const getVimeoEmbedUrlFromVideoId = (videoId) => {
    return `https://player.vimeo.com/video/${videoId}`;
};

const isLongYoutubeUrl = (videoUrl) => videoUrl.match(YT_LONG_REGEX);
const isShortYoutubeUrl = (videoUrl) => videoUrl.match(YT_SHORT_REGEX);
const isEmbedYoutubeUrl = (videoUrl) => videoUrl.match(YT_EMBED_REGEX);
const isDefaultVimeoUrl = (videoUrl) => videoUrl.match(VIMEO_REGEX);
const isEmbedVimeoUrl = (videoUrl) => videoUrl.match(VIMEO_EMBED_REGEX);
export const isNocookieYoutubeUrl = (videoUrl) =>
    videoUrl.match(YT_NOCOOKIE_REGEX);
export const isIframeString = (videoUrl) => videoUrl.match(IFRAME_REGEX);

/*
 ******************************************************************************
 *   Test URLs                                                                *
 ******************************************************************************/

export const isYoutubeUrl = (videoUrl) => {
    return !!(
        isLongYoutubeUrl(videoUrl) ||
        isShortYoutubeUrl(videoUrl) ||
        isEmbedYoutubeUrl(videoUrl) ||
        isNocookieYoutubeUrl(videoUrl)
    );
};

export const isVimeoUrl = (videoUrl) => {
    return !!(isDefaultVimeoUrl(videoUrl) || isEmbedVimeoUrl(videoUrl));
};

/*
 ******************************************************************************
 *   IDs from URLs                                                            *
 ******************************************************************************/

export const getYoutubeVideoIdFromUrl = (videoUrl) => {
    const isYT = isLongYoutubeUrl(videoUrl);
    const isShortYT = isShortYoutubeUrl(videoUrl);
    const isEmbedYT = isEmbedYoutubeUrl(videoUrl);
    const isNocookieYT = isNocookieYoutubeUrl(videoUrl);
    if (isYT && isYT[1]) {
        return isYT[1];
    } else if (isShortYT && isShortYT[1]) {
        return isShortYT[1];
    } else if (isEmbedYT && isEmbedYT[1]) {
        return isEmbedYT[1];
    } else if (isNocookieYT && isNocookieYT[1]) {
        return isNocookieYT[1];
    } else {
        return null;
    }
};

export const getVimeoVideoIdFromUrl = (videoUrl) => {
    const isVimeo = isDefaultVimeoUrl(videoUrl);
    const isEmbedVimeo = isEmbedVimeoUrl(videoUrl);
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

export const getYoutubeEmbedByUrl = (videoUrl) => {
    if (!isYoutubeUrl(videoUrl)) return null;
    else if (isEmbedYoutubeUrl(videoUrl)) return videoUrl;

    const videoId = getYoutubeVideoIdFromUrl(videoUrl);
    return getYoutubeEmbedUrlFromVideoId(videoId);
};

export const getVimeoEmbedByUrl = (videoUrl) => {
    if (!isVimeoUrl(videoUrl)) return null;
    else if (isEmbedVimeoUrl(videoUrl)) return videoUrl;

    const videoId = getVimeoVideoIdFromUrl(videoUrl);
    return getVimeoEmbedUrlFromVideoId(videoId);
};

/*
 ******************************************************************************
 *   Full service embed URL generator                                         *
 ******************************************************************************/

export const getVideoEmbed = (videoUrl) => {
    const isIframe = isIframeString(videoUrl);
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

export const getYoutubeThumbnailUrlByVideoId = (videoId) => {
    dispatch('core/notices').createSuccessNotice(
        'Found Youtube video thumbnail.',
        {
            id: 'videoThumbGetterSuccess',
            isDismissible: true,
        }
    );
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * @param {string} videoId
 * @return {Promise<any>}
 */
export const getVimeoThumbnailUrlByVideoId = (videoId) => {
    return fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
        .then((response) => response.json())
        .then((result) => result[0])
        .then((result) => {
            if (result && result['thumbnail_large']) {
                dispatch('core/notices').createSuccessNotice(
                    'Found Vimeo thumbnail.',
                    {
                        id: 'vimeoThumbGetterSuccess',
                        isDismissible: true,
                    }
                );
                return result['thumbnail_large'];
            } else {
                throw new Error('No matching thumbnail received');
            }
        })
        .catch((err) => {
            dispatch('core/notices').createWarningNotice(
                'Fetching Vimeo thumbnail failed: ' + err,
                {
                    id: 'vimeoThumbGetterFailed',
                    isDismissible: true,
                }
            );
            return '';
        });
};
