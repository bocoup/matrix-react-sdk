import {Key} from '../../../Keyboard';
import React, {useEffect, useRef} from 'react';

const eventNames = {
	[Key.ARROW_DOWN]: 'next',
	[Key.ARROW_UP]: 'previous',
	[Key.HOME]: 'first',
	[Key.END]: 'last'
};

export default ({children, onChange, ...props}) => {
	const elRef = useRef(null);

	useEffect(() => {
		const handleKeyPress = (event) => {
			const eventName = eventNames[event.key];
			if (!eventName) {
				return;
			}
			onChange(eventName);
			event.preventDefault();
			event.stopPropagation();
		};
		const handleFocus = () => onChange('enter');

		elRef.current.addEventListener('keydown', handleKeyPress, true);
		elRef.current.addEventListener('focus', handleFocus, true);

		return () => {
			elRef.current.removeEventListener('keydown', handleKeyPress, true);
			elRef.current.removeEventListener('focus', handleFocus, true);
		};
	}, [onChange]);

	return <div ref={elRef} role="listbox" tabIndex="0" {...props}>
		{children}
	</div>;
};
