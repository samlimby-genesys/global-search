document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const frameContainer = document.getElementById("dynamic-content_block");
    const sideSheet = document.getElementById("floating-side-sheet");
    const filterRowContainer = document.getElementById("quickfilter-container_default");
    const defaultFilter = filterRowContainer.innerHTML;
    const clearSearch = document.getElementById("search-clear_button");
    const originalContent = frameContainer.innerHTML;
    let containerLimit = true;
    let searchData = [];

    const peopleContainer = document.createElement("div");
    peopleContainer.setAttribute("id", "people-container");
    const pageContainer = document.createElement("div");
    pageContainer.setAttribute("id", "page-container");


    // Fetch the JSON data
    fetch('searchData.json') 
        .then(response => response.json())
        .then(data => {
            searchData = data;
            // Attach event listeners after the data is loaded
            searchInput.addEventListener('input', function(){
                filterAndDisplayResults()
            });
        })
        .catch(error => {
            console.error('Error fetching the search data:', error);
        });

    function filterAndDisplayResults() {
        const query = searchInput.value.toLowerCase().trim();
        const searchTitleKeyWord = document.querySelectorAll("inline-title_text");
        console.log(query.length);

        if (query.length === 0) {
            frameContainer.innerHTML = originalContent;
            return;
        } else if (query.length >= 2) {
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
                <div id="page-header_element1" class="content-container_subtitle-row">
                    <img src="icons/user-icon.png">
                    <h3 id="directory-title" class="content-subtitle_text">Directory</h3>
                    <div class="content-header_line"></div>
                    <img class="kebab-icon" id="people-kebab" src="icons/kebab-menu.png">
                </div>
            `;
            peopleContainer.classList.add("content-section");

            pageContainer.innerHTML = `
                <div id="page-header_element" class="content-container_subtitle-row">
                    <img src="icons/page-icon.png">
                    <h3 class="content-subtitle_text">Pages</h3>
                    <div class="content-header_line"></div>
                    <button id="page-view_more" class="view-more_button">View all</button>
                </div>
            `;
            pageContainer.classList.add("content-section");


            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    const inlineRow = document.createElement("div");
                    inlineRow.classList.add('inline-row');
                    frameContainer.classList.add('dynamic-content_block');

                    let innerHTMLContent = `
                    `;

                    // specifying id and adding image to just people
                    if (result.category === "people") {
                        console.log(result.image)
                        inlineRow.setAttribute("id", "people-inlineRow");

                        if (result.entity === "group/location") {
                            innerHTMLContent += `
                                <img class="group_avatar" src="images/${result.image}"></img>
                            `;
                        } else {
                            innerHTMLContent += `
                            <div class="avatar-container">
                                <img class="avatar-image_active" src="images/${result.image}"></img>
                                <div class="avatar-ring_gap"></div>
                            </div>
                            `;
                        }
                    };

                    if (result.category === "page") {
                        inlineRow.setAttribute("id", "page-inlineRow");
                        innerHTMLContent += `
                            <img class="page-category_avatar" src="images/icon-avatar.png">
                        `;
                    };
                    
                    // Updated HTML structure to include title, description and image
                    innerHTMLContent += `
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 id="search-keyword" class="inline-title_text">${result.result_title}</h4>
                    `;

                    // Adding status to just people
                    if (result.category === "people") {

                        if (result.entity === "group/location") {
                            innerHTMLContent += `
                            `;
                        } else {
                            innerHTMLContent += `
                                <div class="inline-activity_bar">
                                    <div class="active-circle"></div>
                                    <p class="inline-footnote_text">
                                        Active
                                    </p>
                                </div>
                            `;
                        }
                    };

                    // specifying the description by people or page
                    if (result.category === "people") {
                        if (result.entity === "group/location") {
                            innerHTMLContent += `
                                        </div>
                                        <div class="lower_inline-text_container">
                                            <p id="search-keyword" class="primary-inline-body_text">${result.role}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            innerHTMLContent += `
                                        </div>
                                        <div class="lower_inline-text_container">
                                            <p id="search-keyword" class="primary-inline-body_text">${result.role}</p>
                                            <div class="inline-divider"></div>
                                            <p class="secondary-inline-body_text">${result.team}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }


                    // specifying the description by people or page
                    if (result.category === "page") {
                        innerHTMLContent += `
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p id="search-keyword" class="primary-inline-body_text">${result.result_subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }


                    inlineRow.innerHTML = innerHTMLContent;

                    allQuickFilter.innerHTML = `
        
                        Top results
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
            updateRowCounts()
            peopleSectionLimit()
            pageSectionLimit()
        
            return;
        };

    };

    // kebab menu selection
    const existingKebabIcon = document.querySelector("#kebab-icon")

    function createPage(event) {

        if (event.target.click && event.target.matches("#page-kebab")) {
            console.log("kebab1 called")
            const existingKebab = document.querySelector(".kebab-container");

            if (existingKebab) {
                existingKebab.remove();
                return;
            }

            let pageKebabContainer = document.createElement("div");
            pageKebabContainer.classList.add("kebab-container");
            pageKebabContainer.innerHTML = `
                <div id="page_kebab-option" class="kebab-option_menu">
                    <p class="kebab-option_text">Edit Search Categories</p>
                </div>
            `;
            document.getElementById("page-header_element").appendChild(pageKebabContainer);

            const pageKebabOption = document.querySelector("#page_kebab-option");

            if (pageKebabOption) {
                pageKebabOption.addEventListener("click", function() {
                    let peopleContainer = document.querySelector("#people-container");
                    let pageContainer = document.querySelector("#page-container");
                    let searchDropdownBody = document.querySelector("#dynamic-content_block")
                    if (pageContainer) {
                        pageContainer.classList.replace("content-section", "customize_content-section");
                        pageContainer.innerHTML = `
                            <div id="page-header_element-active" class="content-container_subtitle-row">
                                <img src="icons/drag-icon.png">
                                <div class="upper_inline-text_container">
                                    <img src="icons/page-icon.png">
                                    <h3 class="content-subtitle_text">Page</h3>
                                </div>
                            </div>
                        `;
                    };
                    if (peopleContainer) {
                        peopleContainer.classList.replace("content-section", "customize_content-section");
                        peopleContainer.innerHTML = `
                            <div id="page-header_element-active" class="content-container_subtitle-row">
                                <img src="icons/drag-icon.png">
                                <div class="upper_inline-text_container">
                                    <img src="icons/user-icon.png">
                                    <h3 class="content-subtitle_text">Directory</h3>
                                </div>
                            </div>
                        `;
                    };
                    if (searchDropdownBody) {
                        searchDropdownBody.classList.replace("dynamic-content_block", "dynamic-content_block-customize")
                        searchDropdownBody.innerHTML = `
                            <div id="rearrange-categories_header" class="content-container_subtitle-row">
                                <h3 class="content-subtitle_text">Rearrange Categories</h3>
                                <div class="content-header_line"></div>
                                <img class="kebab-icon" id="people-kebab" src="icons/kebab-menu.png">
                            </div>
                            ${pageContainer.outerHTML}
                            ${peopleContainer.outerHTML}
                        `; 
                    }
                });
            }

            } else {
            const existingKebabContainer = document.querySelector(".kebab-container");
            if (existingKebabContainer && !event.target.closest(".kebab-container")) {
                existingKebabContainer.remove()
            }
        }

        if (existingKebabIcon > 2) {
            existingKebabIcon[2].remove();
        }
    };

    function createPeople(event) {

        

        if (event.target.click && event.target.matches("#people-kebab")) {
            console.log("kebab2 called")
            const existingKebab = document.querySelector(".kebab-container1");

            if (existingKebab) {
                existingKebab.remove();
                return;
            }

            let peopleKebabContainer = document.createElement("div");
            peopleKebabContainer.classList.add("kebab-container");
            peopleKebabContainer.innerHTML = `
                <div id="people_kebab-option" class="kebab-option_menu">
                    <p class="kebab-option_text">Rearrange Categories</p>
                </div>
            `;

            document.getElementById("page-header_element1").appendChild(peopleKebabContainer);

            const peopleKebabOption = document.querySelector("#people_kebab-option");

            if (peopleKebabOption) {
                console.log(peopleContainer)
                peopleKebabOption.addEventListener("click", function(){
                    let peopleContainer = document.querySelector("#people-container");
                    let pageContainer = document.querySelector("#page-container");
                    if (pageContainer) {
                        pageContainer.classList.replace("content-section", "customize_content-section");
                        pageContainer.innerHTML = `
                            <div id="page-header_element-active" class="content-container_subtitle-row" draggable="true">
                                <img src="icons/drag-icon.png">
                                <div class="upper_inline-text_container">
                                    <img src="icons/page-icon.png">
                                    <h3 class="content-subtitle_text">Page</h3>
                                </div>
                            </div>
                        `;
                    };
                    if (peopleContainer) {
                        peopleContainer.classList.replace("content-section", "customize_content-section");
                        peopleContainer.innerHTML = `
                            <div id="page-header_element-active" class="content-container_subtitle-row">
                                <img src="icons/drag-icon.png">
                                <div class="upper_inline-text_container">
                                    <img src="icons/user-icon.png">
                                    <h3 class="content-subtitle_text">Directory</h3>
                                </div>
                            </div>
                        `;
                    };
                });
            }

        } else {
            const existingKebabContainer = document.querySelector(".kebab-container1");
            if (existingKebabContainer && !event.target.closest(".kebab-container1")) {
                existingKebabContainer.remove()
            }
        }

        if (existingKebabIcon > 2) {
            existingKebabIcon[2].remove();
        }
    };

    // document.addEventListener("click", function(event){
    //     let customizeConfirmation = event.target.closest(".customize_confirmation");
    //     console.log(customizeConfirmation)

    //     if (customizeConfirmation) {
    //         filterAndDisplayResults()
    //         peopleContainer.classList.replace("customize_content-section", "content-section");
    //         pageContainer.classList.replace("customize_content-section", "content-section");
    //     }
    // })

    // function initializeDragAndDrop() {
    //     const draggableItems = document.querySelectorAll(".customize_content-section");

    //     draggableItems.forEach((item) => {
    //         item.addEventListener("dragstart", handleDragStart);
    //         item.addEventListener("dragover", handleDragOver);
    //         item.addEventListener("drop", handleDrop);
    //     }); 
    // }

    // function handleDragStart(event) {
    //     event.dataTransfer.setData("text/plain", event.target.id);
    //     event.dropEffect = "move";
    // }

    // function handleDragOver(event) {
    //     event.preventDefault();
    //     event.dataTransfer.dropEffect = "move";
    // }

    // function handleDrop(event) {
    //     event.preventDefault();
        
    //     const draggedItemId = event.dataTransfer.getData("text/plain");
    //     const draggedItem = document.getElementById(draggedItemId);
    //     const dropTarget = event.target.closest(".content-container_subtitle-row");

    //     if (draggedItem && dropTarget && draggedItem !== dropTarget) {
    //         const parent = dropTarget.parentNode;
    //         parent.insertBefore(draggedItem, dropTarget);
    //         parent.insertBefore(dropTarget, draggedItem.nextSibling);
    //     }
    // }


    // document.body.addEventListener("click", function(){
    //     const peopleKebabMenu = document.querySelectorAll(".kebab-container1"); 
    //     if (peopleKebabMenu.length > 1) {
    //         peopleKebabMenu.remove();
    //     }

    //     const pageKebabMenu = document.querySelectorAll(".kebab-container"); 
    //     if (pageKebabMenu.length > 1) {
    //         pageKebabMenu.remove();
    //     }
    // });


    // frameContainer.addEventListener("click", createPage);
    // frameContainer.addEventListener("click", createPeople);

    // // category drag and drop selection

    // function drag(event) {
    //     event.dataTransfer.setData("text", )
    // }



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

    // filter const
    let allQuickFilter = document.getElementById("quick-filter_all");
    let allQuickFilterCount = 0;
    let peopleQuickFilter = document.getElementById("quick-filter_people");
    let peopleQuickFilterCount = 0;
    let pageQuickFilter = document.getElementById("quick-filter_page");
    let pageQuickFilterCount = 0;

    // quick filter actions

    if (allQuickFilter) {
        allQuickFilter.addEventListener("click", function() {
            containerLimit = true;
            allQuickFilterCount = 1;
            quickFilterLogic()
            filterCheck()
            pageSectionLimit()
            peopleSectionLimit()
        });
    }

    if (peopleQuickFilter) {
        peopleQuickFilter.addEventListener("click", function() {
            containerLimit = false;
            peopleQuickFilterCount = 1;
            pageQuickFilterCount = 0;
            allQuickFilterCount = 0;
            console.log(containerLimit)
            quickFilterLogic()
            filterCheck()
            peopleSectionLimit()
        });
    }

    if (pageQuickFilter) {
        pageQuickFilter.addEventListener("click", function() {
            containerLimit = false;
            pageQuickFilterCount = 1;
            peopleQuickFilterCount = 0;
            allQuickFilterCount = 0;
            console.log(containerLimit)
            quickFilterLogic()
            filterCheck()
            pageSectionLimit()
        });
    }

    function quickFilterLogic() {
        console.log("filter flow actioned")
        filterCheck()
        //quick filter conditions
        if (allQuickFilterCount === 1) {

            allQuickFilter.classList.replace("quick-filter_button", "quick-filter_button-active");

            peopleQuickFilterCount = 0;
            peopleQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            pageQuickFilterCount = 0;
            pageQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            if (pageContainer) {
                pageContainer.style.display = ""
            }

            if (peopleContainer) {
                peopleContainer.style.display = ""
            }

        } else if (peopleQuickFilterCount === 1) {

            allQuickFilterCount = 0;
            allQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            pageQuickFilterCount = 0;
            pageQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            if (pageContainer) {
                pageContainer.style.display = "none"
            }

            if (peopleContainer) {
                peopleContainer.style.display = ""
            }

            peopleQuickFilter.classList.replace("quick-filter_button", "quick-filter_button-active");

        } else if (pageQuickFilterCount === 1) {

            let pageRows = pageContainer.querySelectorAll('[id^="page-inlineRow"]');
            let pageCount = pageRows.length;

            allQuickFilterCount = 0;
            allQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            peopleQuickFilterCount = 0;
            peopleQuickFilter.classList.replace("quick-filter_button-active", "quick-filter_button");

            if (pageContainer) {
                pageContainer.style.display = ""
            }

            if (peopleContainer) {
                peopleContainer.style.display = "none"
            }

            pageQuickFilter.classList.replace("quick-filter_button", "quick-filter_button-active");
        }
        return
    };

    function filterCheck() {
        console.log(allQuickFilterCount)
        console.log(peopleQuickFilterCount)
        console.log(pageQuickFilterCount)
    }


    function updateRowCounts() {
        const pageRows = pageContainer.querySelectorAll('[id^="page-inlineRow"]');
        const pageCount = pageRows.length;

        let pageHeader = document.querySelector("#page-header_element");

        if (pageHeader) {
            pageHeader.innerHTML = `
                <img src="icons/page-icon.png">
                <h3 class="content-subtitle_text">Pages (${pageCount})</h3>
                <div class="content-header_line"></div>
            `;

            if (pageCount > 6) {
                pageHeader.innerHTML += `
                    <button id="page-view_more" class="view-more_button">View all</button>
                `;
            }
        }


        const peopleRows = peopleContainer.querySelectorAll('[id^="people-inlineRow"]');
        const peopleCount = peopleRows.length;

        let peopleHeader = document.querySelector("#page-header_element1");

        if (peopleHeader) {
            peopleHeader.innerHTML = `
                <img src="icons/user-icon.png">
                <h3 class="content-subtitle_text">Directory (${peopleCount})</h3>
                <div class="content-header_line"></div>
            `;

            if (peopleCount > 6) {
                peopleHeader.innerHTML += `
                    <button id="people-view_more" class="view-more_button">View all</button>
                `;
            }
        }
    };

    function peopleSectionLimit() {
        let containerMaxItems = 6;

        let peopleChildrenArray = Array.from(peopleContainer.children);
        let peopleChildrenCount = peopleChildrenArray.length

        if (!containerLimit) { 
            
            containerMaxItems = peopleChildrenCount;
            console.log("fasly container limit")
            console.log(peopleChildrenArray)

            for (let i = 0; i < peopleChildrenCount; i++) {
                if (i < containerMaxItems) {
                    peopleChildrenArray[i].style.display = "";
                } else {
                    peopleChildrenArray[i].style.display = "none";
                }
            }
    
        } else {
            for (let i = 0; i < peopleChildrenCount; i++) {
                if (i < containerMaxItems) {
                    peopleChildrenArray[i].style.display = "";
                } else {
                    peopleChildrenArray[i].style.display = "none";
                }
            }
        }

    }

    function pageSectionLimit() {
        let containerMaxItems = 6;
        containerChild = pageContainer.children;

        console.log(containerChild)
        console.log(containerLimit)

        if (!containerLimit) {

            containerMaxItems = pageContainer.children.length
            console.log("falsy page limit")
            console.log(pageContainer.children.length)

            if (pageContainer) {
                for (let i = 0; i < pageContainer.children.length; i++) {
                    if (i < containerMaxItems) {
                        pageContainer.children[i].style.display = "";
                    } else {
                        pageContainer.children[i].style.display = "none";
                    }
                }
            } else {
                console.log("operation not working")
            }
    
        } else {
            if (pageContainer) {
                for (let i = 0; i < pageContainer.children.length; i++) {
                    if (i < containerMaxItems) {
                        pageContainer.children[i].style.display = "";
                    } else {
                        pageContainer.children[i].style.display = "none";
                    }
                }
            } else {
                console.log("operation not working")
            }
        }

    }

    document.body.addEventListener("click", function(event){
        if (event.target && event.target.matches("#people-view_more")) {

            const peopleRows = peopleContainer.querySelectorAll('[id^="people-inlineRow"]');
            const peopleCount = peopleRows.length;
            let peopleHeader = document.querySelector("#page-header_element1");

            containerLimit = false;
            peopleQuickFilterCount = 1;
            pageQuickFilterCount = 0;
            allQuickFilterCount = 0;
            console.log(containerLimit)
            quickFilterLogic()
            filterCheck()
            peopleSectionLimit()

            if (peopleHeader) {
                peopleHeader.innerHTML = `
                <img src="icons/page-icon.png">
                <h3 class="content-subtitle_text">Directory (${peopleCount})</h3>
                <div class="content-header_line"></div>
            `;
            }

        }
    })

    document.body.addEventListener("click", function(event){
        if (event.target && event.target.matches("#page-view_more")) {

            const pageRows = pageContainer.querySelectorAll('[id^="page-inlineRow"]');
            const pageCount = pageRows.length;
            let pageHeader = document.querySelector("#page-header_element");

            containerLimit = false;
            pageQuickFilterCount = 1;
            peopleQuickFilterCount = 0;
            allQuickFilterCount = 0;
            console.log(containerLimit)
            quickFilterLogic()
            filterCheck()
            pageSectionLimit()

            if (pageHeader) {
                pageHeader.innerHTML = `
                <img src="icons/page-icon.png">
                <h3 class="content-subtitle_text">Pages (${pageCount})</h3>
                <div class="content-header_line"></div>
            `;
            }

        }
    })




    if (inlineRow) {
        inlineRow.addEventListener("mouseover", function(){
            inlineRow.classList.replace("inline-row", "inline-row-hover");
            const inlineRowArrow = document.createElement("img");
            inlineRowArrow.innerHTML = `
                <img id="inline-arrow" src="icons/open.png">
            `;
            inlineRow.appendChild(inlineRowArrow);
        });

        inlineRow.addEventListener("mouseout", function(){
            inlineRow.classList.replace("inline-row-hover", "inline-row");
            const inlineRowArrow = document.querySelector("#inline-arrow");
            inlineRowArrow.remove()
        });
    }


});

