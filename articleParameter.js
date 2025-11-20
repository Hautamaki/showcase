
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleIdParameter = urlParams.get('artikkeliId');
    
    if (articleIdParameter) {
        isParameterFound = true;
        console.log('Parameter found:', articleIdParameter);
        showArticle(articleIdParameter, isParameterFound);
    } else {
        isParameterFound = false;
    }
}