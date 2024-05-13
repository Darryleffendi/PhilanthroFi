import LineSeparator from '@components/line-separator';
import { cn } from '@lib/utils/utils';
import { cva } from 'class-variance-authority';
import React from 'react';
import AnimatedNumbers from 'react-animated-numbers';

interface NumberColumnProps {
  number: number;
  desc: string;
  descStyle?: string;
  type: 'money' | 'percentage' | 'number';
  metrics?: string;
}


const descVariants =cva(
  "text-3xl font-medium text-indigo-400"
)

const NumberColumn : React.FC<NumberColumnProps> = ({desc, number, metrics = "",descStyle, type}) => {
  return (
    <div className="flex flex-col gap-8 justify-end ">
      <LineSeparator />
      <div className="flex flex-col ">
        <div className="flex text-8xl font-medium">
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
        <div className={cn(descVariants({className:descStyle}))}>
          {desc}
        </div>
      </div>
    </div>
  );
};

export default NumberColumn;
