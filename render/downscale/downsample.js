function round(val) {
    return (val + 0.49) << 0;
}

function downsample(
    sourceImageData,
    destWidth,
    destHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
) {
    const dest = new ImageData(destWidth, destHeight);

    const SOURCE_DATA = new Int32Array(sourceImageData.data.buffer);
    const SOURCE_WIDTH = sourceImageData.width;

    const DEST_DATA = new Int32Array(dest.data.buffer);
    const DEST_WIDTH = dest.width;

    const SCALE_FACTOR_X = destWidth / sourceWidth;
    const SCALE_FACTOR_Y = destHeight / sourceHeight;
    const SCALE_RANGE_X = round(1 / SCALE_FACTOR_X);
    const SCALE_RANGE_Y = round(1 / SCALE_FACTOR_Y);
    const SCALE_RANGE_SQR = SCALE_RANGE_X * SCALE_RANGE_Y;

    for (let destRow = 0; destRow < dest.height; destRow++) {
        for (let destCol = 0; destCol < DEST_WIDTH; destCol++) {
            const sourceInd = sourceX + round(destCol / SCALE_FACTOR_X)
        + (sourceY + round(destRow / SCALE_FACTOR_Y)) * SOURCE_WIDTH;

            let destRed = 0;
            let destGreen = 0;
            let destBlue = 0;
            let destAlpha = 0;

            for (let sourceRow = 0; sourceRow < SCALE_RANGE_Y; sourceRow++) {
                for (let sourceCol = 0; sourceCol < SCALE_RANGE_X; sourceCol++) {
                    const sourcePx = SOURCE_DATA[sourceInd + sourceCol + sourceRow * SOURCE_WIDTH];
                    destRed += sourcePx << 24 >>> 24;
                    destGreen += sourcePx << 16 >>> 24;
                    destBlue += sourcePx << 8 >>> 24;
                    destAlpha += sourcePx >>> 24;
                }
            }

            destRed = round(destRed / SCALE_RANGE_SQR);
            destGreen = round(destGreen / SCALE_RANGE_SQR);
            destBlue = round(destBlue / SCALE_RANGE_SQR);
            destAlpha = round(destAlpha / SCALE_RANGE_SQR);

            DEST_DATA[destCol + destRow * DEST_WIDTH] = (destAlpha << 24)
        | (destBlue << 16)
        | (destGreen << 8)
        | (destRed);
        }
    }

    return dest;
}
