function setLoaderVisibility (isVisible) {
    const loader = document.getElementById("loader");

    if(loader) {
        loader.style.display = isVisible ? "block" : "none";
    }
};

const initOptions = {
    apiUrl: "https://api.preprod.skjema.no/",
    customerId: "ummo",
    hide: {
        title: false,
        save: false,
        abort: false,
        summary: false,
    }
}

const sessionOptions = {
    singleLogOut: false, 
    idleTimeoutMinutes: 20,
    warningTimeoutMinutes: 3,
    onAuthenticated: (getUser) => {
        getUser() //if you need to get the user's id, invoke getUser.
            .then((user) => {
                alert(`You are logged in as ${user.id}!`);
            });
    },
    onIdleTimeoutWarning: (extendSession, endSession) => {
        const message = "Your session is about to end. Extend session ('OK') or end session ('cancel')?";
        
        if(confirm(message)) {
            extendSession();
        } else {
            endSession();
        }
    },
    onIdleTimeout: () => {
        alert("Your session has ended.");
        window.location = "index.html";
    },
}

function logIn(securityLevel) {
    viewer.logIn({securityLevel});
}

function logOut() {
    removeUser();
    viewer.logOut()
        .then(() => {
            alert("Your session has ended.");
            window.location = "index.html";            
        });
}