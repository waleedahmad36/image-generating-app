"use client";

import { useState } from "react";
import ImageModal from "../imageComponent/image";

export default function ImageGenerator({ image }) {
  const [text, setText] = useState(" ");
  const [url, setUrl] = useState(" ");
  const [images, setimages] = useState([]);
  const [louder, setLouder] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const query = async (data: any) => {
    console.log("data");
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const output = URL.createObjectURL(result);
    return output;
  };

  const onClickHandler = async () => {
    try {
      setLouder(true);
      const input = { inputs: text };
      const result = await query(input);
      setUrl(result);
      setimages([...images, result]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLouder(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };
  const imageChunks = chunkArray(images, 3);

  return (
    <div className="bg-black h-[130vh] w-full "  >
    <div className="flex-col gap-1   justify-center items-center h-screen ">
      <div className="w-{80%} p-4 text-center text-white  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <div   >
        <h3 className=" text-3xl font-bold  m-4 
        flex justify-center align-middle gap-5 ">
        <img src="https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/394668820_278497571825042_8984893206950098085_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEt-txCb5nvqr-FSSQF7ttgHT5xY5PTqTAdPnFjk9OpMEnk4WtFD0OrhB47RKCza0FHmvdXowOckyCiw2WlzsgG&_nc_ohc=KZaZq7OZ4DMAb5-upZk&_nc_pt=1&_nc_ht=scontent-ams2-1.xx&oh=00_AfDki8Y4o4O2gAdKi-e-vmSQgMct8JOFzLM--XTdCXS9Gw&oe=6636E8E9" 
        className="w-[50px] h-[50px] rounded-full" />
          Waleed Ahmad 
        </h3>
        </div>
        <h5 className="mb-2 m-4 text-3xl font-bold text-gray-400 dark:text-white">
          NextGen Image Genrator App
        </h5>
        <p className="mb-5 m-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Stable Diffusion is a latent text-to-image diffusion model capable of
          generating photo-realistic images given any text input.
        </p>

        <textarea
          id="message"
          rows={2}
          className=" w-full m-3  text-[35px] text-gray-300 bg-transparent rounded-lg border border-gray-800 focus:border-gray-500 outline-none pl-3 pt-2 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Write prompt to generate image 🔥"
          defaultValue={""}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="button"
          className="text-white m-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={onClickHandler}
        >
          Generate Image
        </button>

        {louder && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className="m-5 flex flex-wrap justify-center gap-1 ">
        {imageChunks.map((chunk, index) => (
          <div key={index} className="flex flex-wrap justify-center gap-3 pb-5 ">
            {chunk.map((image, subIndex) => (
              <img
                height={250}
                width={250}
                key={subIndex}
                className="rounded-lg cursor-pointer"
                src={image} 
                alt=""
                onClick={() => openModal(image)}
              />
            ))}
          </div>
        ))}
        <ImageModal
          isOpen={isOpen}
          imageUrl={selectedImage}
          onClose={closeModal}
        />
      </div>
    </div>
    </div>
  );
}
