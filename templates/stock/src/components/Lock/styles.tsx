import styled from '@emotion/styled';

export const Main = styled.main`
	position: fixed;
	inset: 0;
	z-index: 9999;

	display: flex;
	align-items: center;
	justify-content: center;

	background:
		radial-gradient(
			circle at top right,
			rgba(99, 102, 241, 0.25),
			transparent 50%
		),
		linear-gradient(180deg, #0f172a 0%, #111c3a 40%, #1a1f3d 100%);

	animation: fadeIn 0.3s ease;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const Container = styled.div`
	width: 420px;
	padding: 3rem;
	border-radius: 24px;

	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(18px);

	box-shadow:
		0 30px 80px rgba(0, 0, 0, 0.35),
		0 0 0 1px rgba(255, 255, 255, 0.05);

	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const UserArea = styled.div`
	text-align: center;

	h1 {
		margin-top: 1rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: #ffffff;
	}

	p {
		font-size: 0.85rem;
		margin-top: 0.5rem;
		color: rgba(255, 255, 255, 0.7);
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const LoginButton = styled.button`
	width: 100%;
	padding: 0.75rem 1rem;

	cursor: pointer;

	border-radius: 12px;
	border: none;

	font-weight: 600;
	color: #ffffff;

	background: linear-gradient(135deg, #6366f1, #4f46e5);
	box-shadow: 0 12px 30px rgba(99, 102, 241, 0.45);

	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 16px 40px rgba(99, 102, 241, 0.6);
	}
`;
