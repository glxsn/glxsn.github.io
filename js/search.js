// 显示搜索结果
function displayResults(results) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">没有找到相关文章</div>';
    return;
  }

  results.forEach((article) => {
    const resultItem = document.createElement("div");
    resultItem.className = "search-result-item";
    resultItem.innerHTML = `
      <div class="search-result-title">${highlightText(
        article.title,
        searchInput.value
      )}</div>
      <div class="search-result-excerpt">${highlightText(
        article.excerpt,
        searchInput.value
      )}</div>
      <div class="search-result-source">来自: ${article.url}</div>
    `;
    
    resultItem.addEventListener("click", function() {
      if (article.url === window.location.pathname.split("/").pop() || 
          (article.url === "index.html" && window.location.pathname.endsWith("/"))) {
        // 当前页面，滚动到对应位置
        const element = document.getElementById(article.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // 其他页面，跳转并添加hash
        window.location.href = `${article.url}#${article.id}`;
      }
      searchResults.style.display = "none";
    });
    
    resultsContainer.appendChild(resultItem);
  });
}
