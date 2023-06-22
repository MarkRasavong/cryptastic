import React from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

interface SideArrowProps {
	direction: 'left' | 'right';
	onClick: () => void;
}

const SideArrow: React.FC<SideArrowProps> = ({ direction, onClick }) => {
	return (
		<button className="sm:hidden w-full flex justify-center my-2" onClick={onClick}>
			{direction === 'left' ? <FaCaretLeft size={50} /> : <FaCaretRight size={50} />}
		</button>
	);
};

export default SideArrow;
