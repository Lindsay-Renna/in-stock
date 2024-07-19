import ContentBox from "../../components/ContentBox/ContentBox";
import "./NotFoundPage.scss";

function NotFoundPage() {
	return (
		<ContentBox>
			<div className="error-box">
				<div className="error-box__wrapper">
					<img
						className="error-box__image"
						src="/src/assets/images/kermit.png"
						alt="404 error"
					/>
				</div>
			</div>
		</ContentBox>
	);
}

export default NotFoundPage;
