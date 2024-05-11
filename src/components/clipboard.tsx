import React from 'react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

interface ClipboardProps {
  tip: string;
  text: string;
}

export default function Clipboard({ tip, text }: ClipboardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
          className='bg-transparant'
            variant={'outline'}
            onClick={() => {
              navigator.clipboard.writeText(text);
            }}
          >
            📝
          </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-white'>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
