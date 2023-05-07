import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const TailspinLoader = () => {
	return <TailSpin height={120} width={120} ariaLabel="tail-spin-loading" radius={2} />;
};

export default TailspinLoader;
