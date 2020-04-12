require('dotenv').config();
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  accessKey: `${process.env.UNSPLASH_KEY}`,
});


const ImageSearch = {
  // query: { category: string }, page: number, per_page: number
  imageSearch: async () => {
    try {
      const res = await unsplash.search.photos("dog", 1, 5);
      const result = res.toJson();
      console.log("Hello resultsss", result);
      return result;
    } catch (err) {
      throw new Error(`Failed to fetch images: ${err}`);
    }
  }
};

ImageSearch.imageSearch();