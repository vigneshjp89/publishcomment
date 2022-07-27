function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }
  function escapeString(input){
    return input.replaceAll(/('|"|`)/g,(a,b)=>("\\"+b));
  }
  
  module.exports = {
    getOffset,
    emptyOrRows,
    escapeString
  }