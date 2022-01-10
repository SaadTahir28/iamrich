import Lottie from 'react-lottie';

export default function LottieAnimation({ height = 400, width = 400, data }) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: data,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className='lottie-animation'>
			<Lottie
				options={defaultOptions}
				height={height}
				width={width}
			/>
		</div>
	);
}
