"use client";

import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import Dashboard from "@/components/shared/layouts/Dashboard";
import { useAddBrandMutation } from "@/services/brand/brandApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddBrand = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [logo, setLogo] = useState(null);
  const [keynotes, setKeynotes] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [addBrand, { isLoading, data, error }] = useAddBrandMutation();

  useEffect(() => {
    if (data) {
      toast.success(data?.description);
    }
    if (error?.data) {
      toast.error(error?.data?.description);
    }
  }, [data, error]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };

  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };

  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  function handleAddBrand(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("logo", logo);
    formData.append("keynotes", JSON.stringify(keynotes));
    formData.append("tags", JSON.stringify(tags));

    addBrand(formData);

    e.target.reset();
    setLogoPreview(null);
    setKeynotes([""]);
    setTags([""]);
  }

  return (
    <Dashboard>
      <form
        className="w-full h-full grid grid-cols-12 gap-4"
        onSubmit={handleAddBrand}
      >
        <div className="md:col-span-4 col-span-12">
          <div className="flex flex-col gap-4 h-full w-full">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="logo"
                width={296}
                height={200}
                className="h-[200px] w-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-52 flex flex-col justify-center items-center gap-y-2 rounded border-2 border-dashed relative p-4">
                <Upload />
                <p className="text-center text-sm">
                  Add Logo <br /> 296x200
                </p>
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  accept=".jpg, .jpeg, .png"
                  multiple={false}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleThumbnailChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-8 col-span-12 flex flex-col gap-y-4">
          <label htmlFor="title" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Brand Title*</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="i.e. Laptop"
              className=""
              required
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Brand Description*</span>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              placeholder="i.e. This is a brand is ..."
              className=""
              required
            ></textarea>
          </label>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="keynotes" className="flex flex-col gap-y-1">
              <span className="text-sm flex flex-row justify-between items-center">
                Enter Brand Keynotes*
                <span
                  className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                  onClick={handleAddKeynote}
                >
                  <Plus />
                </span>
              </span>
              {keynotes.map((keynote, index) => (
                <div key={index} className="flex flex-row gap-x-1 items-start">
                  <input
                    type="text"
                    name="keynotes"
                    placeholder="Enter brand keynote"
                    className="flex-1"
                    value={keynote}
                    onChange={(event) =>
                      handleKeynoteChange(index, event.target.value)
                    }
                    required
                  />
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                    onClick={() => handleRemoveKeynote(index)}
                  >
                    <Minus />
                  </span>
                </div>
              ))}
            </label>
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="keynotes" className="flex flex-col gap-y-1">
              <span className="text-sm flex flex-row justify-between items-center">
                Enter Brand Tags*
                <span
                  className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                  onClick={handleAddTag}
                >
                  <Plus />
                </span>
              </span>
              {tags.map((tag, index) => (
                <div key={index} className="flex flex-row gap-x-1 items-start">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter brand tag"
                    className="flex-1"
                    value={tag}
                    onChange={(event) =>
                      handleTagChange(index, event.target.value)
                    }
                    required
                  />
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <Minus />
                  </span>
                </div>
              ))}
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm mt-4"
          >
            {isLoading ? <Spinner /> : "Create Brand"}
          </button>
        </div>
      </form>
    </Dashboard>
  );
};

export default AddBrand;
