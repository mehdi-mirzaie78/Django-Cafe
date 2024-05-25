import { Button, HStack } from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import usePagination, { DOTS } from "../hooks/usePagination";

interface Props {
  onPageChange: (pageNumber: number | string) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <HStack>
      {currentPage !== 1 && (
        <Button leftIcon={<BsArrowLeft size={18} />} onClick={onPrevious}>
          Previous
        </Button>
      )}

      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          const key = `dots${pageNumber}${Math.random()}`;
          return (
            <Button as="div" variant={"ghost"} key={key}>
              {DOTS}
            </Button>
          );
        }

        // Render our Page Pills
        if (pageNumber === currentPage) {
          return (
            <Button
              key={pageNumber}
              colorScheme="blue"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        }
        return (
          <Button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </Button>
        );
      })}

      {currentPage !== lastPage && (
        <Button rightIcon={<BsArrowRight size={18} />} onClick={onNext}>
          Next
        </Button>
      )}
    </HStack>
  );
};

export default Pagination;
