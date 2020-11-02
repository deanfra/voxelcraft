// Built with tailwind styling framework


// color
export const purple = 'purple-600'
export const darkPurple = 'purple-900'
export const lightGray = 'gray-700'
export const gray = 'gray-800'
export const darkGray = 'gray-900'

export const listItemClass = `flex`

// panel
export const panelClass = `absolute top-0 left-0 p-3 bg-${darkGray} text-white w-64 h-screen z-10 overflow-y-auto`
export const panelClassHidden = 'h-0 w-0 invisible opacity-0 overflow-hidden'
export const drawerClass = `ml-64 z-1 border-l border-${lightGray}`
export const blockSelectorWrap = `flex space-between flex-wrap h-40 overflow-y-auto p-2 bg-${gray}`

// type
export const h2Class = 'text-lg mt-4 mb-3'
export const h3Class = 'text-md mt-4 mb-3'

// btns
export const btnHoverClass = 'bg-'+purple
export const btnClass = `bg-transparent hover:${btnHoverClass} text-white hover:text-white py-1 px-4 border border-${lightGray} hover:border-transparent`
export const btnBlockClass = 'border-2 border-transparent hover:border-'+lightGray
export const btnBlockSelectedClass = 'border-'+purple

// inputs
export const inputClass = `bg-transparent text-white py-1 px-4 border border-${lightGray} w-16`
export const configLabel = `flex hover:${gray} py-1 px-2 cursor-pointer`

// modal
export const modalClass = 'left-0 right-0 top-0 bottom-0 fixed z-20 bg-gradient-to-r from-blue-500 to-purple-700 flex justify-center items-center'
export const modalClosedClass = modalClass+' bg-opacity-0 invisible h-0 w-0'
export const modalOpenedClass = modalClass+' bg-opacity-1 visible'
export const modalInnerClass = 'bg-white py-5 px-8 overflow-y-auto max-w-xl height-56 w-full relative'
export const modalCopyClass = `absolute m-1 right-0 top-0 ${btnClass} text-white bg-${purple} hover:bg-${darkPurple}`
export const modalCloseClass = `absolute m-1 right-0 top-0 ${btnClass} text-${lightGray} border-none`
export const modalCodeClass = `w-full border border-${purple} h-32 p-2 mb-1`
