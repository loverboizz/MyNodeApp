# 🎵 Offline Spotify
Ứng dụng web nghe nhạc offline với giao diện giống Spotify.  
Người dùng có thể tải file nhạc (`.mp3`, `.wav`, ...) từ máy lên để nghe, không cần Internet.

---

## 🚀 Tính năng
- 📂 Upload nhiều file nhạc cùng lúc.
- 🎶 Hiển thị danh sách phát (playlist).
- ▶️ Play / ⏸ Pause / ⏮ Prev / ⏭ Next.
- 📊 Thanh tiến trình (seek bar) + thời gian hiện tại / tổng thời gian.
- 🖼️ Đọc metadata từ file nhạc bằng **jsmediatags**:
  - Tên bài hát (title).
  - Nghệ sĩ (artist).
  - Ảnh bìa (cover art) nếu có.
- 🎧 Auto next khi hết bài.

---

## 🛠️ Công nghệ sử dụng
- **HTML5 / CSS3 / JavaScript**
- **Audio API** của HTML5 để phát nhạc.
- **[jsmediatags](https://github.com/aadsm/jsmediatags)** để đọc metadata từ file nhạc.

## 📂 Cấu trúc dự án
offline-spotify-clone/
│── index.html # Giao diện chính
│── style.css # CSS giao diện
│── main.js # Logic xử lý
└── README.md # Tài liệu

