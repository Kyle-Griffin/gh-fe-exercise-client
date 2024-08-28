import Link from 'next/link'
import { useCartStore } from '~/stores/cartStore'

export default function Header() {
	const cart = useCartStore((state: any) => state.cart)

	function getCartAmount() {
		return cart.length
	}

	return (
		<header className="w-100 flex justify-between bg-slate-400 p-4">
			<ul className="flex gap-8">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/products">Products</Link>
				</li>
			</ul>
			<div className="cart-icon">Cart ({getCartAmount()})</div>
		</header>
	)
}
