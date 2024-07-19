import "./ContentBox.scss";

function ContentBox({ children }) {
	return (
		<main>
			<div className="content-box">{children}</div>
		</main>
	);
}

export default ContentBox;
