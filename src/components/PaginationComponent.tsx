import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

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
            ? "bg-marronFonce text-white rounded-full"
            : "border-4 border-marronFonce rounded-full"
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
              ? "bg-marronFonce text-white rounded-full"
              : "border-4 border-marronFonce rounded-full"
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
      <PaginationContent className="pt-12 font-poppins">
        {renderPaginationItems()}
      </PaginationContent>
    </Pagination>
  );
}
