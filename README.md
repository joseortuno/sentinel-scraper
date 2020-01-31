# Scraper is a tool for scraping web througt of url and selectors

## Usage

Call to scraping tool:

```javascript
const Scraper = require('sentinel-scraper');
```

Create a instance for scraping an url:

```javascript
const scraping = new Scraper('The url that do need scraping');
```

### Methods

#### 1. SELECTOR

To scrape sections of a url through its selectors.

```javascript
scraping.select(selector, expression); // It is necesary insert the parameters.
```

Parameters:

1. selector: behaves as a '`.querySlectorAll()`'.
2. expression (callback): currentValue, index (optional).

Run a method for scraping a page:

```javascript
const data = scraping.select('#selector', item => {
  return item.children.item(0).href);
})

/* Output:
  data = [
    http//:www.example.com,
    http//:www.example.com,
    http//:www.example.com,
    http//:www.example.com,
    http//:www.example.com,
    http//:www.example.com,
  ]
*/

// Return an array with format you need. For example:

const data = scraping.select('#selector', item => {
  return {
    title: item.children.item(0).textContent,
    image: item.children.item(0).src,
    url: item.children.item(0).href,
    });
});

/* Output:
  data = [
    {
      title: 'lorem ipsum',
      image: http//:www.example.com/image/image.png,
      url: http//:www.example.com,
    },
    {
      title: 'lorem ipsum',
      image: http//:www.example.com/image/image.png,
      url: http//:www.example.com,
    },
    {
      title: 'lorem ipsum',
      image: http//:www.example.com/image/image.png,
      url: http//:www.example.com,
    }
  ]
*/

// Or create data in format you need without return nothing. For example:

const data = {};
scraping.select('#selector', (item, index) => {
  data[index] = [
    item.children.item(0).textContent,
    item.children.item(0).src,
    item.children.item(0).href,
  ];
});

/* Output:
  data = {
    1: [
      'lorem ipsum',
      http//:www.example.com/image/image.png,
      http//:www.example.com,
    ],
    2: [
      'lorem ipsum',
      http//:www.example.com/image/image.png,
      http//:www.example.com,
    ],
    3: [
      'lorem ipsum',
      http//:www.example.com/image/image.png,
      http//:www.example.com,
    ]
  ]
*/
```

#### 2. FOR

It is a static method for to scrape an array of urls. It is a factory of new Scraper();

```javascript
Scraper.for(urls, expression); // It is necesary insert the parameters.
```

Parameters:

1. urls: array of urls.
2. expression (callback): currentValue (instance of Scrape for url).

```javascript
const urls = [
  'http//:www.example.com/product/1',
  'http//:www.example.com/product/2',
  'http//:www.example.com/product/3',
  'http//:www.example.com/product/4',
  'http//:www.example.com/product/5'
];

Scraper.for(urls, scrape => {
  // for example: scrape.select();
});
````

The static method for we will use it when we want scrape different depths.
