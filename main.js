const fileInput = document.getElementById("fileInput");
const trackList = document.getElementById("trackList");
const player = document.getElementById("player");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const footerCoverArt = document.getElementById("footerCoverArt");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

let tracks = [];
let currentIndex = 0;
let isPlaying = false;

// Load files
fileInput.addEventListener("change", () => {
    [...fileInput.files].forEach(file => {
        const url = URL.createObjectURL(file);
        tracks.push({ name: file.name, url, file });
    });
    renderTracks();
});

// Render playlist
function renderTracks() {
    trackList.innerHTML = "";
    tracks.forEach((track, index) => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `
          <span>${track.name}</span>
          <button>▶️</button>
        `;
        div.querySelector("button").onclick = () => playTrack(index);
        trackList.appendChild(div);
    });
}

// Play a track
function playTrack(index) {
    currentIndex = index;
    const track = tracks[index];
    player.src = track.url;

    // Reset UI
    footerCoverArt.src = "https://via.placeholder.com/60";
    songTitle.textContent = track.name;
    songArtist.textContent = "Không rõ";

    // Đọc ID3 tags
    jsmediatags.read(track.file, {
        onSuccess: (tag) => {
            if (tag.tags.title) songTitle.textContent = tag.tags.title;
            if (tag.tags.artist) songArtist.textContent = tag.tags.artist;

            if (tag.tags.picture) {
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String = "";
                for (let i = 0; i < data.length; i++) {
                    base64String += String.fromCharCode(data[i]);
                }
                footerCoverArt.src = `data:${format};base64,${btoa(base64String)}`;
            }
        },
        onError: (error) => {
            console.log("Error reading tags:", error);
        },
    });

    player.play();
    isPlaying = true;
    playBtn.textContent = "⏸️";
}

// Play/Pause
playBtn.addEventListener("click", () => {
    if (!tracks.length) return;
    if (!isPlaying) {
        player.play();
        isPlaying = true;
        playBtn.textContent = "⏸️";
    } else {
        player.pause();
        isPlaying = false;
        playBtn.textContent = "▶️";
    }
});

// Next/Prev
nextBtn.addEventListener("click", () => {
    if (tracks.length) {
        currentIndex = (currentIndex + 1) % tracks.length;
        playTrack(currentIndex);
    }
});
prevBtn.addEventListener("click", () => {
    if (tracks.length) {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        playTrack(currentIndex);
    }
});

// Update progress
player.addEventListener("timeupdate", () => {
    seekBar.max = Math.floor(player.duration) || 0;
    seekBar.value = Math.floor(player.currentTime);
    currentTimeEl.textContent = formatTime(player.currentTime);
    durationEl.textContent = formatTime(player.duration);
});

// Seek
seekBar.addEventListener("input", () => {
    player.currentTime = seekBar.value;
});

// Auto next
player.addEventListener("ended", () => {
    nextBtn.click();
});

// Format time
function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
