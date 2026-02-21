---
---
(function (jtd, undefined) {

// Event handling

jtd.addEvent = function(el, type, handler) {
  if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
jtd.removeEvent = function(el, type, handler) {
  if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}
jtd.onReady = function(ready) {
  // in case the document is already rendered
  if (document.readyState!='loading') ready();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') ready();
  });
}

// Show/hide mobile menu

function initNav() {
  const mainNav = document.querySelector('.js-main-nav');
  const pageHeader = document.querySelector('.js-page-header');
  const navTrigger = document.querySelector('.js-main-nav-trigger');

  jtd.addEvent(navTrigger, 'click', function(e){
    e.preventDefault();
    var text = navTrigger.innerText;
    var textToggle = navTrigger.getAttribute('data-text-toggle');

    mainNav.classList.toggle('nav-open');
    pageHeader.classList.toggle('nav-open');
    navTrigger.classList.toggle('nav-open');
    navTrigger.innerText = textToggle;
    navTrigger.setAttribute('data-text-toggle', text);
    textToggle = text;
  })
}

// Site search

function initSearch() {
  var searchInput = document.querySelector('.js-search-input');
  var searchResults = document.querySelector('.js-search-results');
  var isSearchPage = /\/search\/?$/.test(window.location.pathname);

  function getSearchQueryParam() {
    try {
      var params = new URLSearchParams(window.location.search || '');
      return (params.get('q') || '').trim();
    } catch (_error) {
      return '';
    }
  }

  function openSearchPage(query) {
    var value = (query || '').trim();
    if (value === '') {
      return;
    }
    var target = '{{ "/search/" | relative_url }}?q=' + encodeURIComponent(value);
    window.location.href = target;
  }

  function hideResults() {
    if (!searchResults) {
      return;
    }
    searchResults.innerHTML = '';
    searchResults.classList.remove('active');
  }

  function renderInlineResults(indexResults, docs, query) {
    if (!searchResults) {
      return;
    }

    hideResults();

    if (indexResults.length === 0) {
      return;
    }

    searchResults.classList.add('active');
    var resultsList = document.createElement('ul');
    resultsList.classList.add('search-results-list');
    searchResults.appendChild(resultsList);

    var viewAllItem = document.createElement('li');
    viewAllItem.classList.add('search-results-list-item');
    resultsList.appendChild(viewAllItem);

    var viewAllLink = document.createElement('a');
    viewAllLink.classList.add('search-result');
    viewAllLink.setAttribute('href', '{{ "/search/" | relative_url }}?q=' + encodeURIComponent(query || ''));
    viewAllItem.appendChild(viewAllLink);

    var viewAllTitle = document.createElement('div');
    viewAllTitle.classList.add('search-result-title');
    viewAllTitle.innerText = 'View all results';
    viewAllLink.appendChild(viewAllTitle);

    for (var i in indexResults) {
      var result = indexResults[i];
      var doc = docs[result.ref];

      var resultsListItem = document.createElement('li');
      resultsListItem.classList.add('search-results-list-item');
      resultsList.appendChild(resultsListItem);

      var resultLink = document.createElement('a');
      resultLink.classList.add('search-result');
      resultLink.setAttribute('href', doc.url);
      resultsListItem.appendChild(resultLink);

      var resultTitle = document.createElement('div');
      resultTitle.classList.add('search-result-title');
      resultTitle.innerText = doc.title;
      resultLink.appendChild(resultTitle);

      var resultRelUrl = document.createElement('span');
      resultRelUrl.classList.add('search-result-rel-url');
      resultRelUrl.innerText = doc.relUrl;
      resultTitle.appendChild(resultRelUrl);

      var metadata = result.matchData.metadata;
      var contentFound = false;
      for (var j in metadata) {
        if (metadata[j].title) {
          var titlePosition = metadata[j].title.position[0];
          var titleStart = titlePosition[0];
          var titleEnd = titlePosition[0] + titlePosition[1];
          resultTitle.innerHTML = doc.title.substring(0, titleStart) + '<span class="search-result-highlight">' + doc.title.substring(titleStart, titleEnd) + '</span>' + doc.title.substring(titleEnd, doc.title.length) + '<span class="search-result-rel-url">' + doc.relUrl + '</span>';
        } else if (metadata[j].content && !contentFound) {
          contentFound = true;

          var contentPosition = metadata[j].content.position[0];
          var contentStart = contentPosition[0];
          var contentEnd = contentPosition[0] + contentPosition[1];
          var previewStart = contentStart;
          var previewEnd = contentEnd;
          var ellipsesBefore = true;
          var ellipsesAfter = true;

          for (var k = 0; k < 3; k++) {
            var previousSpace = doc.content.lastIndexOf(' ', previewStart - 2);
            var previousDot = doc.content.lastIndexOf('.', previewStart - 2);
            if ((previousDot > 0) && (previousDot > previousSpace)) {
              previewStart = previousDot + 1;
              ellipsesBefore = false;
              break;
            }
            if (previousSpace < 0) {
              previewStart = 0;
              ellipsesBefore = false;
              break;
            }
            previewStart = previousSpace + 1;
          }

          for (var l = 0; l < 10; l++) {
            var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
            var nextDot = doc.content.indexOf('.', previewEnd + 1);
            if ((nextDot > 0) && (nextDot < nextSpace)) {
              previewEnd = nextDot;
              ellipsesAfter = false;
              break;
            }
            if (nextSpace < 0) {
              previewEnd = doc.content.length;
              ellipsesAfter = false;
              break;
            }
            previewEnd = nextSpace;
          }

          var preview = doc.content.substring(previewStart, contentStart);
          if (ellipsesBefore) {
            preview = '... ' + preview;
          }
          preview += '<span class="search-result-highlight">' + doc.content.substring(contentStart, contentEnd) + '</span>';
          preview += doc.content.substring(contentEnd, previewEnd);
          if (ellipsesAfter) {
            preview += ' ...';
          }

          var resultPreview = document.createElement('div');
          resultPreview.classList.add('search-result-preview');
          resultPreview.innerHTML = preview;
          resultLink.appendChild(resultPreview);
        }
      }
    }

  }

  function renderSearchPageResults(indexResults, docs, query) {
    if (!isSearchPage) {
      return;
    }

    var container = document.querySelector('.js-full-search-results');
    if (!container) {
      return;
    }

    if (!query) {
      container.innerHTML = '<p>Type a query in the search box to see results.</p>';
      return;
    }

    var content = '<h1>Search results</h1>';
    content += '<p><strong>Query:</strong> ' + query.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';

    if (indexResults.length === 0) {
      content += '<p>No results found.</p>';
      container.innerHTML = content;
      return;
    }

    content += '<p><strong>Results:</strong> ' + indexResults.length + '</p>';
    content += '<ul class="search-results-list">';

    for (var i in indexResults) {
      var result = indexResults[i];
      var doc = docs[result.ref];
      var preview = '';

      if (result.matchData && result.matchData.metadata) {
        var metadata = result.matchData.metadata;
        var previewBuilt = false;

        for (var j in metadata) {
          if (metadata[j].content && metadata[j].content.position && metadata[j].content.position[0]) {
            var position = metadata[j].content.position[0];
            var start = position[0];
            var end = position[0] + position[1];
            var previewStart = Math.max(0, start - 80);
            var previewEnd = Math.min(doc.content.length, end + 160);
            var before = doc.content.substring(previewStart, start);
            var match = doc.content.substring(start, end);
            var after = doc.content.substring(end, previewEnd);

            if (previewStart > 0) {
              before = '... ' + before;
            }
            if (previewEnd < doc.content.length) {
              after = after + ' ...';
            }

            preview = before + '<span class="search-result-highlight">' + match + '</span>' + after;
            previewBuilt = true;
            break;
          }
        }

        if (!previewBuilt && doc.content) {
          var fallback = doc.content.substring(0, 220);
          if (doc.content.length > 220) {
            fallback += ' ...';
          }
          preview = fallback;
        }
      }

      content += '<li class="search-results-list-item">';
      content += '<a class="search-result" href="' + doc.url + '">';
      content += '<div class="search-result-title">' + doc.title + '<span class="search-result-rel-url">' + doc.relUrl + '</span></div>';
      if (preview) {
        content += '<div class="search-result-preview">' + preview + '</div>';
      }
      content += '</a>';
      content += '</li>';
    }

    content += '</ul>';
    container.innerHTML = content;
  }

  var request = new XMLHttpRequest();
  request.open('GET', '{{ "/assets/js/search-data.json" | relative_url }}', true);

  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      
      {% if site.search_tokenizer_separator != nil %}
      lunr.tokenizer.separator = {{ site.search_tokenizer_separator }}
      {% else %}
      lunr.tokenizer.separator = /[\s\-/]+/
      {% endif %}
      
      var index = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 200 });
        this.field('content', { boost: 2 });
        this.field('url');
        this.metadataWhitelist = ['position']

        for (var i in data) {
          this.add({
            id: i,
            title: data[i].title,
            content: data[i].content,
            url: data[i].url
          });
        }
      });

      wireSearch(index, data);

      var queryFromUrl = getSearchQueryParam();
      if (isSearchPage && queryFromUrl !== '') {
        if (searchInput) {
          searchInput.value = queryFromUrl;
        }

        var fullResults = index.query(function (query) {
          var tokens = lunr.tokenizer(queryFromUrl)
          query.term(tokens, {
            boost: 10
          });
          query.term(tokens, {
            wildcard: lunr.Query.wildcard.TRAILING
          });
        });

        renderSearchPageResults(fullResults, data, queryFromUrl);
      }
    } else {
      // We reached our target server, but it returned an error
      console.log('Error loading ajax request. Request status:' + request.status);
    }
  };

  request.onerror = function(){
    // There was a connection error of some sort
    console.log('There was a connection error');
  };

  request.send();

  function wireSearch(index, data) {
    var index = index;
    var docs = data;

    if (!searchInput || !searchResults) {
      return;
    }

    jtd.addEvent(searchInput, 'keydown', function(e){
      switch (e.keyCode) {
        case 38: // arrow up
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            active.classList.remove('active');
            if (active.parentElement.previousSibling) {
              var previous = active.parentElement.previousSibling.querySelector('.search-result');
              previous.classList.add('active');
            }
          }
          return;
        case 40: // arrow down
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            if (active.parentElement.nextSibling) {
              var next = active.parentElement.nextSibling.querySelector('.search-result');
              active.classList.remove('active');
              next.classList.add('active');
            }
          } else {
            var next = document.querySelector('.search-result');
            if (next) {
              next.classList.add('active');
            }
          }
          return;
        case 13: // enter
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            active.click();
          } else {
            openSearchPage(searchInput.value);
          }
          return;
      }
    });

    jtd.addEvent(searchInput, 'keyup', function(e){
      switch (e.keyCode) {
        case 27: // When esc key is pressed, hide the results and clear the field
          hideResults();
          searchInput.value = '';
          return;
        case 38: // arrow up
        case 40: // arrow down
        case 13: // enter
          e.preventDefault();
          return;
      }

      hideResults();

      var input = this.value;
      if (input === '') {
        return;
      }

      var results = index.query(function (query) {
        var tokens = lunr.tokenizer(input)
        query.term(tokens, {
          boost: 10
        });
        query.term(tokens, {
          wildcard: lunr.Query.wildcard.TRAILING
        });
      });

      renderInlineResults(results, docs, input);
    });

    jtd.addEvent(searchInput, 'blur', function(){
      setTimeout(function(){ hideResults() }, 300);
    });
  }
}

function pageFocus(){
  if ( window.innerWidth < 850) {  
    // var mainContent = document.querySelector('.js-main-content');
    var mainContent = document.querySelector('#main-content');
    mainContent.focus(); 
  }
}

// Document ready

jtd.onReady(function(){
  initNav();
  pageFocus();
  if (typeof lunr !== 'undefined') {
    initSearch();
  }
});

})(window.jtd = window.jtd || {});

{% include js/custom.js %}
