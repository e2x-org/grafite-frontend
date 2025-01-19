import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="text-center mt-10">
			<h1 className="text-6xl">grafite.</h1>
			<h1>sometimes all it takes is a shit ton of data and some coffee.</h1>
			<div className="inline-grid mt-3 grid-cols-2 gap-4">
				<Button>sign up</Button>
				<Button>sign in</Button>
			</div>
		</div>
	);
}
