'use client'
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
    winter: 'winter',
    dracula: 'dracula'
}

const ThemeToggle = () => {
    const [theme, setTheme] = useState(themes.winter);

    function changeTheme(){
        const newTheme = theme === themes.winter ? themes.dracula : themes.winter
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', theme);
    }

  return (
    <button className='btn btn-outline btn-sm' onClick={changeTheme}>
        {theme === themes.winter ? <BsMoonFill className='h-4 w-4'/>: <BsSunFill className='h-4 w-4'/>}
    </button>
  )
}

export default ThemeToggle