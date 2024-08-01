
"use client"
import styles from '@/styles/Stacks.module.scss'
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
   totalPages: number;
   req?: string;
   select?: string;
   page?: Number,
}

export default function Pagination({
   totalPages,
   req,
   select,
   page,
}: PaginationProps) {
   const params = useSearchParams()
   function generatePageLink(page: number) {
      const searchParamsUrl = new URLSearchParams(
         {
            select: `${select || ''}`,
            req: `${req || ''}`,
            page: `${page}`,
         }
      );

      return `/stacks?${searchParamsUrl.toString()}`;
   }

   return (
      <div className={styles.pagination}>

         {totalPages > 1 && (
            <div className={styles.pagination}>
               {Number(page) != 1 ? (
                  <Link
                     href={generatePageLink(Number(page) - 1)}
                  >
                     Previous page
                  </Link>
               ) : (
                  <div>

                  </div>
               )}



               <span >
                  Page {Number(page)} of {totalPages}
               </span>
               {Number(page) != totalPages ? (
                  <Link
                     href={generatePageLink(Number(page) + 1)}

                  >
                     Next page
                  </Link>
               ) : (
                  <div>

                  </div>
               )}
            </div>

         )}
      </div>
   );
}