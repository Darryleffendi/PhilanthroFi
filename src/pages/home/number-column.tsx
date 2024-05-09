import LineSeparator from '@components/line-separator';
import React from 'react';
import AnimatedNumbers from 'react-animated-numbers';

interface NumberColumnProps {
  number: number;
  desc: string;
  type: 'money' | 'percentage' | 'number';
  metrics?: string;
}

const NumberColumn : React.FC<NumberColumnProps> = ({desc, number, metrics = "", type}) => {
  return (
    <div className="flex flex-col gap-10">
      <LineSeparator />
      <div className="flex flex-col gap-5">
        <div className="flex text-9xl font-medium">
          {type === 'money' && '$'}
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: 'spring',
              duration: index,
            })}
            animateToNumber={number}
          ></AnimatedNumbers>
          {metrics}
        </div>
        <div className="text-3xl font-medium text-indigo-400">
          {desc}
        </div>
      </div>
    </div>
  );
};

export default NumberColumn;
