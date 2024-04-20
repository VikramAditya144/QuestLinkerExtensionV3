const API_URL = "https://scalerquest.onrender.com";
const btn = document.getElementById('generateLinkBtn');



btn.addEventListener("click", async (event) => {
    btn.setAttribute('disabled',true);
    // event.preventDefault();
    let questionNameValue = document.getElementById("username").value.trim().toLowerCase();
    await questionExists(questionNameValue);
    // console.log("C")
});



// Add event listener to the "Contribute" form
document.getElementById("contributionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    contributeQuestion();
});
document.getElementById("contributionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    contributeQuestion();
});
document.getElementById("askQuestionForm").addEventListener("submit", function(event) {
    event.preventDefault();
});

document.getElementById("finding").addEventListener("click", event => {
    event.preventDefault();
    var questioName = document.getElementById('username').value;
    var leetcodeURL = `https://leetcode.com/problemset/?search=${questioName}&page=1`
    chrome.tabs.create({url: leetcodeURL});
});

async function questionExists(question) {
    return fetch(API_URL + "/questionExists/"+question, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        if(data.questionLink === "Not Found"){
            document.getElementById("askQuestionForm").style.display = "none";
            document.getElementById("contributionForm").style.display = "block";
            var questioName = document.getElementById('username').value;
            document.getElementById("finding").innerHTML += `Search ${questioName} on Leetcode`;
        } else {
            chrome.tabs.create({url: data.questionLink})
        }
    });
}


function contributeQuestion() {
    const contributionQuestionLinkValue = document.getElementById("contributionQuestionLink").value.trim();
    const contributorNameValue = document.getElementById("contributorName").value.trim();
    let questionNameValue = document.getElementById("username").value.trim().toLowerCase();
    // console.log(contribu/tionQuestionLinkValue,contributorNameValue)
    // Add the contribution to the queue
    const questionObject = {
        questionName: questionNameValue, 
        questionLink: contributionQuestionLinkValue,
        contributorName: contributorNameValue,
    };

    fetch(API_URL + "/contribute", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionObject)
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then((data) => {
        console.log("Contribution success", data);
    }).catch((error) => {
        console.log('Error during fetch operation:', error);
    });
    
    

    document.getElementById("contributionForm").style.display = "none";
    document.getElementById("askQuestionForm").style.display = "block";
}