import { useEffect, useState } from "react";
import styles from "./Paginate.module.css";

export function Paginate({
  recipesPerPage,
  lengthRecipes,
  paginate,
  currentPage,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [pageNumbersToPaint, setPageNumbersToPaint] = useState(currentPage)
  const totalPages = Math.ceil(lengthRecipes / recipesPerPage);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);
  useEffect(() => {
    setPageNumbersToPaint(currentPage)
  }, [currentPage])

  const calculatePageNumbers = (totalPagesNumber) => {
    const allPageNumbers = [];

    for (let i = 2; i < totalPagesNumber; i++) {
      allPageNumbers.push(i);
    }

    const width = windowWidth;
    let numberOfPages;
    let pageNumbers;

    totalPages <= 7 || width < 750
      ? (numberOfPages = 3)
      : totalPages <= 9 || width < 1050
      ? (numberOfPages = 5)
      : (numberOfPages = 7);

    switch (numberOfPages) {
      case 3:
        if (currentPage === 1) {
          pageNumbers = allPageNumbers.slice(0, 3);
          break;
        }
        if (currentPage === 2) {
          pageNumbers = allPageNumbers.slice(0, 3);
          break;
        }
        if (currentPage === totalPages - 1) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        } else {
          pageNumbers = allPageNumbers.slice(
            currentPage - Math.floor(numberOfPages / 2) - 2,
            currentPage + Math.ceil(numberOfPages / 2) - 2
          );
          break;
        }

      case 5:
        if (currentPage === 1) {
          pageNumbers = allPageNumbers.slice(0, 5);
          break;
        }
        if (currentPage === 2) {
          pageNumbers = allPageNumbers.slice(0, 5);
          break;
        }
        if (currentPage === 3) {
          pageNumbers = allPageNumbers.slice(0, 5);
          break;
        }
        if (currentPage === totalPages - 2) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages - 1) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        } else {
          pageNumbers = allPageNumbers.slice(
            currentPage - Math.floor(numberOfPages / 2) - 2,
            currentPage + Math.ceil(numberOfPages / 2) - 2
          );
          break;
        }

      case 7:
        if (currentPage === 1) {
          pageNumbers = allPageNumbers.slice(0, 7);
          break;
        }
        if (currentPage === 2) {
          pageNumbers = allPageNumbers.slice(0, 7);
          break;
        }
        if (currentPage === 3) {
          pageNumbers = allPageNumbers.slice(0, 7);
          break;
        }
        if (currentPage === 4) {
          pageNumbers = allPageNumbers.slice(0, 7);
          break;
        }
        if (currentPage === totalPages - 3) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages - 2) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages - 1) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        }
        if (currentPage === totalPages) {
          pageNumbers = allPageNumbers.slice(totalPages - numberOfPages - 2);
          break;
        } else {
          pageNumbers = allPageNumbers.slice(
            currentPage - Math.floor(numberOfPages / 2) - 2,
            currentPage + Math.ceil(numberOfPages / 2) - 2
          );
          break;
        }

        default:
          break;
    }

    return pageNumbers;
  };

  useEffect(() => {
    setPageNumbers(calculatePageNumbers(totalPages));
  }, [windowWidth, currentPage, totalPages, calculatePageNumbers]);


  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li
          onClick={(event) => {
            paginate(1);
          }}
          className={
            windowWidth < 750 ? styles.listItemSmallFirst : styles.listItemFirst
          }
          id="1"
          value={pageNumbersToPaint === 1 ? 'focus' : null}>
          1
        </li>

        {pageNumbers?.map((number) => (
          <li
            key={number}
            onClick={(event) => {
              paginate(number);
            }}
            className={
              windowWidth < 750 ? styles.listItemSmall : styles.listItem
            }
            id={number}
            value={+pageNumbersToPaint === +number ? 'focus' : null}>
            {number}
          </li>
        ))}

        <li
          onClick={(event) => {
            paginate(Math.ceil(lengthRecipes / recipesPerPage));
          }}
          className={
            windowWidth < 750 ? styles.listItemSmallLast : styles.listItemLast
          }
          id={Math.ceil(lengthRecipes / recipesPerPage)}
          value={pageNumbersToPaint === 12 ? 'focus' : null}>
          {Math.ceil(lengthRecipes / recipesPerPage) || 2}
        </li>
      </ul>
    </nav>
  );
}
