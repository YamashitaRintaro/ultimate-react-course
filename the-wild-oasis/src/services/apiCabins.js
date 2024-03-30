import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {

  let { data, error } = await supabase
    .from('cabins')
    .select('*');
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin could not be created");
  }
  return data;
}

export async function updateCabin() {
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be updated");
  }

  return data;
}

export async function deleteCabin(id) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}