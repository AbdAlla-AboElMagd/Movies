import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function FooterPagination(props) {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [pageInfo, setPageInfo] = useState({
    page: null,
    max: null,
    min: null,
  });

  const [shownPagesBtn, setShownPagesBtn] = useState([]);

  useEffect(() => {
    let minPage = props.min ? parseInt(props.min) : 1;
    let maxPage = props.max ? parseInt(props.max) : 10;
    let currentPage = props.current ? parseInt(props.current) : 1;
    setPageInfo({
      page: currentPage,
      max: maxPage,
      min: minPage,
    });
    console.log("------------------------------------------------------------");
    console.log(minPage);
    console.log(maxPage);
    console.log(currentPage);
    console.log("------------------------------------------------------------");
    console.log(props.min);
    console.log(props.max);
    console.log(currentPage);
    console.log("------------------------------------------------------------");
    console.log(pageInfo.min);
    console.log(pageInfo.max);
    console.log(pageInfo.page);
    console.log("------------------------------------------------------------");

    // let locationSearch = new URLSearchParams(location.search);
    // let page = locationSearch.get("page");
    let page = parseInt(props.current);
    if (maxPage < minPage) {
      let temp = minPage;
      minPage = maxPage;
      maxPage = temp;
    }
    if (page === null) {
      page = 1;
    } else {
      page = parseInt(page);
      if (page < minPage || page > maxPage) {
        page = 1;
        changePage(page);
      }
    }
    setPageInfo({
      page: page,
      max: maxPage,
      min: minPage,
    });

    let maxShownBtns = props.maxShownBtns ? parseInt(props.maxShownBtns) : 5;
    const shownPage = [];
    let start = 0;
    let end = 0;
    if (maxShownBtns >= maxPage - minPage) {
      start = minPage;
      end = maxPage;
    } else {
      if (
        page - maxShownBtns / 2 < minPage &&
        page + maxShownBtns / 2 > maxPage
      ) {
        start = minPage;
        end = maxPage;
      } else if (page - maxShownBtns / 2 < minPage) {
        start = minPage;
        end = minPage + maxShownBtns - 1;
      } else if (page + maxShownBtns / 2 > maxPage) {
        start = maxPage - maxShownBtns + 1;
        end = maxPage;
      } else {
        start = page - Math.floor(maxShownBtns / 2);
        end = start + maxShownBtns;
      }
    }
    for (let i = start; i <= end; i++) {
      shownPage.push(i);
    }

    setShownPagesBtn(shownPage);
  }, []);

  const changePage = (page) => {
    let locationSearch = new URLSearchParams(location.search);
    locationSearch.set("page", page);
    history.push({
      search: locationSearch.toString(),
    });
    // history.push(`?page=${page}`);
    // Goes to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {props.total_results ? (
            <>
              <li
                className={`page-item ${
                  pageInfo.page <= pageInfo.min ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(pageInfo.min)}
                  disabled={pageInfo.page <= pageInfo.min}
                >
                  First
                </button>
              </li>
              <li
                className={`page-item ${
                  pageInfo.page <= pageInfo.min ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(pageInfo.page - 1)}
                  disabled={pageInfo.page <= pageInfo.min}
                >
                  Previous
                </button>
              </li>
              {shownPagesBtn.map((pageNo) => (
                <li
                  key={`pageNo-${pageNo}`}
                  className={`page-item ${
                    pageInfo.page === pageNo ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(pageNo)}
                  >
                    {pageNo}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  pageInfo.page >= pageInfo.max ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(pageInfo.page + 1)}
                  disabled={pageInfo.page >= pageInfo.max}
                >
                  Next
                </button>
              </li>
              <li
                className={`page-item ${
                  pageInfo.page >= pageInfo.max ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(pageInfo.max)}
                  disabled={pageInfo.page >= pageInfo.max}
                >
                  Last
                </button>
              </li>
            </>
          ) : (
            <li className="page-item disabled page-link">No Page</li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default FooterPagination;
