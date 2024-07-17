# Discord Music Bot

This repository contains the code for a Discord music bot designed to provide users with a seamless and interactive music playback experience within their servers. 

## Features

- **Music Playback:** Play, pause, resume, skip, stop, adjust volume.
- **Playlist Management:** Create, add songs, remove songs, shuffle, play playlists.
- **Queue System:** Display queue, add to queue, remove from queue, clear queue.
- **Search Functionality:** Search for songs and artists using YouTube, SoundCloud, and Spotify APIs.
- **Loop and Repeat:** Loop songs or playlists, repeat the entire queue.
- **User Permissions:** Role-based permissions to manage music playback.
- **Customizable Bot Prefix:** Set a unique prefix for bot commands.
- **Lyrics Display:** Real-time lyrics display using Genius API.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/discord-bot-project.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd discord-bot-project
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file and set the following environment variables:**
   - `TOKEN=your_discord_bot_token`
   - `PREFIX=!` (or any other preferred prefix)
   - `DATABASE_URL=postgres://your_db_user:your_db_password@your_db_host:your_db_port/your_db_name`
   - `YOUTUBE_API_KEY=your_youtube_api_key`
   - `SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id`
   - `SPOTIFY_CLIENT_ID=your_spotify_client_id`
   - `SPOTIFY_CLIENT_SECRET=your_spotify_client_secret`
   - `GENIUS_API_KEY=your_genius_api_key`

## Running the Bot

1. **Start the bot:**
   ```bash
   node index.js
   ```

## Deployment

You can deploy the bot to a server like Heroku or AWS. Follow the specific deployment instructions for your chosen platform.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and concise messages.
4. Push your changes to your fork.
5. Create a pull request to the main branch.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
