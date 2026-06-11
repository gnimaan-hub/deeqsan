import Link from "next/link";
import type { Book } from "@/lib/books";
import { formatPrice } from "@/lib/books";
import BookCover from "./BookCover";
import T from "./T";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/librairie/${book.slug}`}
      className="surface-textured group flex flex-col items-center rounded-3xl border border-sand/70 bg-surface/60 p-6 text-center shadow-[0_18px_50px_-30px_rgba(15,61,45,0.45)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-jade/40 hover:bg-surface/90 hover:shadow-[0_32px_70px_-26px_rgba(15,61,45,0.4)]"
    >
      <div className="-mt-2 mb-3 transition-transform duration-500 group-hover:-translate-y-1">
        <BookCover title={book.title} author={book.author} cover={book.cover} palette={book.coverPalette} size="sm" />
      </div>
      <span className="rounded-full bg-jade-pale px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-jade-deep transition-colors group-hover:bg-jade group-hover:text-white">
        {book.category}
      </span>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink text-balance">
        {book.title}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{book.author}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-jade-bright">
        <span>
          {book.price != null ? (
            formatPrice(book.price, book.currency)
          ) : (
            <T fr="Prix en librairie" en="Price in-store" />
          )}
        </span>
        <span aria-hidden className="text-ink-soft">&middot;</span>
        <span className="link-underline text-ink-soft transition-colors group-hover:text-coral">
          <T fr="Découvrir" en="Discover" />
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
