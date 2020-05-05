const settings = {
  "name": "emd-blog",
  "state": {
    "frontity": {
      "url": "https://test.frontity.io",
      "title": "The Daily Dose",
      "description": "Interesting Information in Under 5 minutes. Medicinal Motivation, Don't Forget To Take Your Daily Dose."
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
              "motivation",
              "/category/motivation/"
            ],
            [
              "About Us",
              "/about-us/"
            ]
          ],
          "featured": {
            "showOnList": true,
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
