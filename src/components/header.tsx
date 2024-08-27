import Link from 'next/link'

export default function Header() {
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
		</header>
	)
}
