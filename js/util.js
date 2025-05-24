// Function to extract YouTube video ID from a URL
export function getYoutubeIdFromUrl(url) {
    return url.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
    )?.[1] ?? '';
}

// Function to create an embed URL with optional start and end times
export function embed(video, start = 0, end = null) {
    const videoId = getYoutubeIdFromUrl(video);
    let embedUrl = `https://www.youtube.com/embed/${videoId}?start=${start}`;

    // If an end time is provided, append it to the URL
    if (end) {
        embedUrl += `&end=${end}`;
    }

    return embedUrl;
}

// Function to format numbers with localized thousand separators
export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 3 });
}

// Function to get thumbnail image URL from YouTube video ID
export function getThumbnailFromId(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`; // You can change this to 'hqdefault.jpg' or 'sddefault.jpg' for other quality options
}

// Function to shuffle an array randomly
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
