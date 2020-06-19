import {Key} from '../../../Keyboard';
import React, {useEffect, useRef} from 'react';

const setActive = (target, key) => {
	const options = Array.from(target.querySelectorAll('[role=option]'));
	const currentIndex = options
		.findIndex((el) => el.getAttribute('aria-selected'));

	let newIndex;
	if (key === Key.ARROW_DOWN) {
		newIndex = currentIndex + 1;
	} else if (key === Key.ARROW_UP) {
		newIndex = currentIndex - 1;
	} else if (key === Key.HOME) {
		newIndex = 0;
	} else if (key === Key.END) {
		newIndex = options.length - 1;
	} else {
		return;
	}
	const currentActive = options[currentIndex];
	const newActive = options[newIndex];

	if (!newActive) {
		return;
	}
	if (currentActive) {
		currentActive.removeAttribute('aria-selected');
	}
	newActive.setAttribute('aria-selected', 'true');
	target.setAttribute('aria-activedescendent', newActive.id);
};

const handleFocus = (event) => {
	if (event.target.querySelector('[role=option][aria-selected]')) {
		return;
	}
	setActive(event.target, Key.HOME);
};

const handleKeyPress = (event) => {
	setActive(event.target, event.key);
	event.preventDefault();
	event.stopPropagation();
};

export default ({children, ...props}) => {
	const elRef = useRef(null);

	useEffect(() => {
		elRef.current.addEventListener('keydown', handleKeyPress, true);
		elRef.current.addEventListener('focus', handleFocus, true);

		return () => {
		    elRef.current.removeEventListener('keydown', handleKeyPress, true);
			elRef.current.removeEventListener('focus', handleFocus, true);
		};
	});

	return <div ref={elRef} role="listbox" tabIndex="0" {...props}>
		{children}
	</div>;
};
