import { useEffect, useState } from "react"

export const useCustomHook = () => {

    const [value, setValue] = useState('any value from custom hook')

    useEffect(() => {

    }, [])

    const anyMethod = () =>{
      ''
    }

    return value
}