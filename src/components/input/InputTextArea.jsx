import { useEffect, useRef } from 'react'

const InputTextArea = ({title, value, onChange}) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="py-1 pl-1">
        <label htmlFor="descripcion" className="font-jaldi text-blue text-[1.1rem] font-bold ml-2">{title}</label>
        <textarea name="descripción" onChange={onChange} id="descripcion" className="rounded-[1.2rem] focus:ring-4 text-base font-jaldi font-[400] py-[1.2rem] pl-[1rem] pr-[1rem] lg:w-[95%] w-[18rem] shadow-[inset_0_4px_4px_-0px_rgba(0,0,0,0.2)] bg-yellow h-[auto] text-blue"  ref={textareaRef} onInput={adjustHeight} value={value} maxLength={500} />
    </div>
  )
}

export default InputTextArea
