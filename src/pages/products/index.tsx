import { useState, useEffect, useReducer } from 'react'
import { useCartStore } from '~/stores/cartStore'

type cartType = {
	id: number
	quantity: number
}

type productType = {
	id: number
	name: string
	description: string
	image: string
	price: number
	category: {
		name: string
		order: number
	}
}

type categoriesType = {
	name: string
	order: number
	products: Array<productType>
}

export default function Products() {
	const [products, setProducts] = useState<productType[]>([])
	const [categories, setCategories] = useState<categoriesType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [productsError, setProductsError] = useState(false)
	const [categoriesError, setCategoriesError] = useState(false)

	const cart = useCartStore((state: any) => state.cart)
	const updateCart = useCartStore((state: any) => state.updateCart)

	function handleAddToCart(product: productType) {
		if (!cart.length) {
			let newCartRequestPayload = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ products: [{ id: product.id, quantity: 1 }] }),
			}

			fetch('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/orders', newCartRequestPayload).then(() =>
				// setCart([...cart, { id: product.id, quantity: 1 }])
				updateCart({ id: product.id, quantity: 1 }),
			)
		} else {
			let cartProductQuantity = cart.find((cartItem: any) => cartItem.id === product.id)?.quantity || 0
			let amendCartRequestPayload = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'update_quantity',
					quantity: cartProductQuantity,
					productId: product.id,
				}),
			}

			fetch(
				`https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/orders/:${product.id}`,
				amendCartRequestPayload,
			).then(() => {
				let amendedCart = () => {
					return cart.map((cartItem: any) => {
						if (cartItem.id === product.id) {
							cartItem.quantity = cartProductQuantity
						}
					})
				}
				updateCart(amendedCart)
			})
		}
	}

	useEffect(() => {
		const getProducts = async () => {
			return await fetch('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/products?norandom')
				.then((data) => data.json())
				.then((data) => setProducts(data))
				.then(() => {
					setIsLoading(false)
					setProductsError(false)
					getCategories()
				})
				.catch(() => {
					setIsLoading(false)
					setProductsError(true)
				})
		}

		const getCategories = async () => {
			return await fetch('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/categories?norandom')
				.then((data) => data.json())
				.then((data) => setCategories(data))
				.then(() => {
					setCategoriesError(false)
				})
				.catch(() => {
					setIsLoading(false)
					setCategoriesError(true)
				})
		}

		getProducts()
	}, [])

	function getProductsByCategory(currentCategory: string) {
		return products.filter((product) => product.category.name === currentCategory)
	}

	if (isLoading) {
		return <p>Loading products...</p>
	}

	if (productsError === true) {
		return <p>Error getting products</p>
	}

	if (categoriesError === true) {
		return <p>Error getting categories</p>
	}

	if (products.length && categories.length) {
		return (
			<div className="products p-4 max-w-7xl m-auto">
				<h1 className="my-8 text-center text-4xl text-bold">Our Products</h1>
				<ul className="products-category-wrapper">
					{categories.map((category, index) => {
						return (
							<>
								<h2 className="mb-4 text-3xl text-bold">{category.name}</h2>
								<ul className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
									{getProductsByCategory(category.name)
										.slice(0, 8)
										.map((product, index) => {
											return (
												<li className="product-item" key={product.id}>
													<div className="product-item__card flex flex-col p-2">
														<img className="mb-2" src={product.image} alt={product.name} />
														<h3 className="mb-1 font-bold">{product.name}</h3>
														<p className="mb-4 line-clamp-3">{product.description}</p>
														<div className="product-item__card-bottom flex justify-between gap-3">
															<span>£{product.price}</span>
															<button
																className="product-item__card-cta px-4 py-1 text-white text-bold bg-orange-800 rounded-md hover:bg-orange-600 hover:transition-colors"
																onClick={() => handleAddToCart(product)}
															>
																Add to cart
															</button>
														</div>
													</div>
												</li>
											)
										})}
								</ul>
							</>
						)
					})}
				</ul>
			</div>
		)
	}
}
