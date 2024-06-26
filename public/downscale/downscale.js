function createTiming(enabled, source, destWidth, destHeight) {
    return {
        mark(name) {},
        finish() {},
    };
}

function createCache() {
    const keys = [];
    const values = [];
    const subscribes = [];
    const PENDING = new Object();

    return {
        createSetter(key) {
            if (this.get(key)) {
                return;
            }
            const cacheInd = keys.push(key) - 1;
            values.push(PENDING);
            subscribes.push([]);

            return function (value) {
                values[cacheInd] = value;
                subscribes[cacheInd] = subscribes[cacheInd].reduce((r, resolve) => {
                    resolve(value);
                }, []);
            };
        },
        get(key, resolve) {
            const cacheInd = keys.indexOf(key);
            if (!~cacheInd) {
                return;
            }
            if (values[cacheInd] === PENDING) {
                subscribes[cacheInd].push(resolve);
                return;
            }
            resolve(values[cacheInd]);
        },
        has(key) {
            return !!~keys.indexOf(key);
        },
    };
}

function getImageData(canvas, img, sourceWidth, sourceHeight) {
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);

    return ctx.getImageData(0, 0, sourceWidth, sourceHeight);
}

function putImageData(canvas, imageData) {
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    return canvas;
}

function remapDimensions(
    destWidth,
    destHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
) {
    const origSourceWidth = sourceWidth;
    const origSourceHeight = sourceHeight;

    const sourceRatio = sourceWidth / sourceHeight;

    if (destWidth === 0) {
        destWidth = destHeight * sourceRatio >> 0;
    }

    if (destHeight === 0) {
        destHeight = destWidth / sourceRatio >> 0;
    }

    const destRatio = destWidth / destHeight;

    if (destRatio > sourceRatio) {
        sourceHeight = sourceWidth / destRatio >> 0;
    } else {
        sourceWidth = sourceHeight * destRatio >> 0;
    }

    var sourceX = sourceX || (origSourceWidth - sourceWidth) / 2 >> 0;
    var sourceY = sourceY || (origSourceHeight - sourceHeight) / 2 >> 0;

    return {
        destWidth,
        destHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
    };
}

function produceResult(canvas, options, callback) {
    if (options.returnCanvas) {
        callback(canvas);
        return;
    }

    if (options.returnBlob) {
        canvas.toBlob(
            callback,
            `image/${options.imageType || 'jpeg'}`,
            options.quality || 0.85,
        );
        return;
    }

    const dataURL = canvas.toDataURL(
        `image/${options.imageType || 'jpeg'}`,
        options.quality || 0.85,
    );

    callback(dataURL);
}

function loadArrayBuffer(source, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', source);
    xhr.responseType = 'arraybuffer';

    xhr.addEventListener('load', function () {
        callback(this.response);
    });

    xhr.send();
}

function loadImg(img, callback) {
    if (img.complete) {
        callback();
    } else {
        img.addEventListener('load', callback);
    }
}

function loadVideo(video, callback) {
    if (video.readyState > 1) {
        callback();
    } else {
        video.addEventListener('loadeddata', callback);
    }
}

function detectSourceType(source) {
    if (source instanceof File) {
        return 'File';
    }
    if (source instanceof HTMLImageElement) {
        return 'HTMLImageElement';
    }
    if (source instanceof HTMLVideoElement) {
        return 'HTMLVideoElement';
    }
    if (typeof source === 'string') {
        return 'URL';
    }
}

function validateArguments(args) {
    if (args.length < 3) {
        return new TypeError(`3 arguments required, but only ${args.length} present.`);
    }
    if (!detectSourceType(args[0])) {
        return new TypeError('First argument should be HTMLImageElement, HTMLVideoElement, File of String');
    }
    if (typeof args[1] !== 'number') {
        return new TypeError('Second argument should be a number');
    }
    if (typeof args[2] !== 'number') {
        return new TypeError('Third argument should be a number');
    }
}

function downscale(source, destWidth, destHeight, options) {
    source = source.toDataURL();
    const timing = createTiming(
        options && options.debug || false,
        source,
        destWidth,
        destHeight,
    );

    const err = validateArguments(arguments);
    if (err instanceof TypeError) {
        return Promise.reject(err);
    }

    options = options || {};

    let resolveResult; let
        rejectResult;
    const result = new Promise((resolve, reject) => {
        resolveResult = resolve;
        rejectResult = reject;
    });

    downscale.canvas = downscale.canvas || document.createElement('canvas');
    downscale.cache = downscale.cache || createCache();

    let { canvas } = downscale;
    const { cache } = downscale;

    if (cache.has(source)) {
        timing.mark();
        cache.get(
            source,
            (cacheData) => {
                timing.mark('PENDING CACHE');
                const img = cacheData[0];
                const imageData = cacheData[1];

                const dims = remapDimensions(
                    destWidth,
                    destHeight,
                    options.sourceX,
                    options.sourceY,
                    imageData.width,
                    imageData.height,
                );

                if (dims.sourceWidth / dims.destWidth >= 2
          && dims.sourceHeight / dims.destHeight >= 2) {
                    timing.mark();
                    const destImageData = downsample(
                        imageData,
                        dims.destWidth,
                        dims.destHeight,
                        dims.sourceX,
                        dims.sourceY,
                        dims.sourceWidth,
                        dims.sourceHeight,
                    );
                    timing.mark('DOWNSCALE');

                    canvas = putImageData(canvas, destImageData);
                } else {
                    canvas = resizeWithCanvas(
                        canvas,
                        img,
                        dims.destWidth,
                        dims.destHeight,
                        dims.sourceX,
                        dims.sourceY,
                        dims.sourceWidth,
                        dims.sourceHeight,
                    );
                    timing.mark('RESIZE WITH CANVAS');
                }

                produceResult(
                    canvas,
                    options,
                    (result) => {
                        timing.mark('PRODUCE RESULT');
                        resolveResult(result);
                        timing.finish();
                    },
                );
            },
        );

        return result;
    }

    const scaleSourceResolve = function (source, width, height) {
        const dims = remapDimensions(
            destWidth,
            destHeight,
            options.sourceX,
            options.sourceY,
            width,
            height,
        );

        if (dims.sourceWidth / dims.destWidth >= 2
        && dims.sourceHeight / dims.destHeight >= 2) {
            timing.mark();
            const imageData = getImageData(canvas, source, width, height);
            timing.mark('GET IMAGE DATA');

            const destImageData = downsample(
                imageData,
                dims.destWidth,
                dims.destHeight,
                dims.sourceX,
                dims.sourceY,
                dims.sourceWidth,
                dims.sourceHeight,
            );
            timing.mark('DOWNSCALE');

            canvas = putImageData(canvas, destImageData);

            if (detectSourceType(source) !== 'HTMLVideoElement') {
                cache.createSetter(source)([source, imageData]);
            }
        } else {
            canvas = resizeWithCanvas(
                canvas,
                source,
                dims.destWidth,
                dims.destHeight,
                dims.sourceX,
                dims.sourceY,
                dims.sourceWidth,
                dims.sourceHeight,
            );
            timing.mark('RESIZE WITH CANVAS');
        }

        produceResult(
            canvas,
            options,
            (result) => {
                timing.mark('PRODUCE RESULT');
                resolveResult(result);
                timing.finish();
            },
        );
    };

    const URL = window.URL || window.webkitURL;

    switch (detectSourceType(source)) {
    case 'File':
        var sourceImg = document.createElement('img');
        timing.mark();
        sourceImg.src = URL.createObjectURL(source);
        timing.mark('READ FILE');
        loadImg(
            sourceImg,
            () => {
                timing.mark('LOAD IMAGE');
                scaleSourceResolve(
                    sourceImg,
                    sourceImg.naturalWidth,
                    sourceImg.naturalHeight,
                );
            },
        );
        break;

    case 'HTMLImageElement':
        timing.mark();
        loadImg(
            source,
            () => {
                timing.mark('LOAD IMAGE');
                scaleSourceResolve(source, source.naturalWidth, source.naturalHeight);
            },
        );
        break;

    case 'HTMLVideoElement':
        loadVideo(
            source,
            () => {
                scaleSourceResolve(source, source.videoWidth, source.videoHeight);
            },
        );
        break;

    case 'URL':
        timing.mark();
        setTimeout(() => {
            loadArrayBuffer(
                source,
                (arrayBuffer) => {
                    timing.mark('LOAD ARRAY BUFFER');
                    const arrayBufferView = new Uint8Array(arrayBuffer);
                    const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
                    const sourceImg = document.createElement('img');
                    sourceImg.src = URL.createObjectURL(blob);
                    timing.mark();
                    loadImg(
                        sourceImg,
                        () => {
                            timing.mark('LOAD IMAGE');
                            scaleSourceResolve(
                                sourceImg,
                                sourceImg.naturalWidth,
                                sourceImg.naturalHeight,
                            );
                        },
                    );
                },
            );
        });
        break;
    }

    return result;
}

function downgrade(source, destWidth, destHeight, options) {
    let resolveResult; let
        rejectResult;
    const result = new Promise((resolve, reject) => {
        resolveResult = resolve;
        rejectResult = reject;
    });

    const can = document.createElement('canvas');
    can.width = destWidth;
    can.height = destHeight;
    const ctx = can.getContext('2d');

    ctx.drawImage(source, 0, 0, can.width, can.height);

    resolveResult(can);

    return result;
}
