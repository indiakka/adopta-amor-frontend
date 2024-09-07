import { useState } from "react";

const InputImg = ({ id, title, onChange }) => {
  const presetName = "hxreahpb";
  const cloudName = "dugbix24o";
  const [selectedFile, setSelectedFile] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
    const imgUrl = await uploadImage(file);
    onChange(imgUrl);
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", presetName);
    setSelectedFile(true);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const file = await response.json();
      return file.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="relative flex flex-col mx-2 my-4 text-blue ">
      <label htmlFor={id} className="text-[1.1rem] font-bold ml-2">
        {title}
      </label>
      <input
        id={id}
        type="file"
        onChange={handleFileChange}
        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer z-20"
      />
      <div className="flex items-center bg-yellow rounded-[1.2rem] h-[2.7rem] shadow-[inset_0_4px_4px_-0px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center w-[25%] h-[2.7rem] bg-blue rounded-tl-full rounded-bl-full shadow-[4px_0px_8px_rgba(0,0,0,0.3)]">
          <img
            src="/Assets/File-icon.svg"
            alt="icons carpeta"
            className="w-[2rem] ml-1"
          />
        </div>
        <span className="w-[75%] text-sm pl-3 line-clamp-1">
          {selectedFile ? fileName : "Sube una imagen..."}
        </span>
      </div>
    </div>
  );
};

export default InputImg;
