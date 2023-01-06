/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import uppercase from "../utils/uppercase"

const CategoryItem = ({ category, image }) => {
  return (
    <Link
      href={`/products?category=${category}`}
      className="isolate relative rounded overflow-hidden aspect-[3/4]"
    >
      <img
        src={image}
        alt={category}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
      <div className="bg-gradient-to-t pointer-events-none to-transparent from-black/[.5] absolute inset-0 z-10"></div>
      <p className="font-medium bottom-4 z-10 left-1/2 -translate-x-1/2 text-white absolute">
        {uppercase(category)}
      </p>
    </Link>
  )
}

export default CategoryItem
