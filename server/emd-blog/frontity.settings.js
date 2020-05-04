const settings = {
  "name": "emd-blog",
  "state": {
    "frontity": {
      "url": "https://test.frontity.io",
      "title": "The Daily Dose",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "mobile",
              "/category/mobile/"
            ],
            [
              "Travel",
              "/category/travel/"
            ],
            [
              "motivation",
              "/category/motivation/"
            ],
            [
              "About Us",
              "/about-us/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": "http://localhost:8888/wp-json"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
