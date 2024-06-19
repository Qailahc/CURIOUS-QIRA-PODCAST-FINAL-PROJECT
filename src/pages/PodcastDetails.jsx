import React from "react";

const PodcastDetails= () => {
    return <div></div>;
};
//id endpoint ,useparams, hooks or context
function getPodcastIdFromUrl(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]); // Extract query parameters
  
    const podcastId = urlParams.get('id');
    return podcastId;
  }
  //{id}
  const link = "https://podcast-api.netlify.app/id/{id}"; // Replace with your actual link
  
  const extractedId = getPodcastIdFromUrl(link);
  
  if (extractedId) {
    console.log("Extracted ID:", extractedId); // Output: Extracted ID: 123
    // Use the extracted ID here (e.g., fetch podcast data using the ID)
  } else {
    console.warn("ID not found in the URL:", link);
  }
  

export default PodcastDetails;