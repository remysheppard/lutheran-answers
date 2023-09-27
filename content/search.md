---
title: "Search This Website"
layout: "search"
avoid: true
disable_comments: true
---

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script type="text/javascript">

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

// define globale variables
var idx, searchInput, searchResults = null
var documents = []

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

function renderSearchResults(results){

    if (results.length > 0) {

        // show max 10 results
        if (results.length > 9){
            results = results.slice(0,10)
        }

        // reset search results
        searchResults.innerHTML = ''

        // append results
        results.forEach(result => {
        
            // create result item
            var article = document.createElement('span')
            article.className = "inline m-4 w-full lg:w-5/12"
            article.innerHTML = `
            <div class="h-full bg-gray-300 hover:shadow-xl transition-all duration-200 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 uppercase">${documents[result.ref].type}</h2>
              <a href="${result.ref}">
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  ${documents[result.ref].title}
                </h1>
              </a>
              <p class="leading-relaxed mb-3">${truncateString(documents[result.ref].content, 175)}</p>
              <a href="${result.ref}" class="text-indigo-500 inline-flex items-center">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            `
            searchResults.appendChild(article)
        })

    // if results are empty
    } else {
        searchResults.innerHTML = '<p class="text-center text-xl block w-full">No results found.</p>'
    }
}

function registerSearchHandler() {


  // register on input event
  searchInput.oninput = function(event) {

  // remove search results if the user empties the search input field
    if (searchInput.value == '') {
        
      searchResults.innerHTML = ''

    } else {
    
      // get input value
      var query = event.target.value

      // run fuzzy search
      var results = idx.search(query + '*')

      // render results
      renderSearchResults(results)
    }
  }

  if (q) {
    var results = idx.search(q + '*')
    renderSearchResults(results)
  }

  // set focus on search input and remove loading placeholder
  searchInput.focus()
  
}

window.onload = function() {

    // get dom elements
    searchInput = document.getElementById('search-input')
    searchResults = document.getElementById('search-results')

    // request and index documents
    fetch('/index.json', {
        method: 'get'
    }).then(
        res => res.json()
    ).then(
        res => {

            // index document
            idx = lunr(function() {
                this.ref('url')
                this.field('title')
                this.field('content')
                this.field('type')

                res.forEach(function(doc) {
                    this.add(doc)
                    documents[doc.url] = {
                        'title': doc.title,
                        'content': doc.content,
                        'type': doc.type,

                    }
                }, this)
            })

            // data is loaded, next register handler
            registerSearchHandler()
        }
    ).catch(
        err => {
            searchResults.innerHTML = `<p>${err}</p>`
        }
    )
}
</script>

<input id="search-input" type="text" placeholder="Search..." class="border-0 rounded-full bg-gray-200 focus:bg-white focus:ring-0 w-10/12 px-5 py-3 text-lg focus:shadow mx-auto block" name="search">

<section class="search w-full text-gray-600 body-font mt-12">
    <div id="search-results" class="flex flex-wrap flex-row justify-around"></div>
</section>