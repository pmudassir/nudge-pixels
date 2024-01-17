export const LibraryNav = () => {
  return (
    <nav className="bg-white shadow-md pl-20 pr-4 py-4 flex items-center justify-between">
      <ul className="flex items-center space-x-4 font-medium cursor-pointer">
        <li>
          <div>
            <a className="underline decoration-solid decoration-4 decoration-red-500 underline-offset-[20px]">
              My Folders
            </a>
          </div>
        </li>
        <li>
          <a>Access Later</a>
        </li>
        <li>
          <a>Shared By Me</a>
        </li>
        <li>
          <a>Shared By Others</a>
        </li>
      </ul>
    </nav>
  );
};
