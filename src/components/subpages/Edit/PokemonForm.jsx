import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  weight: z.coerce.number().min(1, "Weight must be greater than zero"),
  height: z.coerce.number().min(1, "Height must be greater than zero"),
  base_exp: z.coerce.number().min(0, "Experience cannot be negative"),
  id: z.coerce.number().min(151, "ID must be greater than or equal to 151"),
});

export function PokemonForm({
  initialValues,
  onSubmit,
  isEditMode = false,
  usedImageIds = [],
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [imageId, setImageId] = useState(initialValues.id ?? 151);

  const isUsedImage = (id) => usedImageIds.includes(id);

  // obsługa zmiany ID
  useEffect(() => {
    setValue("id", imageId);
  }, [imageId, setValue]);

  const handleNextImage = () => {
    let nextId = imageId + 1;
    while (isUsedImage(nextId)) {
      nextId++;
    }
    setImageId(nextId);
  };

  const handlePrevImage = () => {
    let prevId = imageId - 1;
    while (prevId >= 151 && isUsedImage(prevId)) {
      prevId--;
    }
    if (prevId >= 151) setImageId(prevId);
  };

  const handleFormSubmit = async (data) => {
    console.log('DATA in form', data)

    await onSubmit(data);
    enqueueSnackbar(isEditMode ? "Pokemon updated!" : "Pokemon created!", {
      variant: "success",
    });
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto max-w-md space-y-6 rounded-md border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {isEditMode ? "Edytuj Pokemona" : "Stwórz nowego Pokemona"}
      </h2>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          Nazwa:
        </label>
        <input
          type="text"
          {...register("name")}
          disabled={isEditMode}
          className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrevImage}
          className="rounded bg-gray-400 px-3 py-1 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          ◀
        </button>
        <div className="relative">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageId}.png`}
            alt="Pokemon"
            className={`mx-auto h-24 w-24 ${
              isUsedImage(imageId) ? "opacity-40 grayscale" : ""
            }`}
          />
        </div>
        <button
          type="button"
          onClick={handleNextImage}
          className="rounded bg-gray-400 px-3 py-1 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          ▶
        </button>
      </div>

      <input type="hidden" {...register("id")} />

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          Waga:
        </label>
        <input
          type="number"
          {...register("weight")}
          className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.weight && (
          <p className="text-red-500">{errors.weight.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          Wzrost:
        </label>
        <input
          type="number"
          {...register("height")}
          className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.height && (
          <p className="text-red-500">{errors.height.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          Doświadczenie:
        </label>
        <input
          type="number"
          {...register("base_exp")}
          className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.base_exp && (
          <p className="text-red-500">{errors.base_exp.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {isEditMode ? "Zmień atrybuty" : "Stwórz"}
      </button>
    </form>
  );
}
