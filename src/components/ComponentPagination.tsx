import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) {
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPaginationItems = () => {
    const items: JSX.Element[] = [];
    const showStartEllipsis = currentPage > 2;

    // Ajoute la première page
    items.push(
      <PaginationItem
        key={1}
        className={
          currentPage === 1
            ? "bg-primary text-white rounded"
            : "border-2 border-gray-200 rounded"
        }
      >
        <PaginationLink href="#" onClick={() => handlePageChange(1)}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Affiche l'ellipse de début si on est loin des premières pages
    if (showStartEllipsis) {
      items.push(<PaginationEllipsis key="ellipsis-start" />);
    }

    // Détermine les pages centrales autour de la page actuelle
    const startPage = showStartEllipsis ? currentPage - 1 : 2;
    const endPage = Math.min(currentPage + 5, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem
          key={i}
          className={
            i === currentPage
              ? "bg-primary text-white rounded"
              : "border-2 border-gray-200 rounded"
          }
        >
          <PaginationLink href="#" onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent className="">
        {renderPaginationItems()}
      </PaginationContent>
    </Pagination>
  );
}
