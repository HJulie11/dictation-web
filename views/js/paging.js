/* variables needed:
  - 화면에 보여질 페이지 그룹 = Math.ceil(전체 개수/ 한 페이지에 나타낼 페이지 수);
  - 화면에 보여질 첫번째 페이지 = 화면에 그려질 마지막 페이지 - (한 화면에 나타낼 페이지 - 1) ** 계산된 값이 0 이하이면 첫번째 페이지는 1)
  - 화면에 보여질 마지막 페이지 = 화면에 보여질 페이지 그룹 * 한 화면에 나타낼 페이지 ** 계산된 값이 총 페이지수보다 많으면 마짐가 페이지는 총 페이지 수)
  - 총 페이지 수 = Math.ceil(전체 개수/ 한 페이지에 나타낼 데이터 수);
  */

function renderPagination(currentPage) {
  // 현재 전체 게시물 개수 20개 이하: hide pagination.
  if (_totalCount <= 20) return; 

  var totalPage = Math.ceil(_totalCount / 20); // 총 페이지 수
  var pageGroup = Math.ceil(currentPage / 10); // 화면에 보여질 페이지 그룹

  var last = pageGroup * 10; //화면에 보여질 마지막 페이지
  if (last > totalPage) last = totalPage;
  var first = last - (10 - 1) <= 0 ? 1 : last - (10 - 1); //화면에 보여질 첫번째 페이지
  var next = last + 1;
  var prev = first - 1;

  const fragmentPage = document.createDocumentFragment();
  if (prev > 0) {
    var allpreli = document.createElement('li');
    allpreli.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='allprev'>&lt;&lt;</a>`);

    var preli = document.createElement('li');
      preli.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='prev'>&lt;</a>`);

      fragmentPage.appendChild(allpreli);
      fragmentPage.appendChild(preli);
  }
	
  for (var i = first; i <= last; i++) {
    const li = document.createElement("li");
    li.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='page-${i}' data-num='${i}'>${i}</a>`);
    fragmentPage.appendChild(li);
  }

  if (last < totalPage) {
    var allendli = document.createElement('li');
    allendli.insertAdjacentHTML("beforeend", `<a href='#js-bottom'  id='allnext'>&gt;&gt;</a>`);

    var endli = document.createElement('li');
    endli.insertAdjacentHTML("beforeend", `<a  href='#js-program-detail-bottom'  id='next'>&gt;</a>`);

    fragmentPage.appendChild(endli);
    fragmentPage.appendChild(allendli);
  }

  document.getElementById('js-pagination').appendChild(fragmentPage);
  // 페이지 목록 생성

  $(`#js-pagination a`).removeClass("active");
  $(`#js-pagination a#page-${currentPage}`).addClass("active");

  //pagination 페이지를 클릿했을 때 이벤트를 등록해 페이지 숫자를 서버로 넘김.
  $("#js-pagination a").click(function (e) {
    e.preventDefault();
    var $item = $(this);
    var $id = $item.attr("id");
    var selectedPage = $item.text();
    
    // 이전 or 다음 버튼을 클릿했을 때 페이지 숫자가 아닌 next, prev이면 알맞게 계산된 값을 페이지 숫자로 넘김.
    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    // 버튼을 클릭했을 때 페이지 숫자가 아닌 첫번째 페이지와 마지막 페이지를 넘겨줌.
    if ($id == "allprev") selectedPage = 1;
    if ($id == "allnext") selectedPage = totalPage;

    list.renderPagination(selectedPage);//페이지네이션 그리는 함수
    list.search(selectedPage);//페이지 그리는 함수
  });
};
profile
