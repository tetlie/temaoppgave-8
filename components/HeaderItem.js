import Link from "next/link";

export default function HeaderItem({ href, Icon, title }) {
  return (
    <Link href={href}>
      <button className="flex flex-col items-center cursor-pointer group w-12 sm:w-20">
        <Icon className="h-8 mb-1 group-hover:animate-bounce" />
        <p className=" group:focus:bg-success-default opacity-0 group-hover:opacity-100 tracking-widest font-bold">
          {title}
        </p>
      </button>
    </Link>
  );
}
