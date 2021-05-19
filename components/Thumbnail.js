import ButtonSubscribe from "./ButtonSubscribe";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { useAuth } from "../auth/auth";

const Thumbnail = forwardRef(({ result }, ref) => {
  const { user, favorites } = useAuth();

  return (
    <Link href={`/event/${result.id}`}>
      <div
        ref={ref}
        className="bg-accent-200 dark:bg-daccent-200 my-3 sm:mx-3 rounded-2xl p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
      >
        {result.image && (
          <Image
            className="rounded-2xl"
            layout="responsive"
            alt="Event-image"
            src={result.image}
            height={1080}
            width={1920}
          />
        )}
        <div className="p-2">
          <h2 className="truncate mt-1 text-2xl font-bold transition-all duration-100 ease-in-out group-hover:text-success-default">
            {result.title && result.title}
          </h2>
          <p className="flex items-center text-accent-600 dark:text-daccent-600">
            {result.time && `${result.time.toDate().toDateString()} •`}{" "}
            {result.time && `${result.time.toDate().toLocaleTimeString()} •`}{" "}
            {result.category && result.category}
          </p>
          {user && <ButtonSubscribe id={result.id} />}
        </div>
      </div>
    </Link>
  );
});

export default Thumbnail;
