import Link from "next/link";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import Logo from "../public/vercel.svg";
import Image from "next/image";

export function Header() {
  return (
    <nav className="flex items-center justify-between p-6 border-b border-neutral-700">
      <Link href="/">
        <Image priority src={Logo} alt="vercel logo" height={100} width={100} />
      </Link>
      <Link href="/cart">
        <ShoppingCartIcon />
      </Link>
    </nav>
  );
}
