import { expect } from "chai";
import { Scraper } from "./index";

describe("Scraper - Scraping tool", () => {

  describe("Test happy path Scraper tool", () => {

    describe("Should save as property the document of the DOM", () => {
      
      it("In the case of heman web", () => {
        const heman = new Scraper(
          "https://www.he-man.org/collecting/toycollection.php?id=1"
        );
  
        expect(heman.document).to.exist;
      });

      it("In the case of wegow web", () => {
        const wegow = new Scraper(
          "https://www.wegow.com/es-es/conciertos/geo/espana/barcelona/barcelona/?country=1&administrative_division=3128759&cities=3128760&page=1&page_size=20&type=0&sda=desktop-filters-events&region=es-es&mongo=true&validate=true"
        );

        expect(wegow.document).to.exist;
      });

    })

    describe("select method", () => {
      let heman;
      let expected: string = "toy.php?id=1469";
      
      before(() => {
        heman = new Scraper(
          "https://www.he-man.org/collecting/toycollection.php?id=1"
        );
      });

      it("Should return an array of elements", () => {
        const selector = heman.select(".tblrow", (item) => {
          return item.children.item(1).children.item(0).href;
        });

        expect(selector[0]).equals(expected);
      });

      it("Should iterate over the item to be able to scraped", () => {
        const data = {};

        heman.select(".tblrow", (item, index) => {
          expect(index).to.exist;

          data[index] = [item.children.item(1).children.item(0).href];
        });

        expect(Object.values(data)[0][0]).equals(expected);
      });

      it("Should do anything when selector does not exist", () => {
        const selector = heman.select(".tblrowwwww", (item) => {
          return item.children.item(1).children.item(0).href;
        });
        expect(selector).to.have.lengthOf(0);
       
      });

    });

    describe.only("static for method", () => {
      let heman,
        urls,
        completeUrls = [];

      const generalUrl = "https://www.he-man.org/collecting/";

      before(() => {
        heman = new Scraper(
          "https://www.he-man.org/collecting/toycollection.php?id=1"
        );

        urls = heman.select(
          ".tblrow",
          (item) => item.children.item(1).children.item(0).href
        );

        urls.forEach((url) => {
          completeUrls.push(generalUrl.concat(url));
        });
      });

      it("Should go through an array of urls ", () => {
        const data = [];
        const selectUrls = completeUrls.slice(0, 5);

        Scraper.for(selectUrls, (scraper) => {
          const detail = scraper.select("#collect_rightcenter", (item) => {
            return item.children
              .item(0)
              .children.item(1)
              .children.item(0)
              .children.item(0)
              .children.item(0)
              .children.item(0)
              .children.item(0)
              .children.item(0)
              .children.item(1).textContent;
          });
          data.push(detail);
        });

        expect(data).to.exist;
      });
     

      it("Should return the parameters index and return url", () => {
        const selectUrls = completeUrls.slice(0, 5);
        
        Scraper.for(selectUrls, (scraper, index, url) => {
          expect(scraper instanceof Object).to.be.true;
          expect(index).to.exist;
          expect(selectUrls[index]).to.equal(url);
        });
      });
    });
  });


});