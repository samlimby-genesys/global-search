document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const frameContainer = document.getElementById("dynamic-content_block");
    const clearSearch = document.getElementById("search-clear_button");
    const originalContent = frameContainer.innerHTML;

    // content section
    let isPeopleFilterActive = false;
    let isChatFilterActive = false;
    let isManagementFilterActive = false;
    let isHelpFilterActive = false;

    // filter const
    const allQuickFilter = document.getElementById("quick-filter_all");
    const peopleQuickFilter = document.getElementById("quick-filter_people");
    const chatQuickFilter = document.getElementById("quick-filter_chat");
    const managementQuickFilter = document.getElementById("quick-filter_management");
    const helpQuickFilter = document.getElementById("quick-filter_help");

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

    searchInput.addEventListener("input", function() {
        const keyword = searchInput.value.trim().toLowerCase();
    
        //check if the keyword matches input
        if (keyword === "") {
            frameContainer.innerHTML = originalContent;
            console.log("Input is empty - task complete");
        } else if (keyword === "p") {
            frameContainer.innerHTML = `
                <div class="content-body" id="content-container">
                    <div class="content-section" id="people-section">
                        <div class="content-subtitle">
                            <h3 class="content-subtitle_text">People</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <img class="sm-avatar" src="images/site.png">
                                <div class="inline-text_container">
                                    <h4 class="inline-title_text">USA East Coast Leaders</h4>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">Group members: 45 users</p>
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <img class="sm-avatar" src="images/image3.png">
                                <div class="inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/chat.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <img class="sm-avatar" src="images/image4.png">
                                <div class="inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span> Fields</h4>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">Last signed in: 24 days ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/chat.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="chat-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Chat</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                        <p class="inline-bold-body_text">03/08/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                        <p class="inline-bold-body_text">23/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">quick chat?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">Robert Acton</h4>
                                        <p class="inline-bold-body_text">04/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="management-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Management</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Pete</span>r Jones and he mentioned that you could help with password resetting?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                        <p class="inline-bold-body_text">23/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">quick chat?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">Robert Acton</h4>
                                        <p class="inline-bold-body_text">04/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="help-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.5C4.41563 14.5 1.5 11.5841 1.5 8C1.5 4.41594 4.41563 1.5 8 1.5C11.5844 1.5 14.5 4.41594 14.5 8C14.5 11.5841 11.5844 14.5 8 14.5ZM8 10.5C7.4375 10.5 7 10.9375 7 11.5C7 12.0625 7.40938 12.5 8 12.5C8.53438 12.5 9 12.0625 9 11.5C9 10.9375 8.53438 10.5 8 10.5ZM9.03438 4H7.4375C6.21875 4 5.25 4.96875 5.25 6.1875C5.25 6.59375 5.59375 6.9375 6 6.9375C6.40625 6.9375 6.75 6.59375 6.75 6.1875C6.75 5.8125 7.03438 5.5 7.40938 5.5H9.00625C9.40938 5.5 9.75 5.8125 9.75 6.1875C9.75 6.4375 9.625 6.62813 9.40625 6.75313L7.625 7.84375C7.375 8 7.25 8.25 7.25 8.5V9C7.25 9.40625 7.59375 9.75 8 9.75C8.40625 9.75 8.75 9.40625 8.75 9V8.9375L10.1594 8.0625C10.8156 7.65625 11.2219 6.9375 11.2219 6.1875C11.25 4.96875 10.2812 4 9.03438 4Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Help</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">Platform (Genesys Solutions)</h4>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">The Genesys Business Optimization – Platform solution represents the tools and technologies that manage the infrastructure and configuration of the systems that host all of the products.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                </div>`;
        } else if (keyword === "pe") {
            frameContainer.innerHTML = `
            <div class="content-body" id="content-container">
                <div class="content-section" id="people-section">
                    <div class="content-subtitle">
                        <h3 class="content-subtitle_text">People</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/site.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text">USA East Coast Leaders</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Group members: 45 users</p>
                                </div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image3.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image4.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span> Fields</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 24 days ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="people-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Chat</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">03/08/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="management-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Management</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Pete</span>r Jones and he mentioned that you could help with password resetting?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="help-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.5C4.41563 14.5 1.5 11.5841 1.5 8C1.5 4.41594 4.41563 1.5 8 1.5C11.5844 1.5 14.5 4.41594 14.5 8C14.5 11.5841 11.5844 14.5 8 14.5ZM8 10.5C7.4375 10.5 7 10.9375 7 11.5C7 12.0625 7.40938 12.5 8 12.5C8.53438 12.5 9 12.0625 9 11.5C9 10.9375 8.53438 10.5 8 10.5ZM9.03438 4H7.4375C6.21875 4 5.25 4.96875 5.25 6.1875C5.25 6.59375 5.59375 6.9375 6 6.9375C6.40625 6.9375 6.75 6.59375 6.75 6.1875C6.75 5.8125 7.03438 5.5 7.40938 5.5H9.00625C9.40938 5.5 9.75 5.8125 9.75 6.1875C9.75 6.4375 9.625 6.62813 9.40625 6.75313L7.625 7.84375C7.375 8 7.25 8.25 7.25 8.5V9C7.25 9.40625 7.59375 9.75 8 9.75C8.40625 9.75 8.75 9.40625 8.75 9V8.9375L10.1594 8.0625C10.8156 7.65625 11.2219 6.9375 11.2219 6.1875C11.25 4.96875 10.2812 4 9.03438 4Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Help</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Platform (Genesys Solutions)</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">The Genesys Business Optimization – Platform solution represents the tools and technologies that manage the infrastructure and configuration of the systems that host all of the products.</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                </div>`;
        } else if (keyword === "pet") {
            frameContainer.innerHTML = `
            <div class="content-body" id="content-container">
                <div class="content-section" id="people-section">
                    <div class="content-subtitle">
                        <h3 class="content-subtitle_text">People</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/site.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text">USA East Coast Leaders</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Group members: 45 users</p>
                                </div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image3.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image4.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span> Fields</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 24 days ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="chat-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Chat</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">03/08/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="management-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Management</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Pete</span>r Jones and he mentioned that you could help with password resetting?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="help-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 0C3.5 8125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.5C4.41563 14.5 1.5 11.5841 1.5 8C1.5 4.41594 4.41563 1.5 8 1.5C11.5844 1.5 14.5 4.41594 14.5 8C14.5 11.5841 11.5844 14.5 8 14.5ZM8 10.5C7.4375 10.5 7 10.9375 7 11.5C7 12.0625 7.40938 12.5 8 12.5C8.53438 12.5 9 12.0625 9 11.5C9 10.9375 8.53438 10.5 8 10.5ZM9.03438 4H7.4375C6.21875 4 5.25 4.96875 5.25 6.1875C5.25 6.59375 5.59375 6.9375 6 6.9375C6.40625 6.9375 6.75 6.59375 6.75 6.1875C6.75 5.8125 7.03438 5.5 7.40938 5.5H9.00625C9.40938 5.5 9.75 5.8125 9.75 6.1875C9.75 6.4375 9.625 6.62813 9.40625 6.75313L7.625 7.84375C7.375 8 7.25 8.25 7.25 8.5V9C7.25 9.40625 7.59375 9.75 8 9.75C8.40625 9.75 8.75 9.40625 8.75 9V8.9375L10.1594 8.0625C10.8156 7.65625 11.2219 6.9375 11.2219 6.1875C11.25 4.96875 10.2812 4 9.03438 4Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Help</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Platform (Genesys Solutions)</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">The Genesys Business Optimization – Platform solution represents the tools and technologies that manage the infrastructure and configuration of the systems that host all of the products.</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                </div>`;
        } else if (keyword === "pete") {
            frameContainer.innerHTML = `
            <div class="content-body" id="content-container">
                <div class="content-section" id="people-section">
                    <div class="content-subtitle">
                        <h3 class="content-subtitle_text">People</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/site.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text">USA East Coast Leaders</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Group members: 45 users</p>
                                </div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image3.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <img class="sm-avatar" src="images/image4.png">
                            <div class="inline-text_container">
                                <h4 class="inline-title_text"><span class="text-highlight">Pete</span> Fields</h4>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">Last signed in: 24 days ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/chat.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="chat-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Chat</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">03/08/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="management-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Management</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Pete</span>r Jones and he mentioned that you could help with password resetting?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Pete</span>r Jones</h4>
                                    <p class="inline-bold-body_text">23/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-bold-body_text">quick chat?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Robert Acton</h4>
                                    <p class="inline-bold-body_text">04/07/2024</p>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">So are MRR is projected to be 10k and to get to this we need to improve customer retention, I think <span class="text-highlight">Pete</span>r Jones had and engagement by over 500% next Q. I hope that managable for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                <div class="content-section" id="help-section">
                    <div class="content-subtitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.5C4.41563 14.5 1.5 11.5841 1.5 8C1.5 4.41594 4.41563 1.5 8 1.5C11.5844 1.5 14.5 4.41594 14.5 8C14.5 11.5841 11.5844 14.5 8 14.5ZM8 10.5C7.4375 10.5 7 10.9375 7 11.5C7 12.0625 7.40938 12.5 8 12.5C8.53438 12.5 9 12.0625 9 11.5C9 10.9375 8.53438 10.5 8 10.5ZM9.03438 4H7.4375C6.21875 4 5.25 4.96875 5.25 6.1875C5.25 6.59375 5.59375 6.9375 6 6.9375C6.40625 6.9375 6.75 6.59375 6.75 6.1875C6.75 5.8125 7.03438 5.5 7.40938 5.5H9.00625C9.40938 5.5 9.75 5.8125 9.75 6.1875C9.75 6.4375 9.625 6.62813 9.40625 6.75313L7.625 7.84375C7.375 8 7.25 8.25 7.25 8.5V9C7.25 9.40625 7.59375 9.75 8 9.75C8.40625 9.75 8.75 9.40625 8.75 9V8.9375L10.1594 8.0625C10.8156 7.65625 11.2219 6.9375 11.2219 6.1875C11.25 4.96875 10.2812 4 9.03438 4Z" fill="#3E5374"/>
                        </svg>
                        <h3 class="content-subtitle_text">Help</h3>
                    </div>
                    <div class="inline-row">
                        <div class="inline-row_nested">
                            <div class="inline-text_container">
                                <div class="upper_inline-text_container">
                                    <h4 class="inline-title_text">Platform (Genesys Solutions)</h4>
                                </div>
                                <div class="lower_inline-text_container">
                                    <p class="inline-body_text">The Genesys Business Optimization – Platform solution represents the tools and technologies that manage the infrastructure and configuration of the systems that host all of the products.</p>
                                </div>
                            </div>
                        </div>
                        <div class="quick-action">
                            <div class="quick-action-nested">
                                <img class="chat-icon" src="icons/star.png">
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                        </svg>
                    </div>
                </div>
                </div>`;
        } else if (keyword === "peter") {
            frameContainer.innerHTML = `
                <div class="content-body" id="content-container">
                    <div class="content-section" id="people-section">
                        <div class="content-subtitle">
                            <h3 class="content-subtitle_text">People</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <img class="sm-avatar" src="images/image3.png">
                                <div class="inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Peter</span> Jones</h4>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/chat.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="chat-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Chat</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Peter</span> Jones</h4>
                                        <p class="inline-bold-body_text">03/08/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Peter</span> Jones</h4>
                                        <p class="inline-bold-body_text">23/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">quick chat?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="management-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Management</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Peter</span> Jones and he mentioned that you could help with password resetting?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">(06/05/2022) Customer Interaction Transcription</h4>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">“yeah, so I spoke with your supervisor <span class="text-highlight">Peter</span> Field and he suggested that you could help with password resetting?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                </div>`;
        } else if (keyword === "peter j" || "peter jo" || "peter jon" || "peter jone" || "peter jones") {
            frameContainer.innerHTML = `
                <div class="content-body" id="content-container">
                    <div class="content-section" id="people-section">
                        <div class="content-subtitle">
                            <h3 class="content-subtitle_text">People</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <img class="sm-avatar" src="images/image3.png">
                                <div class="inline-text_container">
                                    <h4 class="inline-title_text"><span class="text-highlight">Peter Jones</span></h4>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">Last signed in: 14 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/chat.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="chat-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.4 2.72588V8.00049C10.4 8.96572 9.6825 9.74775 8.8 9.74775L5.6 9.75049L2.8775 11.4349C2.8225 11.4813 2.76 11.5005 2.7 11.5005C2.545 11.5005 2.4 11.3665 2.4 11.1724V9.75049H1.6C0.71875 9.75049 0 8.96572 0 8.00049V2.72588C0 1.78662 0.71875 1.00049 1.6 1.00049H8.8C9.6825 1.00049 10.4 1.78662 10.4 2.72588ZM3.6 9.47978L5.285 8.43799H8.8C9.0175 8.43799 9.2 8.24111 9.2 8.00049V2.75049C9.2 2.51123 9.0175 2.31299 8.8 2.31299H1.6C1.38125 2.31299 1.2 2.51123 1.2 2.75049V8.00049C1.2 8.24111 1.38125 8.43799 1.6 8.43799H3.6V9.47978ZM6.4 11.5005V10.6255H7.6V11.5005C7.6 11.7384 7.78 11.938 8 11.938H10.715L12.4 12.9798V11.938H14.4C14.6175 11.938 14.8 11.7384 14.8 11.5005V6.25049C14.8 6.0126 14.6175 5.81299 14.4 5.81299H11.2V4.50049H14.4C15.2825 4.50049 16 5.28525 16 6.22588V11.5005C16 12.4657 15.2825 13.2505 14.4 13.2505H13.6V14.6724C13.6 14.8665 13.455 15.0005 13.3 15.0005C13.24 15.0005 13.1775 14.9813 13.1225 14.9349L10.4 13.2505L8 13.2478C7.12 13.2478 6.4 12.4657 6.4 11.5005Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Chat</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Peter Jones</span></h4>
                                        <p class="inline-bold-body_text">03/08/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">Wow that was great Maddy, thanks so much for the presentation</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text"><span class="text-highlight">Peter Jones</span></h4>
                                        <p class="inline-bold-body_text">23/07/2024</p>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-bold-body_text">quick chat?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content-section" id="management-section">
                        <div class="content-subtitle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.07292 3.25C4.07292 2.97375 4.34328 2.75 4.67708 2.75H6.48958C6.82188 2.75 7.09375 2.97375 7.09375 3.25V4.75C7.09375 5.025 6.82188 5.25 6.48958 5.25H4.67708C4.34328 5.25 4.07292 5.025 4.07292 4.75V3.25ZM11.3229 2.75C11.6552 2.75 11.9271 2.97375 11.9271 3.25V4.75C11.9271 5.025 11.6552 5.25 11.3229 5.25H9.51042C9.17813 5.25 8.90625 5.025 8.90625 4.75V3.25C8.90625 2.97375 9.17813 2.75 9.51042 2.75H11.3229ZM4.07292 7.25C4.07292 6.975 4.34328 6.75 4.67708 6.75H6.48958C6.82188 6.75 7.09375 6.975 7.09375 7.25V8.75C7.09375 9.025 6.82188 9.25 6.48958 9.25H4.67708C4.34328 9.25 4.07292 9.025 4.07292 8.75V7.25ZM11.3229 6.75C11.6552 6.75 11.9271 6.975 11.9271 7.25V8.75C11.9271 9.025 11.6552 9.25 11.3229 9.25H9.51042C9.17813 9.25 8.90625 9.025 8.90625 8.75V7.25C8.90625 6.975 9.17813 6.75 9.51042 6.75H11.3229ZM0.75 2C0.75 0.895313 1.83184 0 3.16667 0H12.8333C14.1663 0 15.25 0.895313 15.25 2V14C15.25 15.1031 14.1663 16 12.8333 16H3.16667C1.83184 16 0.75 15.1031 0.75 14V2ZM2.5625 2V14C2.5625 14.275 2.83286 14.5 3.16667 14.5H6.1875V12.5C6.1875 11.6719 6.99935 11 8 11C9.00065 11 9.8125 11.6719 9.8125 12.5V14.5H12.8333C13.1656 14.5 13.4375 14.275 13.4375 14V2C13.4375 1.72375 13.1656 1.5 12.8333 1.5H3.16667C2.83286 1.5 2.5625 1.72375 2.5625 2Z" fill="#3E5374"/>
                            </svg>
                            <h3 class="content-subtitle_text">Management</h3>
                        </div>
                        <div class="inline-row">
                            <div class="inline-row_nested">
                                <div class="inline-text_container">
                                    <div class="upper_inline-text_container">
                                        <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                    </div>
                                    <div class="lower_inline-text_container">
                                        <p class="inline-body_text">“yeah, so I spoke with your manager <span class="text-highlight">Peter Jones</span> and he mentioned that you could help with password resetting?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-action">
                                <div class="quick-action-nested">
                                    <img class="chat-icon" src="icons/star.png">
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                            </svg>
                        </div>
                    </div>
                </div>`;
        } else {
            frameContainer.innerHTML = `
                <div class="content-body" id="content-container">
                    <h3 class="content-subtitle_text">Recent</h3>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <img class="sm-avatar" src="avatar-1.png"/>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">Aakriti Gupta</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Last signed in: 3 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="quick-action">
                                    <div class="quick-action-nested">
                                        <img class="chat-icon" src="chat-icon.png"/>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <img class="sm-avatar" src="avatar-1.png"/>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">Jane Doe</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Last signed in: 23 minutes ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="quick-action">
                                    <div class="quick-action-nested">
                                        <img class="chat-icon" src="chat-icon.png"/>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <img class="sm-avatar" src="avatar-1.png"/>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">test group</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Group members: 45 users</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <circle cx="4" cy="4" r="4" fill="#C6C8CE"/>
                                            </svg>
                                            <p class="inline-body_text">People</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="quick-action">
                                    <div class="quick-action-nested">
                                        <img class="chat-icon" src="star-icon.png"/>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63695 4.22244C4.63695 3.91549 4.93736 3.66688 5.30825 3.66688H7.32214C7.69135 3.66688 7.99344 3.91549 7.99344 4.22244V5.88911C7.99344 6.19466 7.69135 6.44466 7.32214 6.44466H5.30825C4.93736 6.44466 4.63695 6.19466 4.63695 5.88911V4.22244ZM12.6925 3.66688C13.0617 3.66688 13.3638 3.91549 13.3638 4.22244V5.88911C13.3638 6.19466 13.0617 6.44466 12.6925 6.44466H10.6786C10.3094 6.44466 10.0073 6.19466 10.0073 5.88911V4.22244C10.0073 3.91549 10.3094 3.66688 10.6786 3.66688H12.6925ZM4.63695 8.66688C4.63695 8.36133 4.93736 8.11133 5.30825 8.11133H7.32214C7.69135 8.11133 7.99344 8.36133 7.99344 8.66688V10.3336C7.99344 10.6391 7.69135 10.8891 7.32214 10.8891H5.30825C4.93736 10.8891 4.63695 10.6391 4.63695 10.3336V8.66688ZM12.6925 8.11133C13.0617 8.11133 13.3638 8.36133 13.3638 8.66688V10.3336C13.3638 10.6391 13.0617 10.8891 12.6925 10.8891H10.6786C10.3094 10.8891 10.0073 10.6391 10.0073 10.3336V8.66688C10.0073 8.36133 10.3094 8.11133 10.6786 8.11133H12.6925ZM0.944824 2.83355C0.944824 1.60612 2.14686 0.611328 3.63001 0.611328H14.3708C15.8518 0.611328 17.0559 1.60612 17.0559 2.83355V16.1669C17.0559 17.3926 15.8518 18.3891 14.3708 18.3891H3.63001C2.14686 18.3891 0.944824 17.3926 0.944824 16.1669V2.83355ZM2.95871 2.83355V16.1669C2.95871 16.4724 3.25912 16.7224 3.63001 16.7224H6.98649V14.5002C6.98649 13.5801 7.88855 12.8336 9.00038 12.8336C10.1122 12.8336 11.0143 13.5801 11.0143 14.5002V16.7224H14.3708C14.74 16.7224 15.042 16.4724 15.042 16.1669V2.83355C15.042 2.52661 14.74 2.27799 14.3708 2.27799H3.63001C3.25912 2.27799 2.95871 2.52661 2.95871 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">action needed</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">To be used for the customer action needed interaction events</p>
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63695 4.22244C4.63695 3.91549 4.93736 3.66688 5.30825 3.66688H7.32214C7.69135 3.66688 7.99344 3.91549 7.99344 4.22244V5.88911C7.99344 6.19466 7.69135 6.44466 7.32214 6.44466H5.30825C4.93736 6.44466 4.63695 6.19466 4.63695 5.88911V4.22244ZM12.6925 3.66688C13.0617 3.66688 13.3638 3.91549 13.3638 4.22244V5.88911C13.3638 6.19466 13.0617 6.44466 12.6925 6.44466H10.6786C10.3094 6.44466 10.0073 6.19466 10.0073 5.88911V4.22244C10.0073 3.91549 10.3094 3.66688 10.6786 3.66688H12.6925ZM4.63695 8.66688C4.63695 8.36133 4.93736 8.11133 5.30825 8.11133H7.32214C7.69135 8.11133 7.99344 8.36133 7.99344 8.66688V10.3336C7.99344 10.6391 7.69135 10.8891 7.32214 10.8891H5.30825C4.93736 10.8891 4.63695 10.6391 4.63695 10.3336V8.66688ZM12.6925 8.11133C13.0617 8.11133 13.3638 8.36133 13.3638 8.66688V10.3336C13.3638 10.6391 13.0617 10.8891 12.6925 10.8891H10.6786C10.3094 10.8891 10.0073 10.6391 10.0073 10.3336V8.66688C10.0073 8.36133 10.3094 8.11133 10.6786 8.11133H12.6925ZM0.944824 2.83355C0.944824 1.60612 2.14686 0.611328 3.63001 0.611328H14.3708C15.8518 0.611328 17.0559 1.60612 17.0559 2.83355V16.1669C17.0559 17.3926 15.8518 18.3891 14.3708 18.3891H3.63001C2.14686 18.3891 0.944824 17.3926 0.944824 16.1669V2.83355ZM2.95871 2.83355V16.1669C2.95871 16.4724 3.25912 16.7224 3.63001 16.7224H6.98649V14.5002C6.98649 13.5801 7.88855 12.8336 9.00038 12.8336C10.1122 12.8336 11.0143 13.5801 11.0143 14.5002V16.7224H14.3708C14.74 16.7224 15.042 16.4724 15.042 16.1669V2.83355C15.042 2.52661 14.74 2.27799 14.3708 2.27799H3.63001C3.25912 2.27799 2.95871 2.52661 2.95871 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">Virginia-Customer Queue</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Queue for virginia based customer based</p>
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M11.6669 3.63976V9.50043C11.6669 10.5729 10.8697 11.4418 9.88911 11.4418L6.33355 11.4449L3.30855 13.3164C3.24744 13.3681 3.17799 13.3893 3.11133 13.3893C2.93911 13.3893 2.778 13.2405 2.778 13.0247V11.4449H1.88911C0.909939 11.4449 0.111328 10.5729 0.111328 9.50043V3.63976C0.111328 2.59614 0.909939 1.72266 1.88911 1.72266H9.88911C10.8697 1.72266 11.6669 2.59614 11.6669 3.63976ZM4.11133 11.1441L5.98355 9.98654H9.88911C10.1308 9.98654 10.3336 9.76779 10.3336 9.50043V3.6671C10.3336 3.40126 10.1308 3.18099 9.88911 3.18099H1.88911C1.64605 3.18099 1.44466 3.40126 1.44466 3.6671V9.50043C1.44466 9.76779 1.64605 9.98654 1.88911 9.98654H4.11133V11.1441ZM7.22244 13.3893V12.4171H8.55577V13.3893C8.55577 13.6536 8.75577 13.8754 9.00022 13.8754H12.0169L13.8891 15.033V13.8754H16.1113C16.353 13.8754 16.5558 13.6536 16.5558 13.3893V7.55599C16.5558 7.29167 16.353 7.06988 16.1113 7.06988H12.5558V5.61154H16.1113C17.0919 5.61154 17.8891 6.48351 17.8891 7.52865V13.3893C17.8891 14.4618 17.0919 15.3338 16.1113 15.3338H15.2224V16.9136C15.2224 17.1293 15.0613 17.2782 14.8891 17.2782C14.8224 17.2782 14.753 17.2569 14.6919 17.2053L11.6669 15.3338L9.00022 15.3307C8.02244 15.3307 7.22244 14.4618 7.22244 13.3893Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <div class="upper_inline-text_container">
                                            <h4 class="inline-title_text">John Smith</h4>
                                            <p class="inline-footnote_text">03/06/2024</p>
                                        </div>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Queue for virginia based customer based</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="quick-action">
                                    <div class="quick-action_chat-nested">
                                        <img class="chat-icon" src="star-icon.png"/>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63695 4.22244C4.63695 3.91549 4.93736 3.66688 5.30825 3.66688H7.32214C7.69135 3.66688 7.99344 3.91549 7.99344 4.22244V5.88911C7.99344 6.19466 7.69135 6.44466 7.32214 6.44466H5.30825C4.93736 6.44466 4.63695 6.19466 4.63695 5.88911V4.22244ZM12.6925 3.66688C13.0617 3.66688 13.3638 3.91549 13.3638 4.22244V5.88911C13.3638 6.19466 13.0617 6.44466 12.6925 6.44466H10.6786C10.3094 6.44466 10.0073 6.19466 10.0073 5.88911V4.22244C10.0073 3.91549 10.3094 3.66688 10.6786 3.66688H12.6925ZM4.63695 8.66688C4.63695 8.36133 4.93736 8.11133 5.30825 8.11133H7.32214C7.69135 8.11133 7.99344 8.36133 7.99344 8.66688V10.3336C7.99344 10.6391 7.69135 10.8891 7.32214 10.8891H5.30825C4.93736 10.8891 4.63695 10.6391 4.63695 10.3336V8.66688ZM12.6925 8.11133C13.0617 8.11133 13.3638 8.36133 13.3638 8.66688V10.3336C13.3638 10.6391 13.0617 10.8891 12.6925 10.8891H10.6786C10.3094 10.8891 10.0073 10.6391 10.0073 10.3336V8.66688C10.0073 8.36133 10.3094 8.11133 10.6786 8.11133H12.6925ZM0.944824 2.83355C0.944824 1.60612 2.14686 0.611328 3.63001 0.611328H14.3708C15.8518 0.611328 17.0559 1.60612 17.0559 2.83355V16.1669C17.0559 17.3926 15.8518 18.3891 14.3708 18.3891H3.63001C2.14686 18.3891 0.944824 17.3926 0.944824 16.1669V2.83355ZM2.95871 2.83355V16.1669C2.95871 16.4724 3.25912 16.7224 3.63001 16.7224H6.98649V14.5002C6.98649 13.5801 7.88855 12.8336 9.00038 12.8336C10.1122 12.8336 11.0143 13.5801 11.0143 14.5002V16.7224H14.3708C14.74 16.7224 15.042 16.4724 15.042 16.1669V2.83355C15.042 2.52661 14.74 2.27799 14.3708 2.27799H3.63001C3.25912 2.27799 2.95871 2.52661 2.95871 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">(09/09/2023) Customer Interaction Transcription</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">“hello, so I’m experiencing some issues with my healthcare coverage and need to get information on what I can recieve”</p>
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M11.6669 3.63976V9.50043C11.6669 10.5729 10.8697 11.4418 9.88911 11.4418L6.33355 11.4449L3.30855 13.3164C3.24744 13.3681 3.17799 13.3893 3.11133 13.3893C2.93911 13.3893 2.778 13.2405 2.778 13.0247V11.4449H1.88911C0.909939 11.4449 0.111328 10.5729 0.111328 9.50043V3.63976C0.111328 2.59614 0.909939 1.72266 1.88911 1.72266H9.88911C10.8697 1.72266 11.6669 2.59614 11.6669 3.63976ZM4.11133 11.1441L5.98355 9.98654H9.88911C10.1308 9.98654 10.3336 9.76779 10.3336 9.50043V3.6671C10.3336 3.40126 10.1308 3.18099 9.88911 3.18099H1.88911C1.64605 3.18099 1.44466 3.40126 1.44466 3.6671V9.50043C1.44466 9.76779 1.64605 9.98654 1.88911 9.98654H4.11133V11.1441ZM7.22244 13.3893V12.4171H8.55577V13.3893C8.55577 13.6536 8.75577 13.8754 9.00022 13.8754H12.0169L13.8891 15.033V13.8754H16.1113C16.353 13.8754 16.5558 13.6536 16.5558 13.3893V7.55599C16.5558 7.29167 16.353 7.06988 16.1113 7.06988H12.5558V5.61154H16.1113C17.0919 5.61154 17.8891 6.48351 17.8891 7.52865V13.3893C17.8891 14.4618 17.0919 15.3338 16.1113 15.3338H15.2224V16.9136C15.2224 17.1293 15.0613 17.2782 14.8891 17.2782C14.8224 17.2782 14.753 17.2569 14.6919 17.2053L11.6669 15.3338L9.00022 15.3307C8.02244 15.3307 7.22244 14.4618 7.22244 13.3893Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <div class="upper_inline-text_container">
                                            <h4 class="inline-title_text">Jane Doe</h4>
                                            <p class="inline-footnote_text">03/08/2034</p>
                                        </div>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-body_text">Hey, can we have a quick chat?</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="quick-action">
                                    <div class="quick-action_chat-nested">
                                        <img class="chat-icon" src="star-icon.png"/>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63647 4.22244C4.63647 3.91549 4.93687 3.66688 5.30776 3.66688H7.32165C7.69086 3.66688 7.99295 3.91549 7.99295 4.22244V5.88911C7.99295 6.19466 7.69086 6.44466 7.32165 6.44466H5.30776C4.93687 6.44466 4.63647 6.19466 4.63647 5.88911V4.22244ZM12.692 3.66688C13.0612 3.66688 13.3633 3.91549 13.3633 4.22244V5.88911C13.3633 6.19466 13.0612 6.44466 12.692 6.44466H10.6781C10.3089 6.44466 10.0068 6.19466 10.0068 5.88911V4.22244C10.0068 3.91549 10.3089 3.66688 10.6781 3.66688H12.692ZM4.63647 8.66688C4.63647 8.36133 4.93687 8.11133 5.30776 8.11133H7.32165C7.69086 8.11133 7.99295 8.36133 7.99295 8.66688V10.3336C7.99295 10.6391 7.69086 10.8891 7.32165 10.8891H5.30776C4.93687 10.8891 4.63647 10.6391 4.63647 10.3336V8.66688ZM12.692 8.11133C13.0612 8.11133 13.3633 8.36133 13.3633 8.66688V10.3336C13.3633 10.6391 13.0612 10.8891 12.692 10.8891H10.6781C10.3089 10.8891 10.0068 10.6391 10.0068 10.3336V8.66688C10.0068 8.36133 10.3089 8.11133 10.6781 8.11133H12.692ZM0.944336 2.83355C0.944336 1.60612 2.14638 0.611328 3.62952 0.611328H14.3703C15.8513 0.611328 17.0554 1.60612 17.0554 2.83355V16.1669C17.0554 17.3926 15.8513 18.3891 14.3703 18.3891H3.62952C2.14638 18.3891 0.944336 17.3926 0.944336 16.1669V2.83355ZM2.95823 2.83355V16.1669C2.95823 16.4724 3.25863 16.7224 3.62952 16.7224H6.986V14.5002C6.986 13.5801 7.88806 12.8336 8.99989 12.8336C10.1117 12.8336 11.0138 13.5801 11.0138 14.5002V16.7224H14.3703C14.7395 16.7224 15.0416 16.4724 15.0416 16.1669V2.83355C15.0416 2.52661 14.7395 2.27799 14.3703 2.27799H3.62952C3.25863 2.27799 2.95823 2.52661 2.95823 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">Adobe Data Actions</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-bold-body_text">Integrations - Adobe Data Actions - Last updated: 7 months ago</p>
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63647 4.22244C4.63647 3.91549 4.93687 3.66688 5.30776 3.66688H7.32165C7.69086 3.66688 7.99295 3.91549 7.99295 4.22244V5.88911C7.99295 6.19466 7.69086 6.44466 7.32165 6.44466H5.30776C4.93687 6.44466 4.63647 6.19466 4.63647 5.88911V4.22244ZM12.692 3.66688C13.0612 3.66688 13.3633 3.91549 13.3633 4.22244V5.88911C13.3633 6.19466 13.0612 6.44466 12.692 6.44466H10.6781C10.3089 6.44466 10.0068 6.19466 10.0068 5.88911V4.22244C10.0068 3.91549 10.3089 3.66688 10.6781 3.66688H12.692ZM4.63647 8.66688C4.63647 8.36133 4.93687 8.11133 5.30776 8.11133H7.32165C7.69086 8.11133 7.99295 8.36133 7.99295 8.66688V10.3336C7.99295 10.6391 7.69086 10.8891 7.32165 10.8891H5.30776C4.93687 10.8891 4.63647 10.6391 4.63647 10.3336V8.66688ZM12.692 8.11133C13.0612 8.11133 13.3633 8.36133 13.3633 8.66688V10.3336C13.3633 10.6391 13.0612 10.8891 12.692 10.8891H10.6781C10.3089 10.8891 10.0068 10.6391 10.0068 10.3336V8.66688C10.0068 8.36133 10.3089 8.11133 10.6781 8.11133H12.692ZM0.944336 2.83355C0.944336 1.60612 2.14638 0.611328 3.62952 0.611328H14.3703C15.8513 0.611328 17.0554 1.60612 17.0554 2.83355V16.1669C17.0554 17.3926 15.8513 18.3891 14.3703 18.3891H3.62952C2.14638 18.3891 0.944336 17.3926 0.944336 16.1669V2.83355ZM2.95823 2.83355V16.1669C2.95823 16.4724 3.25863 16.7224 3.62952 16.7224H6.986V14.5002C6.986 13.5801 7.88806 12.8336 8.99989 12.8336C10.1117 12.8336 11.0138 13.5801 11.0138 14.5002V16.7224H14.3703C14.7395 16.7224 15.0416 16.4724 15.0416 16.1669V2.83355C15.0416 2.52661 14.7395 2.27799 14.3703 2.27799H3.62952C3.25863 2.27799 2.95823 2.52661 2.95823 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <h4 class="inline-title_text">Roles & Permissions</h4>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63647 4.22244C4.63647 3.91549 4.93687 3.66688 5.30776 3.66688H7.32165C7.69086 3.66688 7.99295 3.91549 7.99295 4.22244V5.88911C7.99295 6.19466 7.69086 6.44466 7.32165 6.44466H5.30776C4.93687 6.44466 4.63647 6.19466 4.63647 5.88911V4.22244ZM12.692 3.66688C13.0612 3.66688 13.3633 3.91549 13.3633 4.22244V5.88911C13.3633 6.19466 13.0612 6.44466 12.692 6.44466H10.6781C10.3089 6.44466 10.0068 6.19466 10.0068 5.88911V4.22244C10.0068 3.91549 10.3089 3.66688 10.6781 3.66688H12.692ZM4.63647 8.66688C4.63647 8.36133 4.93687 8.11133 5.30776 8.11133H7.32165C7.69086 8.11133 7.99295 8.36133 7.99295 8.66688V10.3336C7.99295 10.6391 7.69086 10.8891 7.32165 10.8891H5.30776C4.93687 10.8891 4.63647 10.6391 4.63647 10.3336V8.66688ZM12.692 8.11133C13.0612 8.11133 13.3633 8.36133 13.3633 8.66688V10.3336C13.3633 10.6391 13.0612 10.8891 12.692 10.8891H10.6781C10.3089 10.8891 10.0068 10.6391 10.0068 10.3336V8.66688C10.0068 8.36133 10.3089 8.11133 10.6781 8.11133H12.692ZM0.944336 2.83355C0.944336 1.60612 2.14638 0.611328 3.62952 0.611328H14.3703C15.8513 0.611328 17.0554 1.60612 17.0554 2.83355V16.1669C17.0554 17.3926 15.8513 18.3891 14.3703 18.3891H3.62952C2.14638 18.3891 0.944336 17.3926 0.944336 16.1669V2.83355ZM2.95823 2.83355V16.1669C2.95823 16.4724 3.25863 16.7224 3.62952 16.7224H6.986V14.5002C6.986 13.5801 7.88806 12.8336 8.99989 12.8336C10.1117 12.8336 11.0138 13.5801 11.0138 14.5002V16.7224H14.3703C14.7395 16.7224 15.0416 16.4724 15.0416 16.1669V2.83355C15.0416 2.52661 14.7395 2.27799 14.3703 2.27799H3.62952C3.25863 2.27799 2.95823 2.52661 2.95823 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <h4 class="inline-title_text">Operational Console</h4>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                            <div class="inline-row">
                                <div class="inline-row_nested">
                                    <div class="icon-avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M4.63647 4.22244C4.63647 3.91549 4.93687 3.66688 5.30776 3.66688H7.32165C7.69086 3.66688 7.99295 3.91549 7.99295 4.22244V5.88911C7.99295 6.19466 7.69086 6.44466 7.32165 6.44466H5.30776C4.93687 6.44466 4.63647 6.19466 4.63647 5.88911V4.22244ZM12.692 3.66688C13.0612 3.66688 13.3633 3.91549 13.3633 4.22244V5.88911C13.3633 6.19466 13.0612 6.44466 12.692 6.44466H10.6781C10.3089 6.44466 10.0068 6.19466 10.0068 5.88911V4.22244C10.0068 3.91549 10.3089 3.66688 10.6781 3.66688H12.692ZM4.63647 8.66688C4.63647 8.36133 4.93687 8.11133 5.30776 8.11133H7.32165C7.69086 8.11133 7.99295 8.36133 7.99295 8.66688V10.3336C7.99295 10.6391 7.69086 10.8891 7.32165 10.8891H5.30776C4.93687 10.8891 4.63647 10.6391 4.63647 10.3336V8.66688ZM12.692 8.11133C13.0612 8.11133 13.3633 8.36133 13.3633 8.66688V10.3336C13.3633 10.6391 13.0612 10.8891 12.692 10.8891H10.6781C10.3089 10.8891 10.0068 10.6391 10.0068 10.3336V8.66688C10.0068 8.36133 10.3089 8.11133 10.6781 8.11133H12.692ZM0.944336 2.83355C0.944336 1.60612 2.14638 0.611328 3.62952 0.611328H14.3703C15.8513 0.611328 17.0554 1.60612 17.0554 2.83355V16.1669C17.0554 17.3926 15.8513 18.3891 14.3703 18.3891H3.62952C2.14638 18.3891 0.944336 17.3926 0.944336 16.1669V2.83355ZM2.95823 2.83355V16.1669C2.95823 16.4724 3.25863 16.7224 3.62952 16.7224H6.986V14.5002C6.986 13.5801 7.88806 12.8336 8.99989 12.8336C10.1117 12.8336 11.0138 13.5801 11.0138 14.5002V16.7224H14.3703C14.7395 16.7224 15.0416 16.4724 15.0416 16.1669V2.83355C15.0416 2.52661 14.7395 2.27799 14.3703 2.27799H3.62952C3.25863 2.27799 2.95823 2.52661 2.95823 2.83355Z" fill="#767C8D"/>
                                        </svg>
                                    </div>
                                    <div class="inline-text_container">
                                        <h4 class="inline-title_text">Arlington-Healthcare Queue</h4>
                                        <div class="lower_inline-text_container">
                                            <p class="inline-bold-body_text">action queue for customers dealing with hospitals in Arlington, VA</p>
                                        </div>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M13.5051 3.825V12.075C13.5051 12.5305 13.1353 12.9 12.6794 12.9C12.2235 12.9 11.8536 12.5305 11.8536 12.075V5.81531L3.90581 13.7559C3.74341 13.9209 3.53216 14 3.32091 14C3.10965 14 2.8984 13.9194 2.73704 13.7583C2.41448 13.436 2.41448 12.9141 2.73704 12.5916L10.6873 4.65H4.4219C3.96602 4.65 3.59616 4.28219 3.59616 3.825C3.59616 3.36781 3.96602 3 4.4219 3H12.6794C13.137 3 13.5051 3.37125 13.5051 3.825Z" fill="#A3A7B0"/>
                                </svg>
                            </div>
                </div>`;
        }

        if (isPeopleFilterActive === false) {
            document.getElementById("people-section").style.display = "";
        } else {
            document.getElementById("people-section").style.display = "none";
        }

        if (isChatFilterActive === false) {
            document.getElementById("chat-section").style.display = "";
        } else {
            document.getElementById("chat-section").style.display = "none";
        }

        if (isManagementFilterActive === false) {
            document.getElementById("management-section").style.display = "";
        } else {
            document.getElementById("management-section").style.display = "none";
        }

        if (isHelpFilterActive === false) {
            document.getElementById("help-section").style.display = "";
        } else {
            document.getElementById("help-section").style.display = "none";
        }

    });

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

    peopleQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon");
        let newIcon;
        isPeopleFilterActive = true;

        if (peopleQuickFilter.classList.contains("active")) {
            peopleQuickFilter.classList.remove("active");
            newIcon = createSVGElement(uncheckedQuickFilterIcon);
            document.getElementById("people-section").style.display = '';
            allFilter = false;
        } else {
            peopleQuickFilter.classList.add("active")
            newIcon = createSVGElement(checkedQuickFilterIcon);
            document.getElementById("people-section").style.display = 'none';
        };

        if (newIcon) {
            peopleQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }

    })

    chatQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon-chat");
        let newIcon;
        isChatFilterActive = true;

        if (chatQuickFilter.classList.contains("active")) {
            chatQuickFilter.classList.remove("active");
            newIcon = createSVGElement(uncheckedQuickFilterIconChat);
            document.getElementById("chat-section").style.display = '';
        } else {
            chatQuickFilter.classList.add("active")
            newIcon = createSVGElement(checkedQuickFilterIconChat);
            document.getElementById("chat-section").style.display = 'none';
        };

        if (newIcon) {
            chatQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }
    })

    managementQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon-management");
        let newIcon;
        isManagementFilterActive = true;

        if (managementQuickFilter.classList.contains("active")) {
            managementQuickFilter.classList.remove("active");
            newIcon = createSVGElement(uncheckedQuickFilterIconManagement);
            document.getElementById("management-section").style.display = '';
        } else {
            managementQuickFilter.classList.add("active")
            newIcon = createSVGElement(checkedQuickFilterIconManagement);
            document.getElementById("management-section").style.display = 'none';
        };

        if (newIcon) {
            managementQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }
    })

    helpQuickFilter.addEventListener("click", function() {
        const currentIcon = document.getElementById("quick-filter_icon-help");
        let newIcon;
        isHelpFilterActive = true;

        if (helpQuickFilter.classList.contains("active")) {
            helpQuickFilter.classList.remove("active");
            newIcon = createSVGElement(uncheckedQuickFilterIconHelp);
            document.getElementById("help-section").style.display = '';
        } else {
            helpQuickFilter.classList.add("active")
            newIcon = createSVGElement(checkedQuickFilterIconHelp);
            document.getElementById("help-section").style.display = 'none';
        };

        if (newIcon) {
            helpQuickFilter.replaceChild(newIcon, currentIcon);
        } else {
            console.error ("new icon element was not created");
        }
    })

});
