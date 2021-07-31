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

Some notes: 
- Maximum upload limit is 15MB.
- Supported file type are `png`, `jpg`, `jpeg`, `bmp`, and `tiff`.


## UI Demo

https://user-images.githubusercontent.com/63820270/127740685-5a4571e9-8374-49b7-ac44-13160dc4f96d.mov

(Error will be logged in console.)

