import { useCartStore } from '~/stores/cartStore'

export default function CartPage() {
	const cart = useCartStore((state: any) => state.cart)

	// For when we want to change the cart on the cart page
	const updateCart = useCartStore((state: any) => state.updateCart)

	const currentCart = cart.map((cartItem: any) => (
		<div className="cart-item" key={cartItem.id}>
			{cartItem.name}
		</div>
	))

	if (!cart.length) {
		return <h1>Your cart has no items</h1>
	}

	return (
		<div className="cart-page">
			<h1>Your Cart</h1>
			<div className="cart-items">{currentCart}</div>
		</div>
	)
}
