// @NOTE:
// I'm not taking credit for this function, I lovingly ripped it off from
// https://stackoverflow.com/a/28120564
export const bytesToHumanReadableSize = function (size: number) {
    if (size === 0) {
        return '0 B'
    }
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}