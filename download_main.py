import os
from concurrent.futures import ThreadPoolExecutor, as_completed
import yt_dlp

# List of YouTube links
video_links = [
   "https://youtu.be/naQzmL_vggU?si=5WqzpI-ZcT7C6VAs"
]

# Directory to save videos
download_dir = "mobile_videos"
os.makedirs(download_dir, exist_ok=True)

def clean_youtube_url(url):
    """Remove query parameters from YouTube URL."""
    from urllib.parse import urlparse, urlunparse
    parsed = urlparse(url)
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', '', ''))

def download_video(url, path):
    try:
        clean_url = clean_youtube_url(url)
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'outtmpl': os.path.join(path, '%(title)s.%(ext)s'),
            'noplaylist': True,
            'merge_output_format': 'mp4',
            # Use stream copy instead of re-encoding
            'postprocessor_args': [
                '-c', 'copy',  # Copy streams without re-encoding
                '-movflags', '+faststart',  # Optimize for streaming/mobile
            ],
            'prefer_ffmpeg': True,
            'keepvideo': False,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"Downloading: {clean_url}")
            ydl.download([clean_url])
            print(f"✓ Successfully downloaded: {clean_url}\n")
    except Exception as e:
        print(f"✗ Error downloading {url}: {e}\n")

# Number of concurrent downloads
max_workers = 4

print(f"Starting download of {len(video_links)} video(s)...\n")

with ThreadPoolExecutor(max_workers=max_workers) as executor:
    futures = [executor.submit(download_video, link, download_dir) for link in video_links]
    for future in as_completed(futures):
        future.result()

print("All downloads completed!")