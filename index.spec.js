const { expect } = require('chai');
const Scraper = require('.');

describe('Scraper - Scraping tool', () => {

  describe.only('Test happy path Scraper tool', () => {
    it.only('Should save as property the document of the DOM', () => {
      const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
      expect(heman.document).to.exist;
      expect(heman.document instanceof Object).to.be.true;
    })

    it('Should return an array of elements', async () => {
      const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
      const selector = heman.select('.tblrow', item => item.children.item(1).children.item(0).href);
      expect(selector).to.exist;
    })

    it('Should iterate over the item to be able to scraped', () => {
      const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
      const data = [];
      heman.select('.tblrow', item => {
        data.push(item.children.item(1).children.item(0).href);
      })
      expect(data).to.exist;
    })

    it.only('Should go throuth an array of urls ', () => {
      const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
      const urls = heman.select('.tblrow', item => item.children.item(1).children.item(0).href);

      const generalUrl = 'https://www.he-man.org/collecting/';
      urls.forEach((url, index) => {
        urls[index] = generalUrl.concat(url);
      })

      const selectUrls = urls.slice(0, 50);

      const data = [];
      Scraper.for(selectUrls, scraper => {
        const detail = scraper.select('#collect_rightcenter', item => {
          return item.children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(0).children.item(0).children.item(0).children.item(1).textContent
        })
        data.push(detail);
      })

      expect(data).to.exist;
    })

  })

  describe('Test of the arguments with validator for scraper tool', () => {

    it('Scraper - parameter: URL. Should return error when not insert parameter', () => {
      expect(() => new Scraper()).to.throw(ReferenceError, 'The instance of Scraper expect a parameter.');
    })

    it('Scraper - parameter: URL. Should return error when not insert parameter in format string', () => {
      expect(() => new Scraper(2)).to.throw(TypeError, 'Url expect a string. 2 is a number.');
    })

    it('Scraper - parameter: URL. Should return error when not insert a url', () => {
      expect(() => new Scraper('error')).to.throw(TypeError, 'The instance of Scraper expect at parameter a url.');
    })

    it('Scraper - method selector - Should return error when not insert parameter', () => {
      expect(() => {
        const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
        heman.select();
      }).to.throw(ReferenceError, 'The method select need parameters: selector and expression.');
    })

    it('Scraper - method selector - parameter: SELECTOR. Should return error when not insert a string ', () => {
      expect(() => {
        const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
        heman.select(true);
      }).to.throw(TypeError, 'Selector expect a string. true is a boolean.');
    })

    it('Scraper - method selector - parameter: EXPRESSION. Should return error when not insert a string ', () => {
      expect(() => {
        const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
        heman.select('.tblrow');
      }).to.throw(ReferenceError, 'The method select need a expression.');
    })

    it('Scraper - method selector - parameter: EXPRESSION. Should return error when not insert a function', () => {
      expect(() => {
        const heman = new Scraper('https://www.he-man.org/collecting/toycollection.php?id=1');
        heman.select('.tblrow', true);
      }).to.throw(TypeError, 'Expression expect a function. true is a boolean.');
    })

    it('Scraper - method selector - Should return error when not insert parameters', () => {
      expect(() => {
        Scraper.for();
      }).to.throw(ReferenceError, 'The static method for need parameters: urls and expression.');
    })

    it('Scraper - method static for - parameter: URLS. Should return error when not insert an array', () => {
      expect(() => {
        Scraper.for(true);
      }).to.throw(TypeError, 'Urls expect a array. true is a boolean.');
    })

    it('Scraper - method static for - parameter: URLS. Should return error when insert an empty array', () => {
      expect(() => {
        Scraper.for([], () => { });
      }).to.throw(ReferenceError, `There aren't elements in the array urls.`);
    })

    it('Scraper - method static for - parameter: URLS. Should return error when not insert an array with url', () => {
      expect(() => {
        Scraper.for(['error'], () => { });
      }).to.throw(TypeError, 'The element 0 of the array is not a url.');
    })

    it('Scraper - method selector - parameter: EXPRESSION. Should return error when not insert expression', () => {
      expect(() => {
        Scraper.for(new Array('1'));
      }).to.throw(ReferenceError, 'The static method for need a expression.');
    })

    it('Scraper - method static for - parameter: EXPRESSION. Should return error when not insert a function', () => {
      expect(() => {
        Scraper.for(new Array('1'), true);
      }).to.throw(TypeError, 'Expression expect a function. true is a boolean.');
    });
  })
})