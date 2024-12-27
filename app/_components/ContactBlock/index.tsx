import Input from "./Input";

export default function ContactBlock() {
	return (
		<div>
			<h1>ContactBlock</h1>
			<form className="flex flex-col gap-4">
				<Input type="text" placeholder="Name" />
				<Input type="email" placeholder="Email" />
				<textarea placeholder="Message" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
}
