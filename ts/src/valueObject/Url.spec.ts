import { expect } from "chai";
import { Url } from "./Url";

describe("Url validation", () => {

  describe("Correct values of the urls", () => {

    const urls = ["https://www.wegow.com/es-es/",
      "https://www.eventbrite.es/",
      "https://www.stubhub.es/entradas-conciertos",
      "https://www.entradas.com/",
      "https://www.cooncert.com/es",
      "https://mutick.com/",
      "https://www.livenation.es/",
      "https://www.ticketmaster.es/",
      "https://entradium.com/",
      "https://www.codetickets.com/"
    ]

    const longUrls = ["https://www.wegow.com/es-es/conciertos/geo/espana/barcelona/barcelona/?country=1&administrative_division=3128759&cities=3128760&page=1&page_size=20&type=0&sda=desktop-filters-events&region=es-es&mongo=true&validate=true",
      "https://www.eventbrite.es/d/spain--barcelona/music--events/",
      "https://www.stubhub.es/entradas-conciertos/category/1/"
    ]

    it("Should work when instances several homepage webs at the same time", () => {

      urls.forEach(element => {
        try {
          new Url(element)

        } catch (error) {
          expect(error).to.not.exist
        }

      });


    });

    it("Should work when instances several long url webs", () => {

      longUrls.forEach(element => {
        try {
          new Url(element)

        } catch (error) {
          expect(error).to.not.exist
        }

      });


    });

  });


  describe("Incorrect values of the urls", () => {

    it("Should fail when instance an incorrect http url", () => {
      expect(() => new Url("htpt//adsf.a")).to.throw(
        TypeError,
        "The instance of Url expects a valid parameter"
      );

    });

    it("Should fail when instance an incorrect slash url", () => {
      expect(() => new Url("http//adsf.a")).to.throw(
        TypeError,
        "The instance of Url expects a valid parameter"
      );

    });

    it("Should fail when instance an incorrect url without extension", () => {
      expect(() => new Url("http://adsf")).to.throw(
        TypeError,
        "The instance of Url expects a valid parameter"
      );

    });

  });

});






