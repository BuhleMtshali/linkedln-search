let feedContainerElement = document.querySelector(".feed-container");

// Function for refreshing the feed page
document.getElementById("logo-container").addEventListener("click", () => {
  let linkedinFeedUrl =
    "https://www.linkedin.com/feed/update/urn:li:activity:7219434359085252608";
  getFeed(linkedinFeedUrl);
});

// getFeed function for homepage
function getFeed(url) {
  let apiUrl = "https://linkedin-api8.p.rapidapi.com/get-post";
  const options = {
    params: {
      url: url, // Pass LinkedIn URL as a parameter
    },
    headers: {
      "x-rapidapi-key": "eea6a34f4dmsh296963a5654d19ep13d93ajsn94fa453c501f",
      "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
    },
  };
  axios
    .get(apiUrl, options)
    .then(renderFeed)
    .catch((error) => console.error(error));
}

// Function for rendering feed
function renderFeed(response) {
  let html = "";
  let feedResults = response.data.data;

  console.log(feedResults);
  const userName = feedResults.author.firstName;
  const lastName = feedResults.author.lastName;
  const headLine = feedResults.author.headline;
  const profilePic = feedResults.author.profilePictures[1].url;
  const postTitle = feedResults.article.title;
  const subTitle = feedResults.article.subtitle;
  const textUrl = feedResults.postUrl;
  const textArticle = feedResults.text;
  html = `
            <div class="profle-container">
            <div class="img">
            <img src="${profilePic}"/>
            </div>
            <div class="user">
            <h1>${userName} ${lastName} <i class="fa-solid fa-briefcase"></i></h1>
            <h3>${headLine}</h3>
            </div>
            </div>
            <div class="post-container">
            <h2>${postTitle}</h2>
            <a href="${textUrl}" target="_black">${subTitle}</a>
            <p>${textArticle}</p>
            </div>
            <div class="reactions"></div>
        `;
  feedContainerElement.innerHTML = html;
}
