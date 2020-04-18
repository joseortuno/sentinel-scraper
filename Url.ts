const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;


module.exports = class Url{
  url
  constructor(url:string){
   if (!URL_REGEX.test(url)) throw TypeError(`The instance of Scraper expect at parameter a url.`);
   this.url
  }
}

