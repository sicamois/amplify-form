export const fieldSizeMap: Map<string, string> = new Map([
    ['xs', 'w-14'],
    ['sm', 'w-20'],
    ['md', 'w-36'],
    ['lg', 'w-64'],
    ['xl', 'w-96'],
    ['2xl', 'w-100'],
    ['3xl', 'w-200'],
    ['full', 'w-full'],
    ['max', 'w-max'],
    ['screen', 'w-screen'],
  ]);
  
  export const textColorMap: Map<string | undefined, string> = new Map([
    ['black', 'text-black'],
    ['white', 'text-white'],
    ['gray', 'text-gray-600'],
    ['red', 'text-red-600'],
    ['blue', 'text-blue-600'],
    ['yellow', 'text-yellow-600'],
    ['green', 'text-green-600'],
    ['indigo', 'text-indigo-600'],
    ['purple', 'text-purple-600'],
    ['pink', 'text-pink-600'],
    [undefined, 'text-red-900'],
  ]);
  
  export const peerFocusTextColorMap: Map<string | undefined, string> = new Map([
    ['black', 'peer-focus:text-black'],
    ['white', 'peer-focus:text-white'],
    ['gray', 'peer-focus:text-gray-600'],
    ['red', 'peer-focus:text-red-600'],
    ['blue', 'peer-focus:text-blue-600'],
    ['yellow', 'peer-focus:text-yellow-600'],
    ['green', 'peer-focus:text-green-600'],
    ['indigo', 'peer-focus:text-indigo-600'],
    ['purple', 'peer-focus:text-purple-600'],
    ['pink', 'peer-focus:text-pink-600'],
    [undefined, 'peer-focus:text-red-900'],
  ]);
  
  export const focusBorderColorMap: Map<string | undefined, string> = new Map([
    ['black', 'focus:border-black'],
    ['white', 'focus:border-white'],
    ['gray', 'focus:border-gray-600'],
    ['red', 'focus:border-red-600'],
    ['blue', 'focus:border-blue-600'],
    ['yellow', 'focus:border-yellow-600'],
    ['green', 'focus:border-green-600'],
    ['indigo', 'focus:border-indigo-600'],
    ['purple', 'focus:border-purple-600'],
    ['pink', 'focus:border-pink-600'],
    [undefined, 'focus:border-red-900'],
  ]);
  
  export const bgColorMap: Map<string | undefined, string> = new Map([
    ['black', 'bg-black'],
    ['gray', 'bg-gray-600'],
    ['red', 'bg-red-600'],
    ['blue', 'bg-blue-600'],
    ['yellow', 'bg-yellow-600'],
    ['green', 'bg-green-600'],
    ['indigo', 'bg-indigo-600'],
    ['purple', 'bg-purple-600'],
    ['pink', 'bg-pink-600'],
    [undefined, 'bg-red-900'],
  ]);
  
  export const accentColorMap: Map<string | undefined, string> = new Map([
    ['black', 'accent-black'],
    ['gray', 'accent-gray-600'],
    ['red', 'accent-red-600'],
    ['blue', 'accent-blue-600'],
    ['yellow', 'accent-yellow-600'],
    ['green', 'accent-green-600'],
    ['indigo', 'accent-indigo-600'],
    ['purple', 'accent-purple-600'],
    ['pink', 'accent-pink-600'],
    [undefined, 'accent-red-900'],
  ]);