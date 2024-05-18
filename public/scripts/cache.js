importScripts("https://cdn.jsdelivr.net/npm/idb-keyval@latest/dist/umd.js");

const cacheNamePrefix = "ethang-sw-cache";
const cacheName = `${cacheNamePrefix}`;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);

main().catch(console.error);

async function main() {
  await sendMessage({ requestStatusUpdate: true });
}

async function onInstall() {
  self.skipWaiting();
}

/**
 * @param {{ requestStatusUpdate: boolean; }} message
 */
async function sendMessage(message) {
  const allClients = await clients.matchAll({ includeUncontrolled: true });

  /**
   * @param {{ postMessage: (arg0: { requestStatusUpdate: boolean; }, arg1: MessagePort[]) => any; }} client
   */
  function postMessage(client) {
    const channel = new MessageChannel();
    channel.port1.onmessage = onMessage;
    return client.postMessage(message, [channel.port2]);
  }

  return Promise.all(allClients.map(postMessage));
}

/**
 * @param {object} message
 * @param {object} message.data
 * @param {object} message.data.statusUpdate
 * @param {boolean} message.data.statusUpdate.isOnline
 * @param {string[]} message.data.urlsToCache
 * @return {void}
 */
function onMessage({ data }) {
  if (data.statusUpdate) {
    const { isOnline } = data.statusUpdate;
  }

  if (data.urlsToCache) {
    cacheFiles(data.urlsToCache).catch(console.error);
  }
}

/**
 * @param {{ respondWith: (arg0: Promise<Response>) => void; request: any; }} event
 */
function onFetch(event) {
  event.respondWith(router(event.request));
}

/**
 * @param {Request} request
 */
async function router(request) {
  const url = new URL(request.url);
  const requestUrl = url.pathname;
  const cache = await caches.open(cacheName);

  const cacheInterval = 1_000 * 60 * 60 * 4;
  const cacheTimestamp = await idbKeyval.get(requestUrl);
  const now = Date.now();

  if (url.origin === location.origin && request.method === "GET") {
    let response;

    try {
      response = await cache.match(requestUrl);

      if (response && cacheTimestamp && now - cacheTimestamp < cacheInterval) {
        return response;
      } else {
        await Promise.all([
          cache.delete(requestUrl),
          idbKeyval.del(requestUrl),
        ]);
      }
    } catch (error) {}

    response = await fetch(requestUrl, {
      ...request,
      credentials: "omit",
      cache: "no-store",
    });

    if (response && response.ok) {
      Promise.all([
        cache.put(requestUrl, response.clone()),
        idbKeyval.set(requestUrl, now),
      ]);

      return response;
    }
  }

  return fetch(request).catch(console.error);
}

/**
 * @param {{ waitUntil: (arg0: Promise<void>) => void; }} event
 */
async function onActivate(event) {
  event.waitUntil(handleActivation());
}

async function handleActivation() {
  await clearCaches();
  await clients.claim();
}

async function clearCaches() {
  const cacheNames = await caches.keys();
  const oldCacheNames = cacheNames.filter((cacheName) => {
    if (cacheName.startsWith(cacheNamePrefix)) {
      const [oldVersion] = cacheName.match(/\d/);
      const cacheVersion = isNaN(Number(oldVersion))
        ? version
        : Number(oldVersion);

      return cacheVersion > 0 && cacheVersion !== version;
    }
  });

  return Promise.all(
    oldCacheNames.map((oldCacheName) => {
      return caches.delete(oldCacheName);
    }),
  );
}

/**
 * @param {Array<string>} urlsToCache
 * @param {boolean} [forceReload=false]
 * @returns {Promise<Array<Response | undefined>>}
 */
async function cacheFiles(urlsToCache = [], forceReload = false) {
  const cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.map(async (url) => {
      try {
        let response;

        if (!forceReload) {
          response = await cache.match(url);
          if (response) {
            return response;
          }
        }

        response = await fetch(url, {
          method: "GET",
          cache: "no-cache",
          credentials: "omit",
        });

        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        //
      }
    }),
  );
}
