import { Logo } from "./Logo"
import { HeaderMenu } from "./header-menu/HeaderMenu"
import { SearchInput } from "./SearchInput"
import { HeaderCatalog } from "./HeaderCatalog"

export function Header() {
  return (
    <div className="p-5 gap-x-4 flex items-center bg-white border-b h-[80px]">
      <Logo />

      <HeaderCatalog />

      <div className="ml-auto hidden w-[40%] lg:block">
        <SearchInput />
      </div>

      <HeaderMenu />
    </div>
  )
}
