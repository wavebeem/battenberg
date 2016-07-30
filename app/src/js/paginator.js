function Paginator(pageSize, currentPage, data) {
  function pageCount() {
    return Math.ceil(data.length / pageSize);
  }

  function isOnFirstPage() {
    return currentPage === 1;
  }

  function isOnLastPage(n) {
    return currentPage === pageCount();
  }

  function goToPrevPage() {
    currentPage = Math.max(currentPage - 1, 0);
  }

  function goToNextPage() {
    currentPage = Math.min(currentPage + 1, pageCount());
  }

  function currentPageData() {
    const i = currentPage - 1;
    return data.slice(i * pageSize, (i + 1) * pageSize);
  }

  return {
    pageCount,
    isOnFirstPage,
    isOnLastPage,
    goToPrevPage,
    goToNextPage,
    currentPageData
  };
}

module.exports = Paginator;
