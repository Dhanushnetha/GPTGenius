'use client'
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  sunset: 'sunset',
  cupcake: 'cupcake'
}

const ThemeToggle = () => {
    const [theme, setTheme] = useState(themes.cupcake);

    function changeTheme(){
        const newTheme = theme === themes.cupcake ? themes.sunset : themes.cupcake
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', theme);
    }

  return (
    <button className='btn btn-outline btn-sm' onClick={changeTheme}>
        {theme === themes.cupcake ? <BsMoonFill className='h-4 w-4'/>: <BsSunFill className='h-4 w-4'/>}
    </button>
  )
}

export default ThemeToggle