function MenuItems({ menu }) {
  return (
    <div className="justify-between items-center w-full flex w-auto order-1">
      <ul className="flex mt-4 flex-row space-x-8 mt-0">
        {menu.map((item) => (
          <li>
            <a
              href={item.href}
              className="block py-2 pr-4 pl-3 text-white rounded"
              aria-current="page"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Nav({ menu }) {
  return (
    <nav className="bg-[#232323] px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" className="h-6 sm:h-9" alt="Nervos Logo" />
        </a>
        <MenuItems menu={menu} />
      </div>
    </nav>
  );
}
