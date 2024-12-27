type InputProps = {
	type: string;
	placeholder: string;
};

export default function Input({ type, placeholder }: InputProps) {
	return <input type={type} placeholder={placeholder} />;
}
