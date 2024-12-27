import Input from "./Input";

export default function ContactBlock() {
	return (
		<div>
			<h2 className="text-3xl mb-6">CONTACT</h2>
			<form className="flex flex-col gap-4">
				<Input type="text" placeholder="Name" />
				<Input type="email" placeholder="Email" />
				<textarea placeholder="Message" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
}
