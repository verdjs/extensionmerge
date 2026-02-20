// ==================================================================================================
// COMBINED SERVICE WORKER
// YTM-Immersion + YouLy+ merged extension
// ==================================================================================================

// YouLy+ background: handles FETCH_LYRICS, RESET_CACHE, GET_CACHED_SIZE,
//   TRANSLATE_LYRICS, FETCH_SPONSOR_SEGMENTS, UPLOAD_LOCAL_LYRICS, etc.
import { MessageHandler } from './core/messageHandler.js';

// NNPG (YTM-Immersion) background: handles GET_LYRICS, TRANSLATE, DISCORD_PRESENCE_*,
//   GET_CLOUD_STATE, SYNC_HISTORY, GET_BATCH_TRANSLATIONS, REGISTER_TRANSLATION, etc.
import '../nnpg/background.js';

const pBrowser = typeof browser !== 'undefined'
  ? browser
  : (typeof chrome !== 'undefined' ? chrome : null);

// ==================================================================================================
// YouLy+ message listener (YouLy+-specific message types)
// ==================================================================================================

const YOULY_MESSAGE_TYPES = new Set([
  'FETCH_LYRICS',
  'RESET_CACHE',
  'GET_CACHED_SIZE',
  'TRANSLATE_LYRICS',
  'FETCH_SPONSOR_SEGMENTS',
  'UPLOAD_LOCAL_LYRICS',
  'GET_LOCAL_LYRICS_LIST',
  'DELETE_LOCAL_LYRICS',
  'FETCH_LOCAL_LYRICS',
]);

if (pBrowser?.runtime?.onMessage) {
  pBrowser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || !YOULY_MESSAGE_TYPES.has(message.type)) return false;
    return MessageHandler.handle(message, sender, sendResponse);
  });
}

console.log('YTM-Immersion + YouLy+ combined service worker initialized');
