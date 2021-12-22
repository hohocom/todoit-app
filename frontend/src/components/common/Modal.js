function Modal({
  options = { backgroundClose: true, closeButtonType: 1 },
  state,
  children,
}) {
  return (
    state.open && (
      <div
        id="modal-background"
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/70"
        onClick={() => {
          if (options.backgroundClose) {
            if (state.setOpen) {
              state.setOpen(false);
            } else if (state.close) {
              state.close();
            }
          }
        }}
      >
        <div
          className="w-full h-full sm:h-auto sm:w-[400px] bg-white p-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full">
            <div>
              {options.closeButtonType === 1 && (
                <i
                  className="text-xl fas fa-chevron-left text-[#424242] cursor-pointer hover:text-yellow-500"
                  onClick={() => {
                    if (state.setOpen) {
                      state.setOpen(false);
                    } else if (state.close) {
                      state.close();
                    }
                  }}
                ></i>
              )}
            </div>
            <div>
              {options.closeButtonType === 2 && (
                <i
                  className="text-xl fas fa-times text-[#424242] cursor-pointer hover:text-yellow-500"
                  onClick={() => {
                    if (state.setOpen) {
                      state.setOpen(false);
                    } else if (state.close) {
                      state.close();
                    }
                  }}
                ></i>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;
