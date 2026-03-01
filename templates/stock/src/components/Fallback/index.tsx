export const LoadingFallback = () => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '2rem',
			height: '100vh',
			width: '100vw',
			overflow: 'hidden',
		}}
	>
		<div id="bounce-1" className="bounce" />
	</div>
);
