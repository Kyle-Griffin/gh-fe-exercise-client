import { create } from 'zustand'

type cartType = {
	cart: any
	updateCart: (by: Object) => void
	clearCart: () => void
}

export const useCartStore = create<cartType>((set) => ({
	cart: [],
	updateCart: (newCartItem: any) =>
		set((state: any) => ({
			cart: [...state.cart, newCartItem],
		})),
	clearCart: () => set({ cart: null }),
}))
