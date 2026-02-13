📸 Webcam-to-ASCII

Turn your webcam feed into a live ASCII art display! Each frame from your camera is converted into a grid of ASCII characters, giving your video a retro, text-based aesthetic.

🔹 Features

Real-time webcam capture

Converts video frames to ASCII symbols dynamically

Adjustable symbol density or “cell size”

Works entirely in the browser — no server required

🔹 How It Works

Access your webcam using the WebRTC API (getUserMedia)

Draw each video frame onto a <canvas>

Sample pixel brightness/color and map it to ASCII characters

Render the ASCII art in a <canvas> or <pre> element

🔹 Usage

Clone the repo:

git clone https://github.com/Genesispro-maker/webcam-to-ASCII.git

Open index.html in a secure context (localhost or HTTPS)

Allow webcam access when prompted

Adjust the slider to change ASCII “resolution”

🔹 Tech Stack

Vanilla JavaScript (ES6)

HTML5 <canvas>

WebRTC (navigator.mediaDevices.getUserMedia)

🔹 Inspiration

ASCII art is a nostalgic way to represent images and video using text symbols. This project combines modern webcam streaming with classic ASCII aesthetics for a playful, interactive experience.