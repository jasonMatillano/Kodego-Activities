// Get references to the search input and button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Add a click event listener to the "Search" button
searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase(); // Get the search text and convert to lowercase for case-insensitive search

    // Insert get user :id request here
    console.log(searchText);
});
