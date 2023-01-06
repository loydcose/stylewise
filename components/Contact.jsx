/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import React, { useEffect, useState } from "react"

const Contact = ({ session, register }) => {
  const { email, firstName, lastName } = session

  // fetch userInfo and use it as default value for each field
  const [formData, setFormData] = useState({})
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`/api/order/${session.id}`)
      setFormData(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchFormData()
  }, [session])

  return (
    <div>
      <h2 className="font-bold mb-3">Contact Information</h2>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-gray-500 mb-2 block text-sm font-medium"
        >
          Email address
        </label>
        <input
          type="email"
          {...register("email")}
          className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
          pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
          value={email}
          readOnly
          required
        />
      </div>
      <hr className="mb-6" />
      <h2 className="font-semibold mb-3">Shipping Information</h2>
      <div className="flex flex-col gap-4 lg:flex-row mb-4">
        <div className="grow">
          <label
            htmlFor="firstName"
            className="text-gray-600 mb-2 block text-sm font-medium"
          >
            First name
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
            value={firstName}
            readOnly
            required
          />
        </div>
        <div className="grow">
          <label
            htmlFor="lastName"
            className="text-gray-600 mb-2 block text-sm font-medium"
          >
            Last name
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
            value={lastName}
            readOnly
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="company"
          className="text-gray-500 mb-2 block text-sm font-medium"
        >
          Company
        </label>
        <input
          type="text"
          {...register("company")}
          className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
          defaultValue={formData?.company || ""}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="text-gray-500 mb-2 block text-sm font-medium"
        >
          Address
        </label>
        <input
          type="text"
          {...register("address")}
          className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
          defaultValue={formData?.address || ""}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="apartment"
          className="text-gray-500 mb-2 block text-sm font-medium"
        >
          Apartment, suite, etc.
        </label>
        <input
          type="text"
          {...register("apartment")}
          className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
          defaultValue={formData?.apartment || ""}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row mb-4">
        <div className="grow">
          <label
            htmlFor="city"
            className="text-gray-500 mb-2 block text-sm font-medium"
          >
            City
          </label>
          <input
            type="text"
            {...register("city")}
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
            defaultValue={formData?.city || ""}
            required
          />
        </div>
        <div className="grow">
          <label
            htmlFor="country"
            className="text-gray-500 mb-2 block text-sm font-medium"
          >
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
            defaultValue={formData?.country || ""}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row mb-4">
        <div className="grow">
          <label
            htmlFor="province"
            className="text-gray-500 mb-2 block text-sm font-medium"
          >
            State / Province
          </label>
          <input
            type="text"
            {...register("province")}
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
            defaultValue={formData?.province || ""}
            required
          />
        </div>
        <div className="grow">
          <label
            htmlFor="postal"
            className="text-gray-500 mb-2 block text-sm font-medium"
          >
            Postal code
          </label>
          <input
            type="text"
            className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
            {...register("postal")}
            defaultValue={formData?.postal || ""}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="contactNumber"
          className="text-gray-500 mb-2 block text-sm font-medium"
        >
          Phone
        </label>
        <input
          type="text"
          {...register("contactNumber")}
          className="focus:ring-violet-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
          defaultValue={formData?.contactNumber || ""}
          pattern="^(\+?\d{1,2}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$"
          required
        />
      </div>
    </div>
  )
}

export default Contact
