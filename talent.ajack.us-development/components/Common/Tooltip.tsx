interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { text } = props;
  return (
    <div className='absolute w-max max-w-1/12 bg-cyber-grape text-white text-xs rounded py-1 px-4 mb-2 bottom-full hidden group-hover:block'>
      {text}
      <svg
        className='absolute text-cyber-grape h-2 w-full left-0 top-full'
        x='0px'
        y='0px'
        viewBox='0 0 255 255'
        xmlSpace='preserve'>
        <polygon className='fill-current' points='0,0 127.5,127.5 255,0' />
      </svg>
    </div>
  );
};

export default Tooltip;
