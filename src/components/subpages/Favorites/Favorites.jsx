import { Button } from "../../shared/Button";

export function Favorites({ className }) {
	return (
		<>
			<Button className="bg-sky-500 text-white px-3 py-1 rounded">
				Favorites
			</Button>
			<div>moje ulubione pokemony</div> 
			</>
	);
}
