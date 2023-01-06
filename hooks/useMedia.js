import { useState, useEffect } from "react"

const useMedia = (min) => {
  const [media, setMedia] = useState(false)

  useEffect(() => {
    // set specified min with
    const mediaQuery = window.matchMedia(`(min-width: ${min})`)
    const handleChange = (e) => {
      setMedia(!e.matches)
    }
    // mounting listener to monitor changes overtime
    mediaQuery.addListener(handleChange)
    handleChange(mediaQuery)
  }, [min])

  return media
}

export default useMedia
