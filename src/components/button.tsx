import React from 'react'

const Button = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props}
                className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            {children}
        </button>
    )
}

export default Button