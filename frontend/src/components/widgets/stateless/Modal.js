function Modal({ options, state, children }) {
  return (
    state.open && (
      <div
        id="modal-background"
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
        onClick={() => {
          if (options.backgroundClose) {
            state.setOpen(false)
          }
        }}
      >
        <div
          className="w-full h-full sm:h-auto sm:w-[400px] bg-white p-4 rounded-sm max-h-[770px] overflow-scroll overflow-x-hidden custom-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full">
            <div>
              {options.closeButtonType === 1 && (
                <i
                  className="text-xl fas fa-chevron-left text-[#424242] cursor-pointer hover:text-yellow-500"
                  onClick={() => state.setOpen(false)}
                ></i>
              )}
            </div>
            <div>
              {options.closeButtonType === 2 && (
                <i
                  className="text-xl fas fa-times text-[#424242] cursor-pointer hover:text-yellow-500"
                  onClick={() => state.setOpen(false)}
                ></i>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal
