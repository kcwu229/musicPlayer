# Demo

https://github.com/user-attachments/assets/ef567764-1f9a-4e4e-adb4-1870fcc7dcd1


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


### API form last.fm to imort to Database
<img width="366" alt="image" src="https://github.com/user-attachments/assets/249c6469-2cba-4dbf-9dbc-1a1aa809abcd" />


### Schema Design (will change into NOSQL later)
![image](https://github.com/user-attachments/assets/47a88071-4267-492e-b9b5-4a1ad00173fb)

### MongoDB

#### Following table structure just for reference
1. Artist Document
```bash
{
  "artist_id": "1",
  "artist_name": "Artist Name",
  "artist_listeners": 1000,
  "artist_summary": "Summary about the artist.",
  "artist_play_count": 500,
  "albums": [
    {
      "album_id": "1",
      "album_name": "First Album",
      "album_summary": "Summary of the album.",
      "album_publish_year": 2020,
      "album_listeners": 500,
      "tracks": [
        {
          "track_id": "1",
          "track_title": "First Track",
          "track_duration": 180,
          "record_tags": ["tag1", "tag2"]
        },
        {
          "track_id": "2",
          "track_title": "Second Track",
          "track_duration": 210,
          "record_tags": ["tag1"]
        }
      ]
    }
  ]
}
```

2. Artist Document
```bash
{
  "tag_id": "1",
  "tag_name": "tag1"
}
```





Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
