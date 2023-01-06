/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const Item = ({ _id, image, name, price }) => {
  return (
    <Link href={`/products/${_id}`}>
      <div className="rounded overflow-hidden aspect-square">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-gray-600 text-sm md:text-base">{name}</p>
      <span className="block font-semibold">${price}</span>
    </Link>
  )
}

export default Item
