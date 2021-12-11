export const scrollEvent = (e) => {
    if (window.scrollY >= 100 && document.querySelector('header')) {
      document.querySelector('header').classList.add(['border-b'])
      document.querySelector('header').classList.add(['bg-white'])
    } else {
      document.querySelector('header').classList.remove(['border-b'])
      document.querySelector('header').classList.remove(['bg-white'])
    }
}