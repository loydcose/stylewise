/* eslint-disable @next/next/no-img-element */
const HeroImage = () => {
  return (
    <div className="grid-cols-3 absolute hidden md:w-[500px] md:grid -right-24 md:right-0 gap-4 -z-20 w-[70vw]">
      <div className="absolute w-full h-full bg-gradient-to-r from-white to-black/[.0] lg:bg-none"></div>
      <div className="row-start-2 row-end-4 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFwcGFyZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-3 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1562262199-f6b3dfb3ec43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFwcGFyZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-3 col-end-4 row-start-2 row-end-4 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFwcGFyZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-1 col-end-2 row-start-4 row-end-6 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1630079632812-ad825086ac4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXBwYXJlbHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-5 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBwYXJlbHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-3 col-end-4 row-start-4 row-end-6 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1561375962-4e4db9d9afa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGFyZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-2 col-end-3 row-start-5 row-end-7 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579969406275-0b37fa82deca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBwYXJlbHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default HeroImage
