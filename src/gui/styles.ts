// Built with tailwind styling framework


// color
export const purple = 'purple-600'
export const darkPurple = 'purple-900'
export const gray = 'gray-600'

export const listItemClass = `flex`

// panel
export const panelClass = 'absolute top-0 left-0 p-3 bg-gray-900 text-white w-64 h-screen z-10 overflow-y-auto'
export const panelClassHidden = 'h-0 w-0 invisible opacity-0 overflow-hidden'
export const drawerClass = `ml-64 z-1 border-l border-${gray}`

// type
export const h2Class = 'text-lg mt-4 mb-3'
export const h3Class = 'text-md mt-4 mb-3'

// btns
export const btnHoverClass = 'bg-'+purple
export const btnClass = `bg-transparent hover:${btnHoverClass} text-white hover:text-white py-1 px-4 border border-${gray} hover:border-transparent`
export const btnBlockClass = 'inline-block border-2 mr-2 border-transparent'
export const btnBlockSelectedClass = 'border-'+purple

// inputs
export const inputClass = `bg-transparent text-white py-1 px-4 border border-${gray} w-16`

// modal
export const modalClass = 'left-0 right-0 top-0 bottom-0 fixed z-20 bg-gradient-to-r from-blue-500 to-purple-700 flex justify-center items-center'
export const modalClosedClass = modalClass + ' bg-opacity-0 invisible h-0 w-0'
export const modalOpenedClass = modalClass + ' bg-opacity-1 visible'
export const modalInnerClass = 'bg-white py-5 px-8 overflow-y-auto max-w-xl height-56 w-full relative'
export const modalCopyClass = `absolute m-1 right-0 top-0 ${btnClass} text-white bg-${purple} hover:bg-${darkPurple}`
export const modalCloseClass = `absolute m-1 right-0 top-0 ${btnClass} text-${gray} border-none`
export const modalCodeClass = `w-full border border-${purple} h-32 p-2 mb-1`
