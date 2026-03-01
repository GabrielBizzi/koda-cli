import styled from '@emotion/styled';

export const Wrapper = styled.div`
	display: flex;

	align-items: center;
	gap: 20px;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
`;

export const UserName = styled.span`
	font-size: 14px;
	font-weight: 500;
	color: var(--text-primary);
`;

export const Version = styled.span`
	font-size: 12px;
	color: var(--text-muted);
`;

export const UserActions = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
	color: var(--text-secondary);
	font-size: 13px;
	font-weight: 500;

	transition: color 0.2s ease;

	&:hover {
		color: #6366f1;
	}
`;

export const LogoutText = styled.span``;

export const AvatarCircle = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background: #2f344a;
	color: white;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 500;
	font-size: 14px;

	transition: transform 0.15s ease;
`;

export const VerticalLine = styled.span`
	width: 1px;
	height: 32px;
	background: var(--border-subtle);
`;
