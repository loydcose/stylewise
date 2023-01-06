import uppercase from "../utils/uppercase"

const Selection = ({ register, type, value }) => {
  return (
    <>
      <input
        type="radio"
        {...register(type)}
        id={value}
        value={value}
        className="opacity-0 absolute"
        required
      />
      <label
        htmlFor={value}
        className="px-5 py-2 ring-gray-400 ring-1 rounded text-sm hover:bg-gray-100 select-none"
      >
        {uppercase(value)}
      </label>
    </>
  )
}

export default Selection