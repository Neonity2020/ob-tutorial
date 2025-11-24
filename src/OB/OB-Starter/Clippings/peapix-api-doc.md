---
title: "Free Bing Image and Spotlight Wallpaper API - Peapix"
source: "https://peapix.com/api"
author:
published:
created: 2025-11-11
description: "Free wallpaper API – Get the newest 4K wallpapers in JSON format for your apps."
tags:
  - "clippings"
---
## Developer API

The Peapix APIs provides the Bing and Windows Spotlight high-quality images for developers to integrate into their apps.

- [**Bing API**](https://peapix.com/#)
- [**Spotlight API**](https://peapix.com/#)

Access the latest Bing daily wallpapers from around the world for your apps.

##### API

- Endpoint: [`https://peapix.com/bing/feed`](https://peapix.com/bing/feed)
- Method: GET

##### Parameters

- country - Specifies the Bing region for image results.
	Accepted values:
	- au
	- br
	- ca
	- cn
	- de
	- fr
	- in
	- it
	- jp
	- es
	- gb
	- us
- n - The number of images to return.

##### Examples

Access the latest Spotlight lock screen wallpapers for your apps.

##### API

- Endpoint: [`https://peapix.com/spotlight/feed`](https://peapix.com/spotlight/feed)
- Method: GET

##### Parameters

- n - The number of images to return.

##### Response

```json
[{
    "title": "Flightless, but resourceful",
    "copyright": "© David Merron Photography/Moment/Getty Images",
    "fullUrl": "https://img.peapix.com/22140608cb7c4c0fbbdca35c729c9b7e_1920.jpg",
    "thumbUrl": "https://img.peapix.com/22140608cb7c4c0fbbdca35c729c9b7e_640.jpg",
    "imageUrl": "https://img.peapix.com/22140608cb7c4c0fbbdca35c729c9b7e.jpg",
    "pageUrl": "https://peapix.com/spotlight/149/flightless-but-resourceful"
}]
```