document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const frameContainer = document.getElementById("dynamic-content_block");
    const sideSheet = document.getElementById("floating-side-sheet");
    const filterRowContainer = document.getElementById("quickfilter-container_default");
    const defaultFilter = filterRowContainer.innerHTML;
    const clearSearch = document.getElementById("search-clear_button");
    const originalContent = frameContainer.innerHTML;
    let searchData = [];

    const peopleContainer = document.createElement("div")
    const pageContainer = document.createElement("div");

    // content section
    let isPeopleFilterActive = false;
    let isPageFilterActive = false;
    
    
    // filter const
    const allQuickFilter = document.getElementById("quick-filter_all");
    let peopleQuickFilter = document.getElementById("quick-filter_people");
    let pageQuickFilter = document.getElementById("quick-filter_chat");

    // Fetch the JSON data
    fetch('searchData.json') 
        .then(response => response.json())
        .then(data => {
            searchData = data;
            // Attach event listeners after the data is loaded
            searchInput.addEventListener('input', filterAndDisplayResults);
            filterChatButton.addEventListener('click', toggleChatFilter);
            console.log("getting data")
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
            // Ensure title are defined before using them
            const title = item.result_title ? item.result_title.toLowerCase() : " ";
            return title.includes(query);
        });

        // containers for different categories & help below
        peopleContainer.setAttribute("id", "people-container");
        peopleContainer.innerHTML = `
            <div class="content-container_subtitle-row">
                <img src="icons/user-icon.png">
                <h3 class="content-subtitle_text">People</h3>
            </div>
        `;
        peopleContainer.classList.add("content-section");


        pageContainer.setAttribute("id", "page-container");
        pageContainer.innerHTML = `
            <div class="content-container_subtitle-row">
                <img src="icons/page-icon.png">
                <h3 class="content-subtitle_text">Genesys Cloud Pages</h3>
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

                // Adding images to just people
                if (result.category === "people") {
                    innerHTMLContent += `
                        <img class='sm-avatar' src="images/${result.image}"
                    `;
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
                                    <p class="inline-footnote_text">${result.result_subtitle}</p>
                                </div>
                            </div>
                        </div>
                        <img src="icons/open.png">
                    </div>
                `;

                inlineRow.innerHTML = innerHTMLContent;
                
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
            frameContainer.innerHTML = '<p>No results found</p>';
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


        
    }

    let allFilter = true;

    function allFilterActive() {
        if (allFilter === true) {
            isPeopleFilterActive = false
            isChatFilterActive = false
            isManagementFilterActive = false 
            isHelpFilterActive = false
        } else {
            allFilter = false
        }
    }

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
        console.log("keybaord pressed!")
    });

    //filter const active icons
    function createSVGElement(svgString) {
        const template = document.createElement("template");
        template.innerHTML = svgString.trim();
        return template.content.firstChild;
    }

    const allFilterDefaultSVGString =`
        <svg id="quick-filter_icon-all" id="quick-filter_icon-all" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9.56219 8.79233C9.78157 9.01134 9.78157 9.36669 9.56219 9.58573C9.3428 9.80477 8.98684 9.80474 8.76743 9.58573L6.00054 6.80298L3.21398 9.58479C2.99459 9.80381 2.63863 9.80381 2.41922 9.58479C2.19981 9.36578 2.19983 9.01043 2.41922 8.79139L5.20672 6.01052L2.41845 3.20767C2.19906 2.98866 2.19906 2.63331 2.41845 2.41427C2.63784 2.19523 2.99379 2.19526 3.2132 2.41427L6.00054 5.21805L8.7871 2.43624C9.00649 2.21723 9.36244 2.21723 9.58186 2.43624C9.80127 2.65526 9.80124 3.01061 9.58186 3.22964L6.79436 6.01052L9.56219 8.79233Z" fill="#0F1929"/>
        </svg> 
    `;

    const allFilterActiveSVGString = `
        <svg id="quick-filter_icon-all" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10.5 5.99978C10.5 6.28752 10.2685 6.51901 9.98077 6.51901H6.51923V9.98055C6.51923 10.2672 6.28666 10.5 6 10.5C5.71334 10.5 5.48077 10.2683 5.48077 9.98055V6.51901H2.01923C1.73257 6.51901 1.5 6.28666 1.5 6C1.5 5.71421 1.73257 5.48055 2.01923 5.48055H5.48077V2.01901C5.48077 1.73236 5.71334 1.5 6 1.5C6.28666 1.5 6.51923 1.73236 6.51923 2.01901V5.48055H9.98077C10.2685 5.48055 10.5 5.71421 10.5 5.99978Z" fill="#3E5374"/>
        </svg>
    `;

    const uncheckedQuickFilterIcon = `
        <svg id="quick-filter_icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10.2857 0C11.2312 0 12 0.767411 12 1.71429V10.2857C12 11.2312 11.2312 12 10.2857 12H1.71429C0.767411 12 0 11.2312 0 10.2857V1.71429C0 0.767411 0.767411 0 1.71429 0H10.2857ZM10.2857 1.28571H1.71429C1.4775 1.28571 1.28571 1.4775 1.28571 1.71429V10.2857C1.28571 10.5214 1.4775 10.7143 1.71429 10.7143H10.2857C10.5214 10.7143 10.7143 10.5214 10.7143 10.2857V1.71429C10.7143 1.4775 10.5214 1.28571 10.2857 1.28571Z" fill="#3E5374"/>
        </svg>
    `;

    const checkedQuickFilterIcon = `
        <svg id="quick-filter_icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.71429 0C0.76875 0 0 0.768564 0 1.71387V10.2832C0 11.2285 0.76875 11.9971 1.71429 11.9971H10.2857C11.2312 11.9971 12 11.2285 12 10.2832V1.71387C12 0.768564 11.2312 0 10.2857 0H1.71429ZM9.02678 4.73993L5.59821 8.16767C5.34643 8.4194 4.93929 8.4194 4.69018 8.16767L2.97589 6.4538C2.72411 6.20207 2.72411 5.79503 2.97589 5.54598C3.22768 5.29694 3.63482 5.29426 3.88393 5.54598L5.14286 6.80461L8.11607 3.82943C8.36786 3.57771 8.775 3.57771 9.02411 3.82943C9.27321 4.08116 9.27589 4.4882 9.02411 4.73725L9.02678 4.73993Z" fill="#3E5374"/>
        </svg>
    `;

    const uncheckedQuickFilterIconChat = `
        <svg id="quick-filter_icon-chat" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10.2857 0C11.2312 0 12 0.767411 12 1.71429V10.2857C12 11.2312 11.2312 12 10.2857 12H1.71429C0.767411 12 0 11.2312 0 10.2857V1.71429C0 0.767411 0.767411 0 1.71429 0H10.2857ZM10.2857 1.28571H1.71429C1.4775 1.28571 1.28571 1.4775 1.28571 1.71429V10.2857C1.28571 10.5214 1.4775 10.7143 1.71429 10.7143H10.2857C10.5214 10.7143 10.7143 10.5214 10.7143 10.2857V1.71429C10.7143 1.4775 10.5214 1.28571 10.2857 1.28571Z" fill="#3E5374"/>
        </svg>
    `;

    const checkedQuickFilterIconChat = `
        <svg id="quick-filter_icon-chat" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.71429 0C0.76875 0 0 0.768564 0 1.71387V10.2832C0 11.2285 0.76875 11.9971 1.71429 11.9971H10.2857C11.2312 11.9971 12 11.2285 12 10.2832V1.71387C12 0.768564 11.2312 0 10.2857 0H1.71429ZM9.02678 4.73993L5.59821 8.16767C5.34643 8.4194 4.93929 8.4194 4.69018 8.16767L2.97589 6.4538C2.72411 6.20207 2.72411 5.79503 2.97589 5.54598C3.22768 5.29694 3.63482 5.29426 3.88393 5.54598L5.14286 6.80461L8.11607 3.82943C8.36786 3.57771 8.775 3.57771 9.02411 3.82943C9.27321 4.08116 9.27589 4.4882 9.02411 4.73725L9.02678 4.73993Z" fill="#3E5374"/>
        </svg>
    `;

    const uncheckedQuickFilterIconManagement = `
        <svg id="quick-filter_icon-management" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10.2857 0C11.2312 0 12 0.767411 12 1.71429V10.2857C12 11.2312 11.2312 12 10.2857 12H1.71429C0.767411 12 0 11.2312 0 10.2857V1.71429C0 0.767411 0.767411 0 1.71429 0H10.2857ZM10.2857 1.28571H1.71429C1.4775 1.28571 1.28571 1.4775 1.28571 1.71429V10.2857C1.28571 10.5214 1.4775 10.7143 1.71429 10.7143H10.2857C10.5214 10.7143 10.7143 10.5214 10.7143 10.2857V1.71429C10.7143 1.4775 10.5214 1.28571 10.2857 1.28571Z" fill="#3E5374"/>
        </svg>
    `;

    const checkedQuickFilterIconManagement = `
        <svg id="quick-filter_icon-management" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.71429 0C0.76875 0 0 0.768564 0 1.71387V10.2832C0 11.2285 0.76875 11.9971 1.71429 11.9971H10.2857C11.2312 11.9971 12 11.2285 12 10.2832V1.71387C12 0.768564 11.2312 0 10.2857 0H1.71429ZM9.02678 4.73993L5.59821 8.16767C5.34643 8.4194 4.93929 8.4194 4.69018 8.16767L2.97589 6.4538C2.72411 6.20207 2.72411 5.79503 2.97589 5.54598C3.22768 5.29694 3.63482 5.29426 3.88393 5.54598L5.14286 6.80461L8.11607 3.82943C8.36786 3.57771 8.775 3.57771 9.02411 3.82943C9.27321 4.08116 9.27589 4.4882 9.02411 4.73725L9.02678 4.73993Z" fill="#3E5374"/>
        </svg>
    `;

    const uncheckedQuickFilterIconHelp = `
        <svg id="quick-filter_icon-help" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10.2857 0C11.2312 0 12 0.767411 12 1.71429V10.2857C12 11.2312 11.2312 12 10.2857 12H1.71429C0.767411 12 0 11.2312 0 10.2857V1.71429C0 0.767411 0.767411 0 1.71429 0H10.2857ZM10.2857 1.28571H1.71429C1.4775 1.28571 1.28571 1.4775 1.28571 1.71429V10.2857C1.28571 10.5214 1.4775 10.7143 1.71429 10.7143H10.2857C10.5214 10.7143 10.7143 10.5214 10.7143 10.2857V1.71429C10.7143 1.4775 10.5214 1.28571 10.2857 1.28571Z" fill="#3E5374"/>
        </svg>
    `;

    const checkedQuickFilterIconHelp = `
        <svg id="quick-filter_icon-help" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.71429 0C0.76875 0 0 0.768564 0 1.71387V10.2832C0 11.2285 0.76875 11.9971 1.71429 11.9971H10.2857C11.2312 11.9971 12 11.2285 12 10.2832V1.71387C12 0.768564 11.2312 0 10.2857 0H1.71429ZM9.02678 4.73993L5.59821 8.16767C5.34643 8.4194 4.93929 8.4194 4.69018 8.16767L2.97589 6.4538C2.72411 6.20207 2.72411 5.79503 2.97589 5.54598C3.22768 5.29694 3.63482 5.29426 3.88393 5.54598L5.14286 6.80461L8.11607 3.82943C8.36786 3.57771 8.775 3.57771 9.02411 3.82943C9.27321 4.08116 9.27589 4.4882 9.02411 4.73725L9.02678 4.73993Z" fill="#3E5374"/>
        </svg>
    `;


    clearSearch.addEventListener("click", function(){
        searchInput.value = "";
        frameContainer.innerHTML = originalContent;
    });

    peopleQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon");
        let newIcon;
        isPeopleFilterActive = !isPeopleFilterActive;
        console.log(isPeopleFilterActive)
        console.log("people filter is active")

        if (isPeopleFilterActive) {
            peopleContainer.style.display = ""
            newIcon = createSVGElement(checkedQuickFilterIcon);
            console.log(isPeopleFilterActive)
            allFilter = false;
        } else {
            newIcon = createSVGElement(uncheckedQuickFilterIcon);
            peopleContainer.style.display = "none"
        };

        if (newIcon) {
            peopleQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }

    })

    pageQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon");
        let newIcon;
        isPageFilterActive = !isPageFilterActive;
        console.log(isPeopleFilterActive)
        console.log("page filter is active")

        if (isPageFilterActive) {
            pageContainer.style.display = ""
            newIcon = createSVGElement(checkedQuickFilterIcon);
            console.log(isPageFilterActive)
            allFilter = false;
        } else {
            newIcon = createSVGElement(uncheckedQuickFilterIcon);
            pageContainer.style.display = "none"
        };

        if (newIcon) {
            pageQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }

    })

    allQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon-all");
        let newIcon;

        if (allQuickFilter.classList.contains("active")) {
            allQuickFilter.classList.remove("active");
            newIcon = createSVGElement(allFilterDefaultSVGString);
            allFilter = true;
        } else {
            allQuickFilter.classList.add("active")
            allFilter = false;
            newIcon = createSVGElement(allFilterActiveSVGString);
        };

        if (newIcon) {
            allQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }

        allFilterAction()

    });

});
