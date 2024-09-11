document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const frameContainer = document.getElementById("dynamic-content_block");
    const sideSheet = document.getElementById("floating-side-sheet");
    const filterRowContainer = document.getElementById("quickfilter-container_default");
    const defaultFilter = filterRowContainer.innerHTML;
    const clearSearch = document.getElementById("search-clear_button");
    const originalContent = frameContainer.innerHTML;
    let searchData = [];

    const peopleContainer = document.createElement("div");
    peopleContainer.setAttribute("id", "people-container");
    const pageContainer = document.createElement("div");
    pageContainer.setAttribute("id", "page-container");
    
    // filter const
    let allQuickFilter = document.getElementById("quick-filter_all");
    let allQuickFilterCount = 1;
    
    let peopleQuickFilter = document.getElementById("quick-filter_people");
    let peopleQuickFilterCount = 1;
    let pageQuickFilter = document.getElementById("quick-filter_page");
    let pageQuickFilterCount = 1;


    // Fetch the JSON data
    fetch('searchData.json') 
        .then(response => response.json())
        .then(data => {
            searchData = data;
            // Attach event listeners after the data is loaded
            searchInput.addEventListener('input', filterAndDisplayResults);
        })
        .catch(error => {
            console.error('Error fetching the search data:', error);
        });

    function filterAndDisplayResults() {
        const query = searchInput.value.toLowerCase().trim();

        if (query === "") {
            frameContainer.innerHTML = originalContent;
            return;
        }

        // checking if help section already existings
        let existingHelpBlock = document.getElementById("search-help_block");
        if (!existingHelpBlock) {
            const helpBlock = document.createElement("div");
            helpBlock.setAttribute("id", "search-help_block")
            helpBlock.innerHTML = `
                <div class="help-block">
                    <div class="help-block_nested">
                        <div class="help-block_upper-container">
                            <img src="icons/help-icon.png">
                            <h3 class="help-title_text">Help</h3>
                        </div>
                        <p id="help-text_block" class="help-body_text">23 related articles to “${searchInput.value}” found in help. Click to explore.</p>
                    </div>
                    <img src="icons/external-link.png">
                </div>
            `;
    
            sideSheet.appendChild(helpBlock);
        }

        frameContainer.innerHTML = '';

        const filteredResults = searchData.filter(item => {
            console.log("a")
            // Ensure title are defined before using them
            const title = item.result_title ? item.result_title.toLowerCase() : " ";
            return title.includes(query);
        });

        // containers for different categories & help below
        peopleContainer.innerHTML = `
            <div class="content-container_subtitle-row">
                <img src="icons/user-icon.png">
                <h3 class="content-subtitle_text">Directory</h3>
                <div class="content-header_line"></div>
                <img src="icons/kebab-menu.png">
            </div>
        `;
        peopleContainer.classList.add("content-section");

        pageContainer.innerHTML = `
            <div class="content-container_subtitle-row">
                <img src="icons/page-icon.png">
                <h3 class="content-subtitle_text">Pages</h3>
                <div class="content-header_line"></div>
                <img src="icons/kebab-menu.png">
            </div>
        `;
        pageContainer.classList.add("content-section");


        if (filteredResults.length > 0) {
            filteredResults.forEach(result => {
                const inlineRow = document.createElement("div");
                inlineRow.classList.add('inline-row');
                frameContainer.classList.add('dynamic-content_block');

                let innerHTMLContent = `
                    <div class="inline-row">
                `;

                // specifying id and adding image to just people
                if (result.category === "people") {
                    inlineRow.setAttribute("id", "people-inlineRow");
                    innerHTMLContent += `
                        <img class='sm-avatar' src="images/${result.image}"
                    `;
                };

                if (result.category === "page") {
                    inlineRow.setAttribute("id", "page-inlineRow");
                };
                
                // Updated HTML structure to include title, description and image
                innerHTMLContent += `
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">${result.result_title}</h4>
                `;

                // Adding status to just people
                if (result.category === "people") {
                    innerHTMLContent += `
                        <div class="inline-divider"></div>
                        <div class="inline-activity_bar">
                            <div class="active-circle"></div>
                            <p class="inline-footnote_text">
                                Active
                            </p>
                        </div>
                    `;
                };

                innerHTMLContent += `
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">${result.role}</p>
                                    <div class="inline-divider"></div>
                                    <p class="inline-footnote_text">${result.team}</p>
                                </div>
                            </div>
                        </div>
                        <img src="icons/open.png">
                    </div>
                `;

                inlineRow.innerHTML = innerHTMLContent;

                allQuickFilter.innerHTML = `
                    <img src="icons/checked.png">
                    All
                `;

                if (result.category === "people") {
                    peopleContainer.appendChild(inlineRow);
                } else if (result.category === "page") {
                    pageContainer.appendChild(inlineRow);
                }
            });

            if (peopleContainer.hasChildNodes()) {
                frameContainer.appendChild(peopleContainer);
            }
            if (pageContainer.hasChildNodes()) {
                frameContainer.appendChild(pageContainer);
            }
        } else {
            frameContainer.innerHTML = '<p class="inline-title_text>No results found</p>';
        }

        //removing container when no associated results
        if (!peopleContainer.querySelector(".inline-row")) {
            peopleContainer.remove();
        }
        if (!pageContainer.querySelector(".inline-row")) {
            pageContainer.remove();
        }

        let helpTextElement = document.getElementById("help-text_block");
        helpTextElement.innerHTML = `<p id="help-text_block" class="help-body_text">23 related articles to “${searchInput.value}” found in help. Click to explore.</p>`

    };

    //search filter experience
    const searchFilter = document.getElementById("search-filter_button");
    const closeFilter = document.getElementById("close-filter");
    advancedFilterContainer = document.getElementById("quickfilter-container_default").style.display = "";
    advancedFilterContainerActive = document.getElementById("quickfilter-container_active").style.display = "none";

    searchFilter.addEventListener("click", function(){
        const click = searchFilter.click.active;
        console.log("filter pressed")
        if (click === false) {
            advancedFilterContainer = document.getElementById("quickfilter-container_default").style.display = "";
            advancedFilterContainerActive = document.getElementById("quickfilter-container_active").style.display = "none";
        } else {
            advancedFilterContainer = document.getElementById("quickfilter-container_default").style.display = "none";
            advancedFilterContainerActive = document.getElementById("quickfilter-container_active").style.display = "";
        };
    });

    closeFilter.addEventListener("click", function(){
        const click = closeFilter.click.active;
        console.log("close clicked on")
        if (click === false) {
            advancedFilterContainer = document.getElementById("quickfilter-container_default").style.display = "none";
            advancedFilterContainerActive = document.getElementById("quickfilter-container_active").style.display = "";
        } else {
            advancedFilterContainer = document.getElementById("quickfilter-container_default").style.display = "";
            advancedFilterContainerActive = document.getElementById("quickfilter-container_active").style.display = "none";
        };
    })

    

    //back page navigation
    document.addEventListener("keydown", function(event){
        if (event.key === "Escape") {
            window.location.href = "default.html"
        }
        console.log("keyboard pressed!")
    });

    clearSearch.addEventListener("click", function(){
        searchInput.value = "";
        frameContainer.innerHTML = originalContent;
    });

    // quick filter actions

    allQuickFilter.addEventListener("click", function() {
        console.log("all filter is pressed!")
        allFilter();
    });

    peopleQuickFilter.addEventListener("click", function() {
        console.log("people filter is pressed")
        peopleFilter();
    });

    pageQuickFilter.addEventListener("click", function() {
        console.log("page filter is pressed");
        pageFilter();
    });

    //quick filter functions

    function allFilter() {
        if (allQuickFilterCount === 1) {
            allQuickFilter.innerHTML = `
                    <img src="icons/plus.png">
                    All
            `;
            allQuickFilterCount = 0;
            allQuickFilter.classList.replace("quick-filter_all", "quick-filter_all-active")
            peopleQuickFilterCount = 1;
            pageQuickFilterCount = 1;
            peopleFilter()
            pageFilter()
        } else {
            allQuickFilter.innerHTML = `
                    <img src="icons/close.png">
                    All
            `;
            allQuickFilterCount = 1;
            peopleQuickFilterCount = 0;
            pageQuickFilterCount = 0;
            peopleFilter()
            pageFilter()
            allQuickFilter.classList.replace("quick-filter_all-active", "quick-filter_all")
            console.log(allQuickFilterCount)
        };

    };


    function peopleFilter() {
        console.log("people invoked")
        if (peopleQuickFilterCount === 1) {
            peopleQuickFilter.innerHTML = `
                    <img src="icons/unchecked.png">
                    People
            `
            peopleQuickFilterCount = 0;
            document.getElementById("people-container").style.display = "none";
        } else {
            peopleQuickFilter.innerHTML = `
                    <img src="icons/checked.png">
                    People
            `
            peopleQuickFilterCount = 1;
            document.getElementById("people-container").style.display = "";
        };
    };
    

    function pageFilter() {
        console.log("page invoked")
        if (pageQuickFilterCount === 1) {
            pageQuickFilter.innerHTML = `
                    <img src="icons/unchecked.png">
                    Genesys Cloud Page
            `
            pageQuickFilterCount = 0;
            document.getElementById("page-container").style.display = "none";
        } else {
            pageQuickFilter.innerHTML = `
                    <img src="icons/checked.png">
                    Genesys Cloud Page
            `
            pageQuickFilterCount = 1;
            document.getElementById("page-container").style.display = "";
        };
    };

    function updateRowCounts() {
        const pageRows = pageContainer.querySelectorAll('[id^="page-inlineRow"]');
        const pageCount = pageRows.length;

        document.getElementById("quick-filter_page").innerHTML = `
            <img src="icons/checked.png">
            Pages 
            (${pageCount})
        `;

        const peopleRows = peopleContainer.querySelectorAll('[id^="people-inlineRow"]');
        const peopleCount = peopleRows.length;

        document.getElementById("quick-filter_people").innerHTML = `
            <img src="icons/checked.png">
            Directory 
            (${peopleCount})
        `;

        const totalCount = peopleRows.length + pageRows.length;

        document.getElementById("quick-filter_all").innerHTML = `
            <img src="icons/checked.png">
            All 
            (${totalCount})
        `;
    };

    updateRowCounts()

    // Observer for DOM changes
    const observerConfig = { childList: true, subtree: true }; 
    const pageObserver = new MutationObserver(updateRowCounts);
    const peopleObserver = new MutationObserver(updateRowCounts);

    console.log(document.getElementById("page-container")); 
    if (pageContainer) {
        pageObserver.observe(pageContainer, observerConfig);
    } else {
        console.error("Element does not have the right id attached")
    }

    if (peopleContainer) {
        peopleObserver.observe(peopleContainer, observerConfig);
    } else {
        console.error("not able to get this element - what's going on!?!")
    }
});
