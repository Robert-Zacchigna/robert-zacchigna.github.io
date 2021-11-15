// Clear search input on page refresh
$(function() {
    document.getElementById('search-input').value = "";
});

// Generate post list to be searched
window.simpleJekyllSearch = new SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: 'https://robert-zacchigna.github.io/Portfolio/search.json', // Manually set full website path of json file
    searchResultTemplate: '<li><a href="{url}">{title}</a><p><strong>Summary:</strong> {summary} <br> <strong>Date:</strong> {date} <br> <strong>Tag(s):</strong> {tags} <br> <strong>Categories:</strong> {category} <br> <strong>Download Project:</strong> <a href="https://github.com/Robert-Zacchigna/Portfolio/raw/Zipped-Projects/{title}.zip">{download_size} - Zip Archive</a></p></li>',
    noResultsText: '<strong>No Results Found</strong>',
    limit: 10,
    fuzzy: false
});

// Dynamically count posts and append to title (i.e. "Search Posts (Results: 5)")
const search_input = document.querySelector('#search-input');
const page_title = document.querySelector('.page-title');

search_input.addEventListener('input', function() {
    setTimeout(function() {
        var search_results = document.querySelector("#results-container").childNodes

        if (typeof search_results[0] === "undefined") {
            page_title.innerHTML = "Search Posts";
        } else if (search_results[0].textContent === "No Results Found") {
            page_title.innerHTML = "Search Posts (Results: 0)";
        } else {
            page_title.innerHTML = "Search Posts (Results: " + search_results.length + ")";
        }
    }, 265);
});