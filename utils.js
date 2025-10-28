export const formatAllData = (test) => {
    // no duplicates
    const wordsOfTracks = [];
    for (const track of test.tracks) {
        const words = track.split(" ");
        for (const word of words) {
            if (!wordsOfTracks.includes(word)) {
                wordsOfTracks.push(word);
            }
        }
    }
    
    const wordMap = new Map();
    
    for(const word of wordsOfTracks) {
        for(const track of test.tracks) {
            const wordsOfTracks = track.split(" ");
            if(wordsOfTracks.includes(word)) {
                if(wordMap.has(word)) {
                    wordMap.get(word).push(track);
                } else {
                    wordMap.set(word, [track]);
                }
            }
        }
    }
    
    const jsonOfWords = {};
    for (const [word, tracks] of wordMap.entries()) {
        if(tracks.length > 1) {

            jsonOfWords[word] = tracks.sort();
        }
    }
    return jsonOfWords;
}