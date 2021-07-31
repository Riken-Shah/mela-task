# Mela Task

Created a node server that receives an image, and then convert it into PNG format then resize in 100x100 and 200x200 size. And then add a mela logo as a watermark, upload the images to GCP Bucket and return the URLs as a response.

## Installation
First, download the service key from GCP to access GCP Bucket. And the past its contents in `cloud/keys.json`.

Then create the `.env` file see `.envExample` for help.

Then execute following command to start the server,
```bash
npm i && npm run dev
```

## Endpoints

The GET `/` serve `index.html` if you want to use UI to add an image and see the response.

The POST `/uploads` is the main endpoint which processes the image and responds with uploaded URLs.

