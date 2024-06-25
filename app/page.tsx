import { CreateButton } from "@/components/buttons";
import ContactTable from "@/components/contact-table";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { TableSkeleton } from "@/components/skeleton";
import { getContacPages } from "@/lib/data";
import { Suspense } from "react";

export default async function Contacts({
  searchParams,
}: {
  searchParams?: {
    search: string;
    page: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getContacPages(search);
  
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={search + currentPage} fallback={<TableSkeleton />}>
        <ContactTable search={search} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
